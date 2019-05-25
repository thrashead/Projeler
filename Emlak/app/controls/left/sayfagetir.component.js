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
var emlak_service_1 = require("../../emlak.service");
var sol_service_1 = require("../../sol.service");
var SayfaGetirComponent = /** @class */ (function () {
    function SayfaGetirComponent(_emlakService, _solService) {
        this._emlakService = _emlakService;
        this._solService = _solService;
    }
    SayfaGetirComponent.prototype.ngOnInit = function () {
        var _this = this;
        this._solService.getSayac()
            .subscribe(function (resData) { return _this.sayac = resData; }, function (resError) { return _this.errorMsg = resError; });
        this._solService.getSayfalar()
            .subscribe(function (resData) { return _this.sayfalar = resData; }, function (resError) { return _this.errorMsg = resError; });
        this.KodlaGetir();
    };
    SayfaGetirComponent.prototype.KodlaGetir = function () {
        var _this = this;
        this._emlakService.getKodlaGetir("mnpg")
            .subscribe(function (resData) { return _this.anaSayfaText = resData; }, function (resError) { return _this.errorMsg = resError; });
        this._emlakService.getKodlaGetir("ziya")
            .subscribe(function (resData) { return _this.ziyaretciText = resData; }, function (resError) { return _this.errorMsg = resError; });
    };
    SayfaGetirComponent = __decorate([
        core_1.Component({
            selector: "emlak-sayfagetir",
            templateUrl: 'app/controls/left/sayfagetir.component.html',
            providers: [emlak_service_1.EmlakService, sol_service_1.SolService]
        }),
        __metadata("design:paramtypes", [emlak_service_1.EmlakService, sol_service_1.SolService])
    ], SayfaGetirComponent);
    return SayfaGetirComponent;
}());
exports.SayfaGetirComponent = SayfaGetirComponent;
//# sourceMappingURL=sayfagetir.component.js.map