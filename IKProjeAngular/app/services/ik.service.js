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
var IKService = /** @class */ (function () {
    function IKService(http) {
        this.http = http;
        this.sirketLogolarLink = "IKService/SirketLogolar";
        this.aktifKullaniciLink = "IKService/AktifKullanici";
        this.aktifFirmaLink = "IKService/AktifFirma";
        this.girisYontemiLink = "IKService/GirisYontemi";
        this.girisDurumLink = "IKService/GirisDurum";
        this.girisSehirlerLink = "IKService/Sehirler";
        this.girisSektorlerLink = "IKService/Sektorler";
        this.girisCinsiyetlerLink = "IKService/Cinsiyetler";
    }
    IKService.prototype.SirketLogolar = function () {
        return this.http.get(this.sirketLogolarLink)
            .map(function (response) { return response.json(); })
            .catch(this.errorHandler);
    };
    IKService.prototype.AktifKullanici = function () {
        return this.http.get(this.aktifKullaniciLink)
            .map(function (response) {
            if (response.text() != "") {
                return response.json();
            }
            else {
                return null;
            }
        })
            .catch(this.errorHandler);
    };
    IKService.prototype.AktifFirma = function () {
        return this.http.get(this.aktifFirmaLink)
            .map(function (response) {
            if (response.text() != "") {
                return response.json();
            }
            else {
                return null;
            }
        })
            .catch(this.errorHandler);
    };
    IKService.prototype.GirisYontemi = function () {
        return this.http.get(this.girisYontemiLink)
            .map(function (response) { return response.json(); })
            .catch(this.errorHandler);
    };
    IKService.prototype.GirisDurum = function () {
        return this.http.get(this.girisDurumLink)
            .map(function (response) { return response.json(); })
            .catch(this.errorHandler);
    };
    IKService.prototype.Sehirler = function (kodlar, haric) {
        if (haric === void 0) { haric = false; }
        return this.http.get(this.girisSehirlerLink, { params: { "kodlar": kodlar, "haric": haric } })
            .map(function (response) { return response.json(); })
            .catch(this.errorHandler);
    };
    IKService.prototype.Sektorler = function (kodlar, haric) {
        if (haric === void 0) { haric = false; }
        return this.http.get(this.girisSektorlerLink, { params: { "kodlar": kodlar, "haric": haric } })
            .map(function (response) { return response.json(); })
            .catch(this.errorHandler);
    };
    IKService.prototype.Cinsiyetler = function (kodlar, haric) {
        if (haric === void 0) { haric = false; }
        return this.http.get(this.girisCinsiyetlerLink, { params: { "kodlar": kodlar, "haric": haric } })
            .map(function (response) { return response.json(); })
            .catch(this.errorHandler);
    };
    //Function(data: string) {
    //    return this._http.get(this.angLink, { params: { "data" : data }})
    //        .map((response: Response) => response.json())
    //        .catch(this._errorHandler);
    //}
    //Function(data: any) {
    //    return this._http.get(this.angLink, { params: { "data": JSON.stringify(data) } })
    //        .map((response: Response) => response.json())
    //        .catch(this._errorHandler);
    //}
    IKService.prototype.errorHandler = function (error) {
        console.error(error);
        return Observable_1.Observable.throw(error || "Server Error");
    };
    IKService = __decorate([
        core_1.Injectable(),
        __metadata("design:paramtypes", [http_1.Http])
    ], IKService);
    return IKService;
}());
exports.IKService = IKService;
//# sourceMappingURL=ik.service.js.map