import { Component } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { SiteService } from '../../../services/site';
import { LangItem } from '../../../models/LangItem';
import { Lib } from '../../../lib/methods';
import { ScriptsComponent } from '../../shared/controls/scripts';

@Component({
    selector: 'rac-blogitems',
    templateUrl: './items.html'
})

export class BlogItemsComponent {
    errorMsg: string;

    blogList: any;

    url: string;
    catTitle: string;

    constructor(private service: SiteService, private route: ActivatedRoute, private router: Router) {
        this.router.routeReuseStrategy.shouldReuseRoute = function () {
            return false;
        };
    }

    ngOnInit() {
        this.route.params.subscribe((params: Params) => {
            this.url = params['url'];
        });

        this.SetLangContents();
    }

    //BlogPosts
    GetBlogPosts() {
        if (this.url == "Arama-Sonuclari") {
            this.service.get("Site", "GetBlogSearchResult").subscribe((resData: any) => {
                const length = Math.ceil(resData.length / 5);
                this.blogList = Array.from({ length }).map((x, j) => ({
                    Blogs: resData.filter((y, i) => i >= 5 * j && i < 5 * (j + 1))
                }));

                ScriptsComponent.OwlCarousel();
            }, resError => this.errorMsg = resError);
        }
        else {
            this.service.get("Site", "GetBlogPosts", this.url, null, 20).subscribe((resData: any) => {
                if (resData.length > 0) {
                    this.catTitle = this.url != undefined ? resData[0].CategoryTitle : null;
                }

                const length = Math.ceil(resData.length / 5);
                this.blogList = Array.from({ length }).map((x, j) => ({
                    Blogs: resData.filter((y, i) => i >= 5 * j && i < 5 * (j + 1))
                }));

                ScriptsComponent.OwlCarousel();
            }, resError => this.errorMsg = resError);
        }
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
                    case "blog_src_title": this.url == "Arama-Sonuclari" ? this.catTitle = item.ShortDescription : ""; break;
                }
            });

            this.GetBlogPosts();
        }, resError => this.errorMsg = resError);
    }

    PushLangItems() {
        this.langItems = new Array<LangItem>();

        this.langItems.push(Lib.SetLangItem(this.langItem, "cmn_readmore"));
        this.langItems.push(Lib.SetLangItem(this.langItem, "cmn_share"));
        this.langItems.push(Lib.SetLangItem(this.langItem, "cmn_comment"));
        this.langItems.push(Lib.SetLangItem(this.langItem, "blog_src_title"));
    }
}
