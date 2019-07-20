import * as tslib_1 from "tslib";
import { Component } from "@angular/core";
import { EmlakDilService } from "../../services/emlakdil";
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, Validators, FormControl } from "@angular/forms";
import ClassicEditor from '../../../../../Content/admin/js/ckeditor/ckeditor.js';
var AdminEmlakDilDuzenleComponent = /** @class */ (function () {
    function AdminEmlakDilDuzenleComponent(service, route, router, formBuilder) {
        this.service = service;
        this.route = route;
        this.router = router;
        this.formBuilder = formBuilder;
    }
    AdminEmlakDilDuzenleComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.route.params.subscribe(function (params) {
            _this.id = params['id'];
            _this.service.getDuzenle(_this.id).subscribe(function (resData) {
                _this.model = resData;
            }, function (resError) { return _this.errorMsg = resError; });
        });
        setTimeout(function () {
            ClassicEditor
                .create(document.querySelector('#Aciklama'), {
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
            RealEsID: new FormControl(null, [Validators.required, Validators.min(1)]),
            TransID: new FormControl(null, [Validators.required, Validators.min(1)]),
            Baslik: new FormControl(null, [Validators.required, Validators.minLength(3), Validators.maxLength(255)]),
            Code: new FormControl(null),
            Aciklama: new FormControl(null),
        });
    };
    AdminEmlakDilDuzenleComponent.prototype.onSubmit = function () {
        var _this = this;
        this.data = new Object();
        this.data.ID = this.duzenleForm.get("ID").value;
        this.data.RealEsID = this.duzenleForm.get("RealEsID").value;
        this.data.TransID = this.duzenleForm.get("TransID").value;
        this.data.Baslik = this.duzenleForm.get("Baslik").value;
        this.data.Code = this.duzenleForm.get("Code").value;
        this.data.Aciklama = $(".ck-content").html().replace("<p>", "").replace("</p>", "");
        this.service.postDuzenle(this.data)
            .subscribe(function (answer) {
            if (answer.Mesaj == null) {
                _this.router.navigate(['/Admin/EmlakDil']);
            }
            else {
                $(".alertMessage").text(answer.Mesaj);
                $(".alert-error").fadeIn("slow");
            }
        }, function (resError) { return _this.errorMsg = resError; });
    };
    AdminEmlakDilDuzenleComponent = tslib_1.__decorate([
        Component({
            templateUrl: './duzenle.html'
        }),
        tslib_1.__metadata("design:paramtypes", [EmlakDilService, ActivatedRoute, Router, FormBuilder])
    ], AdminEmlakDilDuzenleComponent);
    return AdminEmlakDilDuzenleComponent;
}());
export { AdminEmlakDilDuzenleComponent };
//# sourceMappingURL=duzenle.js.map