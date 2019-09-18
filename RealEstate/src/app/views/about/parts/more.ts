import { Component } from '@angular/core';
import { SiteService } from '../../../services/site';

@Component({
    selector: 're-aboutmore',
    templateUrl: './more.html'
})

export class AboutMoreComponent {
    errorMsg: string;

    why: any = {};
    more: any;
    moreList: any;

    constructor(private service: SiteService) {
    }

    ngOnInit() {
        this.GetLangContent();
    }

    //LangContent
    GetLangContent() {
        this.service.get("Site", "GetLangContentByCodeAndShortCode", "about_more", "why", 1).subscribe((resData: any) => {
            this.why = resData;
        }, resError => this.errorMsg = resError);

        this.service.get("Site", "GetLangContentByCodeAndShortCode", "about_more", "info", 1).subscribe((resData: any) => {
            this.more = resData.ShortDescription;
        }, resError => this.errorMsg = resError);

        this.service.get("Site", "GetLangContentByCode", "about_more_info").subscribe((resData: any) => {
            this.moreList = resData;
        }, resError => this.errorMsg = resError);
    }
}
