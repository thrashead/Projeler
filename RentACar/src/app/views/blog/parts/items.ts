import { Component } from '@angular/core';
import { SiteService } from '../../../services/site';
import { LangItem } from '../../../models/LangItem';
import { Lib } from '../../../lib/methods';

@Component({
    selector: 'rac-blogitems',
    templateUrl: './items.html'
})

export class BlogItemsComponent {
    errorMsg: string;

    blogList: any;

    constructor(private service: SiteService) {
    }

    ngOnInit() {
        this.SetLangContents();
        this.GetBlogContent();
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
                    case "cmn_readmore": this.langs.readmore = item.ShortDescription; break;
                    case "cmn_share": this.langs.share = item.ShortDescription; break;
                    case "cmn_comment": this.langs.comment = item.ShortDescription; break;
                }
            });
        }, resError => this.errorMsg = resError);
    }

    PushLangItems() {
        this.langItems = new Array<LangItem>();

        this.langItems.push(Lib.SetLangItem(this.langItem, "cmn_readmore"));
        this.langItems.push(Lib.SetLangItem(this.langItem, "cmn_share"));
        this.langItems.push(Lib.SetLangItem(this.langItem, "cmn_comment"));
    }

    //BlogContent
    GetBlogContent() {
        this.service.get("Site", "GetBlogPosts", 20).subscribe((resData: any) => {
            const length = Math.ceil(resData.length / 5);
            this.blogList = Array.from({ length }).map((x, j) => ({
                Blogs: resData.filter((y, i) => i >= 5 * j && i < 5 * (j + 1))
            }));
        }, resError => this.errorMsg = resError);
    }
}
