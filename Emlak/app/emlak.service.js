"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var http_1 = require("@angular/http");
require("rxjs/add/operator/map");
require("rxjs/add/operator/catch");
require("rxjs/add/observable/throw");
var Observable_1 = require("rxjs/Observable");
var EmlakService = /** @class */ (function () {
    function EmlakService(_http) {
        this._http = _http;
        this.linkKodlaGetir = "Shared/KodlaGetir";
        this.linkLangs = "Shared/GetLangs";
        this.linkChangeLang = "Shared/ChangeLang";
        this.linkAdminGiris = "Ajax/Emlak/Login";
        this.linkRasgeleBanner = "Shared/RasgeleBanner";
        this.linkIcerikGetir = "Shared/IcerikGetir";
        this.linkKategoriler = "Shared/Kategoriler";
    }
    //Kodla Getir (Lang)
    EmlakService.prototype.getKodlaGetir = function (kod) {
        return this._http.get(this.linkKodlaGetir, { params: { "kod": kod } })
            .map(function (response) { return response.json(); })
            .catch(this._errorHandler);
    };
    //Diller
    EmlakService.prototype.getLangs = function () {
        return this._http.get(this.linkLangs)
            .map(function (response) { return response.json(); })
            .catch(this._errorHandler);
    };
    //Dil Değiştir
    EmlakService.prototype.chanegeLang = function (lang) {
        return this._http.get(this.linkChangeLang, { params: { "lang": lang } })
            .map(function (response) { return response.json(); })
            .catch(this._errorHandler);
    };
    //Admin Giris
    EmlakService.prototype.getAdminGiris = function (login) {
        return this._http.post(this.linkAdminGiris, { login: login })
            .map(function (response) { return response.json(); })
            .catch(this._errorHandler);
    };
    //Rasgele Banner
    EmlakService.prototype.getRasgeleBanner = function () {
        return this._http.get(this.linkRasgeleBanner)
            .map(function (response) { return response.json(); })
            .catch(this._errorHandler);
    };
    //İçerik Getir
    EmlakService.prototype.getIcerikGetir = function (kod) {
        return this._http.get(this.linkIcerikGetir, { params: { "kod": kod } })
            .map(function (response) { return response.json(); })
            .catch(this._errorHandler);
    };
    //Kategoriler
    EmlakService.prototype.getKategoriler = function () {
        return this._http.get(this.linkKategoriler)
            .map(function (response) { return response.json(); })
            .catch(this._errorHandler);
    };
    EmlakService.prototype._errorHandler = function (error) {
        console.error(error);
        return Observable_1.Observable.throw(error || "Server Error");
    };
    EmlakService = __decorate([
        core_1.Injectable(),
        __metadata("design:paramtypes", [http_1.Http])
    ], EmlakService);
    return EmlakService;
}());
exports.EmlakService = EmlakService;
//# sourceMappingURL=emlak.service.js.map