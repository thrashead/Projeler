import * as tslib_1 from "tslib";
import { Component } from "@angular/core";
import { EmlakAjaxService } from "../../services/emlakajax";
import { HomeAjaxService } from "../../services/homeajax";
var MPShowroomComponent = /** @class */ (function () {
    function MPShowroomComponent(_emlakService, _homeService) {
        this._emlakService = _emlakService;
        this._homeService = _homeService;
        this.vitrinIlanlarResimText = "resimyok";
        this.detayLinkText = "resimyok";
    }
    MPShowroomComponent.prototype.ngOnInit = function () {
        var _this = this;
        this._homeService.getVitrinIlanlar("3")
            .subscribe(function (resData) { return _this.ilanlar = resData; }, function (resError) { return _this.errorMsg = resError; });
        this.KodlaGetir();
    };
    MPShowroomComponent.prototype.KodlaGetir = function () {
        var _this = this;
        this._emlakService.getKodlaGetir("swrm")
            .subscribe(function (resData) { return _this.vitrinIlanlarText = resData; }, function (resError) { return _this.errorMsg = resError; });
        this._emlakService.getKodlaGetir("alli")
            .subscribe(function (resData) { return _this.tumIlanlarText = resData; }, function (resError) { return _this.errorMsg = resError; });
        this._emlakService.getKodlaGetir("newr")
            .subscribe(function (resData) { return _this.vitrinIlanlarResimText = resData; }, function (resError) { return _this.errorMsg = resError; });
        this._emlakService.getKodlaGetir("dtyr")
            .subscribe(function (resData) { return _this.detayLinkText = resData; }, function (resError) { return _this.errorMsg = resError; });
    };
    MPShowroomComponent = tslib_1.__decorate([
        Component({
            selector: 'emlak-mpshowroom',
            templateUrl: './mpshowroom.html'
        }),
        tslib_1.__metadata("design:paramtypes", [EmlakAjaxService, HomeAjaxService])
    ], MPShowroomComponent);
    return MPShowroomComponent;
}());
export { MPShowroomComponent };
//# sourceMappingURL=mpshowroom.js.map