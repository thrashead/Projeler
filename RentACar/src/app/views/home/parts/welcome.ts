import { Component } from '@angular/core';
import { SiteService } from '../../../services/site';

@Component({
    selector: 'rac-homewelcome',
    templateUrl: './welcome.html'
})

export class HomeWelcomeComponent {
    errorMsg: string;

    loans: string;
    trade: string;
    guide: string;
    support: string;

    welcome: any;

    constructor(private service: SiteService) {
    }

    ngOnInit() {
        this.GetLangContent();
        this.GetContent();
    }

    //LangContent
    GetLangContent() {
        this.service.get("Site", "GetLangContentByCode", "home_wlcm_loans", 1).subscribe((resData: any) => {
            this.loans = resData.ShortDescription;
        }, resError => this.errorMsg = resError);

        this.service.get("Site", "GetLangContentByCode", "home_wlcm_trade", 1).subscribe((resData: any) => {
            this.trade = resData.ShortDescription;
        }, resError => this.errorMsg = resError);

        this.service.get("Site", "GetLangContentByCode", "home_wlcm_guide", 1).subscribe((resData: any) => {
            this.guide = resData.ShortDescription;
        }, resError => this.errorMsg = resError);

        this.service.get("Site", "GetLangContentByCode", "home_wlcm_support", 1).subscribe((resData: any) => {
            this.support = resData.ShortDescription;
        }, resError => this.errorMsg = resError);
    }

    //Content
    GetContent() {
        this.service.get("Site", "GetContentByCode", "home_welcome", 1).subscribe((resData: any) => {
            this.welcome = resData;
        }, resError => this.errorMsg = resError);
    }
}
