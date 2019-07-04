import * as tslib_1 from "tslib";
import { Injectable } from "@angular/core";
import { HttpClient, HttpParams } from '@angular/common/http';
var IcerikService = /** @class */ (function () {
    function IcerikService(http) {
        this.http = http;
        this.linkIndex = "Ajax/Icerik/Index";
        this.linkEkle = "Ajax/Icerik/Ekle";
        this.linkDuzenle = "Ajax/Icerik/Duzenle";
        this.linkSil = "Ajax/Icerik/Sil";
        this.linkKaldir = "Ajax/Icerik/Kaldir";
        this.linkKopyala = "Ajax/Icerik/Kopyala";
    }
    IcerikService.prototype.getIndex = function () {
        return this.http.get(this.linkIndex);
    };
    IcerikService.prototype.getEkle = function () {
        return this.http.get(this.linkEkle);
    };
    IcerikService.prototype.postEkle = function (model) {
        return this.http.post(this.linkEkle, model);
    };
    IcerikService.prototype.getDuzenle = function (id) {
        var params = new HttpParams().set("id", id);
        return this.http.get(this.linkDuzenle, { params: params });
    };
    IcerikService.prototype.postDuzenle = function (model) {
        return this.http.post(this.linkDuzenle, model);
    };
    IcerikService.prototype.getSil = function (id) {
        var params = new HttpParams().set("id", id);
        return this.http.get(this.linkSil, { params: params });
    };
    IcerikService.prototype.getKaldir = function (id) {
        var params = new HttpParams().set("id", id);
        return this.http.get(this.linkKaldir, { params: params });
    };
    IcerikService.prototype.getKopyala = function (id) {
        var params = new HttpParams().set("id", id);
        return this.http.get(this.linkKopyala, { params: params });
    };
    IcerikService = tslib_1.__decorate([
        Injectable(),
        tslib_1.__metadata("design:paramtypes", [HttpClient])
    ], IcerikService);
    return IcerikService;
}());
export { IcerikService };
//# sourceMappingURL=icerik.js.map