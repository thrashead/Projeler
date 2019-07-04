import * as tslib_1 from "tslib";
import { Injectable } from "@angular/core";
import { HttpClient, HttpParams } from '@angular/common/http';
var DilService = /** @class */ (function () {
    function DilService(http) {
        this.http = http;
        this.linkIndex = "Ajax/Dil/Index";
        this.linkEkle = "Ajax/Dil/Ekle";
        this.linkDuzenle = "Ajax/Dil/Duzenle";
        this.linkSil = "Ajax/Dil/Sil";
        this.linkKaldir = "Ajax/Dil/Kaldir";
        this.linkEkleYukle = "Ajax/Dil/EkleYukle";
        this.linkDuzenleYukle = "Ajax/Dil/DuzenleYukle";
    }
    DilService.prototype.getIndex = function () {
        return this.http.get(this.linkIndex);
    };
    DilService.prototype.getEkle = function () {
        return this.http.get(this.linkEkle);
    };
    DilService.prototype.postEkle = function (model) {
        return this.http.post(this.linkEkle, model);
    };
    DilService.prototype.getDuzenle = function (id) {
        var params = new HttpParams().set("id", id);
        return this.http.get(this.linkDuzenle, { params: params });
    };
    DilService.prototype.postDuzenle = function (model) {
        return this.http.post(this.linkDuzenle, model);
    };
    DilService.prototype.getSil = function (id) {
        var params = new HttpParams().set("id", id);
        return this.http.get(this.linkSil, { params: params });
    };
    DilService.prototype.getKaldir = function (id) {
        var params = new HttpParams().set("id", id);
        return this.http.get(this.linkKaldir, { params: params });
    };
    DilService.prototype.postEkleYukle = function (model) {
        return this.http.post(this.linkEkleYukle, model);
    };
    DilService.prototype.postDuzenleYukle = function (model) {
        return this.http.post(this.linkDuzenleYukle, model);
    };
    DilService = tslib_1.__decorate([
        Injectable(),
        tslib_1.__metadata("design:paramtypes", [HttpClient])
    ], DilService);
    return DilService;
}());
export { DilService };
//# sourceMappingURL=dil.js.map