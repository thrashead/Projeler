import { Component } from '@angular/core';
import { SiteService } from '../../../services/site';

@Component({
    selector: 'rac-homefeatured',
    templateUrl: './featured.html'
})

export class HomeFeaturedComponent {
    errorMsg: string;

    featuredvehicles: string;
    premium: string;
    leasing: string;

    carList: any;

    constructor(private service: SiteService) {
    }

    ngOnInit() {
        this.GetLangContent();
        this.GetShowroom();
    }

    GetLangContent() {
        this.service.get("Site", "GetLangContentByCode", "home_ftrdvhcl", 1).subscribe((resData: any) => {
            this.featuredvehicles = resData.ShortDescription;
        }, resError => this.errorMsg = resError);

        this.service.get("Site", "GetLangContentByCode", "carlst_leasing", 1).subscribe((resData: any) => {
            this.leasing = resData.ShortDescription;
        }, resError => this.errorMsg = resError);

        this.service.get("Site", "GetLangContentByCode", "carlst_premium", 1).subscribe((resData: any) => {
            this.premium = resData.ShortDescription;
        }, resError => this.errorMsg = resError);
    }

    //GetShowroom
    GetShowroom() {
        this.service.get("Site", "GetShowroom", 8).subscribe((resData: any) => {
            this.carList = resData;
        }, resError => this.errorMsg = resError);
    }
}
