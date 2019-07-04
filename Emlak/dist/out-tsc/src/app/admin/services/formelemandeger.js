import * as tslib_1 from "tslib";
import { Injectable } from "@angular/core";
import { HttpClient, HttpParams } from '@angular/common/http';
var FormElemanDegerService = /** @class */ (function () {
    function FormElemanDegerService(http) {
        this.http = http;
        this.linkIndex = "Ajax/FormElemanDeger/Index";
        this.linkEkle = "Ajax/FormElemanDeger/Ekle";
        this.linkDuzenle = "Ajax/FormElemanDeger/Duzenle";
        this.linkSil = "Ajax/FormElemanDeger/Sil";
        this.linkKopyala = "Ajax/FormElemanDeger/Kopyala";
    }
    FormElemanDegerService.prototype.getIndex = function () {
        return this.http.get(this.linkIndex);
    };
    FormElemanDegerService.prototype.getEkle = function (linkID) {
        var params = new HttpParams().set("linkID", linkID);
        return this.http.get(this.linkEkle, { params: params });
    };
    FormElemanDegerService.prototype.postEkle = function (model) {
        return this.http.post(this.linkEkle, model);
    };
    FormElemanDegerService.prototype.getDuzenle = function (id) {
        var params = new HttpParams().set("id", id);
        return this.http.get(this.linkDuzenle, { params: params });
    };
    FormElemanDegerService.prototype.postDuzenle = function (model) {
        return this.http.post(this.linkDuzenle, model);
    };
    FormElemanDegerService.prototype.getSil = function (id) {
        var params = new HttpParams().set("id", id);
        return this.http.get(this.linkSil, { params: params });
    };
    FormElemanDegerService.prototype.getKopyala = function (id) {
        var params = new HttpParams().set("id", id);
        return this.http.get(this.linkKopyala, { params: params });
    };
    FormElemanDegerService = tslib_1.__decorate([
        Injectable(),
        tslib_1.__metadata("design:paramtypes", [HttpClient])
    ], FormElemanDegerService);
    return FormElemanDegerService;
}());
export { FormElemanDegerService };
//# sourceMappingURL=formelemandeger.js.map