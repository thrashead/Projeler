import * as tslib_1 from "tslib";
import { Component } from "@angular/core";
import { KullaniciGrupTabloService } from '../../services/kullanicigruptablo';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, Validators, FormControl } from "@angular/forms";
var AdminKullaniciGrupTabloEkleComponent = /** @class */ (function () {
    function AdminKullaniciGrupTabloEkleComponent(service, route, router, formBuilder) {
        this.service = service;
        this.route = route;
        this.router = router;
        this.formBuilder = formBuilder;
    }
    AdminKullaniciGrupTabloEkleComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.route.params.subscribe(function (params) {
            _this.linkID = params['linkID'];
            _this.service.getEkle(_this.linkID).subscribe(function (resData) {
                _this.model = resData;
            }, function (resError) { return _this.errorMsg = resError; });
        });
        this.ekleForm = this.formBuilder.group({
            TypeID: new FormControl(null, [Validators.required, Validators.min(1)]),
            UserGroupID: new FormControl(null, [Validators.required, Validators.min(1)]),
        });
    };
    AdminKullaniciGrupTabloEkleComponent.prototype.onSubmit = function () {
        var _this = this;
        this.data = new Object();
        this.data.TypeID = this.ekleForm.get("TypeID").value;
        this.data.UserGroupID = this.ekleForm.get("UserGroupID").value;
        this.service.postEkle(this.data)
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
    AdminKullaniciGrupTabloEkleComponent = tslib_1.__decorate([
        Component({
            templateUrl: './ekle.html',
            providers: [KullaniciGrupTabloService]
        }),
        tslib_1.__metadata("design:paramtypes", [KullaniciGrupTabloService, ActivatedRoute, Router, FormBuilder])
    ], AdminKullaniciGrupTabloEkleComponent);
    return AdminKullaniciGrupTabloEkleComponent;
}());
export { AdminKullaniciGrupTabloEkleComponent };
//# sourceMappingURL=ekle.js.map