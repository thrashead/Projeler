import * as tslib_1 from "tslib";
import { Component } from "@angular/core";
import { MetaDilService } from "../../services/metadil";
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, Validators, FormControl } from "@angular/forms";
var AdminMetaDilDuzenleComponent = /** @class */ (function () {
    function AdminMetaDilDuzenleComponent(service, route, router, formBuilder) {
        this.service = service;
        this.route = route;
        this.router = router;
        this.formBuilder = formBuilder;
    }
    AdminMetaDilDuzenleComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.route.params.subscribe(function (params) {
            _this.id = params['id'];
            _this.service.getDuzenle(_this.id).subscribe(function (resData) {
                _this.model = resData;
            }, function (resError) { return _this.errorMsg = resError; });
        });
        this.duzenleForm = this.formBuilder.group({
            ID: new FormControl(null, [Validators.required, Validators.min(1)]),
            MetaID: new FormControl(null, [Validators.required, Validators.min(1)]),
            TransID: new FormControl(null, [Validators.required, Validators.min(1)]),
            Name: new FormControl(null, [Validators.required, Validators.minLength(3), Validators.maxLength(50)]),
            Content: new FormControl(null, [Validators.required, Validators.minLength(1)]),
        });
    };
    AdminMetaDilDuzenleComponent.prototype.onSubmit = function () {
        var _this = this;
        this.data = new Object();
        this.data.ID = this.duzenleForm.get("ID").value;
        this.data.MetaID = this.duzenleForm.get("MetaID").value;
        this.data.TransID = this.duzenleForm.get("TransID").value;
        this.data.Name = this.duzenleForm.get("Name").value;
        this.data.Content = this.duzenleForm.get("Content").value;
        this.service.postDuzenle(this.data)
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
    AdminMetaDilDuzenleComponent = tslib_1.__decorate([
        Component({
            templateUrl: './duzenle.html',
            providers: [MetaDilService]
        }),
        tslib_1.__metadata("design:paramtypes", [MetaDilService, ActivatedRoute, Router, FormBuilder])
    ], AdminMetaDilDuzenleComponent);
    return AdminMetaDilDuzenleComponent;
}());
export { AdminMetaDilDuzenleComponent };
//# sourceMappingURL=duzenle.js.map