import { Component } from '@angular/core';
import { SiteService } from '../../../services/site';
import { LangItem } from '../../../models/LangItem';
import { Lib } from '../../../lib/methods';

@Component({
    selector: 'rac-homefeatured',
    templateUrl: './featured.html'
})

export class HomeFeaturedComponent {
    errorMsg: string;

    carList: any;

    constructor(private service: SiteService) {
    }

    ngOnInit() {
        this.SetLangContents();
        this.GetShowroom();
    }

    //GetShowroom
    GetShowroom() {
        this.service.get("Site", "GetShowroom", 8).subscribe((resData: any) => {
            this.carList = resData;
        }, resError => this.errorMsg = resError);
    }

    //LangContents
    langItems: Array<LangItem>;
    langItem: LangItem;
    langs: any;

    SetLangContents() {
        this.PushLangItems();

        this.service.post("Site", "SetLangContents", this.langItems).subscribe((resData: any) => {
            this.langs = new Object();

            resData.forEach((item, i) => {
                switch (item.Code) {
                    case "home_ftrdvhcl": this.langs.featuredvehicles = item.ShortDescription; break;
                    case "cmn_price_opt": this.langs.DayPrice = item.ShortDescription; break;
                }
            });
        }, resError => this.errorMsg = resError);
    }

    PushLangItems() {
        this.langItems = new Array<LangItem>();

        this.langItems.push(Lib.SetLangItem(this.langItem, "home_ftrdvhcl"));
        this.langItems.push(Lib.SetLangItem(this.langItem, "cmn_price_opt"));
    }
}
