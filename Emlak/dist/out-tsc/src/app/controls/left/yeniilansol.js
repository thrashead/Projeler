import * as tslib_1 from "tslib";
import { Component } from "@angular/core";
import { EmlakService } from "../../services/emlak.service";
import { SolService } from "../../services/sol.service";
var YeniIlanSolComponent = /** @class */ (function () {
    function YeniIlanSolComponent(_emlakService, _solService) {
        this._emlakService = _emlakService;
        this._solService = _solService;
        this.detayLinkText = "resimyok";
    }
    YeniIlanSolComponent.prototype.ngOnInit = function () {
        var _this = this;
        this._solService.getYeniIlanlar("0")
            .subscribe(function (resData) { return _this.ilanlar = resData; }, function (resError) { return _this.errorMsg = resError; });
        this.KodlaGetir();
    };
    YeniIlanSolComponent.prototype.KodlaGetir = function () {
        var _this = this;
        this._emlakService.getKodlaGetir("newi")
            .subscribe(function (resData) { return _this.yeniIlanlarText = resData; }, function (resError) { return _this.errorMsg = resError; });
        this._emlakService.getKodlaGetir("dtyr")
            .subscribe(function (resData) { return _this.detayLinkText = resData; }, function (resError) { return _this.errorMsg = resError; });
    };
    YeniIlanSolComponent = tslib_1.__decorate([
        Component({
            selector: "emlak-yeniilansol",
            templateUrl: './yeniilansol.html',
            providers: [EmlakService, SolService]
        }),
        tslib_1.__metadata("design:paramtypes", [EmlakService, SolService])
    ], YeniIlanSolComponent);
    return YeniIlanSolComponent;
}());
export { YeniIlanSolComponent };
//# sourceMappingURL=yeniilansol.js.map