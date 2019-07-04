import * as tslib_1 from "tslib";
import { Injectable } from "@angular/core";
import { HttpClient, HttpParams } from '@angular/common/http';
var GaleriDilService = /** @class */ (function () {
    function GaleriDilService(http) {
        this.http = http;
        this.linkIndex = "Ajax/GaleriDil/Index";
        this.linkEkle = "Ajax/GaleriDil/Ekle";
        this.linkDuzenle = "Ajax/GaleriDil/Duzenle";
        this.linkSil = "Ajax/GaleriDil/Sil";
        this.linkKaldir = "Ajax/GaleriDil/Kaldir";
    }
    GaleriDilService.prototype.getIndex = function () {
        return this.http.get(this.linkIndex);
    };
    GaleriDilService.prototype.getEkle = function (linkID) {
        var params = new HttpParams().set("linkID", linkID);
        return this.http.get(this.linkEkle, { params: params });
    };
    GaleriDilService.prototype.postEkle = function (model) {
        return this.http.post(this.linkEkle, model);
    };
    GaleriDilService.prototype.getDuzenle = function (id) {
        var params = new HttpParams().set("id", id);
        return this.http.get(this.linkDuzenle, { params: params });
    };
    GaleriDilService.prototype.postDuzenle = function (model) {
        return this.http.post(this.linkDuzenle, model);
    };
    GaleriDilService.prototype.getSil = function (id) {
        var params = new HttpParams().set("id", id);
        return this.http.get(this.linkSil, { params: params });
    };
    GaleriDilService.prototype.getKaldir = function (id) {
        var params = new HttpParams().set("id", id);
        return this.http.get(this.linkKaldir, { params: params });
    };
    GaleriDilService = tslib_1.__decorate([
        Injectable(),
        tslib_1.__metadata("design:paramtypes", [HttpClient])
    ], GaleriDilService);
    return GaleriDilService;
}());
export { GaleriDilService };
//# sourceMappingURL=galeridil.js.map