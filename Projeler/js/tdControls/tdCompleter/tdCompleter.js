/* tdCompleter - Developed by Sina SALIK (2004 - 2016) */

(function ($) {
    var CreateAutoCompleter = function (Item, CompleterOptions) {
        var Option = CompleterOptions != undefined ? CompleterOptions : {
            listmethod: "",
            minlength: 3,
            redirect: false,
            linkroot: "",
            linktext: "",
            withvoice: false
        }

        checkOptionValues(Option);

        if (Option.listmethod == undefined || Option.listmethod == "") {
            return false;
        }

        createCompleter(Item, Option);

        function checkOptionValues(option) {
            option.listmethod = option.listmethod == undefined ? "" : option.listmethod;
            option.minlength = option.minlength == undefined ? 3 : option.minlength;
            option.redirect = option.redirect == undefined ? false : option.redirect;
            option.linkroot = option.linkroot == undefined ? "" : option.linkroot;
            option.linktext = option.linktext == undefined ? "" : option.linktext;
            option.withvoice = option.withvoice == undefined ? false : option.withvoice;
        }
        
        function createCompleter(ssItem, option) {
            ssItem.addClass("tdCompleter");
            ssItem.wrap("<div class=\"tdCompleterFrame\"></div>");

            if (option.withvoice == true) {
                ssItem.attr("x-webkit-speech", "x-webkit-speech");
            }

            ssItem.after("<ul id=\"tdCompleter\"></ul>");

            ssItem.keyup(function (event) {
                if (ssItem.val().length >= option.minlength) {
                    FillSearchResult($(this), option, event.keyCode);
                }
                else {
                    ssItem.next().css("display", "none");
                }
            });

            ssItem.bind("webkitspeechchange", function () {
                if (ssItem.val().length >= option.minlength) {
                    FillSearchResult($(this), option, event.keyCode);
                }
                else {
                    ssItem.next().css("display", "none");
                }
            });

            ssItem.blur(function (event) {
                if (ssItem.next().children("li").length > 0 && ssItem.val().length >= option.minlength) {
                    setTimeout(function () {
                        ssItem.next().css("display", "none");
                    }, 100);
                }
            });

            ssItem.focus(function (event) {
                if (ssItem.next().children("li").length > 0 && ssItem.val().length >= option.minlength) {
                    setTimeout(function () {
                        ssItem.next().css("display", "block");
                    }, 100);
                }
            });
        }

        function FillSearchResult(item, opt, keyCode) {
            var SearchWord = item.val();

            if (keyCode == 13 && item.next().children("li.focus").index() >= 0) {
                item.next().css("display", "none");
                if (opt.redirect == true) {
                    item.val(item.next().children("li.focus").children("a.focus").text());
                    item.attr("data-href", item.next().children("li.focus").children("a.focus").attr("href"));
                    window.location.href = item.next().children("li.focus").children("a.focus").attr("href");
                }
                else {
                    item.val(item.next().children("li.focus").text());
                    item.attr("data-href", item.next().children("li.focus").attr("data-href"));
                }
                return false;
            }

            if (keyCode == 27) {
                item.next().css("display", "none");
                return false;
            }

            if (keyCode == 38) {
                FocusSearchResultItem(item.next(), "prev");
                return false;
            }

            if (keyCode == 40) {
                FocusSearchResultItem(item.next(), "next");
                return false;
            }

            if (keyCode == 35) {
                FocusSearchResultItem(item.next(), "end");
                return false;
            }

            if (keyCode == 36) {
                FocusSearchResultItem(item.next(), "home");
                return false;
            }

            if (opt.listmethod != "") {
                if (SearchWord != undefined && SearchWord.length >= opt.minlength) {
                    item.next().html("");
                    $.ajax({
                        type: "POST",
                        url: opt.listmethod,
                        data: "{ SearchWord: '" + SearchWord + "' }",
                        dataType: "json",
                        contentType: "application/json; charset=utf-8",
                        success: function (answer) {
                            var returnData;

                            if (answer.d == undefined) {
                                returnData = answer;
                            }
                            else {
                                returnData = answer.d;
                            }

                            if (returnData.length > 0 && jQuery.type(returnData) == "string") {
                                item.next().css("display", "");

                                $(returnData).each(function (crap, text) {
                                    item.next().css("display", "block");

                                    var link = "";

                                    if (opt.linktext.indexOf('#') > -1) {
                                        link = opt.linkroot + opt.linktext.replace("#", CreateLink(text));
                                    }
                                    else {
                                        link = opt.linkroot + CreateLink(text);
                                    }

                                    if (opt.redirect == true) {
                                        item.next().append("<li><a href=\"" + link + "\" title=\"" + text + "\">" + text + "</a></li>");
                                    }
                                    else {
                                        item.next().append("<li data-href=\"" + link + "\">" + text + "</li>");
                                    }
                                });

                                item.next().children("li").click(function (event) {
                                    item.val($(this).text());
                                    item.attr("data-href", $(this).attr("data-href"));
                                });
                            }
                            else if (jQuery.type(returnData) == "array" || jQuery.type(returnData) == "object") {
                                item.next().css("display", "");

                                $.each(Object.keys(returnData), function (index, text) {
                                    var url = JSON.parse(JSON.stringify(returnData[text]));

                                    item.next().css("display", "block");

                                    var link = "";

                                    if (jQuery.type(url) == "string") {

                                        if (opt.linktext.indexOf('#') > -1) {
                                            link = opt.linkroot + opt.linktext.replace("#", CreateLink(url));
                                        }
                                        else {
                                            link = opt.linkroot + CreateLink(url);
                                        }

                                        if (jQuery.type(returnData) == "object") {
                                            if (opt.redirect == true) {
                                                item.next().append("<li><a href=\"" + link + "\" title=\"" + text + "\">" + text + "</a></li>");
                                            }
                                            else {
                                                item.next().append("<li data-href=\"" + link + "\">" + text + "</li>");
                                            }
                                        }
                                        else {
                                            if (opt.redirect == true) {
                                                item.next().append("<li><a href=\"" + link + "\" title=\"" + url + "\">" + url + "</a></li>");
                                            }
                                            else {
                                                item.next().append("<li data-href=\"" + link + "\">" + url + "</li>");
                                            }
                                        }
                                    }
                                    else if (jQuery.type(url) == "array" || jQuery.type(url) == "object") {
                                        if (opt.linktext.indexOf('#') > -1) {
                                            link = opt.linkroot + opt.linktext.replace("#", CreateLink(url[Object.keys(url)[1]]));
                                        }
                                        else {
                                            link = opt.linkroot + CreateLink(url[Object.keys(url)[0]]);
                                        }

                                        if (opt.redirect == true) {
                                            item.next().append("<li><a href=\"" + link + "\" title=\"" + url[Object.keys(url)[0]] + "\">" + url[Object.keys(url)[0]] + "<img src=\"" + url[Object.keys(url)[2]] + "\"/></a></li>");
                                        }
                                        else {
                                            item.next().append("<li data-href=\"" + link + "\">" + url[Object.keys(url)[0]] + "<img src=\"" + url[Object.keys(url)[2]] + "\"/></li>");
                                        }
                                    }
                                });

                                item.next().children("li").click(function (event) {
                                    item.val($(this).text());
                                    item.attr("data-href", $(this).attr("data-href"));
                                });
                            }
                            else {
                                item.next().html("");
                                item.next().css("display", "none");
                            }
                        }
                    });
                }
                else {
                    item.next().html("");
                    item.next().css("display", "none");
                }
            }
            else {
                alert("Lütfen listeleme metodunu (listmethod) belirtin.");
            }
        }

        function CreateLink(_text) {
            _text = _text.replace(/&amp;/g, "");
            _text = _text.replace(/&#304;/g, "İ");
            _text = _text.replace(/&#305;/g, "ı");
            _text = _text.replace(/&#214;/g, "Ö");
            _text = _text.replace(/&#246;/g, "ö");
            _text = _text.replace(/&#220;/g, "Ü");
            _text = _text.replace(/&#252;/g, "ü");
            _text = _text.replace(/&#199;/g, "Ç");
            _text = _text.replace(/&#231;/g, "ç");
            _text = _text.replace(/&#286;/g, "Ğ");
            _text = _text.replace(/&#287;/g, "ğ");
            _text = _text.replace(/&#350;/g, "Ş");
            _text = _text.replace(/&#351;/g, "ş");
            _text = _text.replace(/%c4%9e/g, "Ğ");
            _text = _text.replace(/%c4%9f/g, "ğ");
            _text = _text.replace(/%c3%9c/g, "Ü");
            _text = _text.replace(/%c3%bc/g, "ü");
            _text = _text.replace(/%c5%9e/g, "Ş");
            _text = _text.replace(/%c5%9f/g, "ş");
            _text = _text.replace(/%c4%b0/g, "İ");
            _text = _text.replace(/%c4%b1/g, "ı");
            _text = _text.replace(/%c3%96/g, "Ö");
            _text = _text.replace(/%c3%b6/g, "ö");
            _text = _text.replace(/%c3%87/g, "Ç");
            _text = _text.replace(/%c3%a7/g, "ç");
            _text = _text.replace(/ /g, "-");
            _text = _text.replace(/\?/g, "-");
            _text = _text.replace(/%/g, "-");
            _text = _text.replace(/½/g, "-");
            _text = _text.replace(/\$/g, "-");
            _text = _text.replace(/#/g, "-");
            _text = _text.replace(/£/g, "-");
            _text = _text.replace(/!/g, "-");
            _text = _text.replace(/\^/g, "-");
            _text = _text.replace(/'/g, "-");
            _text = _text.replace(/&/g, "-");
            _text = _text.replace(/\*/g, "-");
            _text = _text.replace(/\\/g, "-");
            _text = _text.replace(/\[/g, "-");
            _text = _text.replace(/]/g, "-");
            _text = _text.replace(/{/g, "-");
            _text = _text.replace(/}/g, "-");
            _text = _text.replace(/\+/g, "-");
            _text = _text.replace(/é/g, "-");
            _text = _text.replace(/"/g, "-");
            _text = _text.replace(/,/g, "-");
            _text = _text.replace(/\./g, "-");
            _text = _text.replace(/~/g, "-");
            _text = _text.replace(/;/g, "-");
            _text = _text.replace(/:/g, "-");
            _text = _text.replace(/</g, "-");
            _text = _text.replace(/>/g, "-");
            _text = _text.replace(/\|/g, "-");
            _text = _text.replace(/@/g, "-");
            _text = _text.replace(/æ/g, "-");
            _text = _text.replace(/ß/g, "-");
            _text = _text.replace(/¨/g, "-");

            _text = _text.replace(/Ğ/g, "G");
            _text = _text.replace(/ğ/g, "g");
            _text = _text.replace(/Ü/g, "U");
            _text = _text.replace(/ü/g, "u");
            _text = _text.replace(/Ş/g, "S");
            _text = _text.replace(/ş/g, "s");
            _text = _text.replace(/İ/g, "I");
            _text = _text.replace(/ı/g, "i");
            _text = _text.replace(/Ö/g, "O");
            _text = _text.replace(/ö/g, "o");
            _text = _text.replace(/Ç/g, "C");
            _text = _text.replace(/ç/g, "c");
            _text = _text.replace(/â/g, "a");
            _text = _text.replace(/Â/g, "a");

            return _text.toLowerCase();
        }

        function FocusSearchResultItem(resultlist, direction) {
            var lineheight = resultlist.children("li").height();
            var index = resultlist.children("li.focus").index();

            resultlist.children("li").removeClass("focus");
            resultlist.children("li").children("a").removeClass("focus");

            if (direction == "home") {
                resultlist.children("li").eq(0).addClass("focus");
                resultlist.children("li").eq(0).children("a").addClass("focus");
                resultlist.scrollTop(0);
                return false;
            }
            else if (direction == "end") {
                resultlist.children("li").eq($("#tdCompleter li").length - 1).addClass("focus");
                resultlist.children("li").eq($("#tdCompleter li").length - 1).children("a").addClass("focus");
                resultlist.scrollTop((resultlist.children("li").length - 1) * lineheight);
                return false;
            }

            if (index > 0 && index != $("#tdCompleter li").length - 1) {
                if (direction == "prev") {
                    resultlist.children("li").eq(index - 1).addClass("focus");
                    resultlist.children("li").eq(index - 1).children("a").addClass("focus");
                    resultlist.scrollTop((index * lineheight) - lineheight);
                }
                else if (direction == "next") {
                    resultlist.children("li").eq(index + 1).addClass("focus");
                    resultlist.children("li").eq(index + 1).children("a").addClass("focus");
                    resultlist.scrollTop((index * lineheight) + lineheight);
                }
            }
            else if (index == 0) {
                if (direction == "prev") {
                    resultlist.children("li").eq(resultlist.children("li").length - 1).addClass("focus");
                    resultlist.children("li").eq(resultlist.children("li").length - 1).children("a").addClass("focus");
                    resultlist.scrollTop((resultlist.children("li").length - 1) * lineheight);
                }
                else if (direction == "next") {
                    resultlist.children("li").eq(index + 1).addClass("focus");
                    resultlist.children("li").eq(index + 1).children("a").addClass("focus");
                    resultlist.scrollTop((index * lineheight) + lineheight);
                }
            }
            else if (index == $("#tdCompleter li").length - 1) {
                if (direction == "prev") {
                    resultlist.children("li").eq(index - 1).addClass("focus");
                    resultlist.children("li").eq(index - 1).children("a").addClass("focus");
                    resultlist.scrollTop((index * lineheight) - lineheight);
                }
                else if (direction == "next") {
                    resultlist.children("li").eq(0).addClass("focus");
                    resultlist.children("li").eq(0).children("a").addClass("focus");
                    resultlist.scrollTop(0);
                }
            }
            else {
                if (direction == "prev") {
                    resultlist.children("li").eq(resultlist.children("li").length - 1).addClass("focus");
                    resultlist.children("li").eq(resultlist.children("li").length - 1).children("a").addClass("focus");
                    resultlist.scrollTop((resultlist.children("li").length - 1) * lineheight);
                }
                else if (direction == "next") {
                    resultlist.children("li").eq(0).addClass("focus");
                    resultlist.children("li").eq(0).children("a").addClass("focus");
                    resultlist.scrollTop(0);
                }
            }
        }

        if (!Object.keys) {
            Object.keys = (function () {
                'use strict';
                var hasOwnProperty = Object.prototype.hasOwnProperty,
                    hasDontEnumBug = !({ toString: null }).propertyIsEnumerable('toString'),
                    dontEnums = [
                      'toString',
                      'toLocaleString',
                      'valueOf',
                      'hasOwnProperty',
                      'isPrototypeOf',
                      'propertyIsEnumerable',
                      'constructor'
                    ],
                    dontEnumsLength = dontEnums.length;

                return function (obj) {
                    if (typeof obj !== 'object' && (typeof obj !== 'function' || obj === null)) {
                        throw new TypeError('Object.keys called on non-object');
                    }

                    var result = [], prop, i;

                    for (prop in obj) {
                        if (hasOwnProperty.call(obj, prop)) {
                            result.push(prop);
                        }
                    }

                    if (hasDontEnumBug) {
                        for (i = 0; i < dontEnumsLength; i++) {
                            if (hasOwnProperty.call(obj, dontEnums[i])) {
                                result.push(dontEnums[i]);
                            }
                        }
                    }
                    return result;
                };
            }());
        }
    }

    $.fn.tdCompleter = function (completerOptions) {
        return new CreateAutoCompleter(this, completerOptions);
    };
})(jQuery);