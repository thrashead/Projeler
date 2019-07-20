import * as tslib_1 from "tslib";
import { Component } from "@angular/core";
import { FormElemanService } from "../../services/formeleman";
import { FormElemanOzellikService } from '../../services/formelemanozellik';
import { FormElemanDegerService } from '../../services/formelemandeger';
import { SharedService } from '../../services/shared';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, Validators, FormControl } from "@angular/forms";
import { Subscription } from "rxjs";
import * as $ from "jquery";
var AdminFormElemanDuzenleComponent = /** @class */ (function () {
    function AdminFormElemanDuzenleComponent(service, servicePropertyAttributes, servicePropertyValues, sharedService, route, router, formBuilder) {
        this.service = service;
        this.servicePropertyAttributes = servicePropertyAttributes;
        this.servicePropertyValues = servicePropertyValues;
        this.sharedService = sharedService;
        this.route = route;
        this.router = router;
        this.formBuilder = formBuilder;
        this.subscription = new Subscription();
    }
    AdminFormElemanDuzenleComponent.prototype.ngOnInit = function () {
        this.callTable = true;
        this.UserRightsControl($("#hdnModel").val());
        this.duzenleForm = this.formBuilder.group({
            ID: new FormControl(null, [Validators.required, Validators.min(1)]),
            PropTypeID: new FormControl(null, [Validators.required, Validators.min(1)]),
            GroupID: new FormControl(null),
            Title: new FormControl(null, [Validators.required, Validators.minLength(3), Validators.maxLength(50)]),
            Description: new FormControl(null),
            ErrorMessage: new FormControl(null),
            Code: new FormControl(null),
            OrderNumber: new FormControl(null),
        });
    };
    AdminFormElemanDuzenleComponent.prototype.ngOnDestroy = function () {
        this.subscription.unsubscribe();
    };
    AdminFormElemanDuzenleComponent.prototype.onSubmit = function () {
        var _this = this;
        this.data = new Object();
        this.data.ID = this.duzenleForm.get("ID").value;
        this.data.PropTypeID = this.duzenleForm.get("PropTypeID").value;
        this.data.GroupID = this.duzenleForm.get("GroupID").value;
        this.data.Title = this.duzenleForm.get("Title").value;
        this.data.Description = this.duzenleForm.get("Description").value;
        this.data.ErrorMessage = this.duzenleForm.get("ErrorMessage").value;
        this.data.Code = this.duzenleForm.get("Code").value;
        this.data.OrderNumber = this.duzenleForm.get("OrderNumber").value;
        this.service.postDuzenle(this.data)
            .subscribe(function (answer) {
            if (answer.Mesaj == null) {
                _this.router.navigate(['/Admin/FormEleman']);
            }
            else {
                $(".alertMessage").text(answer.Mesaj);
                $(".alert-error").fadeIn("slow");
            }
        }, function (resError) { return _this.errorMsg = resError; });
    };
    AdminFormElemanDuzenleComponent.prototype.onPropertyAttributesDelete = function (id) {
        var _this = this;
        this.servicePropertyAttributes.getSil(id).subscribe(function (resData) {
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
    AdminFormElemanDuzenleComponent.prototype.onPropertyAttributesCopy = function (id) {
        var _this = this;
        this.subscription.add(this.servicePropertyAttributes.getKopyala(id).subscribe(function (resData) {
            if (resData == true) {
                _this.ShowAlert("Copy");
                var currentUrl_1 = _this.router.url;
                _this.router.navigate(['/Admin/AnaSayfa'], { skipLocationChange: true }).then(function () { _this.router.navigate([currentUrl_1]); });
            }
            else {
                _this.ShowAlert("CopyNot");
            }
        }, function (resError) { return _this.errorMsg = resError; }, function () { _this.subscription.unsubscribe(); }));
    };
    AdminFormElemanDuzenleComponent.prototype.onPropertyValuesDelete = function (id) {
        var _this = this;
        this.servicePropertyValues.getSil(id).subscribe(function (resData) {
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
    AdminFormElemanDuzenleComponent.prototype.onPropertyValuesCopy = function (id) {
        var _this = this;
        this.subscription.add(this.servicePropertyValues.getKopyala(id).subscribe(function (resData) {
            if (resData == true) {
                _this.ShowAlert("Copy");
                var currentUrl_2 = _this.router.url;
                _this.router.navigate(['/Admin/AnaSayfa'], { skipLocationChange: true }).then(function () { _this.router.navigate([currentUrl_2]); });
            }
            else {
                _this.ShowAlert("CopyNot");
            }
        }, function (resError) { return _this.errorMsg = resError; }, function () { _this.subscription.unsubscribe(); }));
    };
    AdminFormElemanDuzenleComponent.prototype.ShowAlert = function (type) {
        $("#tdAlertMessage li.tdAlert" + type).fadeIn("slow");
        setInterval(function () {
            $("#tdAlertMessage li.tdAlert" + type).fadeOut("slow");
        }, 2000);
    };
    AdminFormElemanDuzenleComponent.prototype.UserRightsControl = function (Model) {
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
                                        $(document).on("click", "a.dlt-yes[data-link='PropertyAttributes']", function () {
                                            var id = $("a.dlt-yes").attr("data-id");
                                            _this.onPropertyAttributesDelete(id);
                                            $("a.dlt-yes").removeAttr("data-link");
                                        });
                                        $(document).on("click", "a.dlt-yes[data-link='PropertyValues']", function () {
                                            var id = $("a.dlt-yes").attr("data-id");
                                            _this.onPropertyValuesDelete(id);
                                            $("a.dlt-yes").removeAttr("data-link");
                                        });
                                        $(document).on("click", "a.cpyLink", function () {
                                            $(this).addClass("active-cpy");
                                            $("a.cpy-yes").attr("data-id", $(this).attr("data-id"));
                                            $("a.cpy-yes").attr("data-link", $(this).attr("data-link"));
                                        });
                                        $(document).on("click", "a.cpy-yes[data-link='PropertyAttributes']", function () {
                                            var id = $("a.cpy-yes").attr("data-id");
                                            _this.onPropertyAttributesCopy(id);
                                            $("a.cpy-yes").removeAttr("data-link");
                                        });
                                        $(document).on("click", "a.cpy-yes[data-link='PropertyValues']", function () {
                                            var id = $("a.cpy-yes").attr("data-id");
                                            _this.onPropertyValuesCopy(id);
                                            $("a.cpy-yes").removeAttr("data-link");
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
    AdminFormElemanDuzenleComponent = tslib_1.__decorate([
        Component({
            templateUrl: './duzenle.html'
        }),
        tslib_1.__metadata("design:paramtypes", [FormElemanService, FormElemanOzellikService, FormElemanDegerService, SharedService, ActivatedRoute, Router, FormBuilder])
    ], AdminFormElemanDuzenleComponent);
    return AdminFormElemanDuzenleComponent;
}());
export { AdminFormElemanDuzenleComponent };
//# sourceMappingURL=duzenle.js.map