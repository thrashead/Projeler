import { Component } from '@angular/core';
import { SiteService } from '../../../services/site';
import { LangItem } from '../../../models/LangItem';
import { Lib } from '../../../lib/methods';

@Component({
    selector: 'hr-header',
    templateUrl: './header.html'
})

export class HeaderComponent {
    paneladdress: string = "http://localhost/HumanResources/Admin";
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

            resData.forEach((item, i) => {
                switch (item.Code) {
                    case "hdr_pnl": this.langs.panelLogin = item.ShortDescription; break;
                }
            });
        }, resError => this.errorMsg = resError);
    }

    PushLangItems() {
        this.langItems = new Array<LangItem>();

        this.langItems.push(Lib.SetLangItem(this.langItem, "hdr_pnl"));
    }
}
