import * as tslib_1 from "tslib";
import { Injectable } from "@angular/core";
import { HttpClient, HttpParams } from '@angular/common/http';
var KullanicilarService = /** @class */ (function () {
    function KullanicilarService(http) {
        this.http = http;
        this.linkIndex = "Ajax/Kullanicilar/Index";
        this.linkEkle = "Ajax/Kullanicilar/Ekle";
        this.linkDuzenle = "Ajax/Kullanicilar/Duzenle";
        this.linkSil = "Ajax/Kullanicilar/Sil";
        this.linkKaldir = "Ajax/Kullanicilar/Kaldir";
        this.linkGrupDegistir = "Ajax/Kullanicilar/GrupDegistir";
    }
    KullanicilarService.prototype.getIndex = function () {
        return this.http.get(this.linkIndex);
    };
    KullanicilarService.prototype.getEkle = function () {
        return this.http.get(this.linkEkle);
    };
    KullanicilarService.prototype.postEkle = function (model) {
        return this.http.post(this.linkEkle, model);
    };
    KullanicilarService.prototype.getDuzenle = function (id) {
        var params = new HttpParams().set("id", id);
        return this.http.get(this.linkDuzenle, { params: params });
    };
    KullanicilarService.prototype.postDuzenle = function (model) {
        return this.http.post(this.linkDuzenle, model);
    };
    KullanicilarService.prototype.getGrupDegistir = function (id) {
        var params = new HttpParams().set("id", id);
        return this.http.get(this.linkGrupDegistir, { params: params });
    };
    KullanicilarService.prototype.postGrupDegistir = function (model) {
        return this.http.post(this.linkGrupDegistir, model);
    };
    KullanicilarService.prototype.getSil = function (id) {
        var params = new HttpParams().set("id", id);
        return this.http.get(this.linkSil, { params: params });
    };
    KullanicilarService.prototype.getKaldir = function (id) {
        var params = new HttpParams().set("id", id);
        return this.http.get(this.linkKaldir, { params: params });
    };
    KullanicilarService = tslib_1.__decorate([
        Injectable(),
        tslib_1.__metadata("design:paramtypes", [HttpClient])
    ], KullanicilarService);
    return KullanicilarService;
}());
export { KullanicilarService };
//# sourceMappingURL=kullanicilar.js.map