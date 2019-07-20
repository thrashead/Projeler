import * as tslib_1 from "tslib";
import { Component } from "@angular/core";
import { KullanicilarService } from "../../services/kullanicilar";
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, Validators, FormControl } from "@angular/forms";
var AdminKullanicilarGrupDegistirComponent = /** @class */ (function () {
    function AdminKullanicilarGrupDegistirComponent(service, route, router, formBuilder) {
        this.service = service;
        this.route = route;
        this.router = router;
        this.formBuilder = formBuilder;
    }
    AdminKullanicilarGrupDegistirComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.route.params.subscribe(function (params) {
            _this.id = params['id'];
            _this.service.getGrupDegistir(_this.id).subscribe(function (resData) {
                _this.model = resData;
            }, function (resError) { return _this.errorMsg = resError; });
        });
        this.grupDegistirForm = this.formBuilder.group({
            ID: new FormControl(null, [Validators.required, Validators.min(1)]),
            GroupID: new FormControl(null, [Validators.required, Validators.min(1)]),
        });
    };
    AdminKullanicilarGrupDegistirComponent.prototype.onSubmit = function () {
        var _this = this;
        this.data = new Object();
        this.data.ID = this.grupDegistirForm.get("ID").value;
        this.data.GroupID = this.grupDegistirForm.get("GroupID").value;
        this.service.postGrupDegistir(this.data)
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
    AdminKullanicilarGrupDegistirComponent = tslib_1.__decorate([
        Component({
            templateUrl: './grupdegistir.html'
        }),
        tslib_1.__metadata("design:paramtypes", [KullanicilarService, ActivatedRoute, Router, FormBuilder])
    ], AdminKullanicilarGrupDegistirComponent);
    return AdminKullanicilarGrupDegistirComponent;
}());
export { AdminKullanicilarGrupDegistirComponent };
//# sourceMappingURL=grupdegistir.js.map