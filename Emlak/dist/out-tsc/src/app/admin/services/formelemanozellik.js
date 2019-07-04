import * as tslib_1 from "tslib";
import { Injectable } from "@angular/core";
import { HttpClient, HttpParams } from '@angular/common/http';
var FormElemanOzellikService = /** @class */ (function () {
    function FormElemanOzellikService(http) {
        this.http = http;
        this.linkIndex = "Ajax/FormElemanOzellik/Index";
        this.linkEkle = "Ajax/FormElemanOzellik/Ekle";
        this.linkDuzenle = "Ajax/FormElemanOzellik/Duzenle";
        this.linkSil = "Ajax/FormElemanOzellik/Sil";
        this.linkKopyala = "Ajax/FormElemanOzellik/Kopyala";
    }
    FormElemanOzellikService.prototype.getIndex = function () {
        return this.http.get(this.linkIndex);
    };
    FormElemanOzellikService.prototype.getEkle = function (linkID) {
        var params = new HttpParams().set("linkID", linkID);
        return this.http.get(this.linkEkle, { params: params });
    };
    FormElemanOzellikService.prototype.postEkle = function (model) {
        return this.http.post(this.linkEkle, model);
    };
    FormElemanOzellikService.prototype.getDuzenle = function (id) {
        var params = new HttpParams().set("id", id);
        return this.http.get(this.linkDuzenle, { params: params });
    };
    FormElemanOzellikService.prototype.postDuzenle = function (model) {
        return this.http.post(this.linkDuzenle, model);
    };
    FormElemanOzellikService.prototype.getSil = function (id) {
        var params = new HttpParams().set("id", id);
        return this.http.get(this.linkSil, { params: params });
    };
    FormElemanOzellikService.prototype.getKopyala = function (id) {
        var params = new HttpParams().set("id", id);
        return this.http.get(this.linkKopyala, { params: params });
    };
    FormElemanOzellikService = tslib_1.__decorate([
        Injectable(),
        tslib_1.__metadata("design:paramtypes", [HttpClient])
    ], FormElemanOzellikService);
    return FormElemanOzellikService;
}());
export { FormElemanOzellikService };
//# sourceMappingURL=formelemanozellik.js.map