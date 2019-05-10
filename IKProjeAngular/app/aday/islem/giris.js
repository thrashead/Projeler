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
var aday_service_1 = require("../../services/aday.service");
var forms_1 = require("@angular/forms");
var library_1 = require("../../library");
var AdayIslemGirisComponent = /** @class */ (function () {
    function AdayIslemGirisComponent(adayService, formBuilder) {
        this.adayService = adayService;
        this.formBuilder = formBuilder;
    }
    AdayIslemGirisComponent.prototype.ngOnInit = function () {
        this.girisForm = this.formBuilder.group({
            username: [null, [forms_1.Validators.required, forms_1.Validators.minLength(5), forms_1.Validators.maxLength(20)]],
            password: [null, [forms_1.Validators.required, forms_1.Validators.minLength(5), forms_1.Validators.maxLength(20)]],
        });
    };
    AdayIslemGirisComponent.prototype.onSubmit = function () {
        this.girisData = new Object();
        this.girisData.KullaniciAdi = this.girisForm.get("username").value;
        this.girisData.Sifre = this.girisForm.get("password").value;
        this.adayService.GirisYap(this.girisData)
            .subscribe(function (data) {
            if (data == true) {
                window.location.href = library_1.AppMgr.MainPath;
            }
            else {
                alert("Kullanıcı adı veya şifre hatalı.");
            }
        });
    };
    AdayIslemGirisComponent = __decorate([
        core_1.Component({
            templateUrl: 'app/aday/islem/giris.html',
            styleUrls: [
                'Content/css/sayfalar/Giris.css'
            ],
            encapsulation: core_1.ViewEncapsulation.None,
            providers: [aday_service_1.AdayService]
        }),
        __metadata("design:paramtypes", [aday_service_1.AdayService, forms_1.FormBuilder])
    ], AdayIslemGirisComponent);
    return AdayIslemGirisComponent;
}());
exports.AdayIslemGirisComponent = AdayIslemGirisComponent;
//# sourceMappingURL=giris.js.map