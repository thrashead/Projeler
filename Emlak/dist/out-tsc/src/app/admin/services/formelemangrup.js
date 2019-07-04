import * as tslib_1 from "tslib";
import { Injectable } from "@angular/core";
import { HttpClient, HttpParams } from '@angular/common/http';
var FormElemanGrupService = /** @class */ (function () {
    function FormElemanGrupService(http) {
        this.http = http;
        this.linkIndex = "Ajax/FormElemanGrup/Index";
        this.linkEkle = "Ajax/FormElemanGrup/Ekle";
        this.linkDuzenle = "Ajax/FormElemanGrup/Duzenle";
        this.linkSil = "Ajax/FormElemanGrup/Sil";
        this.linkKopyala = "Ajax/FormElemanGrup/Kopyala";
    }
    FormElemanGrupService.prototype.getIndex = function () {
        return this.http.get(this.linkIndex);
    };
    FormElemanGrupService.prototype.getEkle = function () {
        return this.http.get(this.linkEkle);
    };
    FormElemanGrupService.prototype.postEkle = function (model) {
        return this.http.post(this.linkEkle, model);
    };
    FormElemanGrupService.prototype.getDuzenle = function (id) {
        var params = new HttpParams().set("id", id);
        return this.http.get(this.linkDuzenle, { params: params });
    };
    FormElemanGrupService.prototype.postDuzenle = function (model) {
        return this.http.post(this.linkDuzenle, model);
    };
    FormElemanGrupService.prototype.getSil = function (id) {
        var params = new HttpParams().set("id", id);
        return this.http.get(this.linkSil, { params: params });
    };
    FormElemanGrupService.prototype.getKopyala = function (id) {
        var params = new HttpParams().set("id", id);
        return this.http.get(this.linkKopyala, { params: params });
    };
    FormElemanGrupService = tslib_1.__decorate([
        Injectable(),
        tslib_1.__metadata("design:paramtypes", [HttpClient])
    ], FormElemanGrupService);
    return FormElemanGrupService;
}());
export { FormElemanGrupService };
//# sourceMappingURL=formelemangrup.js.map