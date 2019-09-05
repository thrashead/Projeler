﻿import { Component } from '@angular/core';
import { SiteService } from '../../../services/site';

@Component({
    selector: 'rac-homeasks',
    templateUrl: './asks.html'
})

export class HomeAsksComponent {
    errorMsg: string;

    callus: string;
    phone: string;

    search: any;
    compare: any;

    constructor(private service: SiteService) {
    }

    ngOnInit() {
        this.GetLangContent();
        this.GetNoLangContent();
    }

    //LangContent
    GetLangContent() {
        this.service.get("Site", "GetLangContentByCode", "home_asks_search", 1).subscribe((resData: any) => {
            this.search = resData;
        }, resError => this.errorMsg = resError);

        this.service.get("Site", "GetLangContentByCode", "home_asks_compare", 1).subscribe((resData: any) => {
            this.compare = resData;
        }, resError => this.errorMsg = resError);

        this.service.get("Site", "GetLangContentByCode", "cmn_callus_up", 1).subscribe((resData: any) => {
            this.callus = resData.ShortDescription;
        }, resError => this.errorMsg = resError);
    }

    //NoLangContent
    GetNoLangContent() {
        this.service.get("Site", "GetNoLangContentByCode", "cmn_tel", 1).subscribe((resData: any) => {
            this.phone = resData.ShortDescription;
        }, resError => this.errorMsg = resError);
    }
}
