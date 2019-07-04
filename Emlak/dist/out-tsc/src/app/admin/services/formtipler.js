import * as tslib_1 from "tslib";
import { Injectable } from "@angular/core";
import { HttpClient, HttpParams } from '@angular/common/http';
var FormTiplerService = /** @class */ (function () {
    function FormTiplerService(http) {
        this.http = http;
        this.linkIndex = "Ajax/FormTipler/Index";
        this.linkEkle = "Ajax/FormTipler/Ekle";
        this.linkDuzenle = "Ajax/FormTipler/Duzenle";
        this.linkSil = "Ajax/FormTipler/Sil";
    }
    FormTiplerService.prototype.getIndex = function () {
        return this.http.get(this.linkIndex);
    };
    FormTiplerService.prototype.getEkle = function () {
        return this.http.get(this.linkEkle);
    };
    FormTiplerService.prototype.postEkle = function (model) {
        return this.http.post(this.linkEkle, model);
    };
    FormTiplerService.prototype.getDuzenle = function (id) {
        var params = new HttpParams().set("id", id);
        return this.http.get(this.linkDuzenle, { params: params });
    };
    FormTiplerService.prototype.postDuzenle = function (model) {
        return this.http.post(this.linkDuzenle, model);
    };
    FormTiplerService.prototype.getSil = function (id) {
        var params = new HttpParams().set("id", id);
        return this.http.get(this.linkSil, { params: params });
    };
    FormTiplerService = tslib_1.__decorate([
        Injectable(),
        tslib_1.__metadata("design:paramtypes", [HttpClient])
    ], FormTiplerService);
    return FormTiplerService;
}());
export { FormTiplerService };
//# sourceMappingURL=formtipler.js.map