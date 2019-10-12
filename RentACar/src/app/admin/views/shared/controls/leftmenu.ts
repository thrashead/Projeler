import { Component, AfterViewInit } from '@angular/core';
import { SharedService } from '../../../services/shared';
import { Router, RouterEvent, ActivationEnd } from '@angular/router';

@Component({
    selector: 'admin-leftmenu',
    templateUrl: './leftmenu.html'
})

export class AdminLeftMenuComponent implements AfterViewInit {
    errorMsg: string;

    hasRightCategory: boolean;
    hasRightContent: boolean;
    hasRightPictures: boolean;
    hasRightFiles: boolean;
    hasRightMeta: boolean;
    hasRightTranslation: boolean;
    hasRightLogs: boolean;
    hasRightVisitors: boolean;
    hasRightUsers: boolean;
    hasRightTypes: boolean;
    hasRightWebsite: boolean;

    showTypeCategory: boolean;
    showTypeContent: boolean;
    showTypePictures: boolean;
    showTypeFiles: boolean;
    showTypeMeta: boolean;
    showTypeTranslation: boolean;
    showTypeLogs: boolean;
    showTypeVisitors: boolean;
    showTypeUsers: boolean;
    showTypeTypes: boolean;
    showTypeWebsite: boolean;

    constructor(private sharedService: SharedService, private router: Router) {
    }

    ngAfterViewInit() {
        this.HasRightShowTypeControl();

        this.router.events.subscribe((event: RouterEvent) => {
            if (event instanceof ActivationEnd) {
                this.DoIt();
            }
        });
    }

    DoIt() {
        $("#hdnUrl").val(location.href);

        var AdminPath = "http://localhost/RentACar/Admin";
        var Url = location.href;
        var Urling = Object();

        if (Url != undefined) {
            var tempurl = Url.replace(AdminPath + "/", "");
            var extParams = tempurl.split('?')[1];

            tempurl = tempurl.replace("?" + extParams, "");

            Urling.path = tempurl;
            Urling.controller = tempurl.split('/')[0];
            Urling.action = tempurl.split('/')[1];
            Urling.parameter = tempurl.split('/')[2];

            if (extParams != undefined)
                Urling.parameters = extParams.split('&');
        }

        if (Urling.controller != undefined) {
            var activeLi = $("#sidebar li[data-url='" + Urling.controller + "']");
            var passiveSubmenuLi = $("#sidebar li.submenu");
            var submenuLi = activeLi.parent("ul").parent("li");

            $("#sidebar li").removeClass("active");
            $("#sidebar li").removeClass("open");

            activeLi.addClass("active");

            if (submenuLi.hasClass("submenu")) {
                if ($("body").width() > 970 || $("body").width() <= 480) {
                    submenuLi.addClass("open");
                }
                submenuLi.addClass("active");
            }

            setTimeout(function () {
                passiveSubmenuLi.each(function () {
                    if (!$(this).hasClass("open")) {
                        $(this).children("ul").slideUp();
                    }
                    else {
                        $(this).children("ul").slideDown();
                    }
                });
            }, 1);
        }
    }

    HasRightShowTypeControl() {
        this.sharedService.getHasRight("Category", "s").subscribe((resData: any) => {
            this.hasRightCategory = resData;
            this.sharedService.getShowType("Category").subscribe((resData: any) => {
                this.showTypeCategory = resData;
                this.sharedService.getHasRight("Content", "s").subscribe((resData: any) => {
                    this.hasRightContent = resData;
                    this.sharedService.getShowType("Content").subscribe((resData: any) => {
                        this.showTypeContent = resData;
                        this.sharedService.getHasRight("Pictures", "s").subscribe((resData: any) => {
                            this.hasRightPictures = resData;
                            this.sharedService.getShowType("Pictures").subscribe((resData: any) => {
                                this.showTypePictures = resData;
                                this.sharedService.getHasRight("Files", "s").subscribe((resData: any) => {
                                    this.hasRightFiles = resData;
                                    this.sharedService.getShowType("Files").subscribe((resData: any) => {
                                        this.showTypeFiles = resData;
                                        this.sharedService.getHasRight("Meta", "s").subscribe((resData: any) => {
                                            this.hasRightMeta = resData;
                                            this.sharedService.getShowType("Meta").subscribe((resData: any) => {
                                                this.showTypeMeta = resData;
                                                this.sharedService.getHasRight("Translation", "s").subscribe((resData: any) => {
                                                    this.hasRightTranslation = resData;
                                                    this.sharedService.getShowType("Translation").subscribe((resData: any) => {
                                                        this.showTypeTranslation = resData;
                                                        this.sharedService.getHasRight("Logs", "s").subscribe((resData: any) => {
                                                            this.hasRightLogs = resData;
                                                            this.sharedService.getShowType("Logs").subscribe((resData: any) => {
                                                                this.showTypeLogs = resData;
                                                                this.sharedService.getHasRight("Visitors", "s").subscribe((resData: any) => {
                                                                    this.hasRightVisitors = resData;
                                                                    this.sharedService.getShowType("Visitors").subscribe((resData: any) => {
                                                                        this.showTypeVisitors = resData;
                                                                        this.sharedService.getHasRight("Users", "s").subscribe((resData: any) => {
                                                                            this.hasRightUsers = resData;
                                                                            this.sharedService.getShowType("Users").subscribe((resData: any) => {
                                                                                this.showTypeUsers = resData;
                                                                                this.sharedService.getHasRight("Types", "s").subscribe((resData: any) => {
                                                                                    this.hasRightTypes = resData;
                                                                                    this.sharedService.getShowType("Types").subscribe((resData: any) => {
                                                                                        this.showTypeTypes = resData;
                                                                                        this.sharedService.getHasRight("Website", "s").subscribe((resData: any) => {
                                                                                            this.hasRightWebsite = resData;
                                                                                            this.sharedService.getShowType("Website").subscribe((resData: any) => {
                                                                                                this.showTypeWebsite = resData;
                                                                                                this.DoIt();
                                                                                            }, resError => this.errorMsg = resError);
                                                                                        }, resError => this.errorMsg = resError);
                                                                                    }, resError => this.errorMsg = resError);
                                                                                }, resError => this.errorMsg = resError);
                                                                            }, resError => this.errorMsg = resError);
                                                                        }, resError => this.errorMsg = resError);
                                                                    }, resError => this.errorMsg = resError);
                                                                }, resError => this.errorMsg = resError);
                                                            }, resError => this.errorMsg = resError);
                                                        }, resError => this.errorMsg = resError);
                                                    }, resError => this.errorMsg = resError);
                                                }, resError => this.errorMsg = resError);
                                            }, resError => this.errorMsg = resError);
                                        }, resError => this.errorMsg = resError);
                                    }, resError => this.errorMsg = resError);
                                }, resError => this.errorMsg = resError);
                            }, resError => this.errorMsg = resError);
                        }, resError => this.errorMsg = resError);
                    }, resError => this.errorMsg = resError);
                }, resError => this.errorMsg = resError);
            }, resError => this.errorMsg = resError);
        }, resError => this.errorMsg = resError);
    }
}
