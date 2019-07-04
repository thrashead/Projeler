import * as tslib_1 from "tslib";
import { Component } from "@angular/core";
import { BagliTiplerService } from "../../services/baglitipler";
import { SharedService } from '../../services/shared';
import { Router } from '@angular/router';
import * as $ from "jquery";
var AdminBagliTiplerIndexComponent = /** @class */ (function () {
    function AdminBagliTiplerIndexComponent(service, sharedService, router) {
        this.service = service;
        this.sharedService = sharedService;
        this.router = router;
    }
    AdminBagliTiplerIndexComponent.prototype.ngOnInit = function () {
        this.callTable = true;
        this.UserRightsControl($("#hdnModel").val());
    };
    AdminBagliTiplerIndexComponent.prototype.onDelete = function (id) {
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
    AdminBagliTiplerIndexComponent.prototype.onCopy = function (id) {
        var _this = this;
        this.service.getKopyala(id).subscribe(function (resData) {
            if (resData == true) {
                _this.ShowAlert("Copy");
                var currentUrl_1 = _this.router.url;
                _this.router.navigate(['/Admin/AnaSayfa'], { skipLocationChange: true }).then(function () { _this.router.navigate([currentUrl_1]); });
            }
            else {
                _this.ShowAlert("CopyNot");
            }
        }, function (resError) { return _this.errorMsg = resError; });
    };
    AdminBagliTiplerIndexComponent.prototype.ShowAlert = function (type) {
        $("#tdAlertMessage li.tdAlert" + type).fadeIn("slow");
        setInterval(function () {
            $("#tdAlertMessage li.tdAlert" + type).fadeOut("slow");
        }, 2000);
    };
    AdminBagliTiplerIndexComponent.prototype.UserRightsControl = function (Model) {
        var _this = this;
        this.sharedService.getHasRight(Model, "i").subscribe(function (iRight) {
            _this.insertShow = iRight;
            _this.sharedService.getHasRight(Model, "u").subscribe(function (uRight) {
                _this.updateShow = uRight;
                _this.sharedService.getHasRight(Model, "d").subscribe(function (dRight) {
                    _this.deleteShow = dRight;
                    _this.sharedService.getHasRight(Model, "c").subscribe(function (cRight) {
                        _this.copyShow = cRight;
                        if (_this.callTable == true) {
                            _this.service.getIndex().subscribe(function (resData) {
                                for (var i = 0; i < resData.length; i++) {
                                    switch (resData[i].MainTypeID) {
                                        case 1:
                                            resData[i].MainAdi = resData[i].MainCategoryAdi;
                                            break;
                                        case 2:
                                            resData[i].MainAdi = resData[i].MainContentAdi;
                                            break;
                                        case 3:
                                            resData[i].MainAdi = resData[i].MainProductAdi;
                                            break;
                                        case 4:
                                            resData[i].MainAdi = resData[i].MainGalleryAdi;
                                            break;
                                        case 5:
                                            resData[i].MainAdi = resData[i].MainPictureAdi;
                                            break;
                                        case 6:
                                            resData[i].MainAdi = resData[i].MainFileAdi;
                                            break;
                                        case 7:
                                            resData[i].MainAdi = resData[i].MainMetaAdi;
                                            break;
                                        case 8:
                                            resData[i].MainAdi = resData[i].MainPropertyGroupAdi;
                                            break;
                                        case 17:
                                            resData[i].MainAdi = resData[i].MainRealEstatesAdi;
                                            break;
                                    }
                                }
                                _this.BagliTiplerList = resData;
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
                                    $(document).on("click", "a.cpyLink", function () {
                                        $(this).addClass("active-cpy");
                                        $("a.cpy-yes").attr("data-id", $(this).attr("data-id"));
                                    });
                                    $(document).on("click", "a.cpy-yes", function () {
                                        var id = $("a.cpy-yes").attr("data-id");
                                        _this.onCopy(id);
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
    AdminBagliTiplerIndexComponent = tslib_1.__decorate([
        Component({
            templateUrl: './index.html',
            providers: [BagliTiplerService, SharedService]
        }),
        tslib_1.__metadata("design:paramtypes", [BagliTiplerService, SharedService, Router])
    ], AdminBagliTiplerIndexComponent);
    return AdminBagliTiplerIndexComponent;
}());
export { AdminBagliTiplerIndexComponent };
//# sourceMappingURL=index.js.map