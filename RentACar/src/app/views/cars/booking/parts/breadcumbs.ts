import { Component } from '@angular/core';
import { SiteService } from '../../../../services/site';

@Component({
    selector: 'rac-carbookingbreadcumbs',
    templateUrl: './breadcumbs.html'
})

export class CarsBookingBreadCumbsComponent {
    errorMsg: string;

    home: string;
    book: string;

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

        this.service.get("Site", "GetLangContentByCodeAndShortCode", "extra_menu", "book", 1).subscribe((resData: any) => {
            this.book = resData.ShortDescription2;
        }, resError => this.errorMsg = resError);
    }
}
