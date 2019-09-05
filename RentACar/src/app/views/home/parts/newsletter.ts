import { Component } from '@angular/core';
import { SiteService } from '../../../services/site';

@Component({
    selector: 'rac-homenewsletter',
    templateUrl: './newsletter.html'
})

export class HomeNewsletterComponent {
    errorMsg: string;

    inputtext: any;
    newsletter: any;

    constructor(private service: SiteService) {
    }

    ngOnInit() {
        this.GetContent();
        this.GetLangContent();
    }

    //LangContent
    GetLangContent() {
        this.service.get("Site", "GetLangContentByCode", "home_newsletter", 1).subscribe((resData: any) => {
            this.inputtext = resData;
        }, resError => this.errorMsg = resError);
    }

    //Content
    GetContent() {
        this.service.get("Site", "GetContentByCode", "home_newsletter", 1).subscribe((resData: any) => {
            this.newsletter = resData;
        }, resError => this.errorMsg = resError);
    }
}
