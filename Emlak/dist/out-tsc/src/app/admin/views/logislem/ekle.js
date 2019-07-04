import * as tslib_1 from "tslib";
import { Component } from "@angular/core";
import { LogIslemService } from '../../services/logislem';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, Validators, FormControl } from "@angular/forms";
var AdminLogIslemEkleComponent = /** @class */ (function () {
    function AdminLogIslemEkleComponent(service, route, router, formBuilder) {
        this.service = service;
        this.route = route;
        this.router = router;
        this.formBuilder = formBuilder;
    }
    AdminLogIslemEkleComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.route.params.subscribe(function (params) {
            _this.linkID = params['linkID'];
            _this.service.getEkle(_this.linkID).subscribe(function (resData) {
                _this.model = resData;
            }, function (resError) { return _this.errorMsg = resError; });
        });
        this.ekleForm = this.formBuilder.group({
            LogTypeID: new FormControl(null, [Validators.required, Validators.min(1)]),
            Name: new FormControl(null, [Validators.required, Validators.minLength(3), Validators.maxLength(50)]),
            ShortName: new FormControl(null, [Validators.required, Validators.minLength(1), Validators.maxLength(5)]),
            Description: new FormControl(null),
        });
    };
    AdminLogIslemEkleComponent.prototype.onSubmit = function () {
        var _this = this;
        this.data = new Object();
        this.data.LogTypeID = this.ekleForm.get("LogTypeID").value;
        this.data.Name = this.ekleForm.get("Name").value;
        this.data.ShortName = this.ekleForm.get("ShortName").value;
        this.data.Description = this.ekleForm.get("Description").value;
        this.service.postEkle(this.data)
            .subscribe(function (answer) {
            if (answer.Mesaj == null) {
                _this.router.navigate(['/Admin/LogIslem']);
            }
            else {
                $(".alertMessage").text(answer.Mesaj);
                $(".alert-error").fadeIn("slow");
            }
        }, function (resError) { return _this.errorMsg = resError; });
    };
    AdminLogIslemEkleComponent = tslib_1.__decorate([
        Component({
            templateUrl: './ekle.html',
            providers: [LogIslemService]
        }),
        tslib_1.__metadata("design:paramtypes", [LogIslemService, ActivatedRoute, Router, FormBuilder])
    ], AdminLogIslemEkleComponent);
    return AdminLogIslemEkleComponent;
}());
export { AdminLogIslemEkleComponent };
//# sourceMappingURL=ekle.js.map