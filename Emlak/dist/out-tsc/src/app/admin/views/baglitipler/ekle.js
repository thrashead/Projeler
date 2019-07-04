import * as tslib_1 from "tslib";
import { Component } from "@angular/core";
import { BagliTiplerService } from "../../services/baglitipler";
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, Validators, FormControl } from "@angular/forms";
var AdminBagliTiplerEkleComponent = /** @class */ (function () {
    function AdminBagliTiplerEkleComponent(service, route, router, formBuilder) {
        this.service = service;
        this.route = route;
        this.router = router;
        this.formBuilder = formBuilder;
    }
    AdminBagliTiplerEkleComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.route.params.subscribe(function () {
            _this.service.getEkle().subscribe(function (resData) {
                _this.model = resData;
            }, function (resError) { return _this.errorMsg = resError; });
        });
        this.ekleForm = this.formBuilder.group({
            Title: new FormControl(null, [Validators.maxLength(50)]),
            MainTypeID: new FormControl(null, [Validators.required, Validators.min(1)]),
            MainID: new FormControl(null, [Validators.required, Validators.min(1)]),
            LinkedTypeID: new FormControl(null, [Validators.required, Validators.min(1)]),
        });
    };
    AdminBagliTiplerEkleComponent.prototype.onChange = function (event) {
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
    AdminBagliTiplerEkleComponent.prototype.onSubmit = function () {
        var _this = this;
        this.data = new Object();
        this.data.Title = this.ekleForm.get("Title").value;
        this.data.MainTypeID = this.ekleForm.get("MainTypeID").value;
        this.data.MainID = this.ekleForm.get("MainID").value;
        this.data.LinkedTypeID = this.ekleForm.get("LinkedTypeID").value;
        this.service.postEkle(this.data)
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
    AdminBagliTiplerEkleComponent = tslib_1.__decorate([
        Component({
            templateUrl: './ekle.html',
            providers: [BagliTiplerService]
        }),
        tslib_1.__metadata("design:paramtypes", [BagliTiplerService, ActivatedRoute, Router, FormBuilder])
    ], AdminBagliTiplerEkleComponent);
    return AdminBagliTiplerEkleComponent;
}());
export { AdminBagliTiplerEkleComponent };
//# sourceMappingURL=ekle.js.map