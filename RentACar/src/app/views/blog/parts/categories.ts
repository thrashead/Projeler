import { Component, Input } from '@angular/core';
import { SiteService } from '../../../services/site';

@Component({
    selector: 'rac-blogcategories',
    templateUrl: './categories.html'
})

export class BlogCategoriesComponent {
    errorMsg: string;

    @Input() url: string;

    categoryList: any;

    @Input() langs: any;

    constructor(private service: SiteService) {
    }

    ngOnInit() {
        this.GetBlogContent();
    }

    //BlogContent
    GetBlogContent() {
        this.service.get("Site", "GetBlogCategories").subscribe((resData: any) => {
            this.categoryList = resData;
        }, resError => this.errorMsg = resError);
    }
}
