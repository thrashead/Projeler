import * as tslib_1 from "tslib";
import { Injectable } from "@angular/core";
import { HttpClient, HttpParams } from '@angular/common/http';
var UrunService = /** @class */ (function () {
    function UrunService(http) {
        this.http = http;
        this.linkIndex = "Ajax/Urun/Index";
        this.linkEkle = "Ajax/Urun/Ekle";
        this.linkDuzenle = "Ajax/Urun/Duzenle";
        this.linkSil = "Ajax/Urun/Sil";
        this.linkKaldir = "Ajax/Urun/Kaldir";
        this.linkKopyala = "Ajax/Urun/Kopyala";
    }
    UrunService.prototype.getIndex = function () {
        return this.http.get(this.linkIndex);
    };
    UrunService.prototype.getEkle = function () {
        return this.http.get(this.linkEkle);
    };
    UrunService.prototype.postEkle = function (model) {
        return this.http.post(this.linkEkle, model);
    };
    UrunService.prototype.getDuzenle = function (id) {
        var params = new HttpParams().set("id", id);
        return this.http.get(this.linkDuzenle, { params: params });
    };
    UrunService.prototype.postDuzenle = function (model) {
        return this.http.post(this.linkDuzenle, model);
    };
    UrunService.prototype.getSil = function (id) {
        var params = new HttpParams().set("id", id);
        return this.http.get(this.linkSil, { params: params });
    };
    UrunService.prototype.getKaldir = function (id) {
        var params = new HttpParams().set("id", id);
        return this.http.get(this.linkKaldir, { params: params });
    };
    UrunService.prototype.getKopyala = function (id) {
        var params = new HttpParams().set("id", id);
        return this.http.get(this.linkKopyala, { params: params });
    };
    UrunService = tslib_1.__decorate([
        Injectable(),
        tslib_1.__metadata("design:paramtypes", [HttpClient])
    ], UrunService);
    return UrunService;
}());
export { UrunService };
//# sourceMappingURL=urun.js.map