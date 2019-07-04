import * as tslib_1 from "tslib";
import { Component } from "@angular/core";
import { EmlakService } from "../../services/emlak.service";
import { SolService } from "../../services/sol.service";
var MPNewsComponent = /** @class */ (function () {
    function MPNewsComponent(_emlakService, _solService) {
        this._emlakService = _emlakService;
        this._solService = _solService;
    }
    MPNewsComponent.prototype.ngOnInit = function () {
        var _this = this;
        this._solService.getHaberler()
            .subscribe(function (resData) { return _this.haberler = resData; }, function (resError) { return _this.errorMsg = resError; });
        this.KodlaGetir();
    };
    MPNewsComponent.prototype.KodlaGetir = function () {
        var _this = this;
        this._emlakService.getKodlaGetir("news")
            .subscribe(function (resData) { return _this.haberlerText = resData; }, function (resError) { return _this.errorMsg = resError; });
        this._emlakService.getKodlaGetir("devm")
            .subscribe(function (resData) { return _this.haberLinkText = resData; }, function (resError) { return _this.errorMsg = resError; });
    };
    MPNewsComponent = tslib_1.__decorate([
        Component({
            selector: 'emlak-mpnews',
            templateUrl: './mpnews.html',
            providers: [EmlakService, SolService]
        }),
        tslib_1.__metadata("design:paramtypes", [EmlakService, SolService])
    ], MPNewsComponent);
    return MPNewsComponent;
}());
export { MPNewsComponent };
//# sourceMappingURL=mpnews.js.map