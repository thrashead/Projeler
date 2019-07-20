import * as tslib_1 from "tslib";
import { Component } from "@angular/core";
import { TiplerService } from "../../services/tipler";
import { Router } from '@angular/router';
import { FormBuilder, Validators, FormControl } from "@angular/forms";
var AdminTiplerEkleComponent = /** @class */ (function () {
    function AdminTiplerEkleComponent(service, router, formBuilder) {
        this.service = service;
        this.router = router;
        this.formBuilder = formBuilder;
    }
    AdminTiplerEkleComponent.prototype.ngOnInit = function () {
        this.ekleForm = this.formBuilder.group({
            TypeName: new FormControl(null, [Validators.required, Validators.minLength(3), Validators.maxLength(50)]),
            Url: new FormControl(null, [Validators.required, Validators.minLength(3), Validators.maxLength(100)]),
            TableName: new FormControl(null, [Validators.required, Validators.minLength(3), Validators.maxLength(50)]),
            Linkable: new FormControl(null),
            Show: new FormControl(null),
        });
    };
    AdminTiplerEkleComponent.prototype.onSubmit = function () {
        var _this = this;
        this.data = new Object();
        this.data.TypeName = this.ekleForm.get("TypeName").value;
        this.data.Url = this.ekleForm.get("Url").value;
        this.data.TableName = this.ekleForm.get("TableName").value;
        this.data.Linkable = this.ekleForm.get("Linkable").value;
        this.data.Show = this.ekleForm.get("Show").value;
        this.service.postEkle(this.data)
            .subscribe(function (answer) {
            if (answer.Mesaj == null) {
                _this.router.navigate(['/Admin/Tipler']);
            }
            else {
                $(".alertMessage").text(answer.Mesaj);
                $(".alert-error").fadeIn("slow");
            }
        }, function (resError) { return _this.errorMsg = resError; });
    };
    AdminTiplerEkleComponent = tslib_1.__decorate([
        Component({
            templateUrl: './ekle.html'
        }),
        tslib_1.__metadata("design:paramtypes", [TiplerService, Router, FormBuilder])
    ], AdminTiplerEkleComponent);
    return AdminTiplerEkleComponent;
}());
export { AdminTiplerEkleComponent };
//# sourceMappingURL=ekle.js.map