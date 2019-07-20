import * as tslib_1 from "tslib";
import { Component } from "@angular/core";
import { EmlakAjaxService } from "../../services/emlakajax";
import { SolAjaxService } from "../../services/solajax";
var MPNewPropsComponent = /** @class */ (function () {
    function MPNewPropsComponent(_emlakService, _solService) {
        this._emlakService = _emlakService;
        this._solService = _solService;
        this.yeniIlanlarResimText = "resimyok";
        this.detayLinkText = "resimyok";
    }
    MPNewPropsComponent.prototype.ngOnInit = function () {
        var _this = this;
        this._solService.getYeniIlanlar("3")
            .subscribe(function (resData) { return _this.ilanlar = resData; }, function (resError) { return _this.errorMsg = resError; });
        this.KodlaGetir();
    };
    MPNewPropsComponent.prototype.KodlaGetir = function () {
        var _this = this;
        this._emlakService.getKodlaGetir("newi")
            .subscribe(function (resData) { return _this.yeniIlanlarText = resData; }, function (resError) { return _this.errorMsg = resError; });
        this._emlakService.getKodlaGetir("newr")
            .subscribe(function (resData) { return _this.yeniIlanlarResimText = resData; }, function (resError) { return _this.errorMsg = resError; });
        this._emlakService.getKodlaGetir("dtyr")
            .subscribe(function (resData) { return _this.detayLinkText = resData; }, function (resError) { return _this.errorMsg = resError; });
    };
    MPNewPropsComponent = tslib_1.__decorate([
        Component({
            selector: 'emlak-mpnewprops',
            templateUrl: './mpnewprops.html'
        }),
        tslib_1.__metadata("design:paramtypes", [EmlakAjaxService, SolAjaxService])
    ], MPNewPropsComponent);
    return MPNewPropsComponent;
}());
export { MPNewPropsComponent };
//# sourceMappingURL=mpnewprops.js.map