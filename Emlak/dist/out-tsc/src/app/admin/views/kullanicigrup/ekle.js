import * as tslib_1 from "tslib";
import { Component } from "@angular/core";
import { KullaniciGrupService } from '../../services/kullanicigrup';
import { Router } from '@angular/router';
import { FormBuilder, Validators, FormControl } from "@angular/forms";
var AdminKullaniciGrupEkleComponent = /** @class */ (function () {
    function AdminKullaniciGrupEkleComponent(service, router, formBuilder) {
        this.service = service;
        this.router = router;
        this.formBuilder = formBuilder;
    }
    AdminKullaniciGrupEkleComponent.prototype.ngOnInit = function () {
        this.ekleForm = this.formBuilder.group({
            Name: new FormControl(null, [Validators.required, Validators.minLength(3), Validators.maxLength(25)]),
            ShortName: new FormControl(null, [Validators.required, Validators.minLength(3), Validators.maxLength(5)]),
            Description: new FormControl(null),
        });
    };
    AdminKullaniciGrupEkleComponent.prototype.onSubmit = function () {
        var _this = this;
        this.data = new Object();
        this.data.Name = this.ekleForm.get("Name").value;
        this.data.ShortName = this.ekleForm.get("ShortName").value;
        this.data.Description = this.ekleForm.get("Description").value;
        this.service.postEkle(this.data)
            .subscribe(function (answer) {
            if (answer.Mesaj == null) {
                _this.router.navigate(['/Admin/KullaniciGrup']);
            }
            else {
                $(".alertMessage").text(answer.Mesaj);
                $(".alert-error").fadeIn("slow");
            }
        }, function (resError) { return _this.errorMsg = resError; });
    };
    AdminKullaniciGrupEkleComponent = tslib_1.__decorate([
        Component({
            templateUrl: './ekle.html',
            providers: [KullaniciGrupService]
        }),
        tslib_1.__metadata("design:paramtypes", [KullaniciGrupService, Router, FormBuilder])
    ], AdminKullaniciGrupEkleComponent);
    return AdminKullaniciGrupEkleComponent;
}());
export { AdminKullaniciGrupEkleComponent };
//# sourceMappingURL=ekle.js.map