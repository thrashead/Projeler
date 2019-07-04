import * as tslib_1 from "tslib";
import { Component } from "@angular/core";
import { DilService } from "../../services/dil";
import { Router } from '@angular/router';
import { FormBuilder, Validators, FormControl } from "@angular/forms";
var AdminDilEkleComponent = /** @class */ (function () {
    function AdminDilEkleComponent(service, router, formBuilder) {
        this.service = service;
        this.router = router;
        this.formBuilder = formBuilder;
    }
    AdminDilEkleComponent.prototype.ngOnInit = function () {
        this.ekleForm = this.formBuilder.group({
            TransName: new FormControl(null, [Validators.required, Validators.minLength(3), Validators.maxLength(25)]),
            ShortName: new FormControl(null, [Validators.required, Validators.minLength(3), Validators.maxLength(5)]),
            Flag: new FormControl(null, [Validators.required, Validators.minLength(3)]),
            Active: new FormControl(null),
        });
    };
    AdminDilEkleComponent.prototype.onFileSelect = function (event) {
        if (event.target.files.length > 0) {
            this.newFile = event.target.files[0];
        }
    };
    AdminDilEkleComponent.prototype.onSubmit = function () {
        var _this = this;
        this.uploadData = new FormData();
        this.uploadData.append("file", this.newFile);
        this.service.postEkleYukle(this.uploadData)
            .subscribe(function (answer) {
            if (answer.Mesaj == null) {
                _this.data = new Object();
                _this.data.TransName = _this.ekleForm.get("TransName").value;
                _this.data.ShortName = _this.ekleForm.get("ShortName").value;
                _this.data.Flag = answer.Flag;
                _this.data.Active = _this.ekleForm.get("Active").value;
                _this.service.postEkle(_this.data)
                    .subscribe(function (answer2) {
                    if (answer2.Mesaj == null) {
                        _this.router.navigate(['/Admin/Dil']);
                    }
                    else {
                        $(".alertMessage").text(answer2.Mesaj);
                        $(".alert-error").fadeIn("slow");
                    }
                }, function (resError) { return _this.errorMsg = resError; });
            }
            else {
                $(".alertMessage").text(answer.Mesaj);
                $(".alert-error").fadeIn("slow");
            }
        }, function (resError) { return _this.errorMsg = resError; });
    };
    AdminDilEkleComponent = tslib_1.__decorate([
        Component({
            templateUrl: './ekle.html',
            providers: [DilService]
        }),
        tslib_1.__metadata("design:paramtypes", [DilService, Router, FormBuilder])
    ], AdminDilEkleComponent);
    return AdminDilEkleComponent;
}());
export { AdminDilEkleComponent };
//# sourceMappingURL=ekle.js.map