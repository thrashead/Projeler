import * as tslib_1 from "tslib";
import { Component } from "@angular/core";
import { EmlakService } from "../../services/emlak.service";
import { SolService } from "../../services/sol.service";
var SayfaGetirComponent = /** @class */ (function () {
    function SayfaGetirComponent(_emlakService, _solService) {
        this._emlakService = _emlakService;
        this._solService = _solService;
    }
    SayfaGetirComponent.prototype.ngOnInit = function () {
        var _this = this;
        this._solService.getSayac()
            .subscribe(function (resData) { return _this.sayac = resData.toString(); }, function (resError) { return _this.errorMsg = resError; });
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
    SayfaGetirComponent = tslib_1.__decorate([
        Component({
            selector: "emlak-sayfagetir",
            templateUrl: './sayfagetir.html',
            providers: [EmlakService, SolService]
        }),
        tslib_1.__metadata("design:paramtypes", [EmlakService, SolService])
    ], SayfaGetirComponent);
    return SayfaGetirComponent;
}());
export { SayfaGetirComponent };
//# sourceMappingURL=sayfagetir.js.map