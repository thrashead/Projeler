﻿import { Component } from '@angular/core';
import { SiteService } from '../../../../services/site';
import { LangItem } from '../../../../models/LangItem';
import { Lib } from '../../../../lib/methods';

@Component({
    selector: 'rac-carcompareheader',
    templateUrl: './header.html'
})

export class CarsCompareHeaderComponent {
    errorMsg: string;

    banner: string;

    constructor(private service: SiteService) {
    }

    ngOnInit() {
        this.SetLangContents();
    }

    //Picture
    GetPicture() {
        this.service.get("Site", "GetPicturesByCode", "banner_compare", 1).subscribe((resData: any) => {
            this.banner = resData;
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
                    case "car_comp_head": this.langs.header = item; break;
                }
            });

            this.GetPicture();
        }, resError => this.errorMsg = resError);
    }

    PushLangItems() {
        this.langItems = new Array<LangItem>();

        this.langItems.push(Lib.SetLangItem(this.langItem, "car_comp_head"));
    }
}
