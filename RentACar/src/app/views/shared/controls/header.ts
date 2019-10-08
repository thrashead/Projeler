import { Component } from '@angular/core';
import { SiteService } from '../../../services/site';
import { LangItem } from '../../../models/LangItem';
import { Lib } from '../../../lib/methods';

@Component({
    selector: 'rac-header',
    templateUrl: './header.html'
})

export class HeaderComponent {
    paneladdress: string = "http://localhost/RentACar/Admin";
    errorMsg: string;


    flag: any = {};
    phone: string;
    menu: any;

    address: string;

    LangList: any;

    constructor(private service: SiteService) {
    }

    ngOnInit() {
        this.GetLangs();
        this.SetLangContents();
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

    //LangContents
    langItems: Array<LangItem>;
    langItem: LangItem;
    langs: any;

    //LangContent
    SetLangContents() {
        this.PushLangItems();

        this.service.post("Site", "SetLangContents", this.langItems).subscribe((resData: any) => {
            this.langs = new Object();

            resData.forEach((item, i) => {
                switch (item.Code) {
                    case "hdr_pnl": this.langs.panelLogin = item.ShortDescription; break;
                    case "hdr_lng": this.langs.lang = item.ShortDescription; break;
                    case "hdr_oks": this.langs.autoService = item.ShortDescription; break;
                    case "hdr_tgln": this.langs.toggleNav = item.ShortDescription; break;
                }
            });
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

    PushLangItems() {
        this.langItems = new Array<LangItem>();

        this.langItems.push(Lib.SetLangItem(this.langItem, "hdr_pnl"));
        this.langItems.push(Lib.SetLangItem(this.langItem, "hdr_lng"));
        this.langItems.push(Lib.SetLangItem(this.langItem, "hdr_oks"));
        this.langItems.push(Lib.SetLangItem(this.langItem, "hdr_tgln"));
    }
}
