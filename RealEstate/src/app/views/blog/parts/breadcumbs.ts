import { Component } from '@angular/core';
import { SiteService } from '../../../services/site';

@Component({
    selector: 're-blogbreadcumbs',
    templateUrl: './breadcumbs.html'
})

export class BlogBreadCumbsComponent {
    errorMsg: string;

    home: string;
    blog: string;

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

        this.service.get("Site", "GetLangContentByCodeAndShortCode", "menu", "blog", 1).subscribe((resData: any) => {
            this.blog = resData.ShortDescription2;
        }, resError => this.errorMsg = resError);
    }
}