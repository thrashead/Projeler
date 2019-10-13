import { Component } from '@angular/core';
import { SiteService } from '../../../../services/site';
import { Lib } from '../../../../lib/methods';
import { LangItem } from '../../../../models/LangItem';

@Component({
    selector: 'rac-cardetailbrands',
    templateUrl: './brands.html'
})

export class CarsDetailBrandsComponent {
    errorMsg: string;

    carMakes: any;

    constructor(private service: SiteService) {
    }

    ngOnInit() {
        this.SetLangContents();
        this.GetCarMakes();
    }

    GetCarMakes() {
        this.service.get("Site", "GetMakeList", 7, true).subscribe((resData: any) => {
            this.carMakes = resData;
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
                    case "cmn_more": this.langs.more = item.ShortDescription; break;
                    case "car_makes_brands": this.langs.brands = item.ShortDescription; break;
                }
            });
        }, resError => this.errorMsg = resError);
    }

    PushLangItems() {
        this.langItems = new Array<LangItem>();

        this.langItems.push(Lib.SetLangItem(this.langItem, "cmn_more"));
        this.langItems.push(Lib.SetLangItem(this.langItem, "car_makes_brands"));
    }
}
