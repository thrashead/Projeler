import * as tslib_1 from "tslib";
import { Injectable } from "@angular/core";
import { HttpClient, HttpParams } from '@angular/common/http';
var MetaDilService = /** @class */ (function () {
    function MetaDilService(http) {
        this.http = http;
        this.linkIndex = "Ajax/MetaDil/Index";
        this.linkEkle = "Ajax/MetaDil/Ekle";
        this.linkDuzenle = "Ajax/MetaDil/Duzenle";
        this.linkSil = "Ajax/MetaDil/Sil";
        this.linkKaldir = "Ajax/MetaDil/Kaldir";
    }
    MetaDilService.prototype.getIndex = function () {
        return this.http.get(this.linkIndex);
    };
    MetaDilService.prototype.getEkle = function (linkID) {
        var params = new HttpParams().set("linkID", linkID);
        return this.http.get(this.linkEkle, { params: params });
    };
    MetaDilService.prototype.postEkle = function (model) {
        return this.http.post(this.linkEkle, model);
    };
    MetaDilService.prototype.getDuzenle = function (id) {
        var params = new HttpParams().set("id", id);
        return this.http.get(this.linkDuzenle, { params: params });
    };
    MetaDilService.prototype.postDuzenle = function (model) {
        return this.http.post(this.linkDuzenle, model);
    };
    MetaDilService.prototype.getSil = function (id) {
        var params = new HttpParams().set("id", id);
        return this.http.get(this.linkSil, { params: params });
    };
    MetaDilService.prototype.getKaldir = function (id) {
        var params = new HttpParams().set("id", id);
        return this.http.get(this.linkKaldir, { params: params });
    };
    MetaDilService = tslib_1.__decorate([
        Injectable(),
        tslib_1.__metadata("design:paramtypes", [HttpClient])
    ], MetaDilService);
    return MetaDilService;
}());
export { MetaDilService };
//# sourceMappingURL=metadil.js.map