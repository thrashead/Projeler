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

    menu: any;
    contact: any;
    openhours: any;
    about: any;

    constructor(private service: SiteService) {
    }

    ngOnInit() {
        this.GetLangContent();
        this.GetContent();
    }

    //LangContent
    GetLangContent() {
        this.service.get("Site", "GetLangContentByCode", "cmn_lst_auto_up", 1).subscribe((resData: any) => {
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

        this.service.get("Site", "GetLangContentByCode", "cmn_readmore_up", 1).subscribe((resData: any) => {
            this.readmore = resData.ShortDescription;
        }, resError => this.errorMsg = resError);

        this.service.get("Site", "GetLangContentByCode", "ftr_menu").subscribe((resData: any) => {
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
        this.service.get("Site", "GetContentByCode", "ftr_opnhrs", 1).subscribe((resData: any) => {
            this.openhours = resData;
        }, resError => this.errorMsg = resError);

        this.service.get("Site", "GetContentByCode", "ftr_contct", 1).subscribe((resData: any) => {
            this.contact = resData;
        }, resError => this.errorMsg = resError);

        this.service.get("Site", "GetContentByCode", "ftr_about", 1).subscribe((resData: any) => {
            this.about = resData;
        }, resError => this.errorMsg = resError);
    }
}
