import * as tslib_1 from "tslib";
import { Component } from "@angular/core";
import { ResimService } from "../../services/resim";
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, Validators, FormControl } from "@angular/forms";
var AdminResimDuzenleComponent = /** @class */ (function () {
    function AdminResimDuzenleComponent(service, route, router, formBuilder) {
        this.service = service;
        this.route = route;
        this.router = router;
        this.formBuilder = formBuilder;
    }
    AdminResimDuzenleComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.route.params.subscribe(function (params) {
            _this.id = params['id'];
            _this.service.getDuzenle(_this.id).subscribe(function (resData) {
                _this.model = resData;
            }, function (resError) { return _this.errorMsg = resError; });
        });
        this.duzenleForm = this.formBuilder.group({
            ID: new FormControl(null, [Validators.required, Validators.min(1)]),
            Title: new FormControl(null, [Validators.required, Validators.minLength(3), Validators.maxLength(50)]),
            Description: new FormControl(null),
            PictureUrl: new FormControl(null, [Validators.required, Validators.minLength(3)]),
            ThumbUrl: new FormControl(null, [Validators.required, Validators.minLength(3)]),
            Code: new FormControl(null),
            Active: new FormControl(null),
        });
    };
    AdminResimDuzenleComponent.prototype.onFileSelect = function (event) {
        if (event.target.files.length > 0) {
            this.newFile = event.target.files[0];
        }
    };
    AdminResimDuzenleComponent.prototype.onSubmit = function () {
        var _this = this;
        this.uploadData = new FormData();
        this.uploadData.append("file", this.newFile);
        this.service.postDuzenleYukle(this.uploadData)
            .subscribe(function (answer) {
            if (answer.Mesaj == null) {
                _this.data = new Object();
                _this.data.ID = _this.duzenleForm.get("ID").value;
                _this.data.Title = _this.duzenleForm.get("Title").value;
                _this.data.Description = _this.duzenleForm.get("Description").value;
                _this.data.OldPictureUrl = _this.duzenleForm.get("PictureUrl").value;
                _this.data.OldThumbUrl = _this.duzenleForm.get("ThumbUrl").value;
                _this.data.HasFile = answer.HasFile;
                if (answer.HasFile) {
                    _this.data.PictureUrl = answer.PictureUrl;
                    _this.data.ThumbUrl = answer.ThumbUrl;
                }
                else {
                    _this.data.PictureUrl = _this.duzenleForm.get("PictureUrl").value;
                    _this.data.ThumbUrl = _this.duzenleForm.get("ThumbUrl").value;
                }
                _this.data.Code = _this.duzenleForm.get("Code").value;
                _this.data.Active = _this.duzenleForm.get("Active").value;
                _this.service.postDuzenle(_this.data)
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
    AdminResimDuzenleComponent = tslib_1.__decorate([
        Component({
            templateUrl: './duzenle.html'
        }),
        tslib_1.__metadata("design:paramtypes", [ResimService, ActivatedRoute, Router, FormBuilder])
    ], AdminResimDuzenleComponent);
    return AdminResimDuzenleComponent;
}());
export { AdminResimDuzenleComponent };
//# sourceMappingURL=duzenle.js.map