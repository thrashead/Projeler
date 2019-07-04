import * as tslib_1 from "tslib";
import { Component } from "@angular/core";
import { KategoriDilService } from "../../services/kategoridil";
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, Validators, FormControl } from "@angular/forms";
import ClassicEditor from '../../../../../Content/admin/js/ckeditor/ckeditor.js';
var AdminKategoriDilEkleComponent = /** @class */ (function () {
    function AdminKategoriDilEkleComponent(service, route, router, formBuilder) {
        this.service = service;
        this.route = route;
        this.router = router;
        this.formBuilder = formBuilder;
    }
    AdminKategoriDilEkleComponent.prototype.ngOnInit = function () {
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
            CatID: new FormControl(null, [Validators.required, Validators.min(1)]),
            TransID: new FormControl(null, [Validators.required, Validators.min(1)]),
            CategoryName: new FormControl(null, [Validators.required, Validators.minLength(3), Validators.maxLength(255)]),
            ShortText1: new FormControl(null),
            ShortText2: new FormControl(null),
            Description: new FormControl(null),
        });
    };
    AdminKategoriDilEkleComponent.prototype.onSubmit = function () {
        var _this = this;
        this.data = new Object();
        this.data.CatID = this.ekleForm.get("CatID").value;
        this.data.TransID = this.ekleForm.get("TransID").value;
        this.data.CategoryName = this.ekleForm.get("CategoryName").value;
        this.data.ShortText1 = this.ekleForm.get("ShortText1").value;
        this.data.ShortText2 = this.ekleForm.get("ShortText2").value;
        this.data.Description = $(".ck-content").html().replace("<p>", "").replace("</p>", "");
        this.service.postEkle(this.data)
            .subscribe(function (answer) {
            if (answer.Mesaj == null) {
                _this.router.navigate(['/Admin/KategoriDil']);
            }
            else {
                $(".alertMessage").text(answer.Mesaj);
                $(".alert-error").fadeIn("slow");
            }
        }, function (resError) { return _this.errorMsg = resError; });
    };
    AdminKategoriDilEkleComponent = tslib_1.__decorate([
        Component({
            templateUrl: './ekle.html',
            providers: [KategoriDilService]
        }),
        tslib_1.__metadata("design:paramtypes", [KategoriDilService, ActivatedRoute, Router, FormBuilder])
    ], AdminKategoriDilEkleComponent);
    return AdminKategoriDilEkleComponent;
}());
export { AdminKategoriDilEkleComponent };
//# sourceMappingURL=ekle.js.map