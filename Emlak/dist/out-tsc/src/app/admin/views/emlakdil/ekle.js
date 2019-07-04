import * as tslib_1 from "tslib";
import { Component } from "@angular/core";
import { EmlakDilService } from "../../services/emlakdil";
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, Validators, FormControl } from "@angular/forms";
import ClassicEditor from '../../../../../Content/admin/js/ckeditor/ckeditor.js';
var AdminEmlakDilEkleComponent = /** @class */ (function () {
    function AdminEmlakDilEkleComponent(service, route, router, formBuilder) {
        this.service = service;
        this.route = route;
        this.router = router;
        this.formBuilder = formBuilder;
    }
    AdminEmlakDilEkleComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.route.params.subscribe(function (params) {
            _this.linkID = params['linkID'];
            _this.service.getEkle(_this.linkID).subscribe(function (resData) {
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
        this.ekleForm = this.formBuilder.group({
            RealEsID: new FormControl(null, [Validators.required, Validators.min(1)]),
            TransID: new FormControl(null, [Validators.required, Validators.min(1)]),
            Baslik: new FormControl(null, [Validators.required, Validators.minLength(3), Validators.maxLength(255)]),
            Code: new FormControl(null),
            Aciklama: new FormControl(null),
        });
    };
    AdminEmlakDilEkleComponent.prototype.onSubmit = function () {
        var _this = this;
        this.data = new Object();
        this.data.RealEsID = this.ekleForm.get("RealEsID").value;
        this.data.TransID = this.ekleForm.get("TransID").value;
        this.data.Baslik = this.ekleForm.get("Baslik").value;
        this.data.Code = this.ekleForm.get("Code").value;
        this.data.Aciklama = $(".ck-content").html().replace("<p>", "").replace("</p>", "");
        this.service.postEkle(this.data)
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
    AdminEmlakDilEkleComponent = tslib_1.__decorate([
        Component({
            templateUrl: './ekle.html',
            providers: [EmlakDilService]
        }),
        tslib_1.__metadata("design:paramtypes", [EmlakDilService, ActivatedRoute, Router, FormBuilder])
    ], AdminEmlakDilEkleComponent);
    return AdminEmlakDilEkleComponent;
}());
export { AdminEmlakDilEkleComponent };
//# sourceMappingURL=ekle.js.map