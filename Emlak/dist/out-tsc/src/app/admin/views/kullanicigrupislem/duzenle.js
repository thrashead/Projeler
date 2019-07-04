import * as tslib_1 from "tslib";
import { Component } from "@angular/core";
import { KullaniciGrupIslemService } from '../../services/kullanicigrupislem';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, Validators, FormControl } from "@angular/forms";
var AdminKullaniciGrupIslemDuzenleComponent = /** @class */ (function () {
    function AdminKullaniciGrupIslemDuzenleComponent(service, route, router, formBuilder) {
        this.service = service;
        this.route = route;
        this.router = router;
        this.formBuilder = formBuilder;
    }
    AdminKullaniciGrupIslemDuzenleComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.route.params.subscribe(function (params) {
            _this.id = params['id'];
            _this.service.getDuzenle(_this.id).subscribe(function (resData) {
                _this.model = resData;
            }, function (resError) { return _this.errorMsg = resError; });
        });
        this.duzenleForm = this.formBuilder.group({
            ID: new FormControl(null, [Validators.required, Validators.min(1)]),
            Name: new FormControl(null, [Validators.required, Validators.minLength(3), Validators.maxLength(25)]),
            ShortName: new FormControl(null, [Validators.required, Validators.minLength(3), Validators.maxLength(5)]),
            Description: new FormControl(null),
        });
    };
    AdminKullaniciGrupIslemDuzenleComponent.prototype.onSubmit = function () {
        var _this = this;
        this.data = new Object();
        this.data.ID = this.duzenleForm.get("ID").value;
        this.data.Name = this.duzenleForm.get("Name").value;
        this.data.ShortName = this.duzenleForm.get("ShortName").value;
        this.data.Description = this.duzenleForm.get("Description").value;
        this.service.postDuzenle(this.data)
            .subscribe(function (answer) {
            if (answer.Mesaj == null) {
                _this.router.navigate(['/Admin/KullaniciGrupIslem']);
            }
            else {
                $(".alertMessage").text(answer.Mesaj);
                $(".alert-error").fadeIn("slow");
            }
        }, function (resError) { return _this.errorMsg = resError; });
    };
    AdminKullaniciGrupIslemDuzenleComponent = tslib_1.__decorate([
        Component({
            templateUrl: './duzenle.html',
            providers: [KullaniciGrupIslemService]
        }),
        tslib_1.__metadata("design:paramtypes", [KullaniciGrupIslemService, ActivatedRoute, Router, FormBuilder])
    ], AdminKullaniciGrupIslemDuzenleComponent);
    return AdminKullaniciGrupIslemDuzenleComponent;
}());
export { AdminKullaniciGrupIslemDuzenleComponent };
//# sourceMappingURL=duzenle.js.map