import * as tslib_1 from "tslib";
import { Injectable } from "@angular/core";
import { HttpClient, HttpParams } from '@angular/common/http';
var BagliTiplerService = /** @class */ (function () {
    function BagliTiplerService(http) {
        this.http = http;
        this.linkIndex = "Ajax/BagliTipler/Index";
        this.linkEkle = "Ajax/BagliTipler/Ekle";
        this.linkDuzenle = "Ajax/BagliTipler/Duzenle";
        this.linkSil = "Ajax/BagliTipler/Sil";
        this.linkKopyala = "Ajax/BagliTipler/Kopyala";
        this.linkTipDoldur = "Ajax/BagliTipler/TipDoldur";
    }
    BagliTiplerService.prototype.getIndex = function () {
        return this.http.get(this.linkIndex);
    };
    BagliTiplerService.prototype.getEkle = function () {
        return this.http.get(this.linkEkle);
    };
    BagliTiplerService.prototype.postEkle = function (model) {
        return this.http.post(this.linkEkle, model);
    };
    BagliTiplerService.prototype.getDuzenle = function (id) {
        var params = new HttpParams().set("id", id);
        return this.http.get(this.linkDuzenle, { params: params });
    };
    BagliTiplerService.prototype.postDuzenle = function (model) {
        return this.http.post(this.linkDuzenle, model);
    };
    BagliTiplerService.prototype.getSil = function (id) {
        var params = new HttpParams().set("id", id);
        return this.http.get(this.linkSil, { params: params });
    };
    BagliTiplerService.prototype.getKopyala = function (id) {
        var params = new HttpParams().set("id", id);
        return this.http.get(this.linkKopyala, { params: params });
    };
    BagliTiplerService.prototype.getTipDoldur = function (typeID) {
        var params = new HttpParams().set("typeID", typeID);
        return this.http.get(this.linkTipDoldur, { params: params });
    };
    BagliTiplerService = tslib_1.__decorate([
        Injectable(),
        tslib_1.__metadata("design:paramtypes", [HttpClient])
    ], BagliTiplerService);
    return BagliTiplerService;
}());
export { BagliTiplerService };
//# sourceMappingURL=baglitipler.js.map