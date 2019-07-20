import * as tslib_1 from "tslib";
import { Component } from "@angular/core";
import { FormElemanOzellikService } from "../../services/formelemanozellik";
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, Validators, FormControl } from "@angular/forms";
var AdminFormElemanOzellikDuzenleComponent = /** @class */ (function () {
    function AdminFormElemanOzellikDuzenleComponent(service, route, router, formBuilder) {
        this.service = service;
        this.route = route;
        this.router = router;
        this.formBuilder = formBuilder;
    }
    AdminFormElemanOzellikDuzenleComponent.prototype.ngOnInit = function () {
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
            Name: new FormControl(null, [Validators.required, Validators.minLength(3), Validators.maxLength(50)]),
            Value: new FormControl(null, [Validators.required, Validators.minLength(3), Validators.maxLength(255)]),
        });
    };
    AdminFormElemanOzellikDuzenleComponent.prototype.onSubmit = function () {
        var _this = this;
        this.data = new Object();
        this.data.ID = this.duzenleForm.get("ID").value;
        this.data.PropID = this.duzenleForm.get("PropID").value;
        this.data.Name = this.duzenleForm.get("Name").value;
        this.data.Value = this.duzenleForm.get("Value").value;
        this.service.postDuzenle(this.data)
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
    AdminFormElemanOzellikDuzenleComponent = tslib_1.__decorate([
        Component({
            templateUrl: './duzenle.html'
        }),
        tslib_1.__metadata("design:paramtypes", [FormElemanOzellikService, ActivatedRoute, Router, FormBuilder])
    ], AdminFormElemanOzellikDuzenleComponent);
    return AdminFormElemanOzellikDuzenleComponent;
}());
export { AdminFormElemanOzellikDuzenleComponent };
//# sourceMappingURL=duzenle.js.map