import { Component } from "@angular/core";
import { SiteService } from '../../services/site';
import { LangItem } from '../../models/LangItem';
import { Lib } from '../../lib/methods';

@Component({
    templateUrl: './detail.html'
})

export class BlogDetailComponent {
    errorMsg: string;

    title: string;
    url: string;

    constructor(private service: SiteService) {
    }

    ngOnInit() {
        this.SetLangContents();
    }

    //LangContents
    langItems: Array<LangItem>;
    langItem: LangItem;

    itemLangs: any;
    headerLangs: any;
    breadcumbsLangs: any;
    popularLangs: any;
    categoriesLangs: any;
    searchLangs: any;
    callusLangs: any;
    booknowLangs: any;

    //LangContent
    SetLangContents() {
        this.PushLangItems();

        this.service.post("Site", "SetLangContents", this.langItems).subscribe((resData: any) => {
            this.itemLangs = new Object();
            this.itemLangs.contact = new Object();
            this.itemLangs.review = new Object();
            this.headerLangs = new Object();
            this.breadcumbsLangs = new Object();
            this.breadcumbsLangs.menu = new Object();
            this.popularLangs = new Object();
            this.categoriesLangs = new Object();
            this.searchLangs = new Object();
            this.callusLangs = new Object();
            this.booknowLangs = new Object();

            resData.forEach((item, i) => {
                switch (item.Code) {
                    //Item
                    case "cmn_share": this.itemLangs.share = item.ShortDescription; break;
                    case "cmn_tags": this.itemLangs.tags = item.ShortDescription; break;
                    case "cmn_author": this.itemLangs.author = item.ShortDescription; break;
                    case "cmn_simtitles": this.itemLangs.simtitles = item.ShortDescription; break;
                    case "cmn_comments": this.itemLangs.comments = item.ShortDescription; break;
                    case "cmn_comment": this.itemLangs.comment = item.ShortDescription2; break;
                    case "cmn_sendcmnt": this.itemLangs.sendcomment = item.ShortDescription; break;
                    case "cmn_error_onemsg": this.itemLangs.review.Error = item.ShortDescription; break;
                    case "book_rvw_alert": this.itemLangs.review.alert = item.ShortDescription; break;
                    case "cntct_form":
                        switch (item.ShortCode) {
                            case "name": this.itemLangs.contact.name = item.ShortDescription2; break;
                            case "mail": this.itemLangs.contact.mail = item.ShortDescription2; break;
                            case "msg": this.itemLangs.contact.message = item.ShortDescription2; break;
                            case "sbmt": this.itemLangs.contact.send = item.ShortDescription2; break;
                            case "phone": this.callusLangs.phone = item.Description; break;
                        }
                        break;

                    //Header
                    case "blog_head": this.headerLangs.header = item; break;

                    //BreadCumbs
                    case "menu":
                        switch (item.ShortCode) {
                            case "home": this.breadcumbsLangs.menu.home = item.ShortDescription2; break;
                            case "blog": this.breadcumbsLangs.menu.blog = item.ShortDescription2; break;
                        }
                        break;

                    //Popular
                    case "blog_pop": this.popularLangs.popular = item.ShortDescription; break;

                    //Categories
                    case "cmn_ktgr": this.categoriesLangs.categories = item.ShortDescription; break;

                    //Search
                    case "src_src": this.searchLangs.search = item.ShortDescription2; break;

                    //CallUs
                    case "cmn_callus": this.callusLangs.callus = item.ShortDescription; break;

                    //BookNow
                    case "cmn_booknow": this.booknowLangs.booknow = item; break;
                }
            });
        }, resError => this.errorMsg = resError);
    }

    PushLangItems() {
        this.langItems = new Array<LangItem>();

        //Item
        this.langItems.push(Lib.SetLangItem(this.langItem, "cmn_share"));
        this.langItems.push(Lib.SetLangItem(this.langItem, "cmn_tags"));
        this.langItems.push(Lib.SetLangItem(this.langItem, "cmn_author"));
        this.langItems.push(Lib.SetLangItem(this.langItem, "cmn_simtitles"));
        this.langItems.push(Lib.SetLangItem(this.langItem, "cmn_comments"));
        this.langItems.push(Lib.SetLangItem(this.langItem, "cmn_comment"));
        this.langItems.push(Lib.SetLangItem(this.langItem, "cmn_sendcmnt"));
        this.langItems.push(Lib.SetLangItem(this.langItem, "cntct_form"));
        this.langItems.push(Lib.SetLangItem(this.langItem, "cmn_error_onemsg"));
        this.langItems.push(Lib.SetLangItem(this.langItem, "book_rvw_alert"));

        //Header
        this.langItems.push(Lib.SetLangItem(this.langItem, "blog_head"));

        //BreadCumbs
        this.langItems.push(Lib.SetLangItem(this.langItem, "menu", "home"));
        this.langItems.push(Lib.SetLangItem(this.langItem, "menu", "blog"));

        //Popular
        this.langItems.push(Lib.SetLangItem(this.langItem, "blog_pop"));

        //Categories
        this.langItems.push(Lib.SetLangItem(this.langItem, "cmn_ktgr"));

        //Search
        this.langItems.push(Lib.SetLangItem(this.langItem, "src_src"));

        //CallUs
        this.langItems.push(Lib.SetLangItem(this.langItem, "cmn_callus"));

        //BookNow
        this.langItems.push(Lib.SetLangItem(this.langItem, "cmn_booknow"));
    }
}