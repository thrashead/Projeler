import * as tslib_1 from "tslib";
import { Component } from "@angular/core";
import { EmlakService } from "../services/emlak.service";
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
    BannerComponent = tslib_1.__decorate([
        Component({
            selector: "emlak-banner",
            templateUrl: './banner.html',
            providers: [EmlakService]
        }),
        tslib_1.__metadata("design:paramtypes", [EmlakService])
    ], BannerComponent);
    return BannerComponent;
}());
export { BannerComponent };
//# sourceMappingURL=banner.js.map