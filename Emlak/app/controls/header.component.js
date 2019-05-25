"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var emlak_service_1 = require("../emlak.service");
var forms_1 = require("@angular/forms");
var HeaderComponent = /** @class */ (function () {
    function HeaderComponent(_emlakService, _formBuilder) {
        this._emlakService = _emlakService;
        this._formBuilder = _formBuilder;
    }
    HeaderComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.girisForm = this._formBuilder.group({
            kullanici: [null, [forms_1.Validators.required, forms_1.Validators.minLength(3), forms_1.Validators.maxLength(25)]],
            sifre: [null, [forms_1.Validators.required, forms_1.Validators.minLength(3), forms_1.Validators.maxLength(25)]]
        });
        this._emlakService.getLangs()
            .subscribe(function (resData) { return _this.diller = resData; }, function (resError) { return _this.errorMsg = resError; });
        this.KodlaGetir();
    };
    HeaderComponent.prototype.onSubmit = function () {
        var _this = this;
        this.girisData = new Object();
        this.girisData.Username = this.girisForm.get("kullanici").value;
        this.girisData.Password = this.girisForm.get("sifre").value;
        this._emlakService.getAdminGiris(this.girisData)
            .subscribe(function (answer) {
            if (answer == true) {
                window.location.href = "Admin/Giris/AnaSayfa";
            }
            else {
                _this._emlakService.getKodlaGetir("iacc")
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
            this._emlakService.chanegeLang(lang)
                .subscribe(function (resData) {
                if (resData == true) {
                    window.location.reload();
                }
            }, function (resError) { return _this.errorMsg = resError; });
        }
    };
    HeaderComponent.prototype.KodlaGetir = function () {
        var _this = this;
        this._emlakService.getKodlaGetir("mnpg")
            .subscribe(function (resData) { return _this.anaSayfaText = resData; }, function (resError) { return _this.errorMsg = resError; });
        this._emlakService.getKodlaGetir("abus")
            .subscribe(function (resData) { return _this.hakkimizdaText = resData; }, function (resError) { return _this.errorMsg = resError; });
        this._emlakService.getKodlaGetir("cont")
            .subscribe(function (resData) { return _this.iletisimText = resData; }, function (resError) { return _this.errorMsg = resError; });
        this._emlakService.getKodlaGetir("usna")
            .subscribe(function (resData) { return _this.kullaniciAdiText = resData; }, function (resError) { return _this.errorMsg = resError; });
        this._emlakService.getKodlaGetir("pass")
            .subscribe(function (resData) { return _this.sifreText = resData; }, function (resError) { return _this.errorMsg = resError; });
        this._emlakService.getKodlaGetir("entr")
            .subscribe(function (resData) { return _this.btnGirisText = resData; }, function (resError) { return _this.errorMsg = resError; });
        this._emlakService.getKodlaGetir("iacc")
            .subscribe(function (resData) { _this.lblSonucText = resData; }, function (resError) { return _this.errorMsg = resError; });
    };
    __decorate([
        core_1.HostListener("click"),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [String]),
        __metadata("design:returntype", void 0)
    ], HeaderComponent.prototype, "onClick", null);
    HeaderComponent = __decorate([
        core_1.Component({
            selector: "emlak-header",
            templateUrl: 'app/controls/header.component.html',
            providers: [emlak_service_1.EmlakService]
        }),
        __metadata("design:paramtypes", [emlak_service_1.EmlakService, forms_1.FormBuilder])
    ], HeaderComponent);
    return HeaderComponent;
}());
exports.HeaderComponent = HeaderComponent;
//# sourceMappingURL=header.component.js.map