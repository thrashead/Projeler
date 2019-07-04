import * as tslib_1 from "tslib";
import { Component, HostListener } from "@angular/core";
import { EmlakService } from "../services/emlak.service";
import { SharedService } from '../admin/services/shared';
import { FormBuilder, Validators } from "@angular/forms";
import { Router } from '@angular/router';
var HeaderComponent = /** @class */ (function () {
    function HeaderComponent(service, emlakService, _formBuilder, router) {
        this.service = service;
        this.emlakService = emlakService;
        this._formBuilder = _formBuilder;
        this.router = router;
    }
    HeaderComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.girisForm = this._formBuilder.group({
            kullanici: [null, [Validators.required, Validators.minLength(3), Validators.maxLength(25)]],
            sifre: [null, [Validators.required, Validators.minLength(3), Validators.maxLength(25)]]
        });
        this.emlakService.getLangs()
            .subscribe(function (resData) { return _this.diller = resData; }, function (resError) { return _this.errorMsg = resError; });
        this.KodlaGetir();
    };
    HeaderComponent.prototype.onSubmit = function () {
        var _this = this;
        this.girisData = new Object();
        this.girisData.Username = this.girisForm.get("kullanici").value;
        this.girisData.Password = this.girisForm.get("sifre").value;
        this.service.postLogin(this.girisData)
            .subscribe(function (answer) {
            if (answer == true) {
                _this.router.navigate(['/Admin/AnaSayfa']);
            }
            else {
                _this.emlakService.getKodlaGetir("iacc")
                    .subscribe(function (resData) {
                    _this.lblSonucText = resData;
                    $("#lblsonuc").fadeIn("slow");
                }, function (resError) { return _this.errorMsg = resError; });
            }
        }, function (resError) { return _this.errorMsg = resError; });
    };
    HeaderComponent.prototype.onKeyDown = function (event) {
        if (event.keyCode != "13") {
            return false;
        }
        else {
            this.onSubmit();
        }
    };
    //a linkine click eventi eklemek için gerekli
    HeaderComponent.prototype.onClick = function (lang) {
        var _this = this;
        if (lang != undefined) {
            this.emlakService.chanegeLang(lang)
                .subscribe(function (resData) {
                if (resData == true) {
                    window.location.reload();
                }
            }, function (resError) { return _this.errorMsg = resError; });
        }
    };
    HeaderComponent.prototype.KodlaGetir = function () {
        var _this = this;
        this.emlakService.getKodlaGetir("mnpg")
            .subscribe(function (resData) { return _this.anaSayfaText = resData; }, function (resError) { return _this.errorMsg = resError; });
        this.emlakService.getKodlaGetir("abus")
            .subscribe(function (resData) { return _this.hakkimizdaText = resData; }, function (resError) { return _this.errorMsg = resError; });
        this.emlakService.getKodlaGetir("cont")
            .subscribe(function (resData) { return _this.iletisimText = resData; }, function (resError) { return _this.errorMsg = resError; });
        this.emlakService.getKodlaGetir("usna")
            .subscribe(function (resData) { return _this.kullaniciAdiText = resData; }, function (resError) { return _this.errorMsg = resError; });
        this.emlakService.getKodlaGetir("pass")
            .subscribe(function (resData) { return _this.sifreText = resData; }, function (resError) { return _this.errorMsg = resError; });
        this.emlakService.getKodlaGetir("entr")
            .subscribe(function (resData) { return _this.btnGirisText = resData; }, function (resError) { return _this.errorMsg = resError; });
        this.emlakService.getKodlaGetir("iacc")
            .subscribe(function (resData) { _this.lblSonucText = resData; }, function (resError) { return _this.errorMsg = resError; });
    };
    tslib_1.__decorate([
        HostListener("click"),
        tslib_1.__metadata("design:type", Function),
        tslib_1.__metadata("design:paramtypes", [String]),
        tslib_1.__metadata("design:returntype", void 0)
    ], HeaderComponent.prototype, "onClick", null);
    HeaderComponent = tslib_1.__decorate([
        Component({
            selector: "emlak-header",
            templateUrl: './header.html',
            providers: [EmlakService, SharedService]
        }),
        tslib_1.__metadata("design:paramtypes", [SharedService, EmlakService, FormBuilder, Router])
    ], HeaderComponent);
    return HeaderComponent;
}());
export { HeaderComponent };
//# sourceMappingURL=header.js.map