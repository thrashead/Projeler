import { Injectable } from "@angular/core";
import { Router } from '@angular/router';
import { LangItem } from '../models/LangItem';

@Injectable({ providedIn: 'root' })
export class Lib {
    static errorMsg: string;

    static RefreshRoute(router: Router, changeUrl: string = "/", skipChangeLocation: boolean = true) {
        let currentUrl = router.url;
        router.navigate([changeUrl], { skipLocationChange: skipChangeLocation }).then(() => { router.navigate([currentUrl]) });
    }

    static SetLangItem(langItem: LangItem, code: string = null, shortCode: string = null) {
        langItem = new Object() as LangItem;
        langItem.Code = code;
        langItem.ShortCode = shortCode;

        return langItem;
    }

    static ComboChange(id: string) {
        var select = $("#" + id);
        var selectUL = $("#" + id).next(".chosen-container").find(".chosen-results");


        select.next(".chosen-container").children("a.chosen-single").off("click").on("click", function () {
            selectUL.children("li").off("click").on("click", function () {
                var index = parseInt($(this).attr("data-option-array-index"));
                select.children("option").removeAttr("selected");
                select.children("option").eq(index).attr("selected", "selected");
            });
        });
    }
}
