﻿import { Component } from '@angular/core';
import { SiteService } from '../../../services/site';

@Component({
    selector: 're-homewelcome',
    templateUrl: './welcome.html'
})

export class HomeWelcomeComponent {
    errorMsg: string;

    loans: string;
    services: string;
    guide: string;
    support: string;
    welcomebanner: string;

    welcome: any;

    constructor(private service: SiteService) {
    }

    ngOnInit() {
        this.GetLangContent();
        this.GetContent();
        this.GetPicture();
    }

    //LangContent
    GetLangContent() {
        this.service.get("Site", "GetLangContentByCode", "home_wlcm_loans", 1).subscribe((resData: any) => {
            this.loans = resData.ShortDescription;
        }, resError => this.errorMsg = resError);

        this.service.get("Site", "GetLangContentByCode", "home_wlcm_service", 1).subscribe((resData: any) => {
            this.services = resData.ShortDescription;
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

    //Picture
    GetPicture() {
        this.service.get("Site", "GetPicturesByCode", "home_welcome", 1).subscribe((resData: any) => {
            this.welcomebanner = resData;
        }, resError => this.errorMsg = resError);
    }
}