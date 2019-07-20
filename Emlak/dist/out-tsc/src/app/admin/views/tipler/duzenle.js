import * as tslib_1 from "tslib";
import { Component } from "@angular/core";
import { TiplerService } from "../../services/tipler";
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, Validators, FormControl } from "@angular/forms";
var AdminTiplerDuzenleComponent = /** @class */ (function () {
    function AdminTiplerDuzenleComponent(service, route, router, formBuilder) {
        this.service = service;
        this.route = route;
        this.router = router;
        this.formBuilder = formBuilder;
    }
    AdminTiplerDuzenleComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.route.params.subscribe(function (params) {
            _this.id = params['id'];
            _this.service.getDuzenle(_this.id).subscribe(function (resData) {
                _this.model = resData;
            }, function (resError) { return _this.errorMsg = resError; });
        });
        this.duzenleForm = this.formBuilder.group({
            ID: new FormControl(null, [Validators.required, Validators.min(1)]),
            TypeName: new FormControl(null, [Validators.required, Validators.minLength(3), Validators.maxLength(50)]),
            Url: new FormControl(null, [Validators.required, Validators.minLength(3), Validators.maxLength(100)]),
            TableName: new FormControl(null, [Validators.required, Validators.minLength(3), Validators.maxLength(50)]),
            Linkable: new FormControl(null),
            Show: new FormControl(null),
        });
    };
    AdminTiplerDuzenleComponent.prototype.onSubmit = function () {
        var _this = this;
        this.data = new Object();
        this.data.ID = this.duzenleForm.get("ID").value;
        this.data.TypeName = this.duzenleForm.get("TypeName").value;
        this.data.Url = this.duzenleForm.get("Url").value;
        this.data.TableName = this.duzenleForm.get("TableName").value;
        this.data.Linkable = this.duzenleForm.get("Linkable").value;
        this.data.Show = this.duzenleForm.get("Show").value;
        this.service.postDuzenle(this.data)
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
    AdminTiplerDuzenleComponent = tslib_1.__decorate([
        Component({
            templateUrl: './duzenle.html'
        }),
        tslib_1.__metadata("design:paramtypes", [TiplerService, ActivatedRoute, Router, FormBuilder])
    ], AdminTiplerDuzenleComponent);
    return AdminTiplerDuzenleComponent;
}());
export { AdminTiplerDuzenleComponent };
//# sourceMappingURL=duzenle.js.map