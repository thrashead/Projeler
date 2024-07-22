import { Injectable } from "@angular/core";
import ClassicEditor from "../../../Content/admin/js/ckeditor/ckeditor.js";
import * as moment from 'moment';

@Injectable({ providedIn: 'root' })
export class AdminLib {
    static UploadFileName(filename: string, guidCount: number = 5) {
        let x: string = "";
        let ext: string = filename.split('.').pop();
        let name: string = filename.replace("." + ext, "");
        let guid: string;

        for (var i = 0; i < guidCount; i++) {
            x += "x";
        }

        guid = x.replace(/[x]/g, function (c) {
            var r = Math.random() * 16 | 0,
                v = c == 'x' ? r : (r & 0x3 | 0x8);
            return v.toString(16);
        });

        return name + "-" + guid + "." + ext;
    }

    static CKValue(id: string) {
        if ($(".ck-content[data-id='" + id + "']").html() == null)
            return "";
        else
            return $(".ck-content[data-id='" + id + "']").html().replace("<p>", "").replace("</p>", "");
    }

    static ConvertToCKEditor(id: string, time: number = 1000) {
        setTimeout(function () {
            ClassicEditor
                .create(document.querySelector("#" + id), {
                })
                .then(editor => {
                    console.log(editor);
                });
        }, time);
    }

    static ParseFloat(value: string): any {
        var returnValue;

        if (value == null || value == undefined) {
            returnValue = null;
        }
        else if (value.toString().indexOf(',') > 0) {
            returnValue = parseFloat(value.toString().replace(",", "."));
        }
        else {
            returnValue = parseFloat(value);
        }

        return returnValue;
    }

    static ParseDateTime(date: string) {
        let momentValue = moment(date, "DD.MM.YYYY HH:mm");
        let returValue: string = momentValue.format("DD.MM.YYYY HH:mm") + ":00";

        if (!momentValue.isValid())
            return null;
        else
            return returValue;
    }

    static CheckDateTimeInterval(startDate: string, endDate: string) {
        let momentNow = moment(moment(new Date(Date.now()), "DD.MM.YYYY").add(1, "days").format("DD.MM.YYYY") + " 00:00:00", "DD.MM.YYYY HH:mm");
        let momentStart = moment(startDate, "DD.MM.YYYY HH:mm");
        let momentEnd = moment(endDate, "DD.MM.YYYY HH:mm");

        let diff = momentEnd.diff(momentStart, 'minutes');;

        if (momentStart >= momentNow && momentEnd > momentStart && diff >= 360)
            return true;
        else
            return false;
    }

    static UserRight(userRights: any, model: string, shortname: string = "s"): boolean {
        let returnItem: boolean = false;

        userRights.forEach((item, i) => {
            if (item.Url == model) {
                if (item.ShortName == shortname) {
                    returnItem = true;
                }
            }
        });

        return returnItem;
    }

    static ShowType(showTypes: any, model: string): boolean {
        let returnItem: boolean = false;

        showTypes.forEach((item, i) => {
            if (item.Url == model) {
                returnItem = true;
            }
        });
        return returnItem;
    }

    static LinkActivation() {
        setTimeout(function () {
            $("#hdnUrl").val(location.href);

            var AdminPath = "http://localhost/RentACar/Admin";
            var Url = location.href;
            var Urling = Object();

            if (Url != undefined) {
                var tempurl = Url.replace(AdminPath + "/", "");
                var extParams = tempurl.split('?')[1];

                tempurl = tempurl.replace("?" + extParams, "");

                Urling.path = tempurl;
                Urling.controller = tempurl.split('/')[0];
                Urling.action = tempurl.split('/')[1];
                Urling.parameter = tempurl.split('/')[2];

                if (extParams != undefined)
                    Urling.parameters = extParams.split('&');
            }

            if (Urling.controller != undefined) {
                var activeLi = $("#sidebar li[data-url='" + Urling.controller + "']");
                var passiveSubmenuLi = $("#sidebar li.submenu");
                var submenuLi = activeLi.parent("ul").parent("li");

                $("#sidebar li").removeClass("active");
                $("#sidebar li").removeClass("open");

                activeLi.addClass("active");

                if (submenuLi.hasClass("submenu")) {
                    if ($("body").width() > 970 || $("body").width() <= 480) {
                        submenuLi.addClass("open");
                    }
                    submenuLi.addClass("active");
                }

                passiveSubmenuLi.each(function () {
                    if (!$(this).hasClass("open")) {
                        $(this).children("ul").slideUp();
                    }
                    else {
                        $(this).children("ul").slideDown();
                    }
                });
            }
        }, 100);
    }
}