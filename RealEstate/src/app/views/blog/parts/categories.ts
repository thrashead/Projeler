import { Component } from '@angular/core';
import { SiteService } from '../../../services/site';

@Component({
    selector: 're-blogcategories',
    templateUrl: './categories.html'
})

export class BlogCategoriesComponent {
    errorMsg: string;

    categories: string;

    categoryList: any;

    constructor(private service: SiteService) {
    }

    ngOnInit() {
        this.GetLangContent();
        this.GetBlogContent();
    }

    //LangContent
    GetLangContent() {
        this.service.get("Site", "GetLangContentByCode", "cmn_ktgr", 1).subscribe((resData: any) => {
            this.categories = resData.ShortDescription;
        }, resError => this.errorMsg = resError);
    }

    //BlogContent
    GetBlogContent() {
        this.service.get("Site", "GetBlogCategories").subscribe((resData: any) => {
            this.categoryList = resData;
        }, resError => this.errorMsg = resError);
    }
}
