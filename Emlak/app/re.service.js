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
var REService = /** @class */ (function () {
    function REService(_http) {
        this._http = _http;
        this.linkEmlakDetay = "RE/Detay";
        this.linkEmlakListele = "RE/Listele";
        this.linkEmlakDetayliAraSession = "RE/DetayliAramaSession";
        this.linkKategoriler = "RE/Kategoriler";
        this.linkSehirler = "RE/Sehirler";
    }
    //Emlak Detay
    REService.prototype.getEmlakDetay = function (link) {
        return this._http.get(this.linkEmlakDetay, { params: { "link": link } })
            .map(function (response) { return response.json(); })
            .catch(this._errorHandler);
    };
    //Emlak Listele
    REService.prototype.getEmlakListele = function (reData) {
        return this._http.get(this.linkEmlakListele, { params: { "reData": JSON.stringify(reData) } })
            .map(function (response) { return response.json(); })
            .catch(this._errorHandler);
    };
    //Emlak Detaylı Arama Session
    REService.prototype.getEmlakDetayliArama = function (realCP) {
        return this._http.get(this.linkEmlakDetayliAraSession, { params: { "realCP": JSON.stringify(realCP) } })
            .map(function (response) { return response.json(); })
            .catch(this._errorHandler);
    };
    //Kategoriler
    REService.prototype.getKategoriler = function (parentID) {
        return this._http.get(this.linkKategoriler, { params: { "parentID": parentID } })
            .map(function (response) { return response.json(); })
            .catch(this._errorHandler);
    };
    //Şehirler
    REService.prototype.getSehirler = function () {
        return this._http.get(this.linkSehirler)
            .map(function (response) { return response.json(); })
            .catch(this._errorHandler);
    };
    REService.prototype._errorHandler = function (error) {
        console.error(error);
        return Observable_1.Observable.throw(error || "Server Error");
    };
    REService = __decorate([
        core_1.Injectable(),
        __metadata("design:paramtypes", [http_1.Http])
    ], REService);
    return REService;
}());
exports.REService = REService;
//# sourceMappingURL=re.service.js.map