import { Injectable } from "@angular/core";
import { Router } from '@angular/router';
import { LangItem } from '../model/LangItem';

@Injectable({ providedIn: 'root' })
export class Lib {
    static errorMsg: string;

    static RefreshRoute(router: Router, changeUrl: string = "/", skipChangeLocation: boolean = true) {
        let currentUrl = router.url;
        router.navigate([changeUrl], { skipLocationChange: skipChangeLocation }).then(() => { router.navigate([currentUrl]) });
    }

    static SetLangItem(langItem: LangItem, code: string = null) {
        langItem = new Object() as LangItem;
        langItem.Code = code;

        return langItem;
    }
}
