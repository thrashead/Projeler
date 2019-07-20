import * as tslib_1 from "tslib";
import { Component } from "@angular/core";
import { KategoriService } from "../../services/kategori";
import { KategoriDilService } from '../../services/kategoridil';
import { SharedService } from '../../services/shared';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, Validators, FormControl } from "@angular/forms";
import * as $ from "jquery";
var AdminKategoriDuzenleComponent = /** @class */ (function () {
    function AdminKategoriDuzenleComponent(service, serviceCategoryT, sharedService, route, router, formBuilder) {
        this.service = service;
        this.serviceCategoryT = serviceCategoryT;
        this.sharedService = sharedService;
        this.route = route;
        this.router = router;
        this.formBuilder = formBuilder;
    }
    AdminKategoriDuzenleComponent.prototype.ngOnInit = function () {
        this.callTable = true;
        this.UserRightsControl($("#hdnModel").val());
        this.duzenleForm = this.formBuilder.group({
            ID: new FormControl(null, [Validators.required, Validators.min(1)]),
            ParentID: new FormControl(null, [Validators.required, Validators.min(1)]),
            Title: new FormControl(null, [Validators.required, Validators.minLength(3), Validators.maxLength(255)]),
            Code: new FormControl(null),
            Active: new FormControl(null),
        });
    };
    AdminKategoriDuzenleComponent.prototype.onSubmit = function () {
        var _this = this;
        this.data = new Object();
        this.data.ID = this.duzenleForm.get("ID").value;
        this.data.ParentID = this.duzenleForm.get("ParentID").value;
        this.data.Title = this.duzenleForm.get("Title").value;
        this.data.Code = this.duzenleForm.get("Code").value;
        this.data.Active = this.duzenleForm.get("Active").value;
        this.service.postDuzenle(this.data)
            .subscribe(function (answer) {
            if (answer.Mesaj == null) {
                _this.router.navigate(['/Admin/Kategori']);
            }
            else {
                $(".alertMessage").text(answer.Mesaj);
                $(".alert-error").fadeIn("slow");
            }
        }, function (resError) { return _this.errorMsg = resError; });
    };
    AdminKategoriDuzenleComponent.prototype.onCategoryTDelete = function (id) {
        var _this = this;
        this.serviceCategoryT.getSil(id).subscribe(function (resData) {
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
    AdminKategoriDuzenleComponent.prototype.onCategoryTRealDelete = function (id) {
        var _this = this;
        this.serviceCategoryT.getKaldir(id).subscribe(function (resData) {
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
    AdminKategoriDuzenleComponent.prototype.ShowAlert = function (type) {
        $("#tdAlertMessage li.tdAlert" + type).fadeIn("slow");
        setInterval(function () {
            $("#tdAlertMessage li.tdAlert" + type).fadeOut("slow");
        }, 2000);
    };
    AdminKategoriDuzenleComponent.prototype.UserRightsControl = function (Model) {
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
                            _this.route.params.subscribe(function (params) {
                                _this.id = params['id'];
                                _this.service.getDuzenle(_this.id).subscribe(function (resData) {
                                    _this.model = resData;
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
                                            _this.onCategoryTDelete(id);
                                        });
                                        $(document).on("click", "a.rdltLink", function () {
                                            $(this).addClass("active-rdlt");
                                            $("a.rdlt-yes").attr("data-id", $(this).attr("data-id"));
                                        });
                                        $(document).on("click", "a.rdlt-yes", function () {
                                            var id = $("a.rdlt-yes").attr("data-id");
                                            _this.onCategoryTRealDelete(id);
                                        });
                                    }, 1);
                                }, function (resError) { return _this.errorMsg = resError; });
                            });
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
    AdminKategoriDuzenleComponent = tslib_1.__decorate([
        Component({
            templateUrl: './duzenle.html'
        }),
        tslib_1.__metadata("design:paramtypes", [KategoriService, KategoriDilService, SharedService, ActivatedRoute, Router, FormBuilder])
    ], AdminKategoriDuzenleComponent);
    return AdminKategoriDuzenleComponent;
}());
export { AdminKategoriDuzenleComponent };
//# sourceMappingURL=duzenle.js.map