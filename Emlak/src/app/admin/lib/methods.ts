import { Injectable } from "@angular/core";
import ClassicEditor from "../../../../Content/admin/js/ckeditor/ckeditor.js";

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
}
