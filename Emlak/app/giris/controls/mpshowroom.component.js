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
var home_service_1 = require("../../home.service");
var MPShowroomComponent = /** @class */ (function () {
    function MPShowroomComponent(_emlakService, _homeService) {
        this._emlakService = _emlakService;
        this._homeService = _homeService;
        this.vitrinIlanlarResimText = "resimyok";
        this.detayLinkText = "resimyok";
    }
    MPShowroomComponent.prototype.ngOnInit = function () {
        var _this = this;
        this._homeService.getVitrinIlanlar(3)
            .subscribe(function (resData) { return _this.ilanlar = resData; }, function (resError) { return _this.errorMsg = resError; });
        this.KodlaGetir();
    };
    MPShowroomComponent.prototype.KodlaGetir = function () {
        var _this = this;
        this._emlakService.getKodlaGetir("swrm")
            .subscribe(function (resData) { return _this.vitrinIlanlarText = resData; }, function (resError) { return _this.errorMsg = resError; });
        this._emlakService.getKodlaGetir("alli")
            .subscribe(function (resData) { return _this.tumIlanlarText = resData; }, function (resError) { return _this.errorMsg = resError; });
        this._emlakService.getKodlaGetir("newr")
            .subscribe(function (resData) { return _this.vitrinIlanlarResimText = resData; }, function (resError) { return _this.errorMsg = resError; });
        this._emlakService.getKodlaGetir("dtyr")
            .subscribe(function (resData) { return _this.detayLinkText = resData; }, function (resError) { return _this.errorMsg = resError; });
    };
    MPShowroomComponent = __decorate([
        core_1.Component({
            selector: 'emlak-mpshowroom',
            templateUrl: 'app/giris/controls/mpshowroom.component.html',
            providers: [emlak_service_1.EmlakService, home_service_1.HomeService]
        }),
        __metadata("design:paramtypes", [emlak_service_1.EmlakService, home_service_1.HomeService])
    ], MPShowroomComponent);
    return MPShowroomComponent;
}());
exports.MPShowroomComponent = MPShowroomComponent;
//# sourceMappingURL=mpshowroom.component.js.map