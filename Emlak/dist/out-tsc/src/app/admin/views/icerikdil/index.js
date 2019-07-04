import * as tslib_1 from "tslib";
import { Component } from "@angular/core";
import { IcerikDilService } from "../../services/icerikdil";
import { SharedService } from '../../services/shared';
import * as $ from "jquery";
var AdminIcerikDilIndexComponent = /** @class */ (function () {
    function AdminIcerikDilIndexComponent(service, sharedService) {
        this.service = service;
        this.sharedService = sharedService;
    }
    AdminIcerikDilIndexComponent.prototype.ngOnInit = function () {
        this.callTable = true;
        this.UserRightsControl($("#hdnModel").val());
    };
    AdminIcerikDilIndexComponent.prototype.onDelete = function (id) {
        var _this = this;
        this.service.getSil(id).subscribe(function (resData) {
            if (resData == true) {
                _this.ShowAlert("Delete");
                $("a.dltLink.active-dlt").parent("li").parent("ul").parent("div").parent("td").parent("tr").fadeOut("slow", function () {
                    $(this).remove();
                });
            }
            else {
                _this.ShowAlert("DeleteNot");
            }
        }, function (resError) { return _this.errorMsg = resError; });
    };
    AdminIcerikDilIndexComponent.prototype.onRealDelete = function (id) {
        var _this = this;
        this.service.getKaldir(id).subscribe(function (resData) {
            if (resData == true) {
                _this.ShowAlert("RealDelete");
                $("a.rdltLink.active-rdlt").parent("li").parent("ul").parent("div").parent("td").parent("tr").fadeOut("slow", function () {
                    $(this).remove();
                });
            }
            else {
                _this.ShowAlert("RealDeleteNot");
            }
        }, function (resError) { return _this.errorMsg = resError; });
    };
    AdminIcerikDilIndexComponent.prototype.ShowAlert = function (type) {
        $("#tdAlertMessage li.tdAlert" + type).fadeIn("slow");
        setInterval(function () {
            $("#tdAlertMessage li.tdAlert" + type).fadeOut("slow");
        }, 2000);
    };
    AdminIcerikDilIndexComponent.prototype.UserRightsControl = function (Model) {
        var _this = this;
        this.sharedService.getHasRight(Model, "i").subscribe(function (iRight) {
            _this.insertShow = iRight;
            _this.sharedService.getHasRight(Model, "u").subscribe(function (uRight) {
                _this.updateShow = uRight;
                _this.sharedService.getHasRight(Model, "d").subscribe(function (dRight) {
                    _this.deleteShow = dRight;
                    _this.sharedService.getHasRight(Model, "rd").subscribe(function (rdRight) {
                        _this.realDeleteShow = rdRight;
                        if (_this.callTable == true) {
                            _this.service.getIndex().subscribe(function (resData) {
                                _this.IcerikDilList = resData;
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
                                    $(document).on("click", ".fg-button", function () {
                                        setTimeout(function () {
                                            _this.UserRightsControl($("#hdnModel").val());
                                        }, 1);
                                    });
                                    $(document).on("click", "a.dltLink", function () {
                                        $(this).addClass("active-dlt");
                                        $("a.dlt-yes").attr("data-id", $(this).attr("data-id"));
                                    });
                                    $(document).on("click", "a.dlt-yes", function () {
                                        var id = $("a.dlt-yes").attr("data-id");
                                        _this.onDelete(id);
                                    });
                                    $(document).on("click", "a.rdltLink", function () {
                                        $(this).addClass("active-rdlt");
                                        $("a.rdlt-yes").attr("data-id", $(this).attr("data-id"));
                                    });
                                    $(document).on("click", "a.rdlt-yes", function () {
                                        var id = $("a.rdlt-yes").attr("data-id");
                                        _this.onRealDelete(id);
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
                }, function (resError) { return _this.errorMsg = resError; });
            }, function (resError) { return _this.errorMsg = resError; });
        }, function (resError) { return _this.errorMsg = resError; });
    };
    AdminIcerikDilIndexComponent = tslib_1.__decorate([
        Component({
            templateUrl: './index.html',
            providers: [IcerikDilService, SharedService]
        }),
        tslib_1.__metadata("design:paramtypes", [IcerikDilService, SharedService])
    ], AdminIcerikDilIndexComponent);
    return AdminIcerikDilIndexComponent;
}());
export { AdminIcerikDilIndexComponent };
//# sourceMappingURL=index.js.map