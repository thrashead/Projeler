import { Component } from '@angular/core';
import { SiteService } from '../../../services/site';

@Component({
    selector: 'rac-homenewsletter',
    templateUrl: './newsletter.html'
})

export class HomeNewsletterComponent {
    errorMsg: string;

    newsletter: any;

    name: string;
    mail: string;

    constructor(private service: SiteService) {
    }

    ngOnInit() {
        this.GetLangContent();
    }

    //LangContent
    GetLangContent() {
        this.service.get("Site", "GetLangContentByCode", "home_newsletter", 1).subscribe((resData: any) => {
            this.newsletter = resData;
        }, resError => this.errorMsg = resError);

        this.service.get("Site", "GetLangContentByCodeAndShortCode", "cntct_form", "name", 1).subscribe((resData: any) => {
            this.name = resData.ShortDescription2;
        }, resError => this.errorMsg = resError);

        this.service.get("Site", "GetLangContentByCodeAndShortCode", "cntct_form", "mail", 1).subscribe((resData: any) => {
            this.mail = resData.ShortDescription2;
        }, resError => this.errorMsg = resError);
    }
}
