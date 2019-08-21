import { Component } from '@angular/core';
import { SiteService } from '../../../services/site';

@Component({
    selector: 'rac-header',
    templateUrl: './header.html'
})

export class HeaderComponent {
    paneladdress: string = "http://localhost/RentACar/Admin";
    errorMsg: string;

    selectedFlag: string;
    selectedLang: string;

    panelLogin: string;
    lang: string;
    autoService: string;
    toggleNav: string;
    phone: string;
    menu: any;

    address: string;

    LangList: {};

    constructor(private service: SiteService) {
    }

    ngOnInit() {
        this.GetLangs();
        this.GetSelectedLang();
        this.GetLangContent();
        this.GetContent();
    }

    //Translation
    GetLangs() {
        this.service.get("Site", "GetLangs").subscribe((resData: any) => {
            this.LangList = resData;
        }, resError => this.errorMsg = resError);
    }
    GetSelectedLang() {
        this.service.get("Site", "SelectedLang").subscribe((resData: any) => {
            if (resData != null) {
                this.selectedFlag = resData.Flag;
                this.selectedLang = resData.ShortName;
            }
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

        this.service.get("Site", "GetLangContentByCode", "hdr_oks", 1).subscribe((resData: any) => {
            this.autoService = resData.ShortDescription;
        }, resError => this.errorMsg = resError);

        this.service.get("Site", "GetLangContentByCode", "hdr_tgln", 1).subscribe((resData: any) => {
            this.toggleNav = resData.ShortDescription;
        }, resError => this.errorMsg = resError);

        this.service.get("Site", "GetNoLangContentByCode", "cmn_tel", 1).subscribe((resData: any) => {
            this.phone = resData.ShortDescription;
        }, resError => this.errorMsg = resError);

        this.service.get("Site", "GetLangContentByCode", "hdr_menu").subscribe((resData: any) => {
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

    //Content
    GetContent() {
        this.service.get("Site", "GetContentByCode", "cmn_adrs_up", 1).subscribe((resData: any) => {
            this.address = resData.ShortText1;
        }, resError => this.errorMsg = resError);
    }
}
