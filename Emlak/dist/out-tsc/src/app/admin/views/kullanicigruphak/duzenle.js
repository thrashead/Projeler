import * as tslib_1 from "tslib";
import { Component } from "@angular/core";
import { KullaniciGrupHakService } from '../../services/kullanicigruphak';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, Validators, FormControl } from "@angular/forms";
var AdminKullaniciGrupHakDuzenleComponent = /** @class */ (function () {
    function AdminKullaniciGrupHakDuzenleComponent(service, route, router, formBuilder) {
        this.service = service;
        this.route = route;
        this.router = router;
        this.formBuilder = formBuilder;
    }
    AdminKullaniciGrupHakDuzenleComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.route.params.subscribe(function (params) {
            _this.id = params['id'];
            _this.service.getDuzenle(_this.id).subscribe(function (resData) {
                _this.model = resData;
            }, function (resError) { return _this.errorMsg = resError; });
        });
        this.duzenleForm = this.formBuilder.group({
            ID: new FormControl(null, [Validators.required, Validators.min(1)]),
            UserGroupTableID: new FormControl(null, [Validators.required, Validators.min(1)]),
            UserGroupProcessID: new FormControl(null, [Validators.required, Validators.min(1)]),
            Allow: new FormControl(null),
        });
    };
    AdminKullaniciGrupHakDuzenleComponent.prototype.onSubmit = function () {
        var _this = this;
        this.data = new Object();
        this.data.ID = this.duzenleForm.get("ID").value;
        this.data.UserGroupTableID = this.duzenleForm.get("UserGroupTableID").value;
        this.data.UserGroupProcessID = this.duzenleForm.get("UserGroupProcessID").value;
        this.data.Allow = this.duzenleForm.get("Allow").value;
        this.service.postDuzenle(this.data)
            .subscribe(function (answer) {
            if (answer.Mesaj == null) {
                _this.router.navigate(['/Admin/KullaniciGrupHak']);
            }
            else {
                $(".alertMessage").text(answer.Mesaj);
                $(".alert-error").fadeIn("slow");
            }
        }, function (resError) { return _this.errorMsg = resError; });
    };
    AdminKullaniciGrupHakDuzenleComponent = tslib_1.__decorate([
        Component({
            templateUrl: './duzenle.html'
        }),
        tslib_1.__metadata("design:paramtypes", [KullaniciGrupHakService, ActivatedRoute, Router, FormBuilder])
    ], AdminKullaniciGrupHakDuzenleComponent);
    return AdminKullaniciGrupHakDuzenleComponent;
}());
export { AdminKullaniciGrupHakDuzenleComponent };
//# sourceMappingURL=duzenle.js.map