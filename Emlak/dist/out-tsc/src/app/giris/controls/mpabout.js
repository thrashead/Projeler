import * as tslib_1 from "tslib";
import { Component } from "@angular/core";
import { EmlakService } from "../../services/emlak.service";
var MPAboutComponent = /** @class */ (function () {
    function MPAboutComponent(_emlakService) {
        this._emlakService = _emlakService;
    }
    MPAboutComponent.prototype.ngOnInit = function () {
        var _this = this;
        this._emlakService.getIcerikGetir("Hakkimizda")
            .subscribe(function (resData) { return _this.about = resData; }, function (resError) { return _this.errorMsg = resError; });
        this.KodlaGetir();
    };
    MPAboutComponent.prototype.KodlaGetir = function () {
        var _this = this;
        this._emlakService.getKodlaGetir("devm")
            .subscribe(function (resData) { return _this.devamText = resData; }, function (resError) { return _this.errorMsg = resError; });
        this._emlakService.getKodlaGetir("abus")
            .subscribe(function (resData) { return _this.hakkimizdaText = resData; }, function (resError) { return _this.errorMsg = resError; });
    };
    MPAboutComponent = tslib_1.__decorate([
        Component({
            selector: 'emlak-mpabout',
            templateUrl: './mpabout.html',
            providers: [EmlakService]
        }),
        tslib_1.__metadata("design:paramtypes", [EmlakService])
    ], MPAboutComponent);
    return MPAboutComponent;
}());
export { MPAboutComponent };
//# sourceMappingURL=mpabout.js.map