import * as tslib_1 from "tslib";
import { Injectable } from "@angular/core";
import { HttpClient, HttpParams } from '@angular/common/http';
var TiplerService = /** @class */ (function () {
    function TiplerService(http) {
        this.http = http;
        this.linkIndex = "Ajax/Tipler/Index";
        this.linkEkle = "Ajax/Tipler/Ekle";
        this.linkDuzenle = "Ajax/Tipler/Duzenle";
        this.linkSil = "Ajax/Tipler/Sil";
    }
    TiplerService.prototype.getIndex = function () {
        return this.http.get(this.linkIndex);
    };
    TiplerService.prototype.getEkle = function () {
        return this.http.get(this.linkEkle);
    };
    TiplerService.prototype.postEkle = function (model) {
        return this.http.post(this.linkEkle, model);
    };
    TiplerService.prototype.getDuzenle = function (id) {
        var params = new HttpParams().set("id", id);
        return this.http.get(this.linkDuzenle, { params: params });
    };
    TiplerService.prototype.postDuzenle = function (model) {
        return this.http.post(this.linkDuzenle, model);
    };
    TiplerService.prototype.getSil = function (id) {
        var params = new HttpParams().set("id", id);
        return this.http.get(this.linkSil, { params: params });
    };
    TiplerService = tslib_1.__decorate([
        Injectable(),
        tslib_1.__metadata("design:paramtypes", [HttpClient])
    ], TiplerService);
    return TiplerService;
}());
export { TiplerService };
//# sourceMappingURL=tipler.js.map