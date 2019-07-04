import * as tslib_1 from "tslib";
import { Component } from "@angular/core";
import { KullanicilarService } from "../../services/kullanicilar";
import { Router } from '@angular/router';
import { FormBuilder, Validators, FormControl } from "@angular/forms";
var AdminKullanicilarEkleComponent = /** @class */ (function () {
    function AdminKullanicilarEkleComponent(service, router, formBuilder) {
        this.service = service;
        this.router = router;
        this.formBuilder = formBuilder;
    }
    AdminKullanicilarEkleComponent.prototype.ngOnInit = function () {
        this.ekleForm = this.formBuilder.group({
            Username: new FormControl(null, [Validators.required, Validators.minLength(3), Validators.maxLength(25)]),
            Password: new FormControl(null, [Validators.required, Validators.minLength(3), Validators.maxLength(50)]),
            Active: new FormControl(null),
        });
    };
    AdminKullanicilarEkleComponent.prototype.onSubmit = function () {
        var _this = this;
        this.data = new Object();
        this.data.Username = this.ekleForm.get("Username").value;
        this.data.Password = this.ekleForm.get("Password").value;
        this.data.Active = this.ekleForm.get("Active").value;
        this.service.postEkle(this.data)
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
    AdminKullanicilarEkleComponent = tslib_1.__decorate([
        Component({
            templateUrl: './ekle.html',
            providers: [KullanicilarService]
        }),
        tslib_1.__metadata("design:paramtypes", [KullanicilarService, Router, FormBuilder])
    ], AdminKullanicilarEkleComponent);
    return AdminKullanicilarEkleComponent;
}());
export { AdminKullanicilarEkleComponent };
//# sourceMappingURL=ekle.js.map