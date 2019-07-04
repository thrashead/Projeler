import * as tslib_1 from "tslib";
import { Component } from "@angular/core";
import { FormTiplerService } from '../../services/formtipler';
import { Router } from '@angular/router';
import { FormBuilder, Validators, FormControl } from "@angular/forms";
var AdminFormTiplerEkleComponent = /** @class */ (function () {
    function AdminFormTiplerEkleComponent(service, router, formBuilder) {
        this.service = service;
        this.router = router;
        this.formBuilder = formBuilder;
    }
    AdminFormTiplerEkleComponent.prototype.ngOnInit = function () {
        this.ekleForm = this.formBuilder.group({
            Name: new FormControl(null, [Validators.required, Validators.minLength(3), Validators.maxLength(50)]),
            Type: new FormControl(null, [Validators.required, Validators.minLength(3), Validators.maxLength(50)]),
            ShortName: new FormControl(null, [Validators.required, Validators.minLength(3), Validators.maxLength(25)]),
            HasValue: new FormControl(null),
        });
    };
    AdminFormTiplerEkleComponent.prototype.onSubmit = function () {
        var _this = this;
        this.data = new Object();
        this.data.Name = this.ekleForm.get("Name").value;
        this.data.Type = this.ekleForm.get("Type").value;
        this.data.ShortName = this.ekleForm.get("ShortName").value;
        this.data.HasValue = this.ekleForm.get("HasValue").value;
        this.service.postEkle(this.data)
            .subscribe(function (answer) {
            if (answer.Mesaj == null) {
                _this.router.navigate(['/Admin/FormTipler']);
            }
            else {
                $(".alertMessage").text(answer.Mesaj);
                $(".alert-error").fadeIn("slow");
            }
        }, function (resError) { return _this.errorMsg = resError; });
    };
    AdminFormTiplerEkleComponent = tslib_1.__decorate([
        Component({
            templateUrl: './ekle.html',
            providers: [FormTiplerService]
        }),
        tslib_1.__metadata("design:paramtypes", [FormTiplerService, Router, FormBuilder])
    ], AdminFormTiplerEkleComponent);
    return AdminFormTiplerEkleComponent;
}());
export { AdminFormTiplerEkleComponent };
//# sourceMappingURL=ekle.js.map