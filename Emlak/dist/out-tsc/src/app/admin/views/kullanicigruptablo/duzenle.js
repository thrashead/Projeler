import * as tslib_1 from "tslib";
import { Component } from "@angular/core";
import { KullaniciGrupTabloService } from '../../services/kullanicigruptablo';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, Validators, FormControl } from "@angular/forms";
var AdminKullaniciGrupTabloDuzenleComponent = /** @class */ (function () {
    function AdminKullaniciGrupTabloDuzenleComponent(service, route, router, formBuilder) {
        this.service = service;
        this.route = route;
        this.router = router;
        this.formBuilder = formBuilder;
    }
    AdminKullaniciGrupTabloDuzenleComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.route.params.subscribe(function (params) {
            _this.id = params['id'];
            _this.service.getDuzenle(_this.id).subscribe(function (resData) {
                _this.model = resData;
            }, function (resError) { return _this.errorMsg = resError; });
        });
        this.duzenleForm = this.formBuilder.group({
            ID: new FormControl(null, [Validators.required, Validators.min(1)]),
            TypeID: new FormControl(null, [Validators.required, Validators.min(1)]),
            UserGroupID: new FormControl(null, [Validators.required, Validators.min(1)]),
        });
    };
    AdminKullaniciGrupTabloDuzenleComponent.prototype.onSubmit = function () {
        var _this = this;
        this.data = new Object();
        this.data.ID = this.duzenleForm.get("ID").value;
        this.data.TypeID = this.duzenleForm.get("TypeID").value;
        this.data.UserGroupID = this.duzenleForm.get("UserGroupID").value;
        this.service.postDuzenle(this.data)
            .subscribe(function (answer) {
            if (answer.Mesaj == null) {
                _this.router.navigate(['/Admin/KullaniciGrupTablo']);
            }
            else {
                $(".alertMessage").text(answer.Mesaj);
                $(".alert-error").fadeIn("slow");
            }
        }, function (resError) { return _this.errorMsg = resError; });
    };
    AdminKullaniciGrupTabloDuzenleComponent = tslib_1.__decorate([
        Component({
            templateUrl: './duzenle.html'
        }),
        tslib_1.__metadata("design:paramtypes", [KullaniciGrupTabloService, ActivatedRoute, Router, FormBuilder])
    ], AdminKullaniciGrupTabloDuzenleComponent);
    return AdminKullaniciGrupTabloDuzenleComponent;
}());
export { AdminKullaniciGrupTabloDuzenleComponent };
//# sourceMappingURL=duzenle.js.map