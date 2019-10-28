import { Component, AfterContentInit } from '@angular/core';
import { SharedService } from '../../../services/shared';
import { Router, RouterEvent, ActivationEnd } from '@angular/router';

@Component({
    selector: 'admin-leftmenu',
    templateUrl: './leftmenu.html'
})

export class AdminLeftMenuComponent implements AfterContentInit {
    errorMsg: string;

    hasRightWebsite: boolean;
    hasRightKategori: boolean;
    hasRightIcerik: boolean;
    hasRightGaleri: boolean;
    hasRightResim: boolean;
    hasRightDosya: boolean;
    hasRightMeta: boolean;
    hasRightBagliTipler: boolean;
    hasRightDil: boolean;
    hasRightLoglar: boolean;
    hasRightZiyaretci: boolean;
    hasRightKullanicilar: boolean;
    hasRightTipler: boolean;

    showTypeWebsite: boolean;
    showTypeKategori: boolean;
    showTypeIcerik: boolean;
    showTypeGaleri: boolean;
    showTypeResim: boolean;
    showTypeDosya: boolean;
    showTypeMeta: boolean;
    showTypeBagliTipler: boolean;
    showTypeDil: boolean;
    showTypeLoglar: boolean;
    showTypeZiyaretci: boolean;
    showTypeKullanicilar: boolean;
    showTypeTipler: boolean;

    constructor(private sharedService: SharedService, private router: Router) {
    }

    ngAfterContentInit() {
        this.HasRightShowTypeControl();

        this.router.events.subscribe((event: RouterEvent) => {
            if (event instanceof ActivationEnd) {
                this.DoIt();
            }
        });
    }

    DoIt() {
        $("#hdnUrl").val(location.href);

        var AdminPath = "http://localhost/Emlak/Admin";
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
        this.sharedService.getHasRight("Website", "s").subscribe((resData: any) => {
            this.hasRightWebsite = resData;
            this.sharedService.getShowType("Website").subscribe((resData: any) => {
                this.showTypeWebsite = resData;
                this.sharedService.getHasRight("Category", "s").subscribe((resData: any) => {
                    this.hasRightKategori = resData;
                    this.sharedService.getShowType("Category").subscribe((resData: any) => {
                        this.showTypeKategori = resData;
                        this.sharedService.getHasRight("Content", "s").subscribe((resData: any) => {
                            this.hasRightIcerik = resData;
                            this.sharedService.getShowType("Content").subscribe((resData: any) => {
                                this.showTypeIcerik = resData;
                                this.sharedService.getHasRight("Gallery", "s").subscribe((resData: any) => {
                                    this.hasRightGaleri = resData;
                                    this.sharedService.getShowType("Gallery").subscribe((resData: any) => {
                                        this.showTypeGaleri = resData;
                                        this.sharedService.getHasRight("Picture", "s").subscribe((resData: any) => {
                                            this.hasRightResim = resData;
                                            this.sharedService.getShowType("Picture").subscribe((resData: any) => {
                                                this.showTypeResim = resData;
                                                this.sharedService.getHasRight("File", "s").subscribe((resData: any) => {
                                                    this.hasRightDosya = resData;
                                                    this.sharedService.getShowType("File").subscribe((resData: any) => {
                                                        this.showTypeDosya = resData;
                                                        this.sharedService.getHasRight("Meta", "s").subscribe((resData: any) => {
                                                            this.hasRightMeta = resData;
                                                            this.sharedService.getShowType("Meta").subscribe((resData: any) => {
                                                                this.showTypeMeta = resData;
                                                                this.sharedService.getHasRight("LinkTypes", "s").subscribe((resData: any) => {
                                                                    this.hasRightBagliTipler = resData;
                                                                    this.sharedService.getShowType("LinkTypes").subscribe((resData: any) => {
                                                                        this.showTypeBagliTipler = resData;
                                                                        this.sharedService.getHasRight("Translation", "s").subscribe((resData: any) => {
                                                                            this.hasRightDil = resData;
                                                                            this.sharedService.getShowType("Translation").subscribe((resData: any) => {
                                                                                this.showTypeDil = resData;
                                                                                this.sharedService.getHasRight("Logs", "s").subscribe((resData: any) => {
                                                                                    this.hasRightLoglar = resData;
                                                                                    this.sharedService.getShowType("Logs").subscribe((resData: any) => {
                                                                                        this.showTypeLoglar = resData;
                                                                                        this.sharedService.getHasRight("VisitorCounter", "s").subscribe((resData: any) => {
                                                                                            this.hasRightZiyaretci = resData;
                                                                                            this.sharedService.getShowType("VisitorCounter").subscribe((resData: any) => {
                                                                                                this.showTypeZiyaretci = resData;
                                                                                                this.sharedService.getHasRight("Users", "s").subscribe((resData: any) => {
                                                                                                    this.hasRightKullanicilar = resData;
                                                                                                    this.sharedService.getShowType("Users").subscribe((resData: any) => {
                                                                                                        this.showTypeKullanicilar = resData;
                                                                                                        this.sharedService.getHasRight("Types", "s").subscribe((resData: any) => {
                                                                                                            this.hasRightTipler = resData;
                                                                                                            this.sharedService.getShowType("Types").subscribe((resData: any) => {
                                                                                                                this.showTypeTipler = resData;
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
                    }, resError => this.errorMsg = resError);
                }, resError => this.errorMsg = resError);
            }, resError => this.errorMsg = resError);
        }, resError => this.errorMsg = resError);
    }
}
