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
var SinaService = /** @class */ (function () {
    function SinaService(_http) {
        this._http = _http;
        this.mailGonderLink = "Ajax/MailGonder";
        this.resimlerLink = "Ajax/Resimler";
    }
    SinaService.prototype.getResimler = function () {
        return this._http.get(this.resimlerLink)
            .map(function (response) { return response.json(); })
            .catch(this._errorHandler);
    };
    SinaService.prototype.getMailGonder = function (mail) {
        return this._http.get(this.mailGonderLink, { params: { "mail": JSON.stringify(mail) } })
            .map(function (response) { return response.json(); })
            .catch(this._errorHandler);
    };
    SinaService.prototype._errorHandler = function (error) {
        console.error(error);
        return Observable_1.Observable.throw(error || "Server Error");
    };
    SinaService = __decorate([
        core_1.Injectable(),
        __metadata("design:paramtypes", [http_1.Http])
    ], SinaService);
    return SinaService;
}());
exports.SinaService = SinaService;
//# sourceMappingURL=sina.service.js.map