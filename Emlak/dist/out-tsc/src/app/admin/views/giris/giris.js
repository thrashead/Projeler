import * as tslib_1 from "tslib";
import { Component, ViewEncapsulation } from "@angular/core";
import { FormBuilder, Validators, FormControl } from "@angular/forms";
import { SharedService } from '../../services/shared.js';
import '../../../../../Content/admin/js/jquery.min.js';
import { Router } from '@angular/router';
var AdminGirisComponent = /** @class */ (function () {
    function AdminGirisComponent(service, formBuilder, router) {
        this.service = service;
        this.formBuilder = formBuilder;
        this.router = router;
    }
    AdminGirisComponent.prototype.ngOnInit = function () {
        this.girisForm = this.formBuilder.group({
            username: new FormControl(null, [Validators.required, Validators.minLength(3), Validators.maxLength(25)]),
            password: new FormControl(null, [Validators.required, Validators.minLength(3), Validators.maxLength(25)])
        });
    };
    AdminGirisComponent.prototype.onSubmit = function () {
        var _this = this;
        $("#imgLoading").fadeIn("slow");
        this.girisData = new Object();
        this.girisData.Username = this.girisForm.get("username").value;
        this.girisData.Password = this.girisForm.get("password").value;
        this.service.postLogin(this.girisData)
            .subscribe(function (answer) {
            if (answer == true) {
                _this.router.navigate(['/Admin/AnaSayfa']);
            }
            else {
                _this.hataMesaj = "Lütfen kullanıcı adı ve şifrenizi kontrol ediniz.";
                $(".alert-error").fadeIn("slow");
                $("#imgLoading").fadeOut("slow");
            }
        }, function (resError) { return _this.errorMsg = resError; });
    };
    AdminGirisComponent.prototype.onKeyPress = function (event) {
        if (event.keyCode == "13") {
            this.onSubmit();
        }
    };
    AdminGirisComponent = tslib_1.__decorate([
        Component({
            templateUrl: './giris.html',
            providers: [SharedService],
            styleUrls: [
                '../../../../../Content/admin/css/bootstrap.min.css',
                '../../../../../Content/admin/css/bootstrap-responsive.min.css',
                '../../../../../Content/admin/css/matrix-login.css',
                '../../../../../Content/admin/css/font-awesome/css/font-awesome.css'
            ],
            styles: [
                '#imgLoading { float: left; margin: 5px 5px 0px 0px; height: 20px; display: none; }'
            ],
            encapsulation: ViewEncapsulation.None
        }),
        tslib_1.__metadata("design:paramtypes", [SharedService, FormBuilder, Router])
    ], AdminGirisComponent);
    return AdminGirisComponent;
}());
export { AdminGirisComponent };
//# sourceMappingURL=giris.js.map