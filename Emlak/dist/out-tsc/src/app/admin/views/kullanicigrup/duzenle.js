import * as tslib_1 from "tslib";
import { Component } from "@angular/core";
import { KullaniciGrupService } from '../../services/kullanicigrup';
import { KullaniciGrupTabloService } from '../../services/kullanicigruptablo';
import { KullaniciGrupHakService } from '../../services/kullanicigruphak';
import { KullanicilarService } from '../../services/kullanicilar';
import { SharedService } from '../../services/shared';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, Validators, FormControl } from "@angular/forms";
import * as $ from "jquery";
var AdminKullaniciGrupDuzenleComponent = /** @class */ (function () {
    function AdminKullaniciGrupDuzenleComponent(service, serviceUserGroupTables, serviceUserGroupRights, serviceUsers, sharedService, route, router, formBuilder) {
        this.service = service;
        this.serviceUserGroupTables = serviceUserGroupTables;
        this.serviceUserGroupRights = serviceUserGroupRights;
        this.serviceUsers = serviceUsers;
        this.sharedService = sharedService;
        this.route = route;
        this.router = router;
        this.formBuilder = formBuilder;
    }
    AdminKullaniciGrupDuzenleComponent.prototype.ngOnInit = function () {
        this.callTable = true;
        this.UserRightsControl($("#hdnModel").val());
        this.duzenleForm = this.formBuilder.group({
            ID: new FormControl(null, [Validators.required, Validators.minLength(1)]),
            Name: new FormControl(null, [Validators.required, Validators.minLength(3), Validators.maxLength(25)]),
            ShortName: new FormControl(null, [Validators.required, Validators.minLength(3), Validators.maxLength(5)]),
            Description: new FormControl(null),
        });
    };
    AdminKullaniciGrupDuzenleComponent.prototype.onSubmit = function () {
        var _this = this;
        this.data = new Object();
        this.data.ID = this.duzenleForm.get("ID").value;
        this.data.Name = this.duzenleForm.get("Name").value;
        this.data.ShortName = this.duzenleForm.get("ShortName").value;
        this.data.Description = this.duzenleForm.get("Description").value;
        this.service.postDuzenle(this.data)
            .subscribe(function (answer) {
            if (answer.Mesaj == null) {
                _this.router.navigate(['/Admin/KullaniciGrup']);
            }
            else {
                $(".alertMessage").text(answer.Mesaj);
                $(".alert-error").fadeIn("slow");
            }
        }, function (resError) { return _this.errorMsg = resError; });
    };
    AdminKullaniciGrupDuzenleComponent.prototype.onUsersDelete = function (id) {
        var _this = this;
        this.serviceUsers.getSil(id).subscribe(function (resData) {
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
    AdminKullaniciGrupDuzenleComponent.prototype.onUsersRealDelete = function (id) {
        var _this = this;
        this.serviceUsers.getKaldir(id).subscribe(function (resData) {
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
    AdminKullaniciGrupDuzenleComponent.prototype.onUserGroupTablesDelete = function (id) {
        var _this = this;
        this.serviceUserGroupTables.getSil(id).subscribe(function (resData) {
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
    AdminKullaniciGrupDuzenleComponent.prototype.onUserGroupRightsDelete = function (id) {
        var _this = this;
        this.serviceUserGroupRights.getSil(id).subscribe(function (resData) {
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
    AdminKullaniciGrupDuzenleComponent.prototype.ShowAlert = function (type) {
        $("#tdAlertMessage li.tdAlert" + type).fadeIn("slow");
        setInterval(function () {
            $("#tdAlertMessage li.tdAlert" + type).fadeOut("slow");
        }, 2000);
    };
    AdminKullaniciGrupDuzenleComponent.prototype.UserRightsControl = function (Model) {
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
                                            $("a.dlt-yes").attr("data-link", $(this).attr("data-link"));
                                        });
                                        $(document).on("click", "a.dlt-yes[data-link='UserGroupRights']", function () {
                                            var id = $("a.dlt-yes").attr("data-id");
                                            _this.onUserGroupRightsDelete(id);
                                            $("a.dlt-yes").removeAttr("data-link");
                                        });
                                        $(document).on("click", "a.dlt-yes[data-link='UserGroupTables']", function () {
                                            var id = $("a.dlt-yes").attr("data-id");
                                            _this.onUserGroupTablesDelete(id);
                                            $("a.dlt-yes").removeAttr("data-link");
                                        });
                                        $(document).on("click", "a.dlt-yes[data-link='Users']", function () {
                                            var id = $("a.dlt-yes").attr("data-id");
                                            _this.onUsersDelete(id);
                                            $("a.dlt-yes").removeAttr("data-link");
                                        });
                                        $(document).on("click", "a.rdltLink", function () {
                                            $(this).addClass("active-rdlt");
                                            $("a.rdlt-yes").attr("data-id", $(this).attr("data-id"));
                                        });
                                        $(document).on("click", "a.rdlt-yes", function () {
                                            var id = $("a.rdlt-yes").attr("data-id");
                                            _this.onUsersRealDelete(id);
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
    AdminKullaniciGrupDuzenleComponent = tslib_1.__decorate([
        Component({
            templateUrl: './duzenle.html'
        }),
        tslib_1.__metadata("design:paramtypes", [KullaniciGrupService, KullaniciGrupTabloService, KullaniciGrupHakService, KullanicilarService, SharedService, ActivatedRoute, Router, FormBuilder])
    ], AdminKullaniciGrupDuzenleComponent);
    return AdminKullaniciGrupDuzenleComponent;
}());
export { AdminKullaniciGrupDuzenleComponent };
//# sourceMappingURL=duzenle.js.map