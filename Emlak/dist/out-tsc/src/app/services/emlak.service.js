import * as tslib_1 from "tslib";
import { Injectable } from "@angular/core";
import { HttpClient, HttpParams } from '@angular/common/http';
var EmlakService = /** @class */ (function () {
    function EmlakService(_http) {
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
    EmlakService.prototype.getKodlaGetir = function (kod) {
        var params = new HttpParams().set("kod", kod);
        return this._http.get(this.linkKodlaGetir, { params: params });
    };
    //Diller
    EmlakService.prototype.getLangs = function () {
        return this._http.get(this.linkLangs);
    };
    //Dil Değiştir
    EmlakService.prototype.chanegeLang = function (lang) {
        var params = new HttpParams().set("lang", lang);
        return this._http.get(this.linkChangeLang, { params: params });
    };
    //Admin Giris
    EmlakService.prototype.postAdminGiris = function (login) {
        return this._http.post(this.linkAdminGiris, { login: login });
    };
    //Rasgele Banner
    EmlakService.prototype.getRasgeleBanner = function () {
        return this._http.get(this.linkRasgeleBanner);
    };
    //İçerik Getir
    EmlakService.prototype.getIcerikGetir = function (kod) {
        var params = new HttpParams().set("kod", kod);
        return this._http.get(this.linkIcerikGetir, { params: params });
    };
    //Kategoriler
    EmlakService.prototype.getKategoriler = function () {
        return this._http.get(this.linkKategoriler);
    };
    EmlakService = tslib_1.__decorate([
        Injectable(),
        tslib_1.__metadata("design:paramtypes", [HttpClient])
    ], EmlakService);
    return EmlakService;
}());
export { EmlakService };
//# sourceMappingURL=emlak.service.js.map