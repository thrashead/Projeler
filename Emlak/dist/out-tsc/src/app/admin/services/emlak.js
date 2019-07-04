import * as tslib_1 from "tslib";
import { Injectable } from "@angular/core";
import { HttpClient, HttpParams } from '@angular/common/http';
var EmlakService = /** @class */ (function () {
    function EmlakService(http) {
        this.http = http;
        this.linkIndex = "Ajax/Emlak/Index";
        this.linkEkle = "Ajax/Emlak/Ekle";
        this.linkDuzenle = "Ajax/Emlak/Duzenle";
        this.linkSil = "Ajax/Emlak/Sil";
        this.linkKaldir = "Ajax/Emlak/Kaldir";
        this.linkKopyala = "Ajax/Emlak/Kopyala";
    }
    EmlakService.prototype.getIndex = function () {
        return this.http.get(this.linkIndex);
    };
    EmlakService.prototype.getEkle = function () {
        return this.http.get(this.linkEkle);
    };
    EmlakService.prototype.postEkle = function (model) {
        return this.http.post(this.linkEkle, model);
    };
    EmlakService.prototype.getDuzenle = function (id) {
        var params = new HttpParams().set("id", id);
        return this.http.get(this.linkDuzenle, { params: params });
    };
    EmlakService.prototype.postDuzenle = function (model) {
        return this.http.post(this.linkDuzenle, model);
    };
    EmlakService.prototype.getSil = function (id) {
        var params = new HttpParams().set("id", id);
        return this.http.get(this.linkSil, { params: params });
    };
    EmlakService.prototype.getKaldir = function (id) {
        var params = new HttpParams().set("id", id);
        return this.http.get(this.linkKaldir, { params: params });
    };
    EmlakService.prototype.getKopyala = function (id) {
        var params = new HttpParams().set("id", id);
        return this.http.get(this.linkKopyala, { params: params });
    };
    EmlakService = tslib_1.__decorate([
        Injectable(),
        tslib_1.__metadata("design:paramtypes", [HttpClient])
    ], EmlakService);
    return EmlakService;
}());
export { EmlakService };
//# sourceMappingURL=emlak.js.map