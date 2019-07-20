import * as tslib_1 from "tslib";
import { Component } from "@angular/core";
import { SharedService } from '../../services/shared';
var AdminAnaSayfaComponent = /** @class */ (function () {
    function AdminAnaSayfaComponent(sharedService) {
        this.sharedService = sharedService;
    }
    AdminAnaSayfaComponent.prototype.ngOnInit = function () {
        this.hasRightControl();
        this.showTypeControl();
    };
    AdminAnaSayfaComponent.prototype.hasRightControl = function () {
        var _this = this;
        this.sharedService.getHasRight("Emlak", "s").subscribe(function (resData) {
            _this.hasRightEmlak = resData;
        }, function (resError) { return _this.errorMsg = resError; });
        this.sharedService.getHasRight("Kategori", "s").subscribe(function (resData) {
            _this.hasRightKategori = resData;
        }, function (resError) { return _this.errorMsg = resError; });
        this.sharedService.getHasRight("Icerik", "s").subscribe(function (resData) {
            _this.hasRightIcerik = resData;
        }, function (resError) { return _this.errorMsg = resError; });
        this.sharedService.getHasRight("Urun", "s").subscribe(function (resData) {
            _this.hasRightUrun = resData;
        }, function (resError) { return _this.errorMsg = resError; });
        this.sharedService.getHasRight("Galeri", "s").subscribe(function (resData) {
            _this.hasRightGaleri = resData;
        }, function (resError) { return _this.errorMsg = resError; });
        this.sharedService.getHasRight("Resim", "s").subscribe(function (resData) {
            _this.hasRightResim = resData;
        }, function (resError) { return _this.errorMsg = resError; });
        this.sharedService.getHasRight("Dosya", "s").subscribe(function (resData) {
            _this.hasRightDosya = resData;
        }, function (resError) { return _this.errorMsg = resError; });
        this.sharedService.getHasRight("Meta", "s").subscribe(function (resData) {
            _this.hasRightMeta = resData;
        }, function (resError) { return _this.errorMsg = resError; });
        this.sharedService.getHasRight("FormEleman", "s").subscribe(function (resData) {
            _this.hasRightFormEleman = resData;
        }, function (resError) { return _this.errorMsg = resError; });
        this.sharedService.getHasRight("BagliTipler", "s").subscribe(function (resData) {
            _this.hasRightBagliTipler = resData;
        }, function (resError) { return _this.errorMsg = resError; });
        this.sharedService.getHasRight("Dil", "s").subscribe(function (resData) {
            _this.hasRightDil = resData;
        }, function (resError) { return _this.errorMsg = resError; });
        this.sharedService.getHasRight("Loglar", "s").subscribe(function (resData) {
            _this.hasRightLoglar = resData;
        }, function (resError) { return _this.errorMsg = resError; });
        this.sharedService.getHasRight("Ziyaretci", "s").subscribe(function (resData) {
            _this.hasRightZiyaretci = resData;
        }, function (resError) { return _this.errorMsg = resError; });
        this.sharedService.getHasRight("Kullanicilar", "s").subscribe(function (resData) {
            _this.hasRightKullanicilar = resData;
        }, function (resError) { return _this.errorMsg = resError; });
        this.sharedService.getHasRight("Tipler", "s").subscribe(function (resData) {
            _this.hasRightTipler = resData;
        }, function (resError) { return _this.errorMsg = resError; });
    };
    AdminAnaSayfaComponent.prototype.showTypeControl = function () {
        var _this = this;
        this.sharedService.getShowType("Emlak").subscribe(function (resData) {
            _this.showTypeEmlak = resData;
        }, function (resError) { return _this.errorMsg = resError; });
        this.sharedService.getShowType("Kategori").subscribe(function (resData) {
            _this.showTypeKategori = resData;
        }, function (resError) { return _this.errorMsg = resError; });
        this.sharedService.getShowType("Icerik").subscribe(function (resData) {
            _this.showTypeIcerik = resData;
        }, function (resError) { return _this.errorMsg = resError; });
        this.sharedService.getShowType("Urun").subscribe(function (resData) {
            _this.showTypeUrun = resData;
        }, function (resError) { return _this.errorMsg = resError; });
        this.sharedService.getShowType("Galeri").subscribe(function (resData) {
            _this.showTypeGaleri = resData;
        }, function (resError) { return _this.errorMsg = resError; });
        this.sharedService.getShowType("Resim").subscribe(function (resData) {
            _this.showTypeResim = resData;
        }, function (resError) { return _this.errorMsg = resError; });
        this.sharedService.getShowType("Dosya").subscribe(function (resData) {
            _this.showTypeDosya = resData;
        }, function (resError) { return _this.errorMsg = resError; });
        this.sharedService.getShowType("Meta").subscribe(function (resData) {
            _this.showTypeMeta = resData;
        }, function (resError) { return _this.errorMsg = resError; });
        this.sharedService.getShowType("FormEleman").subscribe(function (resData) {
            _this.showTypeFormEleman = resData;
        }, function (resError) { return _this.errorMsg = resError; });
        this.sharedService.getShowType("BagliTipler").subscribe(function (resData) {
            _this.showTypeBagliTipler = resData;
        }, function (resError) { return _this.errorMsg = resError; });
        this.sharedService.getShowType("Dil").subscribe(function (resData) {
            _this.showTypeDil = resData;
        }, function (resError) { return _this.errorMsg = resError; });
        this.sharedService.getShowType("Loglar").subscribe(function (resData) {
            _this.showTypeLoglar = resData;
        }, function (resError) { return _this.errorMsg = resError; });
        this.sharedService.getShowType("Ziyaretci").subscribe(function (resData) {
            _this.showTypeZiyaretci = resData;
        }, function (resError) { return _this.errorMsg = resError; });
        this.sharedService.getShowType("Kullanicilar").subscribe(function (resData) {
            _this.showTypeKullanicilar = resData;
        }, function (resError) { return _this.errorMsg = resError; });
        this.sharedService.getShowType("Tipler").subscribe(function (resData) {
            _this.showTypeTipler = resData;
        }, function (resError) { return _this.errorMsg = resError; });
    };
    AdminAnaSayfaComponent = tslib_1.__decorate([
        Component({
            templateUrl: './anasayfa.html'
        }),
        tslib_1.__metadata("design:paramtypes", [SharedService])
    ], AdminAnaSayfaComponent);
    return AdminAnaSayfaComponent;
}());
export { AdminAnaSayfaComponent };
//# sourceMappingURL=anasayfa.js.map