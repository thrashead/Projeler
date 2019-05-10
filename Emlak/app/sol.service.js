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
var SolService = /** @class */ (function () {
    function SolService(_http) {
        this._http = _http;
        this.linkSolAraSonuc = "Sol/AramaSonuc";
        this.linkGununIlani = "Sol/GununIlani";
        this.linkYeniIlanlar = "Sol/YeniIlanlar";
        this.linkHaberler = "Sol/Haberler";
        this.linkSayac = "Sol/Sayac";
        this.linkSayfalar = "Sol/Sayfalar";
        this.linkKategoriMenu = "Sol/KategoriMenu";
    }
    //Sol Arama Sonuc
    SolService.prototype.getSolAraSonuc = function (kelime, tip) {
        return this._http.get(this.linkSolAraSonuc, { params: { "kelime": kelime, "tip": tip } })
            .map(function (response) { return response.json(); })
            .catch(this._errorHandler);
    };
    //Gunun İlanı
    SolService.prototype.getGununIlani = function () {
        return this._http.get(this.linkGununIlani)
            .map(function (response) { return response.json(); })
            .catch(this._errorHandler);
    };
    //Yeni İlanlar
    SolService.prototype.getYeniIlanlar = function (adet) {
        return this._http.get(this.linkYeniIlanlar, { params: { "adet": adet } })
            .map(function (response) { return response.json(); })
            .catch(this._errorHandler);
    };
    //Haberler
    SolService.prototype.getHaberler = function () {
        return this._http.get(this.linkHaberler)
            .map(function (response) { return response.json(); })
            .catch(this._errorHandler);
    };
    //Sayac
    SolService.prototype.getSayac = function () {
        return this._http.get(this.linkSayac)
            .map(function (response) { return response.json(); })
            .catch(this._errorHandler);
    };
    //Sayfalar
    SolService.prototype.getSayfalar = function () {
        return this._http.get(this.linkSayfalar)
            .map(function (response) { return response.json(); })
            .catch(this._errorHandler);
    };
    //KategoriMenu
    SolService.prototype.getKategoriMenu = function () {
        return this._http.get(this.linkKategoriMenu)
            .map(function (response) { return response.json(); })
            .catch(this._errorHandler);
    };
    SolService.prototype._errorHandler = function (error) {
        console.error(error);
        return Observable_1.Observable.throw(error || "Server Error");
    };
    SolService = __decorate([
        core_1.Injectable(),
        __metadata("design:paramtypes", [http_1.Http])
    ], SolService);
    return SolService;
}());
exports.SolService = SolService;
//# sourceMappingURL=sol.service.js.map