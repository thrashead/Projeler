import * as tslib_1 from "tslib";
import { Component } from "@angular/core";
import { EmlakService } from "../services/emlak.service";
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
    FooterComponent = tslib_1.__decorate([
        Component({
            selector: "emlak-footer",
            templateUrl: './footer.html',
            providers: [EmlakService]
        }),
        tslib_1.__metadata("design:paramtypes", [EmlakService])
    ], FooterComponent);
    return FooterComponent;
}());
export { FooterComponent };
//# sourceMappingURL=footer.js.map