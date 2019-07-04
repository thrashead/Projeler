import * as tslib_1 from "tslib";
import { Component } from '@angular/core';
import { SharedService } from '../../services/shared';
var AdminLayoutComponent = /** @class */ (function () {
    function AdminLayoutComponent(service) {
        this.service = service;
    }
    AdminLayoutComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.service.getLoginControl().subscribe(function (resData) {
            if (resData == false) {
                window.location.href = '/Emlak/';
            }
        }, function (resError) { return _this.errorMsg = resError; });
    };
    AdminLayoutComponent = tslib_1.__decorate([
        Component({
            selector: 'admin-layout',
            templateUrl: './layoutAdmin.html',
            providers: [SharedService]
        }),
        tslib_1.__metadata("design:paramtypes", [SharedService])
    ], AdminLayoutComponent);
    return AdminLayoutComponent;
}());
export { AdminLayoutComponent };
//# sourceMappingURL=layoutAdmin.js.map