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
var FooterComponent = /** @class */ (function () {
    function FooterComponent(_emlakService) {
        this._emlakService = _emlakService;
    }
    FooterComponent.prototype.ngOnInit = function () {
        var _this = this;
        this._emlakService.getKategoriler()
            .subscribe(function (resData) { return _this.kategoriler = resData; }, function (resError) { return _this.errorMsg = resError; });
        this._emlakService.getKodlaGetir("mnpg")
            .subscribe(function (resData) { return _this.anaSayfaText = resData; }, function (resError) { return _this.errorMsg = resError; });
        this._emlakService.getKodlaGetir("newi")
            .subscribe(function (resData) { return _this.yeniIlanlarText = resData; }, function (resError) { return _this.errorMsg = resError; });
        this._emlakService.getKodlaGetir("alli")
            .subscribe(function (resData) { return _this.tumIlanlarText = resData; }, function (resError) { return _this.errorMsg = resError; });
        this._emlakService.getKodlaGetir("abus")
            .subscribe(function (resData) { return _this.hakkimizdaText = resData; }, function (resError) { return _this.errorMsg = resError; });
        this._emlakService.getKodlaGetir("cont")
            .subscribe(function (resData) { return _this.iletisimText = resData; }, function (resError) { return _this.errorMsg = resError; });
        this._emlakService.getIcerikGetir("Yasal-Uyari")
            .subscribe(function (resData) { return _this.yasalUyari = resData; }, function (resError) { return _this.errorMsg = resError; });
    };
    FooterComponent = __decorate([
        core_1.Component({
            selector: "emlak-footer",
            templateUrl: 'app/controls/footer.component.html',
            providers: [emlak_service_1.EmlakService]
        }),
        __metadata("design:paramtypes", [emlak_service_1.EmlakService])
    ], FooterComponent);
    return FooterComponent;
}());
exports.FooterComponent = FooterComponent;
//# sourceMappingURL=footer.component.js.map