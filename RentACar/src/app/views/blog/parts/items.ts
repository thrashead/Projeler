import { Component } from '@angular/core';
import { SiteService } from '../../../services/site';

@Component({
    selector: 'rac-blogitems',
    templateUrl: './items.html'
})

export class BlogItemsComponent {
    errorMsg: string;

    search: string;
    categories: string;
    popular: string;
    readmore: string;
    share: string;
    comment: string;

    categoryList: any;
    blogList: string;
    popularList: any;

    constructor(private service: SiteService) {
    }

    ngOnInit() {
        this.GetBlogContent();
    }

    //BlogContent
    GetBlogContent() {
        this.service.get("Site", "GetLangContentByCode", "cmn_ktgr", 1).subscribe((resData: any) => {
            this.categories = resData.ShortDescription;
            this.service.get("Site", "GetLangContentByCode", "cmn_readmore", 1).subscribe((resData: any) => {
                this.readmore = resData.ShortDescription;
                this.service.get("Site", "GetLangContentByCode", "cmn_share", 1).subscribe((resData: any) => {
                    this.share = resData.ShortDescription;
                    this.service.get("Site", "GetLangContentByCode", "cmn_comment", 1).subscribe((resData: any) => {
                        this.comment = resData.ShortDescription;
                        this.service.get("Site", "GetLangContentByCode", "blog_pop", 1).subscribe((resData: any) => {
                            this.popular = resData.ShortDescription;
                            this.service.get("Site", "GetLangContentByCode", "src_src", 1).subscribe((resData: any) => {
                                this.search = resData.ShortDescription2;
                                this.service.get("Site", "GetBlogCategories").subscribe((resData: any) => {
                                    this.categoryList = resData;
                                    //this.service.get("Site", "GetPopularBlogPosts", 2).subscribe((resData: any) => {
                                    //    this.popularList = resData;
                                    this.service.get("Site", "GetBlogPosts", 20).subscribe((resData: any) => {
                                        this.blogList = "";

                                        resData.forEach((item, i) => {
                                            if (i % 5 == 0) {
                                                this.blogList += "<div>";
                                            }

                                            this.blogList += "<div class=\"b-blog__posts-one wow zoomInUp\" data-wow-delay=\"0.3s\">";
                                            this.blogList += "<div class=\"row\">";
                                            this.blogList += "<div class=\"col-xs-8\">";
                                            this.blogList += "<header class=\"b-blog__posts-one-body-head s-lineDownLeft\">";
                                            this.blogList += "<div class=\"b-blog__posts-one-body-head-notes\">";
                                            this.blogList += "<span class=\"b-blog__posts-one-body-head-notes-note\"><span class=\"fa fa-user\"></span>" + item.SenderName + "</span>";
                                            this.blogList += "<span class=\"b-blog__posts-one-body-head-notes-note\"><span class=\"fa fa-calendar-o\"></span>" + item.SendDate + "</span>";
                                            this.blogList += "<span class=\"b-blog__posts-one-body-head-notes-note\"><span class=\"fa fa-comment\"></span>" + item.CommentCount + " " + this.comment + "</span>";
                                            this.blogList += "</div>";
                                            this.blogList += "<h2 class=\"s-titleDet\">" + item.Title + "</h2>";
                                            this.blogList += "</header>";
                                            this.blogList += "</div>";
                                            this.blogList += "</div>";
                                            this.blogList += "<div class=\"row\">";
                                            this.blogList += "<div class=\"col-xs-4 pull-right\">";
                                            this.blogList += "<img class=\"img-responsive center-block\" src=\"/RentACar/Uploads/" + item.PictureUrl + "\" alt=\"nissan\" />";
                                            this.blogList += "</div>";
                                            this.blogList += "<div class=\"col-xs-8 pull-right\">";
                                            this.blogList += "<div class=\"b-blog__posts-one-info\">";
                                            this.blogList += item.Description;
                                            this.blogList += "<a routerlink=\"/Blog/Detail/" + item.Url + "\" class=\"btn m-btn m-readMore\">" + this.readmore + "<span class=\"fa fa-angle-right\"></span></a>";

                                            if (item.Facebook != null || item.Twitter != null || item.Pinterest != null) {
                                                this.blogList += "<div class=\"b-blog__posts-one-social pull-right\">";
                                                this.blogList += "<em>" + this.share + "</em>";

                                                if (item.Facebook != null)
                                                    this.blogList += "<a target=\"_blank\" href=\"" + item.Facebook + "\"><span class=\"fa fa-facebook-square\"></span></a>";

                                                if (item.Twitter != null)
                                                    this.blogList += "<a target=\"_blank\" href=\"" + item.Twitter + "\"><span class=\"fa fa-twitter-square \"></span></a>";

                                                if (item.Pinterest != null)
                                                    this.blogList += "<a target=\"_blank\" href=\"" + item.Pinterest + "\"><span class=\"fa fa-pinterest-square\"></span></a>";

                                                this.blogList += "</div>";
                                            }

                                            this.blogList += "</div>";
                                            this.blogList += "</div>";
                                            this.blogList += "</div>";
                                            this.blogList += "</div>";

                                            if (i % 5 == 4 || i == resData.length - 1) {
                                                this.blogList += "</div>";
                                            }
                                        });
                                    }, resError => this.errorMsg = resError);
                                    //}, resError => this.errorMsg = resError);
                                }, resError => this.errorMsg = resError);
                            }, resError => this.errorMsg = resError);
                        }, resError => this.errorMsg = resError);
                    }, resError => this.errorMsg = resError);
                }, resError => this.errorMsg = resError);
            }, resError => this.errorMsg = resError);
        }, resError => this.errorMsg = resError);
    }
}
