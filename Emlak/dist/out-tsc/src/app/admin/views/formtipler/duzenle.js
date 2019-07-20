import * as tslib_1 from "tslib";
import { Component } from "@angular/core";
import { FormTiplerService } from '../../services/formtipler';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, Validators, FormControl } from "@angular/forms";
var AdminFormTiplerDuzenleComponent = /** @class */ (function () {
    function AdminFormTiplerDuzenleComponent(service, route, router, formBuilder) {
        this.service = service;
        this.route = route;
        this.router = router;
        this.formBuilder = formBuilder;
    }
    AdminFormTiplerDuzenleComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.route.params.subscribe(function (params) {
            _this.id = params['id'];
            _this.service.getDuzenle(_this.id).subscribe(function (resData) {
                _this.model = resData;
            }, function (resError) { return _this.errorMsg = resError; });
        });
        this.duzenleForm = this.formBuilder.group({
            ID: new FormControl(null, [Validators.required, Validators.min(1)]),
            Name: new FormControl(null, [Validators.required, Validators.minLength(3), Validators.maxLength(50)]),
            Type: new FormControl(null, [Validators.required, Validators.minLength(3), Validators.maxLength(50)]),
            ShortName: new FormControl(null, [Validators.required, Validators.minLength(3), Validators.maxLength(25)]),
            HasValue: new FormControl(null),
        });
    };
    AdminFormTiplerDuzenleComponent.prototype.onSubmit = function () {
        var _this = this;
        this.data = new Object();
        this.data.ID = this.duzenleForm.get("ID").value;
        this.data.Name = this.duzenleForm.get("Name").value;
        this.data.Type = this.duzenleForm.get("Type").value;
        this.data.ShortName = this.duzenleForm.get("ShortName").value;
        this.data.HasValue = this.duzenleForm.get("HasValue").value;
        this.service.postDuzenle(this.data)
            .subscribe(function (answer) {
            if (answer.Mesaj == null) {
                _this.router.navigate(['/Admin/FormTipler']);
            }
            else {
                $(".alertMessage").text(answer.Mesaj);
                $(".alert-error").fadeIn("slow");
            }
        }, function (resError) { return _this.errorMsg = resError; });
    };
    AdminFormTiplerDuzenleComponent = tslib_1.__decorate([
        Component({
            templateUrl: './duzenle.html'
        }),
        tslib_1.__metadata("design:paramtypes", [FormTiplerService, ActivatedRoute, Router, FormBuilder])
    ], AdminFormTiplerDuzenleComponent);
    return AdminFormTiplerDuzenleComponent;
}());
export { AdminFormTiplerDuzenleComponent };
//# sourceMappingURL=duzenle.js.map