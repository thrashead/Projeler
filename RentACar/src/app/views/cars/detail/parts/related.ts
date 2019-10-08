import { Component } from '@angular/core';
import { SiteService } from '../../../../services/site';
import { Router } from '@angular/router';

@Component({
    selector: 'rac-cardetailrelated',
    templateUrl: './related.html'
})

export class CarsDetailRelatedComponent {
    errorMsg: string;

    similar: string;
    more: string;
    registered: string;

    carList: any;

    constructor(private service: SiteService, private router: Router) {
    }

    ngOnInit() {
        this.GetLangContent();
        this.GetSimilarCarsByUrl();
    }

    //GetSimilarCarsByUrl
    GetSimilarCarsByUrl() {
        let carUrl = this.router.url.split('/')[this.router.url.split('/').length - 1];

        this.service.get("Site", "GetSimilarCarsByUrl", carUrl, 4, true).subscribe((resData: any) => {
            this.carList = resData;
        }, resError => this.errorMsg = resError);
    }

    //GetLangContent
    GetLangContent() {
        this.service.get("Site", "GetLangContentByCode", "cmn_rgstryr", 1).subscribe((resData: any) => {
            this.registered = resData.ShortDescription2;
        }, resError => this.errorMsg = resError);

        this.service.get("Site", "GetLangContentByCode", "cmn_more", 1).subscribe((resData: any) => {
            this.more = resData.ShortDescription;
        }, resError => this.errorMsg = resError);

        this.service.get("Site", "GetLangContentByCode", "car_list_similar", 1).subscribe((resData: any) => {
            this.similar = resData.ShortDescription;
        }, resError => this.errorMsg = resError);
    }
}
