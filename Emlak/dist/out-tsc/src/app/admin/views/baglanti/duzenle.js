import * as tslib_1 from "tslib";
import { Component } from "@angular/core";
import { BaglantiService } from "../../services/baglanti";
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, Validators, FormControl } from "@angular/forms";
var AdminBaglantiDuzenleComponent = /** @class */ (function () {
    function AdminBaglantiDuzenleComponent(service, route, router, formBuilder) {
        this.service = service;
        this.route = route;
        this.router = router;
        this.formBuilder = formBuilder;
    }
    AdminBaglantiDuzenleComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.route.params.subscribe(function (params) {
            _this.id = params['id'];
            _this.service.getDuzenle(_this.id).subscribe(function (resData) {
                _this.model = resData;
            }, function (resError) { return _this.errorMsg = resError; });
        });
        this.duzenleForm = this.formBuilder.group({
            ID: new FormControl(null, [Validators.required, Validators.min(1)]),
            LinkTypeID: new FormControl(null, [Validators.required, Validators.min(1)]),
            LinkID: new FormControl(null, [Validators.required, Validators.min(1)])
        });
    };
    AdminBaglantiDuzenleComponent.prototype.onSubmit = function () {
        var _this = this;
        this.data = new Object();
        this.data.ID = this.duzenleForm.get("ID").value;
        this.data.LinkTypeID = this.duzenleForm.get("LinkTypeID").value;
        this.data.LinkID = this.duzenleForm.get("LinkID").value;
        this.service.postDuzenle(this.data)
            .subscribe(function (answer) {
            if (answer.Mesaj == null) {
                _this.router.navigate(['/Admin/Baglanti']);
            }
            else {
                $(".alertMessage").text(answer.Mesaj);
                $(".alert-error").fadeIn("slow");
            }
        }, function (resError) { return _this.errorMsg = resError; });
    };
    AdminBaglantiDuzenleComponent = tslib_1.__decorate([
        Component({
            templateUrl: './duzenle.html',
            providers: [BaglantiService]
        }),
        tslib_1.__metadata("design:paramtypes", [BaglantiService, ActivatedRoute, Router, FormBuilder])
    ], AdminBaglantiDuzenleComponent);
    return AdminBaglantiDuzenleComponent;
}());
export { AdminBaglantiDuzenleComponent };
//# sourceMappingURL=duzenle.js.map