import { Component } from '@angular/core';
import { SiteService } from '../../../services/site';
import { LangItem } from '../../../models/LangItem';
import { Lib } from '../../../lib/methods';

@Component({
    selector: 'rac-homeslider',
    templateUrl: './slider.html'
})

export class HomeSliderComponent {
    errorMsg: string;

    Slider: any;

    constructor(private service: SiteService) {
    }

    ngOnInit() {
        this.SetLangContents();
        this.GetSlider();
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
                    case "cmn_detail": this.langs.detail = item.ShortDescription; break;
                }
            });
        }, resError => this.errorMsg = resError);
    }

    PushLangItems() {
        this.langItems = new Array<LangItem>();

        this.langItems.push(Lib.SetLangItem(this.langItem, "cmn_detail"));
    }

    //Slider
    GetSlider() {
        this.service.get("Site", "SliderByCode", "mainslider", null).subscribe((resData: any) => {
            this.Slider = resData;
        }, resError => this.errorMsg = resError);
    }
}
