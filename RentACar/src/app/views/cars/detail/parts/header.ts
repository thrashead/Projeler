import { Component, Input } from '@angular/core';
import { SiteService } from '../../../../services/site';
import { LangItem } from '../../../../models/LangItem';
import { Lib } from '../../../../lib/methods';

@Component({
    selector: 'rac-cardetailheader',
    templateUrl: './header.html'
})

export class CarsDetailHeaderComponent {
    errorMsg: string;

    banner: string;

    @Input() title;

    constructor(private service: SiteService) {
    }

    ngOnInit() {
        this.SetLangContents();
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
                    case "car_dtl_head": this.langs.header = item; break;
                }
            });
        }, resError => this.errorMsg = resError);
    }

    PushLangItems() {
        this.langItems = new Array<LangItem>();

        this.langItems.push(Lib.SetLangItem(this.langItem, "car_dtl_head"));
    }

    //Picture
    GetPicture() {
        this.service.get("Site", "GetPicturesByCode", "banner_cars", 1).subscribe((resData: any) => {
            this.banner = resData;
        }, resError => this.errorMsg = resError);
    }
}
