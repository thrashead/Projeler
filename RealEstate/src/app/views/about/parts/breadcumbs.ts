import { Component } from '@angular/core';
import { SiteService } from '../../../services/site';

@Component({
    selector: 're-aboutbreadcumbs',
    templateUrl: './breadcumbs.html'
})

export class AboutBreadCumbsComponent {
    errorMsg: string;

    home: string;
    about: string;

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

        this.service.get("Site", "GetLangContentByCodeAndShortCode", "menu", "about", 1).subscribe((resData: any) => {
            this.about = resData.ShortDescription2;
        }, resError => this.errorMsg = resError);
    }
}