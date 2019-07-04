import * as tslib_1 from "tslib";
import { Injectable } from "@angular/core";
import { HttpClient, HttpParams } from '@angular/common/http';
var IcerikDilService = /** @class */ (function () {
    function IcerikDilService(http) {
        this.http = http;
        this.linkIndex = "Ajax/IcerikDil/Index";
        this.linkEkle = "Ajax/IcerikDil/Ekle";
        this.linkDuzenle = "Ajax/IcerikDil/Duzenle";
        this.linkSil = "Ajax/IcerikDil/Sil";
        this.linkKaldir = "Ajax/IcerikDil/Kaldir";
    }
    IcerikDilService.prototype.getIndex = function () {
        return this.http.get(this.linkIndex);
    };
    IcerikDilService.prototype.getEkle = function (linkID) {
        var params = new HttpParams().set("linkID", linkID);
        return this.http.get(this.linkEkle, { params: params });
    };
    IcerikDilService.prototype.postEkle = function (model) {
        return this.http.post(this.linkEkle, model);
    };
    IcerikDilService.prototype.getDuzenle = function (id) {
        var params = new HttpParams().set("id", id);
        return this.http.get(this.linkDuzenle, { params: params });
    };
    IcerikDilService.prototype.postDuzenle = function (model) {
        return this.http.post(this.linkDuzenle, model);
    };
    IcerikDilService.prototype.getSil = function (id) {
        var params = new HttpParams().set("id", id);
        return this.http.get(this.linkSil, { params: params });
    };
    IcerikDilService.prototype.getKaldir = function (id) {
        var params = new HttpParams().set("id", id);
        return this.http.get(this.linkKaldir, { params: params });
    };
    IcerikDilService = tslib_1.__decorate([
        Injectable(),
        tslib_1.__metadata("design:paramtypes", [HttpClient])
    ], IcerikDilService);
    return IcerikDilService;
}());
export { IcerikDilService };
//# sourceMappingURL=icerikdil.js.map