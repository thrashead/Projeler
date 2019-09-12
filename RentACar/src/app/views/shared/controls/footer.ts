import { Component } from '@angular/core';
import { SiteService } from '../../../services/site';

@Component({
    selector: 'rac-footer',
    templateUrl: './footer.html'
})

export class FooterComponent {
    errorMsg: string;

    latestautos: string;
    readmore: string;
    nohagg: string;
    dealer: string;
    sftychk: string;
    contactus: string;

    address: any;
    phone: any;
    mail: any;
    fax: any;
    menu: any;
    openhours: any;
    about: any;

    constructor(private service: SiteService) {
    }

    ngOnInit() {
        this.GetLangContent();
    }

    //LangContent
    GetLangContent() {
        this.service.get("Site", "GetLangContentByCode", "cmn_lst_auto", 1).subscribe((resData: any) => {
            this.latestautos = resData.ShortDescription;
        }, resError => this.errorMsg = resError);

        this.service.get("Site", "GetLangContentByCode", "ftr_feat_nohagg", 1).subscribe((resData: any) => {
            this.nohagg = resData.ShortDescription;
        }, resError => this.errorMsg = resError);

        this.service.get("Site", "GetLangContentByCode", "ftr_feat_dealer", 1).subscribe((resData: any) => {
            this.dealer = resData.ShortDescription;
        }, resError => this.errorMsg = resError);

        this.service.get("Site", "GetLangContentByCode", "ftr_feat_sftychk", 1).subscribe((resData: any) => {
            this.sftychk = resData.ShortDescription;
        }, resError => this.errorMsg = resError);

        this.service.get("Site", "GetLangContentByCode", "cmn_readmore", 1).subscribe((resData: any) => {
            this.readmore = resData.ShortDescription;
        }, resError => this.errorMsg = resError);

        this.service.get("Site", "GetLangContentByCode", "cmn_cntctus", 1).subscribe((resData: any) => {
            this.contactus = resData.ShortDescription;
        }, resError => this.errorMsg = resError);

        this.service.get("Site", "GetLangContentByCodeAndShortCode", "cntct_form", "adres", 1).subscribe((resData: any) => {
            this.address = resData.Description2;
        }, resError => this.errorMsg = resError);

        this.service.get("Site", "GetLangContentByCodeAndShortCode", "cntct_form", "phone", 1).subscribe((resData: any) => {
            this.phone = resData;
        }, resError => this.errorMsg = resError);

        this.service.get("Site", "GetLangContentByCodeAndShortCode", "cntct_form", "fax", 1).subscribe((resData: any) => {
            this.fax = resData;
        }, resError => this.errorMsg = resError);

        this.service.get("Site", "GetLangContentByCodeAndShortCode", "cntct_form", "mail", 1).subscribe((resData: any) => {
            this.mail = resData;
        }, resError => this.errorMsg = resError);

        this.service.get("Site", "GetLangContentByCode", "cntct_opnhrs", 1).subscribe((resData: any) => {
            this.openhours = resData;
        }, resError => this.errorMsg = resError);

        this.service.get("Site", "GetLangContentByCode", "ftr_about", 1).subscribe((resData: any) => {
            this.about = resData;
        }, resError => this.errorMsg = resError);

        this.service.get("Site", "GetLangContentByCode", "menu").subscribe((resData: any) => {
            this.menu = new Object();

            resData.forEach((item, i) => {
                switch (item.ShortCode) {
                    case "home":
                        this.menu.Home = item.ShortDescription2;
                        break;
                    case "list":
                        this.menu.List = item.ShortDescription2;
                        break;
                    case "compr":
                        this.menu.Compare = item.ShortDescription2;
                        break;
                    case "about":
                        this.menu.About = item.ShortDescription2;
                        break;
                    case "blog":
                        this.menu.Blog = item.ShortDescription2;
                        break;
                    case "cntct":
                        this.menu.Contact = item.ShortDescription2;
                        break;
                }
            });
        }, resError => this.errorMsg = resError);
    }
}
