import * as tslib_1 from "tslib";
import { Component } from "@angular/core";
import { DosyaService } from "../../services/dosya";
import { Router } from '@angular/router';
import { FormBuilder, Validators, FormControl } from "@angular/forms";
var AdminDosyaEkleComponent = /** @class */ (function () {
    function AdminDosyaEkleComponent(service, router, formBuilder) {
        this.service = service;
        this.router = router;
        this.formBuilder = formBuilder;
    }
    AdminDosyaEkleComponent.prototype.ngOnInit = function () {
        this.ekleForm = this.formBuilder.group({
            Title: new FormControl(null, [Validators.required, Validators.minLength(3), Validators.maxLength(50)]),
            Description: new FormControl(null),
            FileUrl: new FormControl(null, [Validators.required, Validators.minLength(3)]),
            Code: new FormControl(null),
            Active: new FormControl(null),
        });
    };
    AdminDosyaEkleComponent.prototype.onFileSelect = function (event) {
        if (event.target.files.length > 0) {
            this.newFile = event.target.files[0];
        }
    };
    AdminDosyaEkleComponent.prototype.onSubmit = function () {
        var _this = this;
        this.uploadData = new FormData();
        this.uploadData.append("file", this.newFile);
        this.service.postEkleYukle(this.uploadData)
            .subscribe(function (answer) {
            if (answer.Mesaj == null) {
                _this.data = new Object();
                _this.data.Title = _this.ekleForm.get("Title").value;
                _this.data.Description = _this.ekleForm.get("Description").value;
                _this.data.FileUrl = answer.FileUrl;
                _this.data.Code = _this.ekleForm.get("Code").value;
                _this.data.Active = _this.ekleForm.get("Active").value;
                _this.service.postEkle(_this.data)
                    .subscribe(function (answer2) {
                    if (answer2.Mesaj == null) {
                        _this.router.navigate(['/Admin/Dosya']);
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
    AdminDosyaEkleComponent = tslib_1.__decorate([
        Component({
            templateUrl: './ekle.html'
        }),
        tslib_1.__metadata("design:paramtypes", [DosyaService, Router, FormBuilder])
    ], AdminDosyaEkleComponent);
    return AdminDosyaEkleComponent;
}());
export { AdminDosyaEkleComponent };
//# sourceMappingURL=ekle.js.map