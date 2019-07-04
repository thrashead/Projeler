import * as tslib_1 from "tslib";
import { Component } from "@angular/core";
import { ResimService } from "../../services/resim";
import { Router } from '@angular/router';
import { FormBuilder, Validators, FormControl } from "@angular/forms";
var AdminResimEkleComponent = /** @class */ (function () {
    function AdminResimEkleComponent(service, router, formBuilder) {
        this.service = service;
        this.router = router;
        this.formBuilder = formBuilder;
    }
    AdminResimEkleComponent.prototype.ngOnInit = function () {
        this.ekleForm = this.formBuilder.group({
            Title: new FormControl(null, [Validators.required, Validators.minLength(3), Validators.maxLength(50)]),
            Description: new FormControl(null),
            PictureUrl: new FormControl(null, [Validators.required, Validators.minLength(3)]),
            Code: new FormControl(null),
            Active: new FormControl(null),
        });
    };
    AdminResimEkleComponent.prototype.onFileSelect = function (event) {
        if (event.target.files.length > 0) {
            this.newFile = event.target.files[0];
        }
    };
    AdminResimEkleComponent.prototype.onSubmit = function () {
        var _this = this;
        this.uploadData = new FormData();
        this.uploadData.append("file", this.newFile);
        this.service.postEkleYukle(this.uploadData)
            .subscribe(function (answer) {
            if (answer.Mesaj == null) {
                _this.data = new Object();
                _this.data.Title = _this.ekleForm.get("Title").value;
                _this.data.Description = _this.ekleForm.get("Description").value;
                _this.data.PictureUrl = answer.PictureUrl;
                _this.data.ThumbUrl = answer.ThumbUrl;
                _this.data.Code = _this.ekleForm.get("Code").value;
                _this.data.Active = _this.ekleForm.get("Active").value;
                _this.service.postEkle(_this.data)
                    .subscribe(function (answer2) {
                    if (answer2.Mesaj == null) {
                        _this.router.navigate(['/Admin/Resim']);
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
    AdminResimEkleComponent = tslib_1.__decorate([
        Component({
            templateUrl: './ekle.html',
            providers: [ResimService]
        }),
        tslib_1.__metadata("design:paramtypes", [ResimService, Router, FormBuilder])
    ], AdminResimEkleComponent);
    return AdminResimEkleComponent;
}());
export { AdminResimEkleComponent };
//# sourceMappingURL=ekle.js.map