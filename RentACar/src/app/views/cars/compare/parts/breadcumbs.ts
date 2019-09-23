import { Component } from '@angular/core';
import { SiteService } from '../../../../services/site';

@Component({
    selector: 'rac-carcomparebreadcumbs',
    templateUrl: './breadcumbs.html'
})

export class CarsCompareBreadCumbsComponent {
    errorMsg: string;

    home: string;
    compare: string;

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

        this.service.get("Site", "GetLangContentByCodeAndShortCode", "menu", "compr", 1).subscribe((resData: any) => {
            this.compare = resData.ShortDescription2;
        }, resError => this.errorMsg = resError);
    }
}