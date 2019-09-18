import { Component } from '@angular/core';
import { SiteService } from '../../../services/site';

@Component({
    selector: 're-blogpopular',
    templateUrl: './popular.html'
})

export class BlogPopularComponent {
    errorMsg: string;

    popular: string;

    popularList: any;

    constructor(private service: SiteService) {
    }

    ngOnInit() {
        this.GetLangContent();
        this.GetBlogContent();
    }

    //LangContent
    GetLangContent() {
        this.service.get("Site", "GetLangContentByCode", "blog_pop", 1).subscribe((resData: any) => {
            this.popular = resData.ShortDescription;
        }, resError => this.errorMsg = resError);
    }

    //BlogContent
    GetBlogContent() {
        this.service.get("Site", "GetPopularBlogPosts", 2).subscribe((resData: any) => {
            this.popularList = resData;
        }, resError => this.errorMsg = resError);
    }
}
