import { Injectable } from "@angular/core";
import { SiteService } from '../services/site';

@Injectable({ providedIn: 'root' })
export class Lib {
    static errorMsg: string;

    static ComboYears(id: string, minYear: number = 1900, maxYear: number = 2019) {
        for (var i = minYear; i <= maxYear; i++) {
            $("#" + id).append("<option value=\"" + i.toString() + "\">" + i.toString() + "</option>");
        }
    }
}
