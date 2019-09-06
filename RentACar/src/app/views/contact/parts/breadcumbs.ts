import { Component } from '@angular/core';
import { SiteService } from '../../../services/site';

@Component({
    selector: 'rac-contactbreadcumbs',
    templateUrl: './breadcumbs.html'
})

export class ContactBreadCumbsComponent {
    errorMsg: string;

    home: string;
    contact: string;

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

        this.service.get("Site", "GetLangContentByCodeAndShortCode", "menu", "cntct", 1).subscribe((resData: any) => {
            this.contact = resData.ShortDescription2;
        }, resError => this.errorMsg = resError);
    }
}
