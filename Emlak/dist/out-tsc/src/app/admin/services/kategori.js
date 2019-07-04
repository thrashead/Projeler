import * as tslib_1 from "tslib";
import { Injectable } from "@angular/core";
import { HttpClient, HttpParams } from '@angular/common/http';
var KategoriService = /** @class */ (function () {
    function KategoriService(http) {
        this.http = http;
        this.linkIndex = "Ajax/Kategori/Index";
        this.linkEkle = "Ajax/Kategori/Ekle";
        this.linkDuzenle = "Ajax/Kategori/Duzenle";
        this.linkSil = "Ajax/Kategori/Sil";
        this.linkKaldir = "Ajax/Kategori/Kaldir";
        this.linkKopyala = "Ajax/Kategori/Kopyala";
    }
    KategoriService.prototype.getIndex = function () {
        return this.http.get(this.linkIndex);
    };
    KategoriService.prototype.getEkle = function () {
        return this.http.get(this.linkEkle);
    };
    KategoriService.prototype.postEkle = function (model) {
        return this.http.post(this.linkEkle, model);
    };
    KategoriService.prototype.getDuzenle = function (id) {
        var params = new HttpParams().set("id", id);
        return this.http.get(this.linkDuzenle, { params: params });
    };
    KategoriService.prototype.postDuzenle = function (model) {
        return this.http.post(this.linkDuzenle, model);
    };
    KategoriService.prototype.getSil = function (id) {
        var params = new HttpParams().set("id", id);
        return this.http.get(this.linkSil, { params: params });
    };
    KategoriService.prototype.getKaldir = function (id) {
        var params = new HttpParams().set("id", id);
        return this.http.get(this.linkKaldir, { params: params });
    };
    KategoriService.prototype.getKopyala = function (id) {
        var params = new HttpParams().set("id", id);
        return this.http.get(this.linkKopyala, { params: params });
    };
    KategoriService = tslib_1.__decorate([
        Injectable(),
        tslib_1.__metadata("design:paramtypes", [HttpClient])
    ], KategoriService);
    return KategoriService;
}());
export { KategoriService };
//# sourceMappingURL=kategori.js.map