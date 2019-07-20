import * as tslib_1 from "tslib";
import { Component } from "@angular/core";
import { FormElemanDegerService } from "../../services/formelemandeger";
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, Validators, FormControl } from "@angular/forms";
var AdminFormElemanDegerDuzenleComponent = /** @class */ (function () {
    function AdminFormElemanDegerDuzenleComponent(service, route, router, formBuilder) {
        this.service = service;
        this.route = route;
        this.router = router;
        this.formBuilder = formBuilder;
    }
    AdminFormElemanDegerDuzenleComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.route.params.subscribe(function (params) {
            _this.id = params['id'];
            _this.service.getDuzenle(_this.id).subscribe(function (resData) {
                _this.model = resData;
            }, function (resError) { return _this.errorMsg = resError; });
        });
        this.duzenleForm = this.formBuilder.group({
            ID: new FormControl(null, [Validators.required, Validators.min(1)]),
            PropID: new FormControl(null, [Validators.required, Validators.min(1)]),
            Text: new FormControl(null),
            Value: new FormControl(null, [Validators.required, Validators.minLength(3), Validators.maxLength(50)]),
            Code: new FormControl(null),
        });
    };
    AdminFormElemanDegerDuzenleComponent.prototype.onSubmit = function () {
        var _this = this;
        this.data = new Object();
        this.data.ID = this.duzenleForm.get("ID").value;
        this.data.PropID = this.duzenleForm.get("PropID").value;
        this.data.Text = this.duzenleForm.get("Text").value;
        this.data.Value = this.duzenleForm.get("Value").value;
        this.data.Code = this.duzenleForm.get("Code").value;
        this.service.postDuzenle(this.data)
            .subscribe(function (answer) {
            if (answer.Mesaj == null) {
                _this.router.navigate(['/Admin/FormElemanDeger']);
            }
            else {
                $(".alertMessage").text(answer.Mesaj);
                $(".alert-error").fadeIn("slow");
            }
        }, function (resError) { return _this.errorMsg = resError; });
    };
    AdminFormElemanDegerDuzenleComponent = tslib_1.__decorate([
        Component({
            templateUrl: './duzenle.html'
        }),
        tslib_1.__metadata("design:paramtypes", [FormElemanDegerService, ActivatedRoute, Router, FormBuilder])
    ], AdminFormElemanDegerDuzenleComponent);
    return AdminFormElemanDegerDuzenleComponent;
}());
export { AdminFormElemanDegerDuzenleComponent };
//# sourceMappingURL=duzenle.js.map