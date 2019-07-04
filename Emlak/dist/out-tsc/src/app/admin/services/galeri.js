import * as tslib_1 from "tslib";
import { Injectable } from "@angular/core";
import { HttpClient, HttpParams } from '@angular/common/http';
var GaleriService = /** @class */ (function () {
    function GaleriService(http) {
        this.http = http;
        this.linkIndex = "Ajax/Galeri/Index";
        this.linkEkle = "Ajax/Galeri/Ekle";
        this.linkDuzenle = "Ajax/Galeri/Duzenle";
        this.linkSil = "Ajax/Galeri/Sil";
        this.linkKaldir = "Ajax/Galeri/Kaldir";
        this.linkKopyala = "Ajax/Galeri/Kopyala";
    }
    GaleriService.prototype.getIndex = function () {
        return this.http.get(this.linkIndex);
    };
    GaleriService.prototype.getEkle = function () {
        return this.http.get(this.linkEkle);
    };
    GaleriService.prototype.postEkle = function (model) {
        return this.http.post(this.linkEkle, model);
    };
    GaleriService.prototype.getDuzenle = function (id) {
        var params = new HttpParams().set("id", id);
        return this.http.get(this.linkDuzenle, { params: params });
    };
    GaleriService.prototype.postDuzenle = function (model) {
        return this.http.post(this.linkDuzenle, model);
    };
    GaleriService.prototype.getSil = function (id) {
        var params = new HttpParams().set("id", id);
        return this.http.get(this.linkSil, { params: params });
    };
    GaleriService.prototype.getKaldir = function (id) {
        var params = new HttpParams().set("id", id);
        return this.http.get(this.linkKaldir, { params: params });
    };
    GaleriService.prototype.getKopyala = function (id) {
        var params = new HttpParams().set("id", id);
        return this.http.get(this.linkKopyala, { params: params });
    };
    GaleriService = tslib_1.__decorate([
        Injectable(),
        tslib_1.__metadata("design:paramtypes", [HttpClient])
    ], GaleriService);
    return GaleriService;
}());
export { GaleriService };
//# sourceMappingURL=galeri.js.map