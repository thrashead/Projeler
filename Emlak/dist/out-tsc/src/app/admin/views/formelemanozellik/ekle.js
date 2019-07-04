import * as tslib_1 from "tslib";
import { Component } from "@angular/core";
import { FormElemanOzellikService } from '../../services/formelemanozellik';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, Validators, FormControl } from "@angular/forms";
var AdminFormElemanOzellikEkleComponent = /** @class */ (function () {
    function AdminFormElemanOzellikEkleComponent(service, route, router, formBuilder) {
        this.service = service;
        this.route = route;
        this.router = router;
        this.formBuilder = formBuilder;
    }
    AdminFormElemanOzellikEkleComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.route.params.subscribe(function (params) {
            _this.linkID = params['linkID'];
            _this.service.getEkle(_this.linkID).subscribe(function (resData) {
                _this.model = resData;
            }, function (resError) { return _this.errorMsg = resError; });
        });
        this.ekleForm = this.formBuilder.group({
            PropID: new FormControl(null, [Validators.required, Validators.min(1)]),
            Name: new FormControl(null, [Validators.required, Validators.minLength(3), Validators.maxLength(50)]),
            Value: new FormControl(null, [Validators.required, Validators.minLength(3), Validators.maxLength(255)]),
        });
    };
    AdminFormElemanOzellikEkleComponent.prototype.onSubmit = function () {
        var _this = this;
        this.data = new Object();
        this.data.PropID = this.ekleForm.get("PropID").value;
        this.data.Name = this.ekleForm.get("Name").value;
        this.data.Value = this.ekleForm.get("Value").value;
        this.service.postEkle(this.data)
            .subscribe(function (answer) {
            if (answer.Mesaj == null) {
                _this.router.navigate(['/Admin/FormElemanOzellik']);
            }
            else {
                $(".alertMessage").text(answer.Mesaj);
                $(".alert-error").fadeIn("slow");
            }
        }, function (resError) { return _this.errorMsg = resError; });
    };
    AdminFormElemanOzellikEkleComponent = tslib_1.__decorate([
        Component({
            templateUrl: './ekle.html',
            providers: [FormElemanOzellikService]
        }),
        tslib_1.__metadata("design:paramtypes", [FormElemanOzellikService, ActivatedRoute, Router, FormBuilder])
    ], AdminFormElemanOzellikEkleComponent);
    return AdminFormElemanOzellikEkleComponent;
}());
export { AdminFormElemanOzellikEkleComponent };
//# sourceMappingURL=ekle.js.map