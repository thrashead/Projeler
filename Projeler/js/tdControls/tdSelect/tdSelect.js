/* tdSelect - Developed by Sina SALIK (2004 - 2016) */

(function ($) {
    var CreateSelect = function (Item, IsText) {
        var guid = guid();

        IsText = IsText == undefined ? false : IsText;

        createSelect(Item, IsText);

        function guid() {
            return Math.floor((1 + Math.random()) * 0x10000).toString(16).substring(1);
        }

        function createSelect(ullist, isText) {
            ullist.addClass("tdSelectList")
            var options = ullist;
            var selectText = "tdSelectText" + guid;

            if (isText) {
                options.before("<input type=\"text\" id=\"" + selectText + "\" class=\"tdSelectText\" />");
            }
            else {
                options.before("<div id=\"" + selectText + "\" class=\"tdSelectText\"></div>");
            }

            var selectitem = $("#" + selectText);
            try { selectitem.html(options.children("li").first().text()); } catch (e) { }
            selectitem.val(options.children("li").first().text());
            selectitem.attr("data-value", options.children("li").first().attr("data-value"));
            options.hide();

            selectitem.click(function () {
                if (options.is(":visible")) {
                    options.fadeOut("slow");
                }
                else {
                    options.fadeIn("slow");
                }
            });

            $("html").click(function (e) {
                if (selectitem.offset() != undefined) {
                    var clickedPosX = e.pageX,
                        clickedPosY = e.pageY;

                    var posX = selectitem.offset().left,
                        posX2 = selectitem.offset().left + selectitem.width() + parseInt(selectitem.css("padding-left").replace("px", "")) + parseInt(selectitem.css("padding-right").replace("px", "")),
                        posY = selectitem.offset().top,
                        posY2 = selectitem.offset().top + selectitem.height() + parseInt(selectitem.css("padding-top").replace("px", "")) + parseInt(selectitem.css("padding-bottom").replace("px", ""));

                    if (clickedPosX < posX || clickedPosY < posY || clickedPosX > posX2 || clickedPosY > posY2) {
                        options.fadeOut("slow");
                    }

                    if (selectitem.val() == "") {
                        selectitem.val(options.children("li").first().text());
                        selectitem.attr("data-value", options.children("li").first().attr("data-value"));
                    }
                }
            });

            options.children("li").click(function () {
                options.children("li").removeAttr("data-selected");
                $(this).attr("data-selected", "true");
                selectitem.attr("data-value", $(this).attr("data-value"));
                try { selectitem.html($(this).text()); } catch (e) { }
                selectitem.val($(this).text());
                options.fadeOut("slow");
                options.children("li").each(function () {
                    $(this).show();
                });
            });

            selectitem.keyup(function () {
                $(this).attr("data-value", "");
                options.fadeIn("slow");

                options.children("li").each(function () {
                    if ($(this).text() != "") {
                        if (localLowerCase($(this).text()).indexOf(localLowerCase(selectitem.val())) <= -1) {
                            $(this).hide();
                        }
                        else {
                            if (localLowerCase($(this).text()) == localLowerCase(selectitem.val())) {
                                selectitem.attr("data-value", $(this).attr("data-value"));
                            }
                            else {
                                selectitem.attr("data-value", "");
                            }

                            $(this).show();
                        }
                    }
                    else {
                        $(this).show();
                    }
                });
            });
        }

        function localLowerCase(str) {
            str = str.replace(/\i/g, "İ");
            str = str.replace(/\I/g, "ı");
            return str.toLowerCase();
        }
    }

    $.fn.tdSelect = function (isText) {
        return new CreateSelect(this, isText);
    };
})(jQuery);