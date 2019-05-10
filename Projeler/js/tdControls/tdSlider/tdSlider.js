/* tdSlider - Developed by Sina SALIK (2004 - 2016) */

(function ($) {
    var CreateSlider = function (item, sliderOptions) {
        var SInfo = new Object();
        var SOpt = sliderOptions != undefined ? sliderOptions : {
            autostart: true,
            slideonclick: false,
            width: 700,
            height: 200,
            imagestretch: false,
            direction: "LTR", /* LTR RTL UTD DTU */
            duration: 2000,
            effect: "slide", /* slide fade none */
            showbuttons: true,
            buttonstyle: "thumb", /* thumb numeric square circle arrow */
            shownumbers: false,
            thumbwidth: 130,
            thumbheight: 60,
            tabeffect: "fade",  /* fade none */
            tabbed: false,
            border: 0
        }

        checkOptionValues(SOpt);

        writeSlider(item, SInfo, SOpt);

        function checkOptionValues(sOpt) {
            sOpt.autostart = sOpt.autostart == undefined ? true : sOpt.autostart;
            sOpt.slideonclick = sOpt.slideonclick == undefined ? false : sOpt.slideonclick;
            sOpt.width = sOpt.width == undefined ? 700 : sOpt.width;
            sOpt.height = sOpt.height == undefined ? 200 : sOpt.height;
            sOpt.imagestretch = sOpt.imagestretch == undefined ? false : sOpt.imagestretch;
            sOpt.direction = sOpt.direction == undefined ? "LTR" : sOpt.direction;
            sOpt.duration = sOpt.duration == undefined ? 2000 : sOpt.duration;
            sOpt.effect = sOpt.effect == undefined ? "slide" : sOpt.effect;
            sOpt.showbuttons = sOpt.showbuttons == undefined ? true : sOpt.showbuttons;
            sOpt.buttonstyle = sOpt.buttonstyle == undefined ? "thumb" : sOpt.buttonstyle;
            sOpt.shownumbers = sOpt.shownumbers == undefined ? false : sOpt.shownumbers;
            sOpt.thumbwidth = sOpt.thumbwidth == undefined ? 130 : sOpt.thumbwidth;
            sOpt.thumbheight = sOpt.thumbheight == undefined ? 60 : sOpt.thumbheight;
            sOpt.tabeffect = sOpt.tabeffect == undefined ? "fade" : sOpt.tabeffect;
            sOpt.tabbed = sOpt.tabbed == undefined ? false : sOpt.tabbed;
            sOpt.border = sOpt.border == undefined ? 0 : sOpt.border;
        }

        function writeSlider(sItem, sInfo, sOptions) {
            var tabs = new Array();
            var images = new Array();

            sItem.addClass("tdSlider");

            sItem.css("border", sOptions.border.toString() + "px solid");
            sItem.css("width", sOptions.width.toString() + "px");

            var imgStyle = "";

            if (sOptions.slideonclick == true || sOptions.imagestretch == true) {
                imgStyle += " style=\"";

                if (sOptions.slideonclick == true) {
                    imgStyle += "cursor:pointer; ";
                }

                if (sOptions.imagestretch == true) {
                    imgStyle += "height:" + sOptions.height.toString() + "px; width:" + sOptions.width.toString() + "px;";
                }

                imgStyle += "\"";
            }

            if (sOptions.tabbed == true) {
                /* Tabları Ekle */
                sItem.find("img").each(function (i, data) {
                    if ($.inArray($(data).attr("data-tab") + "#" + $(data).attr("data-tab-text"), tabs) == -1) {
                        tabs.push($(data).attr("data-tab") + "#" + $(data).attr("data-tab-text"));
                    }
                    images.push(data);
                });
                sItem.html("");

                var tabText = "<div class=\"tdTabs\" style=\"width:" + sOptions.width.toString() + "px;\">";
                var tabindex = 0;

                $.each(tabs, function (index, data) {
                    var tabHeader = data.split('#')[1] != "undefined" ? data.split('#')[1] : data.split('#')[0];
                    if (tabindex == 0) {
                        tabText += "<a href=\"javascript:;\" class=\"tdTab active\" data-tab=\"" + data.split('#')[0] + "\">" + tabHeader + "</a>";
                    }
                    else {
                        tabText += "<a href=\"javascript:;\" class=\"tdTab\" data-tab=\"" + data.split('#')[0] + "\">" + tabHeader + "</a>";
                    }

                    tabindex++;
                });

                tabText += "</div>";

                sItem.append(tabText);
                /* Tabları Ekle */

                /* Resimleri Ekle */
                var imgText = "";
                var imgindex = 0;

                imgText += "<div class=\"tdLists\" style=\" width:" + sOptions.width.toString() + "px;\">";

                $.each(tabs, function (index, data) {
                    if (imgindex == 0) {
                        imgText += "<ul class=\"tdList\" data-tab=\"" + data.split('#')[0] + "\">";
                    }
                    else {
                        imgText += "<ul class=\"tdList\" data-tab=\"" + data.split('#')[0] + "\" style=\"display:none;\">";
                    }

                    var dataindex = 0;
                    $.each(images, function (index, img) {
                        if ($(img).attr("data-tab") == data.split('#')[0]) {
                            if (dataindex == 0) {
                                imgText += "<li><img" + imgStyle + " src=\"" + $(img).attr("src") + "\" data-tab=\"" + $(img).attr("data-tab") + "\" data-index=\"" + dataindex.toString() + "\" class=\"active\" /></li>";
                            }
                            else {
                                imgText += "<li><img" + imgStyle + " src=\"" + $(img).attr("src") + "\" data-tab=\"" + $(img).attr("data-tab") + "\" data-index=\"" + dataindex.toString() + "\" /></li>";
                            }
                            dataindex++;
                        }
                    });

                    imgText += "</ul>";
                    imgindex++;
                });

                imgText += "</div>";

                sItem.append(imgText);
                /* Resimleri Ekle */

                /* Buttonları Ekle */
                if (sOptions.showbuttons == true) {
                    var buttonText = "";
                    var buttonindex = 0;

                    if (sOptions.buttonstyle == "thumb") {
                        buttonText += "<a class=\"tdNextPrev tdPrevButton\" href=\"javascript:;\" data-dir=\"prev\" style=\"height:" + (sOptions.thumbheight - 2).toString() + "px; line-height:" + (sOptions.thumbheight - 2).toString() + "px;\"><</a>";
                        buttonText += "<div class=\"tdThumbs\" style=\" width:" + (sOptions.width - 50).toString() + "px;\">";

                        $.each(tabs, function (index, data) {
                            if (buttonindex == 0) {
                                buttonText += "<ul class=\"tdThumb\" data-tab=\"" + data.split('#')[0] + "\" style=\"height:" + sOptions.thumbheight.toString() + "px;\">";
                            }
                            else {
                                buttonText += "<ul class=\"tdThumb\" data-tab=\"" + data.split('#')[0] + "\" style=\"display:none; height:" + sOptions.thumbheight.toString() + "px;\">";
                            }

                            var dataindex = 0;
                            $.each(images, function (index, img) {
                                if ($(img).attr("data-tab") == data.split('#')[0]) {
                                    if (dataindex == 0) {
                                        buttonText += "<li><img src=\"" + $(img).attr("src") + "\" style=\"width:" + (sOptions.thumbwidth - 6).toString() + "px; height:" + (sOptions.thumbheight - 6).toString() + "px;\" data-tab=\"" + $(img).attr("data-tab") + "\" data-index=\"" + dataindex.toString() + "\" class=\"active\" /></li>";
                                    }
                                    else {
                                        buttonText += "<li><img src=\"" + $(img).attr("src") + "\" style=\"width:" + (sOptions.thumbwidth - 6).toString() + "px; height:" + (sOptions.thumbheight - 6).toString() + "px;\" data-tab=\"" + $(img).attr("data-tab") + "\" data-index=\"" + dataindex.toString() + "\" /></li>";
                                    }
                                    dataindex++;
                                }
                            });

                            buttonText += "</ul>";
                            buttonindex++;
                        });

                        buttonText += "</div>";
                        buttonText += "<a class=\"tdNextPrev tdNextButton\" href=\"javascript:;\" data-dir=\"next\" style=\"height:" + (sOptions.thumbheight - 2).toString() + "px; line-height:" + (sOptions.thumbheight - 2).toString() + "px;\">></a>";

                        sItem.append(buttonText);
                        $.each(sItem.find("div.tdThumbs").find("ul.tdThumb"), function () {
                            $(this).css("width", sOptions.thumbwidth * $(this).find("li").length.toString() + "px");
                        });
                    }
                    else if (sOptions.buttonstyle == "circle") {
                    }
                    else if (sOptions.buttonstyle == "square") {
                    }
                    else if (sOptions.buttonstyle == "arrow") {
                    }
                }
                /* Buttonları Ekle */
            }
            else {
                sItem.find("img").each(function (i, data) {
                    images.push(data);
                });
                sItem.html("");

                /* Resimleri Ekle */
                var imgText = "";
                var dataindex = 0;

                imgText += "<div class=\"tdLists\" style=\" width:" + sOptions.width.toString() + "px;\">";
                imgText += "<ul class=\"tdList\">";

                $.each(images, function (index, img) {
                    if (dataindex == 0) {
                        imgText += "<li><img" + imgStyle + " src=\"" + $(img).attr("src") + "\" data-index=\"" + dataindex.toString() + "\" class=\"active\" /></li>";
                    }
                    else {
                        imgText += "<li><img" + imgStyle + " src=\"" + $(img).attr("src") + "\" data-index=\"" + dataindex.toString() + "\" /></li>";
                    }
                    dataindex++;
                });

                imgText += "</ul>";
                imgText += "</div>";

                sItem.append(imgText);
                /* Resimleri Ekle */

                /* Buttonları Ekle */
                if (sOptions.showbuttons == true) {
                    var buttonText = "";

                    if (sOptions.buttonstyle == "thumb") {
                        dataindex = 0;
                        buttonText += "<a class=\"tdNextPrev tdPrevButton\" href=\"javascript:;\" data-dir=\"prev\" style=\"height:" + (sOptions.thumbheight - 2).toString() + "px; line-height:" + (sOptions.thumbheight - 2).toString() + "px;\"><</a>";
                        buttonText += "<div class=\"tdThumbs\" style=\" width:" + (sOptions.width - 50).toString() + "px;\">";
                        buttonText += "<ul class=\"tdThumb\" style=\"height:" + sOptions.thumbheight.toString() + "px;\">";

                        $.each(images, function (index, img) {
                            if (dataindex == 0) {
                                buttonText += "<li><img src=\"" + $(img).attr("src") + "\" style=\"width:" + (sOptions.thumbwidth - 6).toString() + "px; height:" + (sOptions.thumbheight - 6).toString() + "px;\" data-index=\"" + dataindex.toString() + "\" class=\"active\" /></li>";
                            }
                            else {
                                buttonText += "<li><img src=\"" + $(img).attr("src") + "\" style=\"width:" + (sOptions.thumbwidth - 6).toString() + "px; height:" + (sOptions.thumbheight - 6).toString() + "px;\" data-index=\"" + dataindex.toString() + "\" /></li>";
                            }
                            dataindex++;
                        });

                        buttonText += "</ul>";
                        buttonText += "</div>";
                        buttonText += "<a class=\"tdNextPrev tdNextButton\" href=\"javascript:;\" data-dir=\"next\" style=\"height:" + (sOptions.thumbheight - 2).toString() + "px; line-height:" + (sOptions.thumbheight - 2).toString() + "px;\">></a>";

                        sItem.append(buttonText);

                        sItem.find("div.tdThumbs").find("ul.tdThumb").css("width", sOptions.thumbwidth * dataindex.toString() + "px");
                    }
                    else if (sOptions.buttonstyle == "circle") {
                    }
                    else if (sOptions.buttonstyle == "square") {
                    }
                    else if (sOptions.buttonstyle == "arrow") {
                    }
                }
                /* Buttonları Ekle */
            }

            sItem.find("div.tdLists").css("height", sOptions.height);
            sItem.find("div.tdLists").css("width", sOptions.width);
            sItem.find("div.tdLists").find("ul").find("li").css("height", sOptions.height);
            sItem.find("div.tdLists").find("ul").find("li").css("width", sOptions.width);

            switch (sOptions.direction) {
                case "LTR":
                    sItem.find("div.tdLists").find("ul").each(function () {
                        $(this).css("width", $(this).find("li").length * sOptions.width);
                    });
                    break;
                case "RTL":
                    sItem.find("div.tdLists").find("ul").each(function () {
                        $(this).css("width", $(this).find("li").length * sOptions.width);
                    });
                    break;
                case "UTD":
                    sItem.find("div.tdLists").find("ul").each(function () {
                        $(this).css("height", sOptions.height);
                    });
                    break;
                case "DTU":
                    sItem.find("div.tdLists").find("ul").each(function () {
                        $(this).css("height", sOptions.height);
                    });
                    break;
                default:
                    sItem.find("div.tdLists").find("ul").each(function () {
                        $(this).css("width", $(this).find("li").length * sOptions.width);
                    });
                    break;
            }

            if (sOptions.autostart == true) {
                setInterval(function () {
                    sItem.find("div.tdLists").find("ul").each(function () {
                        PicClick($(this).find("li").find("img[class='active']"));
                    });
                }, sOptions.duration);
            }

            function slideIt(ulitem, soptions) {
                if (soptions.effect == "fade") {
                    slideFade(ulitem, soptions);
                }
                else if (soptions.effect == "none") {
                    slideNone(ulitem, soptions);
                }
                else {
                    switch (soptions.direction) {
                        case "LTR":
                            slideLTR(ulitem, soptions);
                            break;
                        case "RTL":
                            slideRTL(ulitem, soptions);
                            break;
                        case "UTD":
                            slideUTD(ulitem, soptions);
                            break;
                        case "DTU":
                            slideDTU(ulitem, soptions);
                            break;
                        default:
                            slideLTR(ulitem, soptions);
                            break;
                    }
                }
            }

            /* Slide Fade */
            function slideFade(ulitem, soptions) {
                ulitem.find("li").hide();
                ulitem.find("li").find("img[class='active']").parent("li").fadeIn("slow");
            }
            /* Slide Fade */

            /* Slide None */
            function slideNone(ulitem, soptions) {
                ulitem.find("li").hide();
                ulitem.find("li").find("img[class='active']").parent("li").show();
            }
            /* Slide None */

            /* Slide Left to Right */
            function slideLTR(ulitem, soptions) {
                ulitem.animate({
                    "margin-left": "-=" + sOptions.width.toString() + "px"
                }, 100);
            }
            /* Slide Left to Right */

            /* Slide Right to Left */
            function slideRTL(ulitem, soptions) {
                ulitem.animate({
                    "margin-left": "+=" + sOptions.width.toString() + "px"
                }, 100);
            }
            /* Slide Right to Left */

            /* Slide Up to Down */
            function slideUTD(ulitem, soptions) {
                ulitem.animate({
                    "margin-top": "-=" + sOptions.height.toString() + "px"
                }, 100);
            }
            /* Slide Up to Down */

            /* Slide Down to Up */
            function slideDTU(ulitem, soptions) {
                ulitem.animate({
                    "margin-top": "+=" + sOptions.height.toString() + "px"
                }, 100);
            }
            /* Slide Down to Up */

            /* Tab Tıklama */
            sItem.find(".tdTabs").find("a.tdTab").on("click", function () {
                sItem.find(".tdTabs").find("a.tdTab").removeClass("active");
                $(this).addClass("active");
                sItem.find("div.tdLists").find("ul").hide();
                sItem.find("div.tdThumbs").find("ul").hide();
                if (sOptions.tabeffect == "fade") {
                    sItem.find("div.tdLists").find("ul[data-tab='" + $(this).attr("data-tab") + "']").fadeIn("slow");
                    sItem.find("div.tdThumbs").find("ul[data-tab='" + $(this).attr("data-tab") + "']").fadeIn("slow");
                }
                else {
                    sItem.find("div.tdLists").find("ul[data-tab='" + $(this).attr("data-tab") + "']").show();
                    sItem.find("div.tdThumbs").find("ul[data-tab='" + $(this).attr("data-tab") + "']").show();
                }
            });
            /* Tab Tıklama */

            /* Resim Tıklama */
            sItem.find(".tdLists").find("ul.tdList").find("li").find("img").on("click", function () {
                if (sOptions.slideonclick == true) {
                    PicClick($(this));
                }
            });
            /* Resim Tıklama */

            /* Thumb Tıklama */
            sItem.find(".tdThumbs").find("ul.tdThumb").find("li").find("img").on("click", function () {
                var ulitem = "";
                if (sOptions.tabbed == true) {
                    ulitem = sItem.find("div.tdLists").find("ul[data-tab='" + $(this).attr("data-tab") + "']");
                }
                else {
                    ulitem = sItem.find("div.tdLists").find("ul");
                }

                if (sOptions.effect == "slide") {
                    var startindex = parseInt(ulitem.find("li").find("img[class='active']").attr("data-index"));
                    var endindex = parseInt($(this).attr("data-index"));
                    ulitem.find("li").find("img").removeClass("active");
                    if (sOptions.tabbed == true) {
                        ulitem.parent("div.tdLists").parent("div").find("div.tdThumbs").find("ul.tdThumb[data-tab='" + $(this).attr("data-tab") + "']").find("li").find("img").removeClass("active");
                    }
                    else {
                        ulitem.parent("div.tdLists").parent("div").find("div.tdThumbs").find("ul.tdThumb").find("li").find("img").removeClass("active");
                    }

                    ulitem.find("li").find("img[data-index='" + endindex + "']").addClass("active");
                    $(this).addClass("active");

                    if (sOptions.direction == "UTD" || sOptions.direction == "LTR") {
                        if (startindex < endindex) {
                            multiply = endindex - startindex;
                            for (var i = 0; i < multiply; i++) {
                                slideIt(ulitem, sOptions);
                            }
                        }
                        else if (startindex > endindex) {
                            multiply = startindex - endindex;
                            if (sOptions.direction == "UTD") {
                                sOptions.direction = "DTU";
                                for (var i = 0; i < multiply; i++) {
                                    slideIt(ulitem, sOptions);
                                }
                                sOptions.direction = "UTD";
                            }
                            else if (sOptions.direction == "LTR") {
                                sOptions.direction = "RTL";
                                for (var i = 0; i < multiply; i++) {
                                    slideIt(ulitem, sOptions);
                                }
                                sOptions.direction = "LTR";
                            }
                        }
                    }
                    else {
                        if (startindex < endindex) {
                            multiply = endindex - startindex;
                            if (sOptions.direction == "DTU") {
                                sOptions.direction = "UTD";
                                for (var i = 0; i < multiply; i++) {
                                    slideIt(ulitem, sOptions);
                                }
                                sOptions.direction = "DTU";
                            }
                            else if (sOptions.direction == "RTL") {
                                sOptions.direction = "LTR";
                                for (var i = 0; i < multiply; i++) {
                                    slideIt(ulitem, sOptions);
                                }
                                sOptions.direction = "RTL";
                            }
                        }
                        else if (startindex > endindex) {
                            multiply = startindex - endindex;
                            for (var i = 0; i < multiply; i++) {
                                slideIt(ulitem, sOptions);
                            }
                        }
                    }
                }
                else {
                    if (sOptions.tabbed == true) {
                        ulitem.parent("div.tdLists").find("li").find("img").removeClass("active");
                        ulitem.parent("div.tdLists").parent("div").find("div.tdThumbs").find("ul.tdThumb[data-tab='" + $(this).attr("data-tab") + "']").find("li").find("img").removeClass("active");
                        ulitem.parent("div.tdLists").find("ul.tdList[data-tab='" + $(this).attr("data-tab") + "']").find("li").find("img[data-index='" + $(this).attr("data-index") + "']").addClass("active");
                    }
                    else {
                        ulitem.parent("div.tdLists").find("li").find("img").removeClass("active");
                        ulitem.parent("div.tdLists").parent("div").find("div.tdThumbs").find("ul.tdThumb").find("li").find("img").removeClass("active");
                        ulitem.parent("div.tdLists").find("ul.tdList").find("li").find("img[data-index='" + $(this).attr("data-index") + "']").addClass("active");
                    }
                    $(this).addClass("active");

                    slideIt(ulitem, sOptions);
                }
            });
            /* Thumb Tıklama */

            /* Thumb Next Prev Tıklama */
            sItem.find(".tdNextPrev").on("click", function () {
                var direct = $(this).attr("data-dir");
                var activeItemIndex = parseInt(sItem.find(".tdThumbs").find("ul.tdThumb:visible").find("li").find("img[class='active']").attr("data-index"));
                var getUlWidth = sItem.find(".tdThumbs").find("ul.tdThumb:visible").width();
                var getDivWidth = sItem.find(".tdThumbs").width();
                var getMarginLeft = parseInt(sItem.find(".tdThumbs").find("ul.tdThumb:visible").css("margin-left").replace("px", ""));

                if (getUlWidth > getDivWidth) {
                    if (direct == "next") {
                        getMarginLeft = getMarginLeft - getDivWidth - sOptions.thumbwidth < -getUlWidth ? getDivWidth - getUlWidth : getMarginLeft;
                        if (getMarginLeft > getDivWidth - getUlWidth) {
                            sItem.find(".tdThumbs").find("ul.tdThumb:visible").animate({
                                "margin-left": (getMarginLeft - sOptions.thumbwidth).toString() + "px"
                            }, 100);
                        }
                        else if (getMarginLeft == getDivWidth - getUlWidth) {
                            sItem.find(".tdThumbs").find("ul.tdThumb:visible").animate({
                                "margin-left": getMarginLeft.toString() + "px"
                            }, 100);
                        }
                    }
                    else {
                        getMarginLeft = getMarginLeft > -sOptions.thumbwidth ? -sOptions.thumbwidth : getMarginLeft;
                        if (getMarginLeft < 0) {
                            sItem.find(".tdThumbs").find("ul.tdThumb:visible").animate({
                                "margin-left": (getMarginLeft + sOptions.thumbwidth).toString() + "px"
                            }, 100);
                        }
                    }
                }
            });
            /* Thumb Next Prev Tıklama */

            function PicClick(imaj) {
                var ulitem = "";
                if (sOptions.tabbed == true) {
                    ulitem = sItem.find("div.tdLists").find("ul[data-tab='" + imaj.attr("data-tab") + "']");
                }
                else {
                    ulitem = sItem.find("div.tdLists").find("ul");
                }

                if (sOptions.effect == "slide") {
                    var startindex = parseInt(imaj.attr("data-index"));
                    var endindex = 0;

                    if (sOptions.direction == "UTD" || sOptions.direction == "LTR") {
                        if (startindex == ulitem.find("li").length - 1) {
                            endindex = 0;
                        }
                        else {
                            endindex = startindex + 1;
                        }
                    }
                    else {
                        if (startindex == 0) {
                            endindex = ulitem.find("li").length - 1;
                        }
                        else {
                            endindex = startindex - 1;
                        }
                    }

                    ulitem.find("li").find("img").removeClass("active");

                    if (sOptions.tabbed == true) {
                        ulitem.parent("div.tdLists").parent("div").find("div.tdThumbs").find("ul.tdThumb[data-tab='" + imaj.attr("data-tab") + "']").find("li").find("img").removeClass("active")
                    }
                    else {
                        ulitem.parent("div.tdLists").parent("div").find("div.tdThumbs").find("ul.tdThumb").find("li").find("img").removeClass("active")
                    }

                    ulitem.find("li").find("img[data-index='" + endindex + "']").addClass("active");

                    if (sOptions.tabbed == true) {
                        ulitem.parent("div.tdLists").parent("div").find("div.tdThumbs").find("ul.tdThumb[data-tab='" + imaj.attr("data-tab") + "']").find("li").find("img[data-index='" + endindex + "']").addClass("active");
                    }
                    else {
                        ulitem.parent("div.tdLists").parent("div").find("div.tdThumbs").find("ul.tdThumb").find("li").find("img[data-index='" + endindex + "']").addClass("active");
                    }

                    if (sOptions.direction == "UTD" || sOptions.direction == "LTR") {
                        if (startindex < endindex) {
                            multiply = endindex - startindex;
                            for (var i = 0; i < multiply; i++) {
                                slideIt(ulitem, sOptions);
                            }
                        }
                        else if (startindex > endindex) {
                            multiply = startindex - endindex;
                            if (sOptions.direction == "UTD") {
                                sOptions.direction = "DTU";
                                for (var i = 0; i < multiply; i++) {
                                    slideIt(ulitem, sOptions);
                                }
                                sOptions.direction = "UTD";
                            }
                            else if (sOptions.direction == "LTR") {
                                sOptions.direction = "RTL";
                                for (var i = 0; i < multiply; i++) {
                                    slideIt(ulitem, sOptions);
                                }
                                sOptions.direction = "LTR";
                            }
                        }
                    }
                    else {
                        if (startindex < endindex) {
                            multiply = endindex - startindex;
                            if (sOptions.direction == "DTU") {
                                sOptions.direction = "UTD";
                                for (var i = 0; i < multiply; i++) {
                                    slideIt(ulitem, sOptions);
                                }
                                sOptions.direction = "DTU";
                            }
                            else if (sOptions.direction == "RTL") {
                                sOptions.direction = "LTR";
                                for (var i = 0; i < multiply; i++) {
                                    slideIt(ulitem, sOptions);
                                }
                                sOptions.direction = "RTL";
                            }

                        }
                        else if (startindex > endindex) {
                            multiply = startindex - endindex;
                            for (var i = 0; i < multiply; i++) {
                                slideIt(ulitem, sOptions);
                            }
                        }
                    }
                }
                else {
                    ulitem.find("li").find("img").removeClass("active");

                    if (sOptions.tabbed == true) {
                        ulitem.parent("div.tdLists").parent("div").find("div.tdThumbs").find("ul.tdThumb[data-tab='" + imaj.attr("data-tab") + "']").find("li").find("img").removeClass("active");
                    }
                    else {
                        ulitem.parent("div.tdLists").parent("div").find("div.tdThumbs").find("ul.tdThumb").find("li").find("img").removeClass("active");
                    }

                    if (sOptions.direction == "UTD" || sOptions.direction == "LTR") {
                        if (imaj.parent("li").next().length > 0) {
                            imaj.parent("li").next().find("img").addClass("active");

                            if (sOptions.tabbed == true) {
                                ulitem.parent("div.tdLists").parent("div").find("div.tdThumbs").find("ul.tdThumb[data-tab='" + imaj.attr("data-tab") + "']").find("li").find("img[data-index='" + (parseInt($(this).attr("data-index")) + 1).toString() + "']").addClass("active");
                            }
                            else {
                                ulitem.parent("div.tdLists").parent("div").find("div.tdThumbs").find("ul.tdThumb").find("li").find("img[data-index='" + (parseInt($(this).attr("data-index")) + 1).toString() + "']").addClass("active");
                            }
                        }
                        else {
                            imaj.parent("li").parent("ul").find("li").first().find("img").addClass("active");
                            if (sOptions.tabbed == true) {
                                ulitem.parent("div.tdLists").parent("div").find("div.tdThumbs").find("ul.tdThumb[data-tab='" + imaj.attr("data-tab") + "']").find("li").find("img[data-index='0']").addClass("active");
                            }
                            else {
                                ulitem.parent("div.tdLists").parent("div").find("div.tdThumbs").find("ul.tdThumb").find("li").find("img[data-index='0']").addClass("active");
                            }
                        }
                    }
                    else {
                        if (imaj.parent("li").prev().length > 0) {
                            imaj.parent("li").prev().find("img").addClass("active");
                            if (sOptions.tabbed == true) {
                                ulitem.parent("div.tdLists").parent("div").find("div.tdThumbs").find("ul.tdThumb[data-tab='" + imaj.attr("data-tab") + "']").find("li").find("img[data-index='" + (parseInt($(this).attr("data-index")) - 1).toString() + "']").addClass("active");
                            }
                            else {
                                ulitem.parent("div.tdLists").parent("div").find("div.tdThumbs").find("ul.tdThumb").find("li").find("img[data-index='" + (parseInt($(this).attr("data-index")) - 1).toString() + "']").addClass("active");
                            }
                        }
                        else {
                            imaj.parent("li").parent("ul").find("li").last().find("img").addClass("active");
                            if (sOptions.tabbed == true) {
                                ulitem.parent("div.tdLists").parent("div").find("div.tdThumbs").find("ul.tdThumb[data-tab='" + $(this).attr("data-tab") + "']").find("li").find("img[data-index='" + ($(this).parent("li").parent("ul").find("li").length - 1).toString() + "']").addClass("active");
                            }
                            else {
                                ulitem.parent("div.tdLists").parent("div").find("div.tdThumbs").find("ul.tdThumb").find("li").find("img[data-index='" + ($(this).parent("li").parent("ul").find("li").length - 1).toString() + "']").addClass("active");
                            }
                        }

                    }

                    slideIt(ulitem, sOptions);
                }
            }
        }
    }

    $.fn.tdSlider = function (sliderOptions) {
        return new CreateSlider(this, sliderOptions);
    };
})(jQuery);