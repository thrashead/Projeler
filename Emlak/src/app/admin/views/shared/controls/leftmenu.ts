import { Component, AfterContentInit } from '@angular/core';
import { SharedService } from '../../../services/shared';
import { Router, RouterEvent, ActivationEnd } from '@angular/router';

@Component({
    selector: 'admin-leftmenu',
    templateUrl: './leftmenu.html'
})

export class AdminLeftMenuComponent implements AfterContentInit {
    errorMsg: string;

    hasRightEmlak: boolean;
    hasRightKategori: boolean;
    hasRightIcerik: boolean;
    hasRightUrun: boolean;
    hasRightGaleri: boolean;
    hasRightResim: boolean;
    hasRightDosya: boolean;
    hasRightMeta: boolean;
    hasRightFormEleman: boolean;
    hasRightBagliTipler: boolean;
    hasRightDil: boolean;
    hasRightLoglar: boolean;
    hasRightZiyaretci: boolean;
    hasRightKullanicilar: boolean;
    hasRightTipler: boolean;

    showTypeEmlak: boolean;
    showTypeKategori: boolean;
    showTypeIcerik: boolean;
    showTypeUrun: boolean;
    showTypeGaleri: boolean;
    showTypeResim: boolean;
    showTypeDosya: boolean;
    showTypeMeta: boolean;
    showTypeFormEleman: boolean;
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
        this.sharedService.getHasRight("Emlak", "s").subscribe((resData: any) => {
            this.hasRightEmlak = resData;
            this.sharedService.getShowType("Emlak").subscribe((resData: any) => {
                this.showTypeEmlak = resData;
                this.sharedService.getHasRight("Kategori", "s").subscribe((resData: any) => {
                    this.hasRightKategori = resData;
                    this.sharedService.getShowType("Kategori").subscribe((resData: any) => {
                        this.showTypeKategori = resData;
                        this.sharedService.getHasRight("Icerik", "s").subscribe((resData: any) => {
                            this.hasRightIcerik = resData;
                            this.sharedService.getShowType("Icerik").subscribe((resData: any) => {
                                this.showTypeIcerik = resData;
                                this.sharedService.getHasRight("Urun", "s").subscribe((resData: any) => {
                                    this.hasRightUrun = resData;
                                    this.sharedService.getShowType("Urun").subscribe((resData: any) => {
                                        this.showTypeUrun = resData;
                                        this.sharedService.getHasRight("Galeri", "s").subscribe((resData: any) => {
                                            this.hasRightGaleri = resData;
                                            this.sharedService.getShowType("Galeri").subscribe((resData: any) => {
                                                this.showTypeGaleri = resData;
                                                this.sharedService.getHasRight("Resim", "s").subscribe((resData: any) => {
                                                    this.hasRightResim = resData;
                                                    this.sharedService.getShowType("Resim").subscribe((resData: any) => {
                                                        this.showTypeResim = resData;
                                                        this.sharedService.getHasRight("Dosya", "s").subscribe((resData: any) => {
                                                            this.hasRightDosya = resData;
                                                            this.sharedService.getShowType("Dosya").subscribe((resData: any) => {
                                                                this.showTypeDosya = resData;
                                                                this.sharedService.getHasRight("Meta", "s").subscribe((resData: any) => {
                                                                    this.hasRightMeta = resData;
                                                                    this.sharedService.getShowType("Meta").subscribe((resData: any) => {
                                                                        this.showTypeMeta = resData;
                                                                        this.sharedService.getHasRight("FormEleman", "s").subscribe((resData: any) => {
                                                                            this.hasRightFormEleman = resData;
                                                                            this.sharedService.getShowType("FormEleman").subscribe((resData: any) => {
                                                                                this.showTypeFormEleman = resData;
                                                                                this.sharedService.getHasRight("BagliTipler", "s").subscribe((resData: any) => {
                                                                                    this.hasRightBagliTipler = resData;
                                                                                    this.sharedService.getShowType("BagliTipler").subscribe((resData: any) => {
                                                                                        this.showTypeBagliTipler = resData;
                                                                                        this.sharedService.getHasRight("Dil", "s").subscribe((resData: any) => {
                                                                                            this.hasRightDil = resData;
                                                                                            this.sharedService.getShowType("Dil").subscribe((resData: any) => {
                                                                                                this.showTypeDil = resData;
                                                                                                this.sharedService.getHasRight("Loglar", "s").subscribe((resData: any) => {
                                                                                                    this.hasRightLoglar = resData;
                                                                                                    this.sharedService.getShowType("Loglar").subscribe((resData: any) => {
                                                                                                        this.showTypeLoglar = resData;
                                                                                                        this.sharedService.getHasRight("Ziyaretci", "s").subscribe((resData: any) => {
                                                                                                            this.hasRightZiyaretci = resData;
                                                                                                            this.sharedService.getShowType("Ziyaretci").subscribe((resData: any) => {
                                                                                                                this.showTypeZiyaretci = resData;
                                                                                                                this.sharedService.getHasRight("Kullanicilar", "s").subscribe((resData: any) => {
                                                                                                                    this.hasRightKullanicilar = resData;
                                                                                                                    this.sharedService.getShowType("Kullanicilar").subscribe((resData: any) => {
                                                                                                                        this.showTypeKullanicilar = resData;
                                                                                                                        this.sharedService.getHasRight("Tipler", "s").subscribe((resData: any) => {
                                                                                                                            this.hasRightTipler = resData;
                                                                                                                            this.sharedService.getShowType("Tipler").subscribe((resData: any) => {
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
                    }, resError => this.errorMsg = resError);
                }, resError => this.errorMsg = resError);
            }, resError => this.errorMsg = resError);
        }, resError => this.errorMsg = resError);
    }
}
