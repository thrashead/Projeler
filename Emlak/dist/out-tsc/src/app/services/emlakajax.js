import * as tslib_1 from "tslib";
import { Injectable } from "@angular/core";
import { HttpClient, HttpParams } from '@angular/common/http';
var EmlakAjaxService = /** @class */ (function () {
    function EmlakAjaxService(_http) {
        this._http = _http;
        this.linkKodlaGetir = "Shared/KodlaGetir";
        this.linkLangs = "Shared/GetLangs";
        this.linkChangeLang = "Shared/ChangeLang";
        this.linkAdminGiris = "Ajax/Ajax/Login";
        this.linkRasgeleBanner = "Shared/RasgeleBanner";
        this.linkIcerikGetir = "Shared/IcerikGetir";
        this.linkKategoriler = "Shared/Kategoriler";
    }
    //Kodla Getir (Lang)
    EmlakAjaxService.prototype.getKodlaGetir = function (kod) {
        var params = new HttpParams().set("kod", kod);
        return this._http.get(this.linkKodlaGetir, { params: params });
    };
    //Diller
    EmlakAjaxService.prototype.getLangs = function () {
        return this._http.get(this.linkLangs);
    };
    //Dil Değiştir
    EmlakAjaxService.prototype.chanegeLang = function (lang) {
        var params = new HttpParams().set("lang", lang);
        return this._http.get(this.linkChangeLang, { params: params });
    };
    //Admin Giris
    EmlakAjaxService.prototype.postAdminGiris = function (login) {
        return this._http.post(this.linkAdminGiris, { login: login });
    };
    //Rasgele Banner
    EmlakAjaxService.prototype.getRasgeleBanner = function () {
        return this._http.get(this.linkRasgeleBanner);
    };
    //İçerik Getir
    EmlakAjaxService.prototype.getIcerikGetir = function (kod) {
        var params = new HttpParams().set("kod", kod);
        return this._http.get(this.linkIcerikGetir, { params: params });
    };
    //Kategoriler
    EmlakAjaxService.prototype.getKategoriler = function () {
        return this._http.get(this.linkKategoriler);
    };
    EmlakAjaxService = tslib_1.__decorate([
        Injectable(),
        tslib_1.__metadata("design:paramtypes", [HttpClient])
    ], EmlakAjaxService);
    return EmlakAjaxService;
}());
export { EmlakAjaxService };
//# sourceMappingURL=emlakajax.js.map