import { Component } from '@angular/core';
import { SiteService } from '../../../services/site';
import { ActivatedRoute } from '@angular/router';

@Component({
    selector: 'rac-blogitem',
    templateUrl: './item.html'
})

export class BlogItemComponent {
    url: string;
    errorMsg: string;

    share: string;
    tags: string;
    author: string;
    simtitles: string;
    comments: string;
    comment: string;
    sendcomment: string;
    send: string;
    name: string;
    mail: string;
    message: string;

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

        this.GetLangContent();
    }

    //LangContent
    GetLangContent() {
        this.service.get("Site", "GetLangContentByCode", "cmn_share", 1).subscribe((resData: any) => {
            this.share = resData.ShortDescription;
        }, resError => this.errorMsg = resError);

        this.service.get("Site", "GetLangContentByCode", "cmn_tags", 1).subscribe((resData: any) => {
            this.tags = resData.ShortDescription;
        }, resError => this.errorMsg = resError);

        this.service.get("Site", "GetLangContentByCode", "cmn_author", 1).subscribe((resData: any) => {
            this.author = resData.ShortDescription;
        }, resError => this.errorMsg = resError);

        this.service.get("Site", "GetLangContentByCode", "cmn_simtitles", 1).subscribe((resData: any) => {
            this.simtitles = resData.ShortDescription;
        }, resError => this.errorMsg = resError);

        this.service.get("Site", "GetLangContentByCode", "cmn_comments", 1).subscribe((resData: any) => {
            this.comments = resData.ShortDescription;
        }, resError => this.errorMsg = resError);

        this.service.get("Site", "GetLangContentByCode", "cmn_comment", 1).subscribe((resData: any) => {
            this.comment = resData.ShortDescription2;
        }, resError => this.errorMsg = resError);

        this.service.get("Site", "GetLangContentByCode", "cmn_sendcmnt", 1).subscribe((resData: any) => {
            this.sendcomment = resData.ShortDescription;
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

    //BlogPost
    GetBlogPost(url: string) {
        this.service.get("Site", "GetBlogPostByUrl", url).subscribe((resData: any) => {
            this.blog = resData;

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
