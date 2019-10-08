import { Component } from '@angular/core';
import { SiteService } from '../../../../services/site';
import { Router } from '@angular/router';
import { LangItem } from '../../../../models/LangItem';
import { Lib } from '../../../../lib/methods';

@Component({
    selector: 'rac-cardetailrelated',
    templateUrl: './related.html'
})

export class CarsDetailRelatedComponent {
    errorMsg: string;

    carList: any;

    constructor(private service: SiteService, private router: Router) {
    }

    ngOnInit() {
        this.SetLangContents();
        this.GetSimilarCarsByUrl();
    }

    //GetSimilarCarsByUrl
    GetSimilarCarsByUrl() {
        let carUrl = this.router.url.split('/')[this.router.url.split('/').length - 1];

        this.service.get("Site", "GetSimilarCarsByUrl", carUrl, 4, true).subscribe((resData: any) => {
            this.carList = resData;
        }, resError => this.errorMsg = resError);
    }

    //LangContents
    langItems: Array<LangItem>;
    langItem: LangItem;
    langs: any;

    //GetLangContent
    SetLangContents() {
        this.PushLangItems();

        this.service.post("Site", "SetLangContents", this.langItems).subscribe((resData: any) => {
            this.langs = new Object();

            resData.forEach((item, i) => {
                switch (item.Code) {
                    case "cmn_rgstryr": this.langs.registered = item.ShortDescription2; break;
                    case "cmn_more": this.langs.more = item.ShortDescription; break;
                    case "car_list_similar": this.langs.similar = item.ShortDescription; break;
                }
            });
        }, resError => this.errorMsg = resError);
    }

    PushLangItems() {
        this.langItems = new Array<LangItem>();

        this.langItems.push(Lib.SetLangItem(this.langItem, "cmn_rgstryr"));
        this.langItems.push(Lib.SetLangItem(this.langItem, "cmn_more"));
        this.langItems.push(Lib.SetLangItem(this.langItem, "car_list_similar"));
    }
}
