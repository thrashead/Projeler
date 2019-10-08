import { Component } from '@angular/core';
import { SiteService } from '../../../services/site';
import { LangItem } from '../../../models/LangItem';
import { Lib } from '../../../lib/methods';

@Component({
    selector: 'rac-homewelcome',
    templateUrl: './welcome.html'
})

export class HomeWelcomeComponent {
    errorMsg: string;

    welcomebanner: string;

    welcome: any;

    constructor(private service: SiteService) {
    }

    ngOnInit() {
        this.SetLangContents();
        this.GetContent();
        this.GetPicture();
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
                    case "home_wlcm_loans": this.langs.loans = item.ShortDescription; break;
                    case "home_wlcm_trade": this.langs.trade = item.ShortDescription; break;
                    case "home_wlcm_guide": this.langs.guide = item.ShortDescription; break;
                    case "home_wlcm_support": this.langs.support = item.ShortDescription; break;
                }
            });
        }, resError => this.errorMsg = resError);
    }

    PushLangItems() {
        this.langItems = new Array<LangItem>();

        this.langItems.push(Lib.SetLangItem(this.langItem, "home_wlcm_loans"));
        this.langItems.push(Lib.SetLangItem(this.langItem, "home_wlcm_trade"));
        this.langItems.push(Lib.SetLangItem(this.langItem, "home_wlcm_guide"));
        this.langItems.push(Lib.SetLangItem(this.langItem, "home_wlcm_support"));
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
