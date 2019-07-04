import * as tslib_1 from "tslib";
import { Component } from "@angular/core";
import { FormElemanService } from "../../services/formeleman";
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, Validators, FormControl } from "@angular/forms";
var AdminFormElemanEkleComponent = /** @class */ (function () {
    function AdminFormElemanEkleComponent(service, route, router, formBuilder) {
        this.service = service;
        this.route = route;
        this.router = router;
        this.formBuilder = formBuilder;
    }
    AdminFormElemanEkleComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.route.params.subscribe(function (params) {
            _this.linkID = params['linkID'];
            _this.service.getEkle(_this.linkID).subscribe(function (resData) {
                _this.model = resData;
            }, function (resError) { return _this.errorMsg = resError; });
        });
        this.ekleForm = this.formBuilder.group({
            PropTypeID: new FormControl(null, [Validators.required, Validators.min(1)]),
            GroupID: new FormControl(null),
            Title: new FormControl(null, [Validators.required, Validators.minLength(3), Validators.maxLength(50)]),
            Description: new FormControl(null),
            ErrorMessage: new FormControl(null),
            Code: new FormControl(null),
            OrderNumber: new FormControl(null),
        });
    };
    AdminFormElemanEkleComponent.prototype.onSubmit = function () {
        var _this = this;
        this.data = new Object();
        this.data.PropTypeID = this.ekleForm.get("PropTypeID").value;
        this.data.GroupID = this.ekleForm.get("GroupID").value;
        this.data.Title = this.ekleForm.get("Title").value;
        this.data.Description = this.ekleForm.get("Description").value;
        this.data.ErrorMessage = this.ekleForm.get("ErrorMessage").value;
        this.data.Code = this.ekleForm.get("Code").value;
        this.data.OrderNumber = this.ekleForm.get("OrderNumber").value;
        this.service.postEkle(this.data)
            .subscribe(function (answer) {
            if (answer.Mesaj == null) {
                _this.router.navigate(['/Admin/FormEleman']);
            }
            else {
                $(".alertMessage").text(answer.Mesaj);
                $(".alert-error").fadeIn("slow");
            }
        }, function (resError) { return _this.errorMsg = resError; });
    };
    AdminFormElemanEkleComponent = tslib_1.__decorate([
        Component({
            templateUrl: './ekle.html',
            providers: [FormElemanService]
        }),
        tslib_1.__metadata("design:paramtypes", [FormElemanService, ActivatedRoute, Router, FormBuilder])
    ], AdminFormElemanEkleComponent);
    return AdminFormElemanEkleComponent;
}());
export { AdminFormElemanEkleComponent };
//# sourceMappingURL=ekle.js.map