import * as tslib_1 from "tslib";
import { Component } from "@angular/core";
import { IcerikDilService } from "../../services/icerikdil";
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, Validators, FormControl } from "@angular/forms";
import ClassicEditor from '../../../../../Content/admin/js/ckeditor/ckeditor.js';
var AdminIcerikDilDuzenleComponent = /** @class */ (function () {
    function AdminIcerikDilDuzenleComponent(service, route, router, formBuilder) {
        this.service = service;
        this.route = route;
        this.router = router;
        this.formBuilder = formBuilder;
    }
    AdminIcerikDilDuzenleComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.route.params.subscribe(function (params) {
            _this.id = params['id'];
            _this.service.getDuzenle(_this.id).subscribe(function (resData) {
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
        this.duzenleForm = this.formBuilder.group({
            ID: new FormControl(null, [Validators.required, Validators.min(1)]),
            ContID: new FormControl(null, [Validators.required, Validators.min(1)]),
            TransID: new FormControl(null, [Validators.required, Validators.min(1)]),
            ContentName: new FormControl(null, [Validators.required, Validators.minLength(3), Validators.maxLength(255)]),
            ShortText1: new FormControl(null),
            ShortText2: new FormControl(null),
            Description: new FormControl(null),
        });
    };
    AdminIcerikDilDuzenleComponent.prototype.onSubmit = function () {
        var _this = this;
        this.data = new Object();
        this.data.ID = this.duzenleForm.get("ID").value;
        this.data.ContID = this.duzenleForm.get("ContID").value;
        this.data.TransID = this.duzenleForm.get("TransID").value;
        this.data.ContentName = this.duzenleForm.get("ContentName").value;
        this.data.ShortText1 = this.duzenleForm.get("ShortText1").value;
        this.data.ShortText2 = this.duzenleForm.get("ShortText2").value;
        this.data.Description = $(".ck-content").html().replace("<p>", "").replace("</p>", "");
        this.service.postDuzenle(this.data)
            .subscribe(function (answer) {
            if (answer.Mesaj == null) {
                _this.router.navigate(['/Admin/IcerikDil']);
            }
            else {
                $(".alertMessage").text(answer.Mesaj);
                $(".alert-error").fadeIn("slow");
            }
        }, function (resError) { return _this.errorMsg = resError; });
    };
    AdminIcerikDilDuzenleComponent = tslib_1.__decorate([
        Component({
            templateUrl: './duzenle.html',
            providers: [IcerikDilService]
        }),
        tslib_1.__metadata("design:paramtypes", [IcerikDilService, ActivatedRoute, Router, FormBuilder])
    ], AdminIcerikDilDuzenleComponent);
    return AdminIcerikDilDuzenleComponent;
}());
export { AdminIcerikDilDuzenleComponent };
//# sourceMappingURL=duzenle.js.map