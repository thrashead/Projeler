import * as tslib_1 from "tslib";
import { Component } from "@angular/core";
import { LoglarService } from "../../services/loglar";
import * as $ from "jquery";
var AdminLoglarIndexComponent = /** @class */ (function () {
    function AdminLoglarIndexComponent(service) {
        this.service = service;
    }
    AdminLoglarIndexComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.service.getIndex().subscribe(function (resData) {
            _this.LoglarList = resData;
            setTimeout(function () {
                $(".data-table").dataTable({
                    "bJQueryUI": true,
                    "sPaginationType": "full_numbers",
                    "sDom": '<""l>t<"F"fp>'
                });
            }, 1);
        }, function (resError) { return _this.errorMsg = resError; });
    };
    AdminLoglarIndexComponent = tslib_1.__decorate([
        Component({
            templateUrl: './index.html',
            providers: [LoglarService]
        }),
        tslib_1.__metadata("design:paramtypes", [LoglarService])
    ], AdminLoglarIndexComponent);
    return AdminLoglarIndexComponent;
}());
export { AdminLoglarIndexComponent };
//# sourceMappingURL=index.js.map