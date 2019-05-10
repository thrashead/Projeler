/* tdMenu - Developed by Sina SALIK (2004 - 2016) */

(function ($) {
    var CreateMenu = function (Item, MenuOptions) {
        var Option = MenuOptions != undefined ? MenuOptions : {
            listmethod: "",
            width: 120,
            height: "auto",
            topmenuid: 0,
            showtopmenubutton: true,
            topmenubuttontext: "Ana Menü",
            showbackbutton: true,
            backbuttontext: "Geri",
            submenutext: "+",
            loadingimage: "",
            guid: guid()
        }

        checkOptionValues(Option);

        if (Option.listmethod == undefined || Option.listmethod == "") {
            return false;
        }

        createMenu(Item, Option);

        function guid() {
            return Math.floor((1 + Math.random()) * 0x10000).toString(16).substring(1);
        }

        function checkOptionValues(option) {
            option.listmethod = option.listmethod == undefined ? "" : option.listmethod;
            option.width = option.width == undefined ? 120 : option.width;
            option.height = option.height == undefined ? "auto" : option.height;
            option.topmenuid = option.topmenuid == undefined ? 0 : option.topmenuid;
            option.showtopmenubutton = option.showtopmenubutton == undefined ? true : option.showtopmenubutton;
            option.topmenubuttontext = option.topmenubuttontext == undefined ? "Ana Menü" : option.topmenubuttontext;
            option.showbackbutton = option.showbackbutton == undefined ? true : option.showbackbutton;
            option.backbuttontext = option.backbuttontext == undefined ? "Geri" : option.backbuttontext;
            option.submenutext = option.submenutext == undefined ? "+" : option.submenutext;
            option.loadingimage = option.loadingimage == undefined ? "" : option.loadingimage;
            option.guid = option.guid == undefined ? guid() : option.guid;
        }

        function createMenu(ssItem, option) {
            ssItem.addClass("tdMenu");
            ssItem.wrap("<div class=\"tdMenuFrame\"></div>");

            $(".tdMenuFrame .tdMenu").width(option.width);
            $(".tdMenuFrame .tdMenu").height(option.height);

            $(".tdMenu").after("<input type=\"hidden\" id=\"hdnCMID" + option.guid + "\" value=\"" + option.topmenuid + "\" />");

            FillMenu(ssItem, option, null);

            $(function () {
                $(document).on("click", ".tdMenuFrame .tdMenu li a.submenu", function () {
                    $("#hdnCMID" + option.guid).val($("#hdnCMID" + option.guid).val() + ',' + $(this).attr("data-id"));

                    FillMenu(Item, option, $(this));
                });

                $(document).on("click", ".tdMenuFrame .tdMenu li a.topmenubutton", function () {
                    $("#hdnCMID" + option.guid).val(option.topmenuid);
                    FillMenu(Item, option, $(this));
                    //$(".tdMenuFrame .tdMenu li").first().remove();
                });

                $(document).on("click", ".tdMenuFrame .tdMenu li a.backbutton", function () {
                    $("#hdnCMID" + option.guid).val($("#hdnCMID" + option.guid).val().slice(0, $("#hdnCMID" + option.guid).val().lastIndexOf(',')));

                    $(this).attr("data-id", $("#hdnCMID" + option.guid).val().split(',')[$("#hdnCMID" + option.guid).val().split(',').length - 1]);
                    FillMenu(Item, option, $(this));

                    //if ($("#hdnCMID" + option.guid).val() == option.topmenuid) {
                    //    $(".tdMenuFrame .tdMenu li").first().remove();
                    //}
                });
            });
        }

        function FillMenu(item, opt, sender) {
            var menuID = sender == null ? opt.topmenuid : parseInt(sender.attr("data-id"));

            var oldcontent = item.html();

            if (opt.loadingimage != undefined || opt.loadingimage != "") {
                item.html("<img id=\"loading\" src=\"" + opt.loadingimage + "\" />");
            }

            if (opt.listmethod != "") {
                $.ajax({
                    type: "POST",
                    url: opt.listmethod,
                    data: "{ MenuID: '" + menuID + "' }",
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

                        if (jQuery.type(returnData) == "array" || jQuery.type(returnData) == "object") {

                            if (Object.keys(returnData).length > 0) {
                                item.html("");

                                if (opt.showtopmenubutton == true && $("#hdnCMID" + opt.guid).val() != opt.topmenuid.toString()) {
                                    item.append("<li><a class=\"topmenubutton\" data-id=\"" + opt.topmenuid + "\">" + opt.topmenubuttontext + "</a></li>");
                                    item.append("<hr />");
                                }

                                $.each(Object.keys(returnData), function (index, text) {
                                    var Value; 
                                    var Value2;
                                    var Value3;
                                    var url = JSON.parse(JSON.stringify(returnData[text]));

                                    if (jQuery.type(url) == "array" || jQuery.type(url) == "object") {
                                        Value = url[Object.keys(url)[0]];
                                        Value2 = url[Object.keys(url)[1]];
                                        Value3 = url[Object.keys(url)[2]];
                                    }
                                    else {
                                        Value = url.split(',')[0];
                                        Value2 = url.split(',')[1];
                                        Value3 = url.split(',')[2];
                                    }

                                    if (Value3 != "" && Value3 != undefined) {
                                        item.append("<li><a class=\"link\" href=\"" + Value3 + "\">" + Value2 + "</a> <a class=\"submenu plus\" data-id=\"" + Value + "\">" + opt.submenutext + "</a></li>");
                                    }
                                    else {
                                        item.append("<li><a class=\"link\" onclick=\"javascript:;\">" + Value2 + "</a> <a class=\"submenu plus\" data-id=\"" + Value + "\">" + opt.submenutext + "</a></li>");
                                    }
                                });

                                if (opt.showbackbutton == true) {
                                    if ($("#hdnCMID" + opt.guid).val() != opt.topmenuid) {
                                        item.append("<hr />");
                                        item.append("<li><a class=\"backbutton\" data-id=\"" + $("#hdnCMID" + opt.guid).val().split(',')[$("#hdnCMID" + opt.guid).val().split(',').length - 1] + "\">" + opt.backbuttontext + "</a></li>");
                                    }
                                }
                            }
                            else {
                                item.html(oldcontent);
                                $(".tdMenuFrame .tdMenu li a[data-id='" + sender.attr("data-id") + "']").hide();
                                $("#hdnCMID" + opt.guid).val($("#hdnCMID" + opt.guid).val().slice(0, $("#hdnCMID" + opt.guid).val().lastIndexOf(',')));
                            }
                        }
                        else {
                            item.html(oldcontent);
                        }
                    }
                });
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

    $.fn.tdMenu = function (menuOptions) {
        return new CreateMenu(this, menuOptions);
    };
})(jQuery);