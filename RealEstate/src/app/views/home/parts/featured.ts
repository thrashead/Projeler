import { Component } from '@angular/core';
import { SiteService } from '../../../services/site';

@Component({
    selector: 're-homefeatured',
    templateUrl: './featured.html'
})

export class HomeFeaturedComponent {
    errorMsg: string;

    featuredre: string;
    premium: string;
    leasing: string;

    constructor(private service: SiteService) {
    }

    ngOnInit() {
        this.GetLangContent();
    }

    GetLangContent() {
        this.service.get("Site", "GetLangContentByCode", "home_ftrdins", 1).subscribe((resData: any) => {
            this.featuredre = resData.ShortDescription;
        }, resError => this.errorMsg = resError);

        this.service.get("Site", "GetLangContentByCode", "carlst_leasing", 1).subscribe((resData: any) => {
            this.leasing = resData.ShortDescription;
        }, resError => this.errorMsg = resError);

        this.service.get("Site", "GetLangContentByCode", "carlst_premium", 1).subscribe((resData: any) => {
            this.premium = resData.ShortDescription;
        }, resError => this.errorMsg = resError);
    }
}
