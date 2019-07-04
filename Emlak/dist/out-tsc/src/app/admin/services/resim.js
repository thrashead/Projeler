import * as tslib_1 from "tslib";
import { Injectable } from "@angular/core";
import { HttpClient, HttpParams } from '@angular/common/http';
var ResimService = /** @class */ (function () {
    function ResimService(http) {
        this.http = http;
        this.linkIndex = "Ajax/Resim/Index";
        this.linkEkle = "Ajax/Resim/Ekle";
        this.linkDuzenle = "Ajax/Resim/Duzenle";
        this.linkSil = "Ajax/Resim/Sil";
        this.linkKaldir = "Ajax/Resim/Kaldir";
        this.linkEkleYukle = "Ajax/Resim/EkleYukle";
        this.linkDuzenleYukle = "Ajax/Resim/DuzenleYukle";
    }
    ResimService.prototype.getIndex = function () {
        return this.http.get(this.linkIndex);
    };
    ResimService.prototype.getEkle = function () {
        return this.http.get(this.linkEkle);
    };
    ResimService.prototype.postEkle = function (model) {
        return this.http.post(this.linkEkle, model);
    };
    ResimService.prototype.getDuzenle = function (id) {
        var params = new HttpParams().set("id", id);
        return this.http.get(this.linkDuzenle, { params: params });
    };
    ResimService.prototype.postDuzenle = function (model) {
        return this.http.post(this.linkDuzenle, model);
    };
    ResimService.prototype.getSil = function (id) {
        var params = new HttpParams().set("id", id);
        return this.http.get(this.linkSil, { params: params });
    };
    ResimService.prototype.getKaldir = function (id) {
        var params = new HttpParams().set("id", id);
        return this.http.get(this.linkKaldir, { params: params });
    };
    ResimService.prototype.postEkleYukle = function (model) {
        return this.http.post(this.linkEkleYukle, model);
    };
    ResimService.prototype.postDuzenleYukle = function (model) {
        return this.http.post(this.linkDuzenleYukle, model);
    };
    ResimService = tslib_1.__decorate([
        Injectable(),
        tslib_1.__metadata("design:paramtypes", [HttpClient])
    ], ResimService);
    return ResimService;
}());
export { ResimService };
//# sourceMappingURL=resim.js.map