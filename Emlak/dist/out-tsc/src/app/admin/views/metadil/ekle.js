import * as tslib_1 from "tslib";
import { Component } from "@angular/core";
import { MetaDilService } from "../../services/metadil";
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, Validators, FormControl } from "@angular/forms";
var AdminMetaDilEkleComponent = /** @class */ (function () {
    function AdminMetaDilEkleComponent(service, route, router, formBuilder) {
        this.service = service;
        this.route = route;
        this.router = router;
        this.formBuilder = formBuilder;
    }
    AdminMetaDilEkleComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.route.params.subscribe(function (params) {
            _this.linkID = params['linkID'];
            _this.service.getEkle(_this.linkID).subscribe(function (resData) {
                _this.model = resData;
            }, function (resError) { return _this.errorMsg = resError; });
        });
        this.ekleForm = this.formBuilder.group({
            MetaID: new FormControl(null, [Validators.required, Validators.min(1)]),
            TransID: new FormControl(null, [Validators.required, Validators.min(1)]),
            Name: new FormControl(null, [Validators.required, Validators.minLength(3), Validators.maxLength(50)]),
            Content: new FormControl(null, [Validators.required, Validators.minLength(1)]),
        });
    };
    AdminMetaDilEkleComponent.prototype.onSubmit = function () {
        var _this = this;
        this.data = new Object();
        this.data.MetaID = this.ekleForm.get("MetaID").value;
        this.data.TransID = this.ekleForm.get("TransID").value;
        this.data.Name = this.ekleForm.get("Name").value;
        this.data.Content = this.ekleForm.get("Content").value;
        this.service.postEkle(this.data)
            .subscribe(function (answer) {
            if (answer.Mesaj == null) {
                _this.router.navigate(['/Admin/MetaDil']);
            }
            else {
                $(".alertMessage").text(answer.Mesaj);
                $(".alert-error").fadeIn("slow");
            }
        }, function (resError) { return _this.errorMsg = resError; });
    };
    AdminMetaDilEkleComponent = tslib_1.__decorate([
        Component({
            templateUrl: './ekle.html'
        }),
        tslib_1.__metadata("design:paramtypes", [MetaDilService, ActivatedRoute, Router, FormBuilder])
    ], AdminMetaDilEkleComponent);
    return AdminMetaDilEkleComponent;
}());
export { AdminMetaDilEkleComponent };
//# sourceMappingURL=ekle.js.map