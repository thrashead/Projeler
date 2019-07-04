import * as tslib_1 from "tslib";
import { Injectable } from "@angular/core";
import { HttpClient, HttpParams } from '@angular/common/http';
var KullaniciGrupTabloService = /** @class */ (function () {
    function KullaniciGrupTabloService(http) {
        this.http = http;
        this.linkIndex = "Ajax/KullaniciGrupTablo/Index";
        this.linkEkle = "Ajax/KullaniciGrupTablo/Ekle";
        this.linkDuzenle = "Ajax/KullaniciGrupTablo/Duzenle";
        this.linkSil = "Ajax/KullaniciGrupTablo/Sil";
    }
    KullaniciGrupTabloService.prototype.getIndex = function () {
        return this.http.get(this.linkIndex);
    };
    KullaniciGrupTabloService.prototype.getEkle = function (linkID) {
        var params = new HttpParams().set("linkID", linkID);
        return this.http.get(this.linkEkle, { params: params });
    };
    KullaniciGrupTabloService.prototype.postEkle = function (model) {
        return this.http.post(this.linkEkle, model);
    };
    KullaniciGrupTabloService.prototype.getDuzenle = function (id) {
        var params = new HttpParams().set("id", id);
        return this.http.get(this.linkDuzenle, { params: params });
    };
    KullaniciGrupTabloService.prototype.postDuzenle = function (model) {
        return this.http.post(this.linkDuzenle, model);
    };
    KullaniciGrupTabloService.prototype.getSil = function (id) {
        var params = new HttpParams().set("id", id);
        return this.http.get(this.linkSil, { params: params });
    };
    KullaniciGrupTabloService = tslib_1.__decorate([
        Injectable(),
        tslib_1.__metadata("design:paramtypes", [HttpClient])
    ], KullaniciGrupTabloService);
    return KullaniciGrupTabloService;
}());
export { KullaniciGrupTabloService };
//# sourceMappingURL=kullanicigruptablo.js.map