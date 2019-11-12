import { Component, Input } from '@angular/core';
import { SiteService } from '../../../services/site';
import { LangItem } from '../../../models/LangItem';
import { Lib } from '../../../lib/methods';

@Component({
    selector: 'rac-blogcategories',
    templateUrl: './categories.html'
})

export class BlogCategoriesComponent {
    errorMsg: string;

    @Input() url: string;

    categoryList: any;

    constructor(private service: SiteService) {
    }

    ngOnInit() {
        this.SetLangContents();
    }

    //BlogContent
    GetBlogContent() {
        this.service.get("Site", "GetBlogCategories").subscribe((resData: any) => {
            this.categoryList = resData;
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
                    case "cmn_ktgr": this.langs.categories = item.ShortDescription; break;
                }
            });

            this.GetBlogContent();
        }, resError => this.errorMsg = resError);
    }

    PushLangItems() {
        this.langItems = new Array<LangItem>();

        this.langItems.push(Lib.SetLangItem(this.langItem, "cmn_ktgr"));
    }
}
