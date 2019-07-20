import * as tslib_1 from "tslib";
import { Component } from "@angular/core";
import { KullanicilarService } from "../../services/kullanicilar";
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, Validators, FormControl } from "@angular/forms";
var AdminKullanicilarDuzenleComponent = /** @class */ (function () {
    function AdminKullanicilarDuzenleComponent(service, route, router, formBuilder) {
        this.service = service;
        this.route = route;
        this.router = router;
        this.formBuilder = formBuilder;
    }
    AdminKullanicilarDuzenleComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.route.params.subscribe(function (params) {
            _this.id = params['id'];
            _this.service.getDuzenle(_this.id).subscribe(function (resData) {
                _this.model = resData;
            }, function (resError) { return _this.errorMsg = resError; });
        });
        this.duzenleForm = this.formBuilder.group({
            ID: new FormControl(null, [Validators.required, Validators.min(1)]),
            Username: new FormControl(null, [Validators.required, Validators.minLength(3), Validators.maxLength(25)]),
            Password: new FormControl(null),
            Active: new FormControl(null),
        });
    };
    AdminKullanicilarDuzenleComponent.prototype.onSubmit = function () {
        var _this = this;
        this.data = new Object();
        this.data.ID = this.duzenleForm.get("ID").value;
        this.data.Username = this.duzenleForm.get("Username").value;
        this.data.Password = this.duzenleForm.get("Password").value;
        this.data.Active = this.duzenleForm.get("Active").value;
        this.service.postDuzenle(this.data)
            .subscribe(function (answer) {
            if (answer.Mesaj == null) {
                _this.router.navigate(['/Admin/Kullanicilar']);
            }
            else {
                $(".alertMessage").text(answer.Mesaj);
                $(".alert-error").fadeIn("slow");
            }
        }, function (resError) { return _this.errorMsg = resError; });
    };
    AdminKullanicilarDuzenleComponent = tslib_1.__decorate([
        Component({
            templateUrl: './duzenle.html'
        }),
        tslib_1.__metadata("design:paramtypes", [KullanicilarService, ActivatedRoute, Router, FormBuilder])
    ], AdminKullanicilarDuzenleComponent);
    return AdminKullanicilarDuzenleComponent;
}());
export { AdminKullanicilarDuzenleComponent };
//# sourceMappingURL=duzenle.js.map