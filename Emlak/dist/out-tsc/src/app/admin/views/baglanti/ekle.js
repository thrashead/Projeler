import * as tslib_1 from "tslib";
import { Component } from "@angular/core";
import { BaglantiService } from "../../services/baglanti";
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, Validators, FormControl } from "@angular/forms";
var AdminBaglantiEkleComponent = /** @class */ (function () {
    function AdminBaglantiEkleComponent(service, route, router, formBuilder) {
        this.service = service;
        this.route = route;
        this.router = router;
        this.formBuilder = formBuilder;
    }
    AdminBaglantiEkleComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.route.params.subscribe(function (params) {
            _this.linkID = params['linkID'];
            _this.service.getEkle(_this.linkID).subscribe(function (resData) {
                _this.model = resData;
            }, function (resError) { return _this.errorMsg = resError; });
        });
        this.ekleForm = this.formBuilder.group({
            LinkTypeID: new FormControl(null, [Validators.required, Validators.min(1)]),
            LinkID: new FormControl(null, [Validators.required, Validators.min(1)])
        });
    };
    AdminBaglantiEkleComponent.prototype.onChange = function (event) {
        var _this = this;
        var target = event.target || event.srcElement || event.currentTarget;
        this.service.getNesneDoldur(target.value)
            .subscribe(function (answer) {
            if (answer != null) {
                $("select.selectLinkID").html("");
                for (var i = 0; i < answer.length; i++) {
                    $("select.selectLinkID").append("<option value='" + answer[i].Value + "'>" + answer[i].Text + "</option>");
                }
            }
            else {
                $(".alertMessage").text("Bağlı Nesne getirilemedi yada ilgili Bağlı Tip'e ait nesne henüz tanımlanmamış.");
                $(".alert-error").fadeIn("slow");
            }
        }, function (resError) { return _this.errorMsg = resError; });
    };
    AdminBaglantiEkleComponent.prototype.onSubmit = function () {
        var _this = this;
        this.data = new Object();
        this.data.LinkTypeID = this.ekleForm.get("LinkTypeID").value;
        this.data.LinkID = this.ekleForm.get("LinkID").value;
        this.service.postEkle(this.data)
            .subscribe(function (answer) {
            if (answer.Mesaj == null) {
                _this.router.navigate(['/Admin/Baglanti']);
            }
            else {
                $(".alertMessage").text(answer.Mesaj);
                $(".alert-error").fadeIn("slow");
            }
        }, function (resError) { return _this.errorMsg = resError; });
    };
    AdminBaglantiEkleComponent = tslib_1.__decorate([
        Component({
            templateUrl: './ekle.html',
            providers: [BaglantiService]
        }),
        tslib_1.__metadata("design:paramtypes", [BaglantiService, ActivatedRoute, Router, FormBuilder])
    ], AdminBaglantiEkleComponent);
    return AdminBaglantiEkleComponent;
}());
export { AdminBaglantiEkleComponent };
//# sourceMappingURL=ekle.js.map