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
var AramaService = /** @class */ (function () {
    function AramaService(http) {
        this.http = http;
        this.calismalarLink = "AramaService/Calismalar";
        this.bolumlerLink = "AramaService/Bolumler";
        this.pozisyonlarLink = "AramaService/Pozisyonlar";
        this.egitimlerLink = "AramaService/Egitimler";
        this.sektorlerLink = "AramaService/Sektorler";
        this.tecrubelerLink = "AramaService/Tecrubeler";
        this.guncelliklerLink = "AramaService/Guncellikler";
        this.digerseceneklerLink = "AramaService/DigerSecenekler";
        this.sehirDonLink = "AramaService/SehirDon";
        this.calismaDonLink = "AramaService/CalismaDon";
    }
    AramaService.prototype.Calismalar = function (kodlar, haric) {
        if (haric === void 0) { haric = false; }
        return this.http.get(this.calismalarLink, { params: { "kodlar": kodlar, "haric": haric } })
            .map(function (response) { return response.json(); })
            .catch(this.errorHandler);
    };
    AramaService.prototype.Bolumler = function (kodlar, haric) {
        if (haric === void 0) { haric = false; }
        return this.http.get(this.bolumlerLink, { params: { "kodlar": kodlar, "haric": haric } })
            .map(function (response) { return response.json(); })
            .catch(this.errorHandler);
    };
    AramaService.prototype.Pozisyonlar = function (kodlar, haric) {
        if (haric === void 0) { haric = false; }
        return this.http.get(this.pozisyonlarLink, { params: { "kodlar": kodlar, "haric": haric } })
            .map(function (response) { return response.json(); })
            .catch(this.errorHandler);
    };
    AramaService.prototype.Egitimler = function (kodlar, haric) {
        if (haric === void 0) { haric = false; }
        return this.http.get(this.egitimlerLink, { params: { "kodlar": kodlar, "haric": haric } })
            .map(function (response) { return response.json(); })
            .catch(this.errorHandler);
    };
    AramaService.prototype.Sektorler = function (kodlar, haric) {
        if (haric === void 0) { haric = false; }
        return this.http.get(this.sektorlerLink, { params: { "kodlar": kodlar, "haric": haric } })
            .map(function (response) { return response.json(); })
            .catch(this.errorHandler);
    };
    AramaService.prototype.Tecrubeler = function (kodlar, haric) {
        if (haric === void 0) { haric = false; }
        return this.http.get(this.tecrubelerLink, { params: { "kodlar": kodlar, "haric": haric } })
            .map(function (response) { return response.json(); })
            .catch(this.errorHandler);
    };
    AramaService.prototype.Guncellikler = function (kodlar, haric) {
        if (haric === void 0) { haric = false; }
        return this.http.get(this.guncelliklerLink, { params: { "kodlar": kodlar, "haric": haric } })
            .map(function (response) { return response.json(); })
            .catch(this.errorHandler);
    };
    AramaService.prototype.DigerSecenekler = function (kodlar, haric) {
        if (haric === void 0) { haric = false; }
        return this.http.get(this.digerseceneklerLink, { params: { "kodlar": kodlar, "haric": haric } })
            .map(function (response) { return response.json(); })
            .catch(this.errorHandler);
    };
    AramaService.prototype.SehirDon = function (sehir) {
        return this.http.get(this.sehirDonLink, { params: { "sehir": sehir } })
            .map(function (response) { return response.json(); })
            .catch(this.errorHandler);
    };
    AramaService.prototype.CalismaDon = function (tip) {
        return this.http.get(this.calismaDonLink, { params: { "tip": tip } })
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
    AramaService.prototype.errorHandler = function (error) {
        console.error(error);
        return Observable_1.Observable.throw(error || "Server Error");
    };
    AramaService = __decorate([
        core_1.Injectable(),
        __metadata("design:paramtypes", [http_1.Http])
    ], AramaService);
    return AramaService;
}());
exports.AramaService = AramaService;
//# sourceMappingURL=arama.service.js.map