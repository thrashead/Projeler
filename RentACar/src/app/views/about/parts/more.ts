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
            this.langs.why = new Object();
            this.langs.moreList = new Array<any>();

            resData.forEach((item, i) => {
                switch (item.Code) {
                    case "about_more_info": this.langs.moreList.push(item); break;
                    case "about_more":
                        switch (item.ShortCode) {
                            case "why": this.langs.why = item; break;
                            case "info": this.langs.info = item.ShortDescription; break;
                        }
                        break;
                }
            });
        }, resError => this.errorMsg = resError);
    }

    PushLangItems() {
        this.langItems = new Array<LangItem>();

        this.langItems.push(Lib.SetLangItem(this.langItem, "about_more_info"));
        this.langItems.push(Lib.SetLangItem(this.langItem, "about_more", "why"));
        this.langItems.push(Lib.SetLangItem(this.langItem, "about_more", "info"));
    }
}
