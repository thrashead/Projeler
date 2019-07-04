import * as tslib_1 from "tslib";
import { Injectable } from "@angular/core";
import { HttpClient, HttpParams } from '@angular/common/http';
var EmlakDilService = /** @class */ (function () {
    function EmlakDilService(http) {
        this.http = http;
        this.linkIndex = "Ajax/EmlakDil/Index";
        this.linkEkle = "Ajax/EmlakDil/Ekle";
        this.linkDuzenle = "Ajax/EmlakDil/Duzenle";
        this.linkSil = "Ajax/EmlakDil/Sil";
        this.linkKaldir = "Ajax/EmlakDil/Kaldir";
    }
    EmlakDilService.prototype.getIndex = function () {
        return this.http.get(this.linkIndex);
    };
    EmlakDilService.prototype.getEkle = function (linkID) {
        var params = new HttpParams().set("linkID", linkID);
        return this.http.get(this.linkEkle, { params: params });
    };
    EmlakDilService.prototype.postEkle = function (model) {
        return this.http.post(this.linkEkle, model);
    };
    EmlakDilService.prototype.getDuzenle = function (id) {
        var params = new HttpParams().set("id", id);
        return this.http.get(this.linkDuzenle, { params: params });
    };
    EmlakDilService.prototype.postDuzenle = function (model) {
        return this.http.post(this.linkDuzenle, model);
    };
    EmlakDilService.prototype.getSil = function (id) {
        var params = new HttpParams().set("id", id);
        return this.http.get(this.linkSil, { params: params });
    };
    EmlakDilService.prototype.getKaldir = function (id) {
        var params = new HttpParams().set("id", id);
        return this.http.get(this.linkKaldir, { params: params });
    };
    EmlakDilService = tslib_1.__decorate([
        Injectable(),
        tslib_1.__metadata("design:paramtypes", [HttpClient])
    ], EmlakDilService);
    return EmlakDilService;
}());
export { EmlakDilService };
//# sourceMappingURL=emlakdil.js.map