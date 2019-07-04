import * as tslib_1 from "tslib";
import { Injectable } from "@angular/core";
import { HttpClient, HttpParams } from '@angular/common/http';
var MetaService = /** @class */ (function () {
    function MetaService(http) {
        this.http = http;
        this.linkIndex = "Ajax/Meta/Index";
        this.linkEkle = "Ajax/Meta/Ekle";
        this.linkDuzenle = "Ajax/Meta/Duzenle";
        this.linkSil = "Ajax/Meta/Sil";
        this.linkKaldir = "Ajax/Meta/Kaldir";
        this.linkKopyala = "Ajax/Meta/Kopyala";
    }
    MetaService.prototype.getIndex = function () {
        return this.http.get(this.linkIndex);
    };
    MetaService.prototype.getEkle = function () {
        return this.http.get(this.linkEkle);
    };
    MetaService.prototype.postEkle = function (model) {
        return this.http.post(this.linkEkle, model);
    };
    MetaService.prototype.getDuzenle = function (id) {
        var params = new HttpParams().set("id", id);
        return this.http.get(this.linkDuzenle, { params: params });
    };
    MetaService.prototype.postDuzenle = function (model) {
        return this.http.post(this.linkDuzenle, model);
    };
    MetaService.prototype.getSil = function (id) {
        var params = new HttpParams().set("id", id);
        return this.http.get(this.linkSil, { params: params });
    };
    MetaService.prototype.getKaldir = function (id) {
        var params = new HttpParams().set("id", id);
        return this.http.get(this.linkKaldir, { params: params });
    };
    MetaService.prototype.getKopyala = function (id) {
        var params = new HttpParams().set("id", id);
        return this.http.get(this.linkKopyala, { params: params });
    };
    MetaService = tslib_1.__decorate([
        Injectable(),
        tslib_1.__metadata("design:paramtypes", [HttpClient])
    ], MetaService);
    return MetaService;
}());
export { MetaService };
//# sourceMappingURL=meta.js.map