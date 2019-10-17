import { Injectable } from "@angular/core";
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
        let momentValue = moment(date, "DD.MM.YYYY");
        let returValue: string = momentValue.format("DD.MM.YYYY");

        if (!momentValue.isValid())
            return null;
        else
            return returValue;
    }

    static ApplyEndDate(startdate: string, time: number, timetype: number) {
        let start = moment(startdate, "DD.MM.YYYY");
        let end;

        switch (timetype) {
            case 1: end = start.add(time, 'days'); break;
            case 2: end = start.add(time, 'weeks'); break;
            case 3: end = start.add(time, 'months'); break;
            case 4: end = start.add(time, 'years'); break;
            default: end = start.add(time, 'days'); break;
        }

        let returValue: string = end.format("DD.MM.YYYY");

        if (!end.isValid())
            return null;
        else
            return returValue;
    }

    static CheckDateTimeInterval(startDate: string) {
        let momentNow = moment(new Date(Date.now()), "DD.MM.YYYY");
        let momentStart = moment(startDate, "DD.MM.YYYY");

        if (momentStart >= momentNow)
            return true;
        else
            return false;
    }
}
