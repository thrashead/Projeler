import * as tslib_1 from "tslib";
import { Component } from "@angular/core";
import { KullaniciGrupHakService } from '../../services/kullanicigruphak';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, Validators, FormControl } from "@angular/forms";
var AdminKullaniciGrupHakEkleComponent = /** @class */ (function () {
    function AdminKullaniciGrupHakEkleComponent(service, route, router, formBuilder) {
        this.service = service;
        this.route = route;
        this.router = router;
        this.formBuilder = formBuilder;
    }
    AdminKullaniciGrupHakEkleComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.route.params.subscribe(function (params) {
            _this.linkID = params['linkID'];
            _this.service.getEkle(_this.linkID).subscribe(function (resData) {
                _this.model = resData;
            }, function (resError) { return _this.errorMsg = resError; });
        });
        this.ekleForm = this.formBuilder.group({
            UserGroupTableID: new FormControl(null, [Validators.required, Validators.min(1)]),
            UserGroupProcessID: new FormControl(null, [Validators.required, Validators.min(1)]),
            Allow: new FormControl(null),
        });
    };
    AdminKullaniciGrupHakEkleComponent.prototype.onSubmit = function () {
        var _this = this;
        this.data = new Object();
        this.data.UserGroupTableID = this.ekleForm.get("UserGroupTableID").value;
        this.data.UserGroupProcessID = this.ekleForm.get("UserGroupProcessID").value;
        this.data.Allow = this.ekleForm.get("Allow").value;
        this.service.postEkle(this.data)
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
    AdminKullaniciGrupHakEkleComponent = tslib_1.__decorate([
        Component({
            templateUrl: './ekle.html'
        }),
        tslib_1.__metadata("design:paramtypes", [KullaniciGrupHakService, ActivatedRoute, Router, FormBuilder])
    ], AdminKullaniciGrupHakEkleComponent);
    return AdminKullaniciGrupHakEkleComponent;
}());
export { AdminKullaniciGrupHakEkleComponent };
//# sourceMappingURL=ekle.js.map