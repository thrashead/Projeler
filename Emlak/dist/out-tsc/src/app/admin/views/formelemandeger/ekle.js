import * as tslib_1 from "tslib";
import { Component } from "@angular/core";
import { FormElemanDegerService } from "../../services/formelemandeger";
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, Validators, FormControl } from "@angular/forms";
var AdminFormElemanDegerEkleComponent = /** @class */ (function () {
    function AdminFormElemanDegerEkleComponent(service, route, router, formBuilder) {
        this.service = service;
        this.route = route;
        this.router = router;
        this.formBuilder = formBuilder;
    }
    AdminFormElemanDegerEkleComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.route.params.subscribe(function (params) {
            _this.linkID = params['linkID'];
            _this.service.getEkle(_this.linkID).subscribe(function (resData) {
                _this.model = resData;
            }, function (resError) { return _this.errorMsg = resError; });
        });
        this.ekleForm = this.formBuilder.group({
            PropID: new FormControl(null, [Validators.required, Validators.min(1)]),
            Text: new FormControl(null),
            Value: new FormControl(null, [Validators.required, Validators.minLength(3), Validators.maxLength(50)]),
            Code: new FormControl(null),
        });
    };
    AdminFormElemanDegerEkleComponent.prototype.onSubmit = function () {
        var _this = this;
        this.data = new Object();
        this.data.PropID = this.ekleForm.get("PropID").value;
        this.data.Text = this.ekleForm.get("Text").value;
        this.data.Value = this.ekleForm.get("Value").value;
        this.data.Code = this.ekleForm.get("Code").value;
        this.service.postEkle(this.data)
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
    AdminFormElemanDegerEkleComponent = tslib_1.__decorate([
        Component({
            templateUrl: './ekle.html',
            providers: [FormElemanDegerService]
        }),
        tslib_1.__metadata("design:paramtypes", [FormElemanDegerService, ActivatedRoute, Router, FormBuilder])
    ], AdminFormElemanDegerEkleComponent);
    return AdminFormElemanDegerEkleComponent;
}());
export { AdminFormElemanDegerEkleComponent };
//# sourceMappingURL=ekle.js.map