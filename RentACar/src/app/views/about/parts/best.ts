import { Component } from '@angular/core';
import { SiteService } from '../../../services/site';
import { LangItem } from '../../../models/LangItem';
import { Lib } from '../../../lib/methods';

@Component({
    selector: 'rac-aboutbest',
    templateUrl: './best.html'
})

export class AboutBestComponent {
    errorMsg: string;

    gotolist: string;
    picbest: string;

    best: any;

    constructor(private service: SiteService) {
    }

    ngOnInit() {
        this.SetLangContents();
    }

    //Picture
    GetPicture() {
        this.service.get("Site", "GetPicturesByCode", "about_best", 1).subscribe((resData: any) => {
            this.picbest = resData;
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
                    case "cmn_go_list": this.langs.gotolist = item.ShortDescription2; break;
                    case "about_best": this.langs.best = item; break;
                }
            });

            this.GetPicture();
        }, resError => this.errorMsg = resError);
    }

    PushLangItems() {
        this.langItems = new Array<LangItem>();

        this.langItems.push(Lib.SetLangItem(this.langItem, "cmn_go_list"));
        this.langItems.push(Lib.SetLangItem(this.langItem, "about_best"));
    }
}
