import * as tslib_1 from "tslib";
import { Component } from "@angular/core";
import { EmlakAjaxService } from "../../services/emlakajax";
import { SolAjaxService } from "../../services/solajax";
var HaberlerSolComponent = /** @class */ (function () {
    function HaberlerSolComponent(_emlakService, _solService) {
        this._emlakService = _emlakService;
        this._solService = _solService;
    }
    HaberlerSolComponent.prototype.ngOnInit = function () {
        var _this = this;
        this._solService.getHaberler()
            .subscribe(function (resData) { return _this.haberler = resData; }, function (resError) { return _this.errorMsg = resError; });
        this.KodlaGetir();
    };
    HaberlerSolComponent.prototype.KodlaGetir = function () {
        var _this = this;
        this._emlakService.getKodlaGetir("news")
            .subscribe(function (resData) { return _this.haberText = resData; }, function (resError) { return _this.errorMsg = resError; });
    };
    HaberlerSolComponent = tslib_1.__decorate([
        Component({
            selector: "emlak-haberlersol",
            templateUrl: './haberlersol.html'
        }),
        tslib_1.__metadata("design:paramtypes", [EmlakAjaxService, SolAjaxService])
    ], HaberlerSolComponent);
    return HaberlerSolComponent;
}());
export { HaberlerSolComponent };
//# sourceMappingURL=haberlersol.js.map