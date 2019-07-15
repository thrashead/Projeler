import * as tslib_1 from "tslib";
import { Component } from '@angular/core';
import { SharedService } from '../../../services/shared';
import { Router, ActivationEnd } from '@angular/router';
var AdminLeftMenuComponent = /** @class */ (function () {
    function AdminLeftMenuComponent(sharedService, router) {
        this.sharedService = sharedService;
        this.router = router;
    }
    AdminLeftMenuComponent.prototype.ngAfterContentInit = function () {
        var _this = this;
        this.HasRightShowTypeControl();
        this.router.events.subscribe(function (event) {
            if (event instanceof ActivationEnd) {
                _this.DoIt();
            }
        });
    };
    AdminLeftMenuComponent.prototype.DoIt = function () {
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
    };
    AdminLeftMenuComponent.prototype.HasRightShowTypeControl = function () {
        var _this = this;
        this.sharedService.getHasRight("Emlak", "s").subscribe(function (resData) {
            _this.hasRightEmlak = resData;
            _this.sharedService.getShowType("Emlak").subscribe(function (resData) {
                _this.showTypeEmlak = resData;
                _this.sharedService.getHasRight("Kategori", "s").subscribe(function (resData) {
                    _this.hasRightKategori = resData;
                    _this.sharedService.getShowType("Kategori").subscribe(function (resData) {
                        _this.showTypeKategori = resData;
                        _this.sharedService.getHasRight("Icerik", "s").subscribe(function (resData) {
                            _this.hasRightIcerik = resData;
                            _this.sharedService.getShowType("Icerik").subscribe(function (resData) {
                                _this.showTypeIcerik = resData;
                                _this.sharedService.getHasRight("Urun", "s").subscribe(function (resData) {
                                    _this.hasRightUrun = resData;
                                    _this.sharedService.getShowType("Urun").subscribe(function (resData) {
                                        _this.showTypeUrun = resData;
                                        _this.sharedService.getHasRight("Galeri", "s").subscribe(function (resData) {
                                            _this.hasRightGaleri = resData;
                                            _this.sharedService.getShowType("Galeri").subscribe(function (resData) {
                                                _this.showTypeGaleri = resData;
                                                _this.sharedService.getHasRight("Resim", "s").subscribe(function (resData) {
                                                    _this.hasRightResim = resData;
                                                    _this.sharedService.getShowType("Resim").subscribe(function (resData) {
                                                        _this.showTypeResim = resData;
                                                        _this.sharedService.getHasRight("Dosya", "s").subscribe(function (resData) {
                                                            _this.hasRightDosya = resData;
                                                            _this.sharedService.getShowType("Dosya").subscribe(function (resData) {
                                                                _this.showTypeDosya = resData;
                                                                _this.sharedService.getHasRight("Meta", "s").subscribe(function (resData) {
                                                                    _this.hasRightMeta = resData;
                                                                    _this.sharedService.getShowType("Meta").subscribe(function (resData) {
                                                                        _this.showTypeMeta = resData;
                                                                        _this.sharedService.getHasRight("FormEleman", "s").subscribe(function (resData) {
                                                                            _this.hasRightFormEleman = resData;
                                                                            _this.sharedService.getShowType("FormEleman").subscribe(function (resData) {
                                                                                _this.showTypeFormEleman = resData;
                                                                                _this.sharedService.getHasRight("BagliTipler", "s").subscribe(function (resData) {
                                                                                    _this.hasRightBagliTipler = resData;
                                                                                    _this.sharedService.getShowType("BagliTipler").subscribe(function (resData) {
                                                                                        _this.showTypeBagliTipler = resData;
                                                                                        _this.sharedService.getHasRight("Dil", "s").subscribe(function (resData) {
                                                                                            _this.hasRightDil = resData;
                                                                                            _this.sharedService.getShowType("Dil").subscribe(function (resData) {
                                                                                                _this.showTypeDil = resData;
                                                                                                _this.sharedService.getHasRight("Loglar", "s").subscribe(function (resData) {
                                                                                                    _this.hasRightLoglar = resData;
                                                                                                    _this.sharedService.getShowType("Loglar").subscribe(function (resData) {
                                                                                                        _this.showTypeLoglar = resData;
                                                                                                        _this.sharedService.getHasRight("Ziyaretci", "s").subscribe(function (resData) {
                                                                                                            _this.hasRightZiyaretci = resData;
                                                                                                            _this.sharedService.getShowType("Ziyaretci").subscribe(function (resData) {
                                                                                                                _this.showTypeZiyaretci = resData;
                                                                                                                _this.sharedService.getHasRight("Kullanicilar", "s").subscribe(function (resData) {
                                                                                                                    _this.hasRightKullanicilar = resData;
                                                                                                                    _this.sharedService.getShowType("Kullanicilar").subscribe(function (resData) {
                                                                                                                        _this.showTypeKullanicilar = resData;
                                                                                                                        _this.sharedService.getHasRight("Tipler", "s").subscribe(function (resData) {
                                                                                                                            _this.hasRightTipler = resData;
                                                                                                                            _this.sharedService.getShowType("Tipler").subscribe(function (resData) {
                                                                                                                                _this.showTypeTipler = resData;
                                                                                                                                _this.DoIt();
                                                                                                                            }, function (resError) { return _this.errorMsg = resError; });
                                                                                                                        }, function (resError) { return _this.errorMsg = resError; });
                                                                                                                    }, function (resError) { return _this.errorMsg = resError; });
                                                                                                                }, function (resError) { return _this.errorMsg = resError; });
                                                                                                            }, function (resError) { return _this.errorMsg = resError; });
                                                                                                        }, function (resError) { return _this.errorMsg = resError; });
                                                                                                    }, function (resError) { return _this.errorMsg = resError; });
                                                                                                }, function (resError) { return _this.errorMsg = resError; });
                                                                                            }, function (resError) { return _this.errorMsg = resError; });
                                                                                        }, function (resError) { return _this.errorMsg = resError; });
                                                                                    }, function (resError) { return _this.errorMsg = resError; });
                                                                                }, function (resError) { return _this.errorMsg = resError; });
                                                                            }, function (resError) { return _this.errorMsg = resError; });
                                                                        }, function (resError) { return _this.errorMsg = resError; });
                                                                    }, function (resError) { return _this.errorMsg = resError; });
                                                                }, function (resError) { return _this.errorMsg = resError; });
                                                            }, function (resError) { return _this.errorMsg = resError; });
                                                        }, function (resError) { return _this.errorMsg = resError; });
                                                    }, function (resError) { return _this.errorMsg = resError; });
                                                }, function (resError) { return _this.errorMsg = resError; });
                                            }, function (resError) { return _this.errorMsg = resError; });
                                        }, function (resError) { return _this.errorMsg = resError; });
                                    }, function (resError) { return _this.errorMsg = resError; });
                                }, function (resError) { return _this.errorMsg = resError; });
                            }, function (resError) { return _this.errorMsg = resError; });
                        }, function (resError) { return _this.errorMsg = resError; });
                    }, function (resError) { return _this.errorMsg = resError; });
                }, function (resError) { return _this.errorMsg = resError; });
            }, function (resError) { return _this.errorMsg = resError; });
        }, function (resError) { return _this.errorMsg = resError; });
    };
    AdminLeftMenuComponent = tslib_1.__decorate([
        Component({
            selector: 'admin-leftmenu',
            templateUrl: './leftmenu.html',
            providers: [SharedService]
        }),
        tslib_1.__metadata("design:paramtypes", [SharedService, Router])
    ], AdminLeftMenuComponent);
    return AdminLeftMenuComponent;
}());
export { AdminLeftMenuComponent };
//# sourceMappingURL=leftmenu.js.map