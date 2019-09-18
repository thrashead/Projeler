import { Component } from '@angular/core';
import { SiteService } from '../../../services/site';

@Component({
    selector: 're-header',
    templateUrl: './header.html'
})

export class HeaderComponent {
    paneladdress: string = "http://localhost/RealEstate/Admin";
    errorMsg: string;


    flag: any = {};
    title:  any = {};
    lang: string;
    panelLogin: string;
    toggleNav: string;
    phone: string;
    menu: any;

    address: string;

    LangList: any;

    constructor(private service: SiteService) {
    }

    ngOnInit() {
        this.GetLangs();
        this.GetLangContent();
    }

    //Translation
    GetLangs() {
        this.service.get("Site", "GetLangs").subscribe((resData: any) => {
            this.LangList = resData;

            this.service.get("Site", "SelectedLang").subscribe((resData: any) => {
                this.flag = resData;
            }, resError => this.errorMsg = resError);
        }, resError => this.errorMsg = resError);
    }

    OnLangSelect(id) {
        this.service.get("Site", "SelectLang", id).subscribe((resData: any) => {
            if (resData == true) {
                window.location.reload();
            }
        }, resError => this.errorMsg = resError);
    }

    //LangContent
    GetLangContent() {
        this.service.get("Site", "GetLangContentByCode", "hdr_pnl", 1).subscribe((resData: any) => {
            this.panelLogin = resData.ShortDescription;
        }, resError => this.errorMsg = resError);

        this.service.get("Site", "GetLangContentByCode", "hdr_lng", 1).subscribe((resData: any) => {
            this.lang = resData.ShortDescription;
        }, resError => this.errorMsg = resError);

        this.service.get("Site", "GetLangContentByCode", "hdr_reserv", 1).subscribe((resData: any) => {
            this.title = resData;
        }, resError => this.errorMsg = resError);

        this.service.get("Site", "GetLangContentByCode", "hdr_tgln", 1).subscribe((resData: any) => {
            this.toggleNav = resData.ShortDescription;
        }, resError => this.errorMsg = resError);

        this.service.get("Site", "GetLangContentByCodeAndShortCode", "cntct_form", "adres", 1).subscribe((resData: any) => {
            this.address = resData.Description;
        }, resError => this.errorMsg = resError);

        this.service.get("Site", "GetLangContentByCodeAndShortCode", "cntct_form", "phone", 1).subscribe((resData: any) => {
            this.phone = resData.Description;
        }, resError => this.errorMsg = resError);

        this.service.get("Site", "GetLangContentByCode", "menu").subscribe((resData: any) => {
            this.menu = new Object();

            resData.forEach((item, index) => {
                switch (item.ShortCode) {
                    case "home":
                        this.menu.Home = item.ShortDescription;
                        break;
                    case "list":
                        this.menu.List = item.ShortDescription;
                        break;
                    case "compr":
                        this.menu.Compare = item.ShortDescription;
                        break;
                    case "about":
                        this.menu.About = item.ShortDescription;
                        break;
                    case "blog":
                        this.menu.Blog = item.ShortDescription;
                        break;
                    case "cntct":
                        this.menu.Contact = item.ShortDescription;
                        break;
                }
            });
        }, resError => this.errorMsg = resError);
    }
}
