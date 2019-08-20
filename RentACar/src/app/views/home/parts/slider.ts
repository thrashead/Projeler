import { Component } from '@angular/core';
import { SiteService } from '../../../services/site';

@Component({
    selector: 'rac-homeslider',
    templateUrl: './slider.html'
})

export class HomeSliderComponent {
    errorMsg: string;

    detail: string;

    Slider: {};

    constructor(private service: SiteService) {
    }

    ngOnInit() {
        this.GetLangContent();
        this.GetSlider();
    }

    //LangContent
    GetLangContent() {
        this.service.get("Site", "GetLangContentByCode", "cmn_detail_upper", 1).subscribe((resData: any) => {
            this.detail = resData.ShortDescription;
        }, resError => this.errorMsg = resError);
    }

    //Slider
    GetSlider() {
        this.service.get("Site", "MainSliderByCode", "mainslider").subscribe((resData: any) => {
            this.Slider = resData;
        }, resError => this.errorMsg = resError);
    }
}
