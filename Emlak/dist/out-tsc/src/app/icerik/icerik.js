import * as tslib_1 from "tslib";
import { Component } from "@angular/core";
import { EmlakAjaxService } from "../services/emlakajax";
import { ActivatedRoute } from '@angular/router';
var IcerikComponent = /** @class */ (function () {
    function IcerikComponent(_emlakService, route) {
        this._emlakService = _emlakService;
        this.route = route;
    }
    IcerikComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.route.params.subscribe(function (params) {
            _this.link = params['link'];
            _this._emlakService.getIcerikGetir(_this.link)
                .subscribe(function (resData) {
                _this.icerik = resData;
            }, function (resError) { return _this.errorMsg = resError; });
        });
    };
    IcerikComponent = tslib_1.__decorate([
        Component({
            templateUrl: './icerik.html'
        }),
        tslib_1.__metadata("design:paramtypes", [EmlakAjaxService, ActivatedRoute])
    ], IcerikComponent);
    return IcerikComponent;
}());
export { IcerikComponent };
//# sourceMappingURL=icerik.js.map