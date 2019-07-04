import * as tslib_1 from "tslib";
import { Injectable } from "@angular/core";
import { HttpClient, HttpParams } from '@angular/common/http';
var KullaniciGrupIslemService = /** @class */ (function () {
    function KullaniciGrupIslemService(http) {
        this.http = http;
        this.linkIndex = "Ajax/KullaniciGrupIslem/Index";
        this.linkEkle = "Ajax/KullaniciGrupIslem/Ekle";
        this.linkDuzenle = "Ajax/KullaniciGrupIslem/Duzenle";
        this.linkSil = "Ajax/KullaniciGrupIslem/Sil";
    }
    KullaniciGrupIslemService.prototype.getIndex = function () {
        return this.http.get(this.linkIndex);
    };
    KullaniciGrupIslemService.prototype.getEkle = function () {
        return this.http.get(this.linkEkle);
    };
    KullaniciGrupIslemService.prototype.postEkle = function (model) {
        return this.http.post(this.linkEkle, model);
    };
    KullaniciGrupIslemService.prototype.getDuzenle = function (id) {
        var params = new HttpParams().set("id", id);
        return this.http.get(this.linkDuzenle, { params: params });
    };
    KullaniciGrupIslemService.prototype.postDuzenle = function (model) {
        return this.http.post(this.linkDuzenle, model);
    };
    KullaniciGrupIslemService.prototype.getSil = function (id) {
        var params = new HttpParams().set("id", id);
        return this.http.get(this.linkSil, { params: params });
    };
    KullaniciGrupIslemService = tslib_1.__decorate([
        Injectable(),
        tslib_1.__metadata("design:paramtypes", [HttpClient])
    ], KullaniciGrupIslemService);
    return KullaniciGrupIslemService;
}());
export { KullaniciGrupIslemService };
//# sourceMappingURL=kullanicigrupislem.js.map