import * as tslib_1 from "tslib";
import { Injectable } from "@angular/core";
import { HttpClient, HttpParams } from '@angular/common/http';
var KullaniciGrupHakService = /** @class */ (function () {
    function KullaniciGrupHakService(http) {
        this.http = http;
        this.linkIndex = "Ajax/KullaniciGrupHak/Index";
        this.linkEkle = "Ajax/KullaniciGrupHak/Ekle";
        this.linkDuzenle = "Ajax/KullaniciGrupHak/Duzenle";
        this.linkSil = "Ajax/KullaniciGrupHak/Sil";
    }
    KullaniciGrupHakService.prototype.getIndex = function () {
        return this.http.get(this.linkIndex);
    };
    KullaniciGrupHakService.prototype.getEkle = function (linkID) {
        var params = new HttpParams().set("linkID", linkID);
        return this.http.get(this.linkEkle, { params: params });
    };
    KullaniciGrupHakService.prototype.postEkle = function (model) {
        return this.http.post(this.linkEkle, model);
    };
    KullaniciGrupHakService.prototype.getDuzenle = function (id) {
        var params = new HttpParams().set("id", id);
        return this.http.get(this.linkDuzenle, { params: params });
    };
    KullaniciGrupHakService.prototype.postDuzenle = function (model) {
        return this.http.post(this.linkDuzenle, model);
    };
    KullaniciGrupHakService.prototype.getSil = function (id) {
        var params = new HttpParams().set("id", id);
        return this.http.get(this.linkSil, { params: params });
    };
    KullaniciGrupHakService = tslib_1.__decorate([
        Injectable(),
        tslib_1.__metadata("design:paramtypes", [HttpClient])
    ], KullaniciGrupHakService);
    return KullaniciGrupHakService;
}());
export { KullaniciGrupHakService };
//# sourceMappingURL=kullanicigruphak.js.map