import { Component } from '@angular/core';
import { SiteService } from '../../../services/site';
import { LangItem } from '../../../models/LangItem';
import { Lib } from '../../../lib/methods';

@Component({
    selector: 'rac-blogpopular',
    templateUrl: './popular.html'
})

export class BlogPopularComponent {
    errorMsg: string;

    popularList: any;

    constructor(private service: SiteService) {
    }

    ngOnInit() {
        this.SetLangContents();
    }

    //BlogContent
    GetBlogContent() {
        this.service.get("Site", "GetPopularBlogPosts", 2).subscribe((resData: any) => {
            this.popularList = resData;
        }, resError => this.errorMsg = resError);
    }

    //LangContents
    langItems: Array<LangItem>;
    langItem: LangItem;
    langs: any;

    //LangContent
    SetLangContents() {
        this.PushLangItems();

        this.service.post("Site", "SetLangContents", this.langItems).subscribe((resData: any) => {
            this.langs = new Object();

            resData.forEach((item, i) => {
                switch (item.Code) {
                    case "blog_pop": this.langs.popular = item.ShortDescription; break;
                }
            });

            this.GetBlogContent();
        }, resError => this.errorMsg = resError);
    }

    PushLangItems() {
        this.langItems = new Array<LangItem>();

        this.langItems.push(Lib.SetLangItem(this.langItem, "blog_pop"));
    }
}
