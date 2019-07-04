import * as tslib_1 from "tslib";
import { Injectable } from "@angular/core";
import { HttpClient, HttpParams } from '@angular/common/http';
var LogIslemService = /** @class */ (function () {
    function LogIslemService(http) {
        this.http = http;
        this.linkIndex = "Ajax/LogIslem/Index";
        this.linkEkle = "Ajax/LogIslem/Ekle";
        this.linkDuzenle = "Ajax/LogIslem/Duzenle";
        this.linkSil = "Ajax/LogIslem/Sil";
    }
    LogIslemService.prototype.getIndex = function () {
        return this.http.get(this.linkIndex);
    };
    LogIslemService.prototype.getEkle = function (linkID) {
        var params = new HttpParams().set("linkID", linkID);
        return this.http.get(this.linkEkle, { params: params });
    };
    LogIslemService.prototype.postEkle = function (model) {
        return this.http.post(this.linkEkle, model);
    };
    LogIslemService.prototype.getDuzenle = function (id) {
        var params = new HttpParams().set("id", id);
        return this.http.get(this.linkDuzenle, { params: params });
    };
    LogIslemService.prototype.postDuzenle = function (model) {
        return this.http.post(this.linkDuzenle, model);
    };
    LogIslemService.prototype.getSil = function (id) {
        var params = new HttpParams().set("id", id);
        return this.http.get(this.linkSil, { params: params });
    };
    LogIslemService = tslib_1.__decorate([
        Injectable(),
        tslib_1.__metadata("design:paramtypes", [HttpClient])
    ], LogIslemService);
    return LogIslemService;
}());
export { LogIslemService };
//# sourceMappingURL=logislem.js.map