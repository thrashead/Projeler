import * as tslib_1 from "tslib";
import { Injectable } from "@angular/core";
import { HttpClient, HttpParams } from '@angular/common/http';
var LogTiplerService = /** @class */ (function () {
    function LogTiplerService(http) {
        this.http = http;
        this.linkIndex = "Ajax/LogTipler/Index";
        this.linkEkle = "Ajax/LogTipler/Ekle";
        this.linkDuzenle = "Ajax/LogTipler/Duzenle";
        this.linkSil = "Ajax/LogTipler/Sil";
    }
    LogTiplerService.prototype.getIndex = function () {
        return this.http.get(this.linkIndex);
    };
    LogTiplerService.prototype.getEkle = function () {
        return this.http.get(this.linkEkle);
    };
    LogTiplerService.prototype.postEkle = function (model) {
        return this.http.post(this.linkEkle, model);
    };
    LogTiplerService.prototype.getDuzenle = function (id) {
        var params = new HttpParams().set("id", id);
        return this.http.get(this.linkDuzenle, { params: params });
    };
    LogTiplerService.prototype.postDuzenle = function (model) {
        return this.http.post(this.linkDuzenle, model);
    };
    LogTiplerService.prototype.getSil = function (id) {
        var params = new HttpParams().set("id", id);
        return this.http.get(this.linkSil, { params: params });
    };
    LogTiplerService = tslib_1.__decorate([
        Injectable(),
        tslib_1.__metadata("design:paramtypes", [HttpClient])
    ], LogTiplerService);
    return LogTiplerService;
}());
export { LogTiplerService };
//# sourceMappingURL=logtipler.js.map