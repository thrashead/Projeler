import * as tslib_1 from "tslib";
import { Injectable } from "@angular/core";
import { HttpClient, HttpParams } from '@angular/common/http';
var KullaniciGrupService = /** @class */ (function () {
    function KullaniciGrupService(http) {
        this.http = http;
        this.linkIndex = "Ajax/KullaniciGrup/Index";
        this.linkEkle = "Ajax/KullaniciGrup/Ekle";
        this.linkDuzenle = "Ajax/KullaniciGrup/Duzenle";
        this.linkSil = "Ajax/KullaniciGrup/Sil";
    }
    KullaniciGrupService.prototype.getIndex = function () {
        return this.http.get(this.linkIndex);
    };
    KullaniciGrupService.prototype.getEkle = function () {
        return this.http.get(this.linkEkle);
    };
    KullaniciGrupService.prototype.postEkle = function (model) {
        return this.http.post(this.linkEkle, model);
    };
    KullaniciGrupService.prototype.getDuzenle = function (id) {
        var params = new HttpParams().set("id", id);
        return this.http.get(this.linkDuzenle, { params: params });
    };
    KullaniciGrupService.prototype.postDuzenle = function (model) {
        return this.http.post(this.linkDuzenle, model);
    };
    KullaniciGrupService.prototype.getSil = function (id) {
        var params = new HttpParams().set("id", id);
        return this.http.get(this.linkSil, { params: params });
    };
    KullaniciGrupService = tslib_1.__decorate([
        Injectable(),
        tslib_1.__metadata("design:paramtypes", [HttpClient])
    ], KullaniciGrupService);
    return KullaniciGrupService;
}());
export { KullaniciGrupService };
//# sourceMappingURL=kullanicigrup.js.map