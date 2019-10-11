﻿import { Injectable } from "@angular/core";
import { Router } from '@angular/router';
import { LangItem } from '../models/LangItem';
import * as moment from 'moment';

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

    static CheckNullAsAll(item: string) {
        if (item == "all")
            return null;
        else
            return parseInt(item);
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
}
