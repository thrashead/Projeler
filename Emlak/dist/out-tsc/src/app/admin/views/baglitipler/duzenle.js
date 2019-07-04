import * as tslib_1 from "tslib";
import { Component } from "@angular/core";
import { BagliTiplerService } from "../../services/baglitipler";
import { BaglantiService } from '../../services/baglanti';
import { SharedService } from '../../services/shared';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, Validators, FormControl } from "@angular/forms";
import * as $ from "jquery";
var AdminBagliTiplerDuzenleComponent = /** @class */ (function () {
    function AdminBagliTiplerDuzenleComponent(service, serviceLinks, sharedService, route, router, formBuilder) {
        this.service = service;
        this.serviceLinks = serviceLinks;
        this.sharedService = sharedService;
        this.route = route;
        this.router = router;
        this.formBuilder = formBuilder;
    }
    AdminBagliTiplerDuzenleComponent.prototype.ngOnInit = function () {
        this.callTable = true;
        this.UserRightsControl($("#hdnModel").val());
        this.duzenleForm = this.formBuilder.group({
            ID: new FormControl(null, [Validators.required, Validators.min(1)]),
            Title: new FormControl(null, [Validators.maxLength(50)]),
            MainTypeID: new FormControl(null, [Validators.required, Validators.min(1)]),
            MainID: new FormControl(null, [Validators.required, Validators.min(1)]),
            LinkedTypeID: new FormControl(null, [Validators.required, Validators.min(1)]),
        });
    };
    AdminBagliTiplerDuzenleComponent.prototype.onChange = function (event) {
        var _this = this;
        var target = event.target || event.srcElement || event.currentTarget;
        this.service.getTipDoldur(target.value)
            .subscribe(function (answer) {
            if (answer != null) {
                $("select.selectMain").html("");
                for (var i = 0; i < answer.length; i++) {
                    $("select.selectMain").append("<option value='" + answer[i].Value + "'>" + answer[i].Text + "</option>");
                }
            }
            else {
                $(".alertMessage").text("Ana Nesne getirilemedi yada ilgili Ana Tip'e ait nesne henüz tanımlanmamış.");
                $(".alert-error").fadeIn("slow");
            }
        }, function (resError) { return _this.errorMsg = resError; });
    };
    AdminBagliTiplerDuzenleComponent.prototype.onSubmit = function () {
        var _this = this;
        this.data = new Object();
        this.data.ID = this.duzenleForm.get("ID").value;
        this.data.Title = this.duzenleForm.get("Title").value;
        this.data.MainTypeID = this.duzenleForm.get("MainTypeID").value;
        this.data.MainID = this.duzenleForm.get("MainID").value;
        this.data.LinkedTypeID = this.duzenleForm.get("LinkedTypeID").value;
        this.service.postDuzenle(this.data)
            .subscribe(function (answer) {
            if (answer.Mesaj == null) {
                _this.router.navigate(['/Admin/BagliTipler']);
            }
            else {
                $(".alertMessage").text(answer.Mesaj);
                $(".alert-error").fadeIn("slow");
            }
        }, function (resError) { return _this.errorMsg = resError; });
    };
    AdminBagliTiplerDuzenleComponent.prototype.onLinksDelete = function (id) {
        var _this = this;
        this.serviceLinks.getSil(id).subscribe(function (resData) {
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
    AdminBagliTiplerDuzenleComponent.prototype.ShowAlert = function (type) {
        $("#tdAlertMessage li.tdAlert" + type).fadeIn("slow");
        setInterval(function () {
            $("#tdAlertMessage li.tdAlert" + type).fadeOut("slow");
        }, 2000);
    };
    AdminBagliTiplerDuzenleComponent.prototype.UserRightsControl = function (Model) {
        var _this = this;
        this.sharedService.getHasRight(Model, "i").subscribe(function (iRight) {
            _this.insertShow = iRight;
            _this.sharedService.getHasRight(Model, "u").subscribe(function (uRight) {
                _this.updateShow = uRight;
                _this.sharedService.getHasRight(Model, "d").subscribe(function (dRight) {
                    _this.deleteShow = dRight;
                    if (_this.callTable == true) {
                        _this.route.params.subscribe(function (params) {
                            _this.id = params['id'];
                            _this.service.getDuzenle(_this.id).subscribe(function (resData) {
                                for (var i = 0; i < resData.LinkList.length; i++) {
                                    switch (resData.LinkedTypeID) {
                                        case 1:
                                            resData.LinkList[i].LinkedAdi = resData.LinkList[i].LinkedCategoryAdi;
                                            break;
                                        case 2:
                                            resData.LinkList[i].LinkedAdi = resData.LinkList[i].LinkedContentAdi;
                                            break;
                                        case 3:
                                            resData.LinkList[i].LinkedAdi = resData.LinkList[i].LinkedProductAdi;
                                            break;
                                        case 4:
                                            resData.LinkList[i].LinkedAdi = resData.LinkList[i].LinkedGalleryAdi;
                                            break;
                                        case 5:
                                            resData.LinkList[i].LinkedAdi = resData.LinkList[i].LinkedPictureAdi;
                                            break;
                                        case 6:
                                            resData.LinkList[i].LinkedAdi = resData.LinkList[i].LinkedFileAdi;
                                            break;
                                        case 7:
                                            resData.LinkList[i].LinkedAdi = resData.LinkList[i].LinkedMetaAdi;
                                            break;
                                        case 8:
                                            resData.LinkList[i].LinkedAdi = resData.LinkList[i].LinkedPropertyGroupAdi;
                                            break;
                                        case 17:
                                            resData.LinkList[i].LinkedAdi = resData.LinkList[i].LinkedRealEstatesAdi;
                                            break;
                                    }
                                }
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
                                        _this.onLinksDelete(id);
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
    };
    AdminBagliTiplerDuzenleComponent = tslib_1.__decorate([
        Component({
            templateUrl: './duzenle.html',
            providers: [BagliTiplerService, BaglantiService, SharedService]
        }),
        tslib_1.__metadata("design:paramtypes", [BagliTiplerService, BaglantiService, SharedService, ActivatedRoute, Router, FormBuilder])
    ], AdminBagliTiplerDuzenleComponent);
    return AdminBagliTiplerDuzenleComponent;
}());
export { AdminBagliTiplerDuzenleComponent };
//# sourceMappingURL=duzenle.js.map