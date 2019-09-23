import { Component } from '@angular/core';
import { SiteService } from '../../../../services/site';

@Component({
    selector: 'rac-cardetailbreadcumbs',
    templateUrl: './breadcumbs.html'
})

export class CarsDetailBreadCumbsComponent {
    errorMsg: string;

    home: string;
    list: string;
    detail: string;

    constructor(private service: SiteService) {
    }

    ngOnInit() {
        this.GetLangContent();
    }

    //LangContent
    GetLangContent() {
        this.service.get("Site", "GetLangContentByCodeAndShortCode", "menu", "home", 1).subscribe((resData: any) => {
            this.home = resData.ShortDescription2;
        }, resError => this.errorMsg = resError);

        this.service.get("Site", "GetLangContentByCodeAndShortCode", "menu", "list", 1).subscribe((resData: any) => {
            this.list = resData.ShortDescription2;
        }, resError => this.errorMsg = resError);

        this.service.get("Site", "GetLangContentByCodeAndShortCode", "extra_menu", "cardtl", 1).subscribe((resData: any) => {
            this.detail = resData.ShortDescription2;
        }, resError => this.errorMsg = resError);
    }
}
