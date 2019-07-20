import * as tslib_1 from "tslib";
import { Component } from "@angular/core";
import { DilService } from "../../services/dil";
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, Validators, FormControl } from "@angular/forms";
var AdminDilDuzenleComponent = /** @class */ (function () {
    function AdminDilDuzenleComponent(service, route, router, formBuilder) {
        this.service = service;
        this.route = route;
        this.router = router;
        this.formBuilder = formBuilder;
    }
    AdminDilDuzenleComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.route.params.subscribe(function (params) {
            _this.id = params['id'];
            _this.service.getDuzenle(_this.id).subscribe(function (resData) {
                _this.model = resData;
            }, function (resError) { return _this.errorMsg = resError; });
        });
        this.duzenleForm = this.formBuilder.group({
            ID: new FormControl(null, [Validators.required, Validators.min(1)]),
            TransName: new FormControl(null, [Validators.required, Validators.minLength(3), Validators.maxLength(25)]),
            ShortName: new FormControl(null, [Validators.required, Validators.minLength(3), Validators.maxLength(5)]),
            Flag: new FormControl(null, [Validators.required, Validators.minLength(3)]),
            Active: new FormControl(null),
        });
    };
    AdminDilDuzenleComponent.prototype.onFileSelect = function (event) {
        if (event.target.files.length > 0) {
            this.newFile = event.target.files[0];
        }
    };
    AdminDilDuzenleComponent.prototype.onSubmit = function () {
        var _this = this;
        this.uploadData = new FormData();
        this.uploadData.append("file", this.newFile);
        this.service.postDuzenleYukle(this.uploadData)
            .subscribe(function (answer) {
            if (answer.Mesaj == null) {
                _this.data = new Object();
                _this.data.ID = _this.duzenleForm.get("ID").value;
                _this.data.TransName = _this.duzenleForm.get("TransName").value;
                _this.data.ShortName = _this.duzenleForm.get("ShortName").value;
                _this.data.OldFlag = _this.duzenleForm.get("Flag").value;
                _this.data.HasFile = answer.HasFile;
                if (answer.HasFile) {
                    _this.data.Flag = answer.Flag;
                }
                else {
                    _this.data.Flag = _this.duzenleForm.get("Flag").value;
                }
                _this.data.Active = _this.duzenleForm.get("Active").value;
                _this.service.postDuzenle(_this.data)
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
    AdminDilDuzenleComponent = tslib_1.__decorate([
        Component({
            templateUrl: './duzenle.html'
        }),
        tslib_1.__metadata("design:paramtypes", [DilService, ActivatedRoute, Router, FormBuilder])
    ], AdminDilDuzenleComponent);
    return AdminDilDuzenleComponent;
}());
export { AdminDilDuzenleComponent };
//# sourceMappingURL=duzenle.js.map