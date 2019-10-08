import { Component, EventEmitter, Output } from '@angular/core';
import { SiteService } from '../../../services/site';
import { ActivatedRoute } from '@angular/router';
import { LangItem } from '../../../models/LangItem';
import { Lib } from '../../../lib/methods';

@Component({
    selector: 'rac-blogitem',
    templateUrl: './item.html'
})

export class BlogItemComponent {
    url: string;
    errorMsg: string;

    send: string;
    name: string;
    mail: string;
    message: string;

    @Output() titleEvnt = new EventEmitter<string>();
    @Output() urlEvnt = new EventEmitter<string>();

    blog: any = {};
    simPostList: any;
    commentList: any;
    pictureList: any;

    constructor(private service: SiteService, private route: ActivatedRoute) {
    }

    ngOnInit() {
        this.route.params.subscribe(params => {
            this.url = params['url'];

            this.GetBlogPost(this.url);
        });

        this.SetLangContents();
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
                    case "cmn_share": this.langs.share = item.ShortDescription; break;
                    case "cmn_tags": this.langs.tags = item.ShortDescription; break;
                    case "cmn_author": this.langs.author = item.ShortDescription; break;
                    case "cmn_simtitles": this.langs.simtitles = item.ShortDescription; break;
                    case "cmn_comments": this.langs.comments = item.ShortDescription; break;
                    case "cmn_comment": this.langs.comment = item.ShortDescription2; break;
                    case "cmn_sendcmnt": this.langs.sendcomment = item.ShortDescription; break;
                }
            });
        }, resError => this.errorMsg = resError);

        this.service.get("Site", "GetLangContentByCodeAndShortCode", "cntct_form", "name", 1).subscribe((resData: any) => {
            this.name = resData.ShortDescription;
        }, resError => this.errorMsg = resError);

        this.service.get("Site", "GetLangContentByCodeAndShortCode", "cntct_form", "mail", 1).subscribe((resData: any) => {
            this.mail = resData.ShortDescription;
        }, resError => this.errorMsg = resError);

        this.service.get("Site", "GetLangContentByCodeAndShortCode", "cntct_form", "msg", 1).subscribe((resData: any) => {
            this.message = resData.ShortDescription;
        }, resError => this.errorMsg = resError);

        this.service.get("Site", "GetLangContentByCodeAndShortCode", "cntct_form", "sbmt", 1).subscribe((resData: any) => {
            this.send = resData.ShortDescription;
        }, resError => this.errorMsg = resError);
    }

    PushLangItems() {
        this.langItems = new Array<LangItem>();

        this.langItems.push(Lib.SetLangItem(this.langItem, "cmn_share"));
        this.langItems.push(Lib.SetLangItem(this.langItem, "cmn_tags"));
        this.langItems.push(Lib.SetLangItem(this.langItem, "cmn_author"));
        this.langItems.push(Lib.SetLangItem(this.langItem, "cmn_simtitles"));
        this.langItems.push(Lib.SetLangItem(this.langItem, "cmn_comments"));
        this.langItems.push(Lib.SetLangItem(this.langItem, "cmn_comment"));
        this.langItems.push(Lib.SetLangItem(this.langItem, "cmn_sendcmnt"));
    }

    //BlogPost
    GetBlogPost(url: string) {
        this.service.get("Site", "GetBlogPostByUrl", url).subscribe((resData: any) => {
            this.blog = resData;

            this.titleEvnt.emit(this.blog.Title);
            this.urlEvnt.emit(this.blog.Url);

            if (resData.Tags != null) {
                this.service.get("Site", "GetBlogSimilarPosts", resData.Tags, 2).subscribe((resData: any) => {
                    this.simPostList = resData;
                }, resError => this.errorMsg = resError);
            }

            this.service.get("Site", "GetBlogPictures", resData.ID).subscribe((resData: any) => {
                this.pictureList = resData;
            }, resError => this.errorMsg = resError);

            this.service.get("Site", "GetBlogComments", resData.ID).subscribe((resData: any) => {
                this.commentList = resData;
            }, resError => this.errorMsg = resError);
        }, resError => this.errorMsg = resError);
    }
}
