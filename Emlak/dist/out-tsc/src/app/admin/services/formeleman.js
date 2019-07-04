import * as tslib_1 from "tslib";
import { Injectable } from "@angular/core";
import { HttpClient, HttpParams } from '@angular/common/http';
var FormElemanService = /** @class */ (function () {
    function FormElemanService(http) {
        this.http = http;
        this.linkIndex = "Ajax/FormEleman/Index";
        this.linkEkle = "Ajax/FormEleman/Ekle";
        this.linkDuzenle = "Ajax/FormEleman/Duzenle";
        this.linkSil = "Ajax/FormEleman/Sil";
        this.linkKopyala = "Ajax/FormEleman/Kopyala";
    }
    FormElemanService.prototype.getIndex = function () {
        return this.http.get(this.linkIndex);
    };
    FormElemanService.prototype.getEkle = function (linkID) {
        var params = new HttpParams().set("linkID", linkID);
        return this.http.get(this.linkEkle, { params: params });
    };
    FormElemanService.prototype.postEkle = function (model) {
        return this.http.post(this.linkEkle, model);
    };
    FormElemanService.prototype.getDuzenle = function (id) {
        var params = new HttpParams().set("id", id);
        return this.http.get(this.linkDuzenle, { params: params });
    };
    FormElemanService.prototype.postDuzenle = function (model) {
        return this.http.post(this.linkDuzenle, model);
    };
    FormElemanService.prototype.getSil = function (id) {
        var params = new HttpParams().set("id", id);
        return this.http.get(this.linkSil, { params: params });
    };
    FormElemanService.prototype.getKopyala = function (id) {
        var params = new HttpParams().set("id", id);
        return this.http.get(this.linkKopyala, { params: params });
    };
    FormElemanService = tslib_1.__decorate([
        Injectable(),
        tslib_1.__metadata("design:paramtypes", [HttpClient])
    ], FormElemanService);
    return FormElemanService;
}());
export { FormElemanService };
//# sourceMappingURL=formeleman.js.map