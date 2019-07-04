import * as tslib_1 from "tslib";
import { Injectable } from "@angular/core";
import { HttpClient, HttpParams } from '@angular/common/http';
var KategoriDilService = /** @class */ (function () {
    function KategoriDilService(http) {
        this.http = http;
        this.linkIndex = "Ajax/KategoriDil/Index";
        this.linkEkle = "Ajax/KategoriDil/Ekle";
        this.linkDuzenle = "Ajax/KategoriDil/Duzenle";
        this.linkSil = "Ajax/KategoriDil/Sil";
        this.linkKaldir = "Ajax/KategoriDil/Kaldir";
    }
    KategoriDilService.prototype.getIndex = function () {
        return this.http.get(this.linkIndex);
    };
    KategoriDilService.prototype.getEkle = function (linkID) {
        var params = new HttpParams().set("linkID", linkID);
        return this.http.get(this.linkEkle, { params: params });
    };
    KategoriDilService.prototype.postEkle = function (model) {
        return this.http.post(this.linkEkle, model);
    };
    KategoriDilService.prototype.getDuzenle = function (id) {
        var params = new HttpParams().set("id", id);
        return this.http.get(this.linkDuzenle, { params: params });
    };
    KategoriDilService.prototype.postDuzenle = function (model) {
        return this.http.post(this.linkDuzenle, model);
    };
    KategoriDilService.prototype.getSil = function (id) {
        var params = new HttpParams().set("id", id);
        return this.http.get(this.linkSil, { params: params });
    };
    KategoriDilService.prototype.getKaldir = function (id) {
        var params = new HttpParams().set("id", id);
        return this.http.get(this.linkKaldir, { params: params });
    };
    KategoriDilService = tslib_1.__decorate([
        Injectable(),
        tslib_1.__metadata("design:paramtypes", [HttpClient])
    ], KategoriDilService);
    return KategoriDilService;
}());
export { KategoriDilService };
//# sourceMappingURL=kategoridil.js.map