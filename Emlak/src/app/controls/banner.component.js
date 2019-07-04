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
var emlak_service_1 = require("../emlak.service");
var BannerComponent = /** @class */ (function () {
    function BannerComponent(_emlakService) {
        this._emlakService = _emlakService;
    }
    BannerComponent.prototype.ngOnInit = function () {
        var _this = this;
        this._emlakService.getRasgeleBanner()
            .subscribe(function (resData) {
            $("#UstBolge").css("background-image", "url('" + resData + "')");
        }, function (resError) { return _this.errorMsg = resError; });
        this.KodlaGetir();
    };
    BannerComponent.prototype.KodlaGetir = function () {
        var _this = this;
        this._emlakService.getKodlaGetir("fors")
            .subscribe(function (resData) { return _this.satilikText = resData; }, function (resError) { return _this.errorMsg = resError; });
        this._emlakService.getKodlaGetir("forr")
            .subscribe(function (resData) { return _this.kiralikText = resData; }, function (resError) { return _this.errorMsg = resError; });
        this._emlakService.getKodlaGetir("newb")
            .subscribe(function (resData) { return _this.yeniText = resData; }, function (resError) { return _this.errorMsg = resError; });
        this._emlakService.getKodlaGetir("allb")
            .subscribe(function (resData) { return _this.listeleText = resData; }, function (resError) { return _this.errorMsg = resError; });
    };
    BannerComponent = __decorate([
        core_1.Component({
            selector: "emlak-banner",
            templateUrl: 'app/controls/banner.component.html',
            providers: [emlak_service_1.EmlakService]
        }),
        __metadata("design:paramtypes", [emlak_service_1.EmlakService])
    ], BannerComponent);
    return BannerComponent;
}());
exports.BannerComponent = BannerComponent;
//# sourceMappingURL=banner.component.js.map