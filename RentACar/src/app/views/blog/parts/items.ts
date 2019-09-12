import { Component } from '@angular/core';
import { SiteService } from '../../../services/site';

@Component({
    selector: 'rac-blogitems',
    templateUrl: './items.html'
})

export class BlogItemsComponent {
    errorMsg: string;

    readmore: string;
    share: string;
    comment: string;

    blogList: any;

    constructor(private service: SiteService) {
    }

    ngOnInit() {
        this.GetLangContent();
        this.GetBlogContent();
    }

    //LangContent
    GetLangContent() {
        this.service.get("Site", "GetLangContentByCode", "cmn_readmore", 1).subscribe((resData: any) => {
            this.readmore = resData.ShortDescription;
        }, resError => this.errorMsg = resError);

        this.service.get("Site", "GetLangContentByCode", "cmn_share", 1).subscribe((resData: any) => {
            this.share = resData.ShortDescription;
        }, resError => this.errorMsg = resError);

        this.service.get("Site", "GetLangContentByCode", "cmn_comment", 1).subscribe((resData: any) => {
            this.comment = resData.ShortDescription;
        }, resError => this.errorMsg = resError);
    }

    //BlogContent
    GetBlogContent() {
        this.service.get("Site", "GetBlogPosts", 20).subscribe((resData: any) => {
            let j: number = 0;
            this.blogList = new Array();

            resData.forEach((item, i) => {
                if (i % 5 == 0) {
                    this.blogList[j] = new Object();
                    this.blogList[j].Items = new Array();
                }

                this.blogList[j].Items[i % 5] = item;

                if (i % 5 == 4) {
                    j++;
                }
            });
        }, resError => this.errorMsg = resError);
    }
}
