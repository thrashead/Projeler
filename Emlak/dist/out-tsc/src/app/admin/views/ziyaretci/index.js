import * as tslib_1 from "tslib";
import { Component } from "@angular/core";
import { ZiyaretciService } from "../../services/ziyaretci";
import { SharedService } from '../../services/shared';
import { Router } from '@angular/router';
import * as $ from "jquery";
var AdminZiyaretciIndexComponent = /** @class */ (function () {
    function AdminZiyaretciIndexComponent(service, sharedService, router) {
        this.service = service;
        this.sharedService = sharedService;
        this.router = router;
    }
    AdminZiyaretciIndexComponent.prototype.ngOnInit = function () {
        this.callTable = true;
        this.UserRightsControl($("#hdnModel").val());
    };
    AdminZiyaretciIndexComponent.prototype.onClear = function () {
        var _this = this;
        this.service.getSil().subscribe(function (resData) {
            if (resData == true) {
                _this.ShowAlert("Clear");
                var currentUrl_1 = _this.router.url;
                _this.router.navigate(['/Admin'], { skipLocationChange: true }).then(function () { return _this.router.navigate([currentUrl_1]); });
            }
            else {
                _this.ShowAlert("ClearNot");
            }
        }, function (resError) { return _this.errorMsg = resError; });
    };
    AdminZiyaretciIndexComponent.prototype.ShowAlert = function (type) {
        $("#tdAlertMessage li.tdAlert" + type).fadeIn("slow");
        setInterval(function () {
            $("#tdAlertMessage li.tdAlert" + type).fadeOut("slow");
        }, 2000);
    };
    AdminZiyaretciIndexComponent.prototype.UserRightsControl = function (Model) {
        var _this = this;
        this.sharedService.getHasRight(Model, "d").subscribe(function (dRight) {
            _this.deleteShow = dRight;
            if (_this.callTable == true) {
                _this.service.getIndex().subscribe(function (resData) {
                    _this.ZiyaretciList = resData;
                    _this.callTable = false;
                    setTimeout(function () {
                        $(".data-table").dataTable({
                            "bJQueryUI": true,
                            "sPaginationType": "full_numbers",
                            "sDom": '<""l>t<"F"fp>'
                        });
                        if ($(".dropdown-menu").first().find("a").length <= 0) {
                            $(".btn-group").remove();
                        }
                        $(document).off("click", ".fg-button").on("click", ".fg-button", function () {
                            setTimeout(function () {
                                _this.UserRightsControl($("#hdnModel").val());
                            }, 1);
                        });
                    }, 1);
                }, function (resError) { return _this.errorMsg = resError; });
            }
            setTimeout(function () {
                if ($(".dropdown-menu").first().find("a").length <= 0) {
                    $(".btn-group").remove();
                }
            }, 1);
        }, function (resError) { return _this.errorMsg = resError; });
    };
    AdminZiyaretciIndexComponent = tslib_1.__decorate([
        Component({
            templateUrl: './index.html'
        }),
        tslib_1.__metadata("design:paramtypes", [ZiyaretciService, SharedService, Router])
    ], AdminZiyaretciIndexComponent);
    return AdminZiyaretciIndexComponent;
}());
export { AdminZiyaretciIndexComponent };
//# sourceMappingURL=index.js.map