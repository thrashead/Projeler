import { Component } from '@angular/core';
import { SiteService } from '../../../../services/site';

@Component({
    selector: 'rac-carlistbreadcumbs',
    templateUrl: './breadcumbs.html'
})

export class CarListBreadCumbsComponent {
    errorMsg: string;

    home: string;
    list: string;

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
    }
}
