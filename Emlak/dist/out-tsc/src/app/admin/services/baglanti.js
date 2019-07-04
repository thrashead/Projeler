import * as tslib_1 from "tslib";
import { Injectable } from "@angular/core";
import { HttpClient, HttpParams } from '@angular/common/http';
var BaglantiService = /** @class */ (function () {
    function BaglantiService(http) {
        this.http = http;
        this.linkIndex = "Ajax/Baglanti/Index";
        this.linkEkle = "Ajax/Baglanti/Ekle";
        this.linkDuzenle = "Ajax/Baglanti/Duzenle";
        this.linkSil = "Ajax/Baglanti/Sil";
        this.linkNesneDoldur = "Ajax/Baglanti/NesneDoldur";
    }
    BaglantiService.prototype.getIndex = function () {
        return this.http.get(this.linkIndex);
    };
    BaglantiService.prototype.getEkle = function (linkID) {
        var params = new HttpParams().set("linkID", linkID);
        return this.http.get(this.linkEkle, { params: params });
    };
    BaglantiService.prototype.postEkle = function (model) {
        return this.http.post(this.linkEkle, model);
    };
    BaglantiService.prototype.getDuzenle = function (id) {
        var params = new HttpParams().set("id", id);
        return this.http.get(this.linkDuzenle, { params: params });
    };
    BaglantiService.prototype.postDuzenle = function (model) {
        return this.http.post(this.linkDuzenle, model);
    };
    BaglantiService.prototype.getSil = function (id) {
        var params = new HttpParams().set("id", id);
        return this.http.get(this.linkSil, { params: params });
    };
    BaglantiService.prototype.getNesneDoldur = function (linkTypeID) {
        var params = new HttpParams().set("linkTypeID", linkTypeID);
        return this.http.get(this.linkNesneDoldur, { params: params });
    };
    BaglantiService = tslib_1.__decorate([
        Injectable(),
        tslib_1.__metadata("design:paramtypes", [HttpClient])
    ], BaglantiService);
    return BaglantiService;
}());
export { BaglantiService };
//# sourceMappingURL=baglanti.js.map