import * as tslib_1 from "tslib";
import { Component } from "@angular/core";
import { IcerikService } from "../../services/icerik";
import { Router } from '@angular/router';
import { FormBuilder, Validators, FormControl } from "@angular/forms";
var AdminIcerikEkleComponent = /** @class */ (function () {
    function AdminIcerikEkleComponent(service, router, formBuilder) {
        this.service = service;
        this.router = router;
        this.formBuilder = formBuilder;
    }
    AdminIcerikEkleComponent.prototype.ngOnInit = function () {
        this.ekleForm = this.formBuilder.group({
            Title: new FormControl(null, [Validators.required, Validators.minLength(3), Validators.maxLength(255)]),
            Code: new FormControl(null),
            Active: new FormControl(null),
        });
    };
    AdminIcerikEkleComponent.prototype.onSubmit = function () {
        var _this = this;
        this.data = new Object();
        this.data.Title = this.ekleForm.get("Title").value;
        this.data.Code = this.ekleForm.get("Code").value;
        this.data.Active = this.ekleForm.get("Active").value;
        this.service.postEkle(this.data)
            .subscribe(function (answer) {
            if (answer.Mesaj == null) {
                _this.router.navigate(['/Admin/Icerik']);
            }
            else {
                $(".alertMessage").text(answer.Mesaj);
                $(".alert-error").fadeIn("slow");
            }
        }, function (resError) { return _this.errorMsg = resError; });
    };
    AdminIcerikEkleComponent = tslib_1.__decorate([
        Component({
            templateUrl: './ekle.html'
        }),
        tslib_1.__metadata("design:paramtypes", [IcerikService, Router, FormBuilder])
    ], AdminIcerikEkleComponent);
    return AdminIcerikEkleComponent;
}());
export { AdminIcerikEkleComponent };
//# sourceMappingURL=ekle.js.map