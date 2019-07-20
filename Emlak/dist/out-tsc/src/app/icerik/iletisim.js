import * as tslib_1 from "tslib";
import { Component } from "@angular/core";
import { EmlakAjaxService } from "../services/emlakajax";
var IletisimComponent = /** @class */ (function () {
    function IletisimComponent(_emlakService) {
        this._emlakService = _emlakService;
    }
    IletisimComponent.prototype.ngOnInit = function () {
        var _this = this;
        this._emlakService.getIcerikGetir("Iletisim")
            .subscribe(function (resData) { return _this.iletisim = resData; }, function (resError) { return _this.errorMsg = resError; });
    };
    IletisimComponent = tslib_1.__decorate([
        Component({
            templateUrl: './iletisim.html'
        }),
        tslib_1.__metadata("design:paramtypes", [EmlakAjaxService])
    ], IletisimComponent);
    return IletisimComponent;
}());
export { IletisimComponent };
//# sourceMappingURL=iletisim.js.map