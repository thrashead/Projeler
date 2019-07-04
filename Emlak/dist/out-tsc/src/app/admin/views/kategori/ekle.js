import * as tslib_1 from "tslib";
import { Component } from "@angular/core";
import { KategoriService } from "../../services/kategori";
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, Validators, FormControl } from "@angular/forms";
var AdminKategoriEkleComponent = /** @class */ (function () {
    function AdminKategoriEkleComponent(service, route, router, formBuilder) {
        this.service = service;
        this.route = route;
        this.router = router;
        this.formBuilder = formBuilder;
    }
    AdminKategoriEkleComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.route.params.subscribe(function () {
            _this.service.getEkle().subscribe(function (resData) {
                _this.model = resData;
            }, function (resError) { return _this.errorMsg = resError; });
        });
        this.ekleForm = this.formBuilder.group({
            ParentID: new FormControl(null, [Validators.required, Validators.min(1)]),
            Title: new FormControl(null, [Validators.required, Validators.minLength(3), Validators.maxLength(255)]),
            Code: new FormControl(null),
            Active: new FormControl(null),
        });
    };
    AdminKategoriEkleComponent.prototype.onSubmit = function () {
        var _this = this;
        this.data = new Object();
        this.data.ParentID = this.ekleForm.get("ParentID").value;
        this.data.Title = this.ekleForm.get("Title").value;
        this.data.Code = this.ekleForm.get("Code").value;
        this.data.Active = this.ekleForm.get("Active").value;
        this.service.postEkle(this.data)
            .subscribe(function (answer) {
            if (answer.Mesaj == null) {
                _this.router.navigate(['/Admin/Kategori']);
            }
            else {
                $(".alertMessage").text(answer.Mesaj);
                $(".alert-error").fadeIn("slow");
            }
        }, function (resError) { return _this.errorMsg = resError; });
    };
    AdminKategoriEkleComponent = tslib_1.__decorate([
        Component({
            templateUrl: './ekle.html',
            providers: [KategoriService]
        }),
        tslib_1.__metadata("design:paramtypes", [KategoriService, ActivatedRoute, Router, FormBuilder])
    ], AdminKategoriEkleComponent);
    return AdminKategoriEkleComponent;
}());
export { AdminKategoriEkleComponent };
//# sourceMappingURL=ekle.js.map