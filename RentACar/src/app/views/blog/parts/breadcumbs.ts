import { Component, Input } from '@angular/core';
import { SiteService } from '../../../services/site';

@Component({
    selector: 'rac-blogbreadcumbs',
    templateUrl: './breadcumbs.html'
})

export class BlogBreadCumbsComponent {
    errorMsg: string;

    home: string;
    list: string;

    @Input() title;
    @Input() url;

    constructor(private service: SiteService) {
    }

    ngOnInit() {
        this.SetLangContents();
    }

    //LangContent
    SetLangContents() {
        this.service.get("Site", "GetLangContentByCodeAndShortCode", "menu", "home", 1).subscribe((resData: any) => {
            this.home = resData.ShortDescription2;
        }, resError => this.errorMsg = resError);

        this.service.get("Site", "GetLangContentByCodeAndShortCode", "menu", "blog", 1).subscribe((resData: any) => {
            this.list = resData.ShortDescription2;
        }, resError => this.errorMsg = resError);
    }
}