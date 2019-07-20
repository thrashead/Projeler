import * as tslib_1 from "tslib";
import { Component } from "@angular/core";
import { FormElemanGrupService } from '../../services/formelemangrup';
import { Router } from '@angular/router';
import { FormBuilder, Validators, FormControl } from "@angular/forms";
var AdminFormElemanGrupEkleComponent = /** @class */ (function () {
    function AdminFormElemanGrupEkleComponent(service, router, formBuilder) {
        this.service = service;
        this.router = router;
        this.formBuilder = formBuilder;
    }
    AdminFormElemanGrupEkleComponent.prototype.ngOnInit = function () {
        this.ekleForm = this.formBuilder.group({
            Title: new FormControl(null, [Validators.required, Validators.minLength(3), Validators.maxLength(50)]),
            Description: new FormControl(null),
            Code: new FormControl(null),
            Active: new FormControl(null),
        });
    };
    AdminFormElemanGrupEkleComponent.prototype.onSubmit = function () {
        var _this = this;
        this.data = new Object();
        this.data.Title = this.ekleForm.get("Title").value;
        this.data.Description = this.ekleForm.get("Description").value;
        this.data.Code = this.ekleForm.get("Code").value;
        this.data.Active = this.ekleForm.get("Active").value;
        this.service.postEkle(this.data)
            .subscribe(function (answer) {
            if (answer.Mesaj == null) {
                _this.router.navigate(['/Admin/FormElemanGrup']);
            }
            else {
                $(".alertMessage").text(answer.Mesaj);
                $(".alert-error").fadeIn("slow");
            }
        }, function (resError) { return _this.errorMsg = resError; });
    };
    AdminFormElemanGrupEkleComponent = tslib_1.__decorate([
        Component({
            templateUrl: './ekle.html'
        }),
        tslib_1.__metadata("design:paramtypes", [FormElemanGrupService, Router, FormBuilder])
    ], AdminFormElemanGrupEkleComponent);
    return AdminFormElemanGrupEkleComponent;
}());
export { AdminFormElemanGrupEkleComponent };
//# sourceMappingURL=ekle.js.map