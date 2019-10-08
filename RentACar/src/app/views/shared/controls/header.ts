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
            this.langs.menu = new Object();
            this.langs.contact = new Object();

            resData.forEach((item, i) => {
                switch (item.Code) {
                    case "hdr_pnl": this.langs.panelLogin = item.ShortDescription; break;
                    case "hdr_lng": this.langs.lang = item.ShortDescription; break;
                    case "hdr_oks": this.langs.autoService = item.ShortDescription; break;
                    case "hdr_tgln": this.langs.toggleNav = item.ShortDescription; break;
                    case "menu":
                        switch (item.ShortCode) {
                            case "home": this.langs.menu.home = item.ShortDescription; break;
                            case "list": this.langs.menu.list = item.ShortDescription; break;
                            case "compr": this.langs.menu.compare = item.ShortDescription; break;
                            case "about": this.langs.menu.about = item.ShortDescription; break;
                            case "blog": this.langs.menu.blog = item.ShortDescription; break;
                            case "cntct": this.langs.menu.contact = item.ShortDescription; break;
                        }
                        break;
                    case "cntct_form":
                        switch (item.ShortCode) {
                            case "adres": this.langs.contact.address = item.Description; break;
                            case "phone": this.langs.contact.phone = item.Description; break;
                        }
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
        this.langItems.push(Lib.SetLangItem(this.langItem, "menu"));
        this.langItems.push(Lib.SetLangItem(this.langItem, "cntct_form", "adres"));
        this.langItems.push(Lib.SetLangItem(this.langItem, "cntct_form", "phone"));
    }
}
