import * as tslib_1 from "tslib";
import { Injectable } from "@angular/core";
import { HttpClient, HttpParams } from '@angular/common/http';
var DosyaService = /** @class */ (function () {
    function DosyaService(http) {
        this.http = http;
        this.linkIndex = "Ajax/Dosya/Index";
        this.linkEkle = "Ajax/Dosya/Ekle";
        this.linkDuzenle = "Ajax/Dosya/Duzenle";
        this.linkSil = "Ajax/Dosya/Sil";
        this.linkKaldir = "Ajax/Dosya/Kaldir";
        this.linkEkleYukle = "Ajax/Dosya/EkleYukle";
        this.linkDuzenleYukle = "Ajax/Dosya/DuzenleYukle";
    }
    DosyaService.prototype.getIndex = function () {
        return this.http.get(this.linkIndex);
    };
    DosyaService.prototype.getEkle = function () {
        return this.http.get(this.linkEkle);
    };
    DosyaService.prototype.postEkle = function (model) {
        return this.http.post(this.linkEkle, model);
    };
    DosyaService.prototype.getDuzenle = function (id) {
        var params = new HttpParams().set("id", id);
        return this.http.get(this.linkDuzenle, { params: params });
    };
    DosyaService.prototype.postDuzenle = function (model) {
        return this.http.post(this.linkDuzenle, model);
    };
    DosyaService.prototype.getSil = function (id) {
        var params = new HttpParams().set("id", id);
        return this.http.get(this.linkSil, { params: params });
    };
    DosyaService.prototype.getKaldir = function (id) {
        var params = new HttpParams().set("id", id);
        return this.http.get(this.linkKaldir, { params: params });
    };
    DosyaService.prototype.postEkleYukle = function (model) {
        return this.http.post(this.linkEkleYukle, model);
    };
    DosyaService.prototype.postDuzenleYukle = function (model) {
        return this.http.post(this.linkDuzenleYukle, model);
    };
    DosyaService = tslib_1.__decorate([
        Injectable(),
        tslib_1.__metadata("design:paramtypes", [HttpClient])
    ], DosyaService);
    return DosyaService;
}());
export { DosyaService };
//# sourceMappingURL=dosya.js.map