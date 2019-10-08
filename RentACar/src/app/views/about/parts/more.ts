import { Component } from '@angular/core';
import { SiteService } from '../../../services/site';
import { LangItem } from '../../../models/LangItem';
import { Lib } from '../../../lib/methods';

@Component({
    selector: 'rac-aboutmore',
    templateUrl: './more.html'
})

export class AboutMoreComponent {
    errorMsg: string;

    why: any = {};
    more: any;

    constructor(private service: SiteService) {
    }

    ngOnInit() {
        this.SetLangContents();
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
            this.langs.moreList = new Array<any>();

            resData.forEach((item, i) => {
                switch (item.Code) {
                    case "about_more_info": this.langs.moreList.push(item); break;
                }
            });
        }, resError => this.errorMsg = resError);

        this.service.get("Site", "GetLangContentByCodeAndShortCode", "about_more", "why", 1).subscribe((resData: any) => {
            this.why = resData;
        }, resError => this.errorMsg = resError);

        this.service.get("Site", "GetLangContentByCodeAndShortCode", "about_more", "info", 1).subscribe((resData: any) => {
            this.more = resData.ShortDescription;
        }, resError => this.errorMsg = resError);
    }

    PushLangItems() {
        this.langItems = new Array<LangItem>();

        this.langItems.push(Lib.SetLangItem(this.langItem, "about_more_info"));
    }
}
