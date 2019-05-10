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
var ik_service_1 = require("./services/ik.service");
var router_1 = require("@angular/router");
var AppComponent = /** @class */ (function () {
    function AppComponent(ikService, router) {
        this.ikService = ikService;
        this.router = router;
    }
    AppComponent.prototype.ngAfterContentInit = function () {
        var _this = this;
        this.ikService.AktifKullanici()
            .subscribe(function (data) { return _this.Kullanici = data != null ? data : ""; });
        this.ikService.AktifFirma()
            .subscribe(function (data) { return _this.Firma = data != null ? data : ""; });
        this.ikService.GirisYontemi()
            .subscribe(function (data) { return _this.Giris = data; });
    };
    AppComponent = __decorate([
        core_1.Component({
            selector: "ik-app",
            templateUrl: 'app/app.html',
            providers: [ik_service_1.IKService]
        }),
        __metadata("design:paramtypes", [ik_service_1.IKService, router_1.Router])
    ], AppComponent);
    return AppComponent;
}());
exports.AppComponent = AppComponent;
//# sourceMappingURL=app.js.map