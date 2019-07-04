import * as tslib_1 from "tslib";
import { Injectable } from "@angular/core";
import { HttpClient, HttpParams } from '@angular/common/http';
var UrunDilService = /** @class */ (function () {
    function UrunDilService(http) {
        this.http = http;
        this.linkIndex = "Ajax/UrunDil/Index";
        this.linkEkle = "Ajax/UrunDil/Ekle";
        this.linkDuzenle = "Ajax/UrunDil/Duzenle";
        this.linkSil = "Ajax/UrunDil/Sil";
        this.linkKaldir = "Ajax/UrunDil/Kaldir";
    }
    UrunDilService.prototype.getIndex = function () {
        return this.http.get(this.linkIndex);
    };
    UrunDilService.prototype.getEkle = function (linkID) {
        var params = new HttpParams().set("linkID", linkID);
        return this.http.get(this.linkEkle, { params: params });
    };
    UrunDilService.prototype.postEkle = function (model) {
        return this.http.post(this.linkEkle, model);
    };
    UrunDilService.prototype.getDuzenle = function (id) {
        var params = new HttpParams().set("id", id);
        return this.http.get(this.linkDuzenle, { params: params });
    };
    UrunDilService.prototype.postDuzenle = function (model) {
        return this.http.post(this.linkDuzenle, model);
    };
    UrunDilService.prototype.getSil = function (id) {
        var params = new HttpParams().set("id", id);
        return this.http.get(this.linkSil, { params: params });
    };
    UrunDilService.prototype.getKaldir = function (id) {
        var params = new HttpParams().set("id", id);
        return this.http.get(this.linkKaldir, { params: params });
    };
    UrunDilService = tslib_1.__decorate([
        Injectable(),
        tslib_1.__metadata("design:paramtypes", [HttpClient])
    ], UrunDilService);
    return UrunDilService;
}());
export { UrunDilService };
//# sourceMappingURL=urundil.js.map