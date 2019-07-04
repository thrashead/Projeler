import * as tslib_1 from "tslib";
import { Component } from "@angular/core";
import { LogTiplerService } from "../../services/logtipler";
import { Router } from '@angular/router';
import { FormBuilder, Validators, FormControl } from "@angular/forms";
var AdminLogTiplerEkleComponent = /** @class */ (function () {
    function AdminLogTiplerEkleComponent(service, router, formBuilder) {
        this.service = service;
        this.router = router;
        this.formBuilder = formBuilder;
    }
    AdminLogTiplerEkleComponent.prototype.ngOnInit = function () {
        this.ekleForm = this.formBuilder.group({
            Name: new FormControl(null, [Validators.required, Validators.minLength(3), Validators.maxLength(50)]),
            ShortName: new FormControl(null, [Validators.required, Validators.minLength(1), Validators.maxLength(5)]),
            Description: new FormControl(null),
        });
    };
    AdminLogTiplerEkleComponent.prototype.onSubmit = function () {
        var _this = this;
        this.data = new Object();
        this.data.Name = this.ekleForm.get("Name").value;
        this.data.ShortName = this.ekleForm.get("ShortName").value;
        this.data.Description = this.ekleForm.get("Description").value;
        this.service.postEkle(this.data)
            .subscribe(function (answer) {
            if (answer.Mesaj == null) {
                _this.router.navigate(['/Admin/LogTipler']);
            }
            else {
                $(".alertMessage").text(answer.Mesaj);
                $(".alert-error").fadeIn("slow");
            }
        }, function (resError) { return _this.errorMsg = resError; });
    };
    AdminLogTiplerEkleComponent = tslib_1.__decorate([
        Component({
            templateUrl: './ekle.html',
            providers: [LogTiplerService]
        }),
        tslib_1.__metadata("design:paramtypes", [LogTiplerService, Router, FormBuilder])
    ], AdminLogTiplerEkleComponent);
    return AdminLogTiplerEkleComponent;
}());
export { AdminLogTiplerEkleComponent };
//# sourceMappingURL=ekle.js.map