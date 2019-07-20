import * as tslib_1 from "tslib";
import { Component } from "@angular/core";
import { UrunDilService } from "../../services/urundil";
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, Validators, FormControl } from "@angular/forms";
import ClassicEditor from '../../../../../Content/admin/js/ckeditor/ckeditor.js';
var AdminUrunDilEkleComponent = /** @class */ (function () {
    function AdminUrunDilEkleComponent(service, route, router, formBuilder) {
        this.service = service;
        this.route = route;
        this.router = router;
        this.formBuilder = formBuilder;
    }
    AdminUrunDilEkleComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.route.params.subscribe(function (params) {
            _this.linkID = params['linkID'];
            _this.service.getEkle(_this.linkID).subscribe(function (resData) {
                _this.model = resData;
            }, function (resError) { return _this.errorMsg = resError; });
        });
        setTimeout(function () {
            ClassicEditor
                .create(document.querySelector('#Description'), {
            //toolbar: ['bold', 'italic']
            })
                .then(function (editor) {
                console.log(editor);
            })
                .catch(function (err) {
                console.error(err.stack);
            });
        }, 100);
        this.ekleForm = this.formBuilder.group({
            ProdID: new FormControl(null, [Validators.required, Validators.min(1)]),
            TransID: new FormControl(null, [Validators.required, Validators.min(1)]),
            ProductName: new FormControl(null, [Validators.required, Validators.minLength(3), Validators.maxLength(255)]),
            ShortText1: new FormControl(null),
            ShortText2: new FormControl(null),
            Description: new FormControl(null)
        });
    };
    AdminUrunDilEkleComponent.prototype.onSubmit = function () {
        var _this = this;
        this.data = new Object();
        this.data.ProdID = this.ekleForm.get("ProdID").value;
        this.data.TransID = this.ekleForm.get("TransID").value;
        this.data.ProductName = this.ekleForm.get("ProductName").value;
        this.data.ShortText1 = this.ekleForm.get("ShortText1").value;
        this.data.ShortText2 = this.ekleForm.get("ShortText2").value;
        this.data.Description = $(".ck-content").html().replace("<p>", "").replace("</p>", "");
        this.service.postEkle(this.data)
            .subscribe(function (answer) {
            if (answer.Mesaj == null) {
                _this.router.navigate(['/Admin/UrunDil']);
            }
            else {
                $(".alertMessage").text(answer.Mesaj);
                $(".alert-error").fadeIn("slow");
            }
        }, function (resError) { return _this.errorMsg = resError; });
    };
    AdminUrunDilEkleComponent = tslib_1.__decorate([
        Component({
            templateUrl: './ekle.html'
        }),
        tslib_1.__metadata("design:paramtypes", [UrunDilService, ActivatedRoute, Router, FormBuilder])
    ], AdminUrunDilEkleComponent);
    return AdminUrunDilEkleComponent;
}());
export { AdminUrunDilEkleComponent };
//# sourceMappingURL=ekle.js.map