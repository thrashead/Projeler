import * as tslib_1 from "tslib";
import { Component } from "@angular/core";
import { EmlakAjaxService } from "../services/emlakajax";
import { SolAjaxService } from "../services/solajax";
var HaberlerComponent = /** @class */ (function () {
    function HaberlerComponent(_emlakService, _solService) {
        this._emlakService = _emlakService;
        this._solService = _solService;
    }
    HaberlerComponent.prototype.ngOnInit = function () {
        var _this = this;
        this._solService.getHaberler()
            .subscribe(function (resData) { return _this.haberler = resData; }, function (resError) { return _this.errorMsg = resError; });
        this.KodlaGetir();
    };
    HaberlerComponent.prototype.KodlaGetir = function () {
        var _this = this;
        this._emlakService.getKodlaGetir("news")
            .subscribe(function (resData) { return _this.haberlerText = resData; }, function (resError) { return _this.errorMsg = resError; });
    };
    HaberlerComponent = tslib_1.__decorate([
        Component({
            templateUrl: './haberler.html'
        }),
        tslib_1.__metadata("design:paramtypes", [EmlakAjaxService, SolAjaxService])
    ], HaberlerComponent);
    return HaberlerComponent;
}());
export { HaberlerComponent };
//# sourceMappingURL=haberler.js.map