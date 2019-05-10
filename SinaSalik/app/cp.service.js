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
var CPService = /** @class */ (function () {
    function CPService(_http) {
        this._http = _http;
        this.menuLink = "Ajax/Menu";
        this.siirLink = "Ajax/Siir";
    }
    CPService.prototype.getMenu = function () {
        return this._http.get(this.menuLink)
            .map(function (response) { return response.json(); })
            .catch(this._errorHandler);
    };
    CPService.prototype.getSiir = function (link) {
        return this._http.get(this.siirLink, { params: { "link": link } })
            .map(function (response) { return response.json(); })
            .catch(this._errorHandler);
    };
    CPService.prototype._errorHandler = function (error) {
        console.error(error);
        return Observable_1.Observable.throw(error || "Server Error");
    };
    CPService = __decorate([
        core_1.Injectable(),
        __metadata("design:paramtypes", [http_1.Http])
    ], CPService);
    return CPService;
}());
exports.CPService = CPService;
//# sourceMappingURL=cp.service.js.map