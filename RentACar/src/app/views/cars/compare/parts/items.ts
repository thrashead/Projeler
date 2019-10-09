import { Component } from '@angular/core';
import { SiteService } from '../../../../services/site';
import { CarCompare } from '../../../../models/CarCompare';
import { LangItem } from '../../../../models/LangItem';
import { Lib } from '../../../../lib/methods';

@Component({
    selector: 'rac-carcompareitems',
    templateUrl: './items.html'
})

export class CarsCompareItemsComponent {
    errorMsg: string;

    carCompare: Array<CarCompare>;

    constructor(private service: SiteService) {
    }

    ngOnInit() {
        this.SetLangContents();
        this.GetCarCompareList();
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
                    case "cmn_detail":this.langs.detail = item.ShortDescription; break;
                }
            });
        }, resError => this.errorMsg = resError);
    }
    
    PushLangItems() {
        this.langItems = new Array<LangItem>();

        this.langItems.push(Lib.SetLangItem(this.langItem, "cmn_detail"));
    }

    //CarCompareList
    GetCarCompareList() {
        this.service.get("Site", "GetCarCompareList").subscribe((resData: any) => {
            this.carCompare = new Array<CarCompare>();

            this.carCompare = resData;
        }, resError => this.errorMsg = resError);
    }
}
