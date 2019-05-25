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
var forms_1 = require("@angular/forms");
var sina_service_1 = require("../sina.service");
var IletisimComponent = /** @class */ (function () {
    function IletisimComponent(_sinaService, _formBuilder) {
        this._sinaService = _sinaService;
        this._formBuilder = _formBuilder;
    }
    IletisimComponent.prototype.ngOnInit = function () {
        this.reviewForm = this._formBuilder.group({
            adsoyad: [null, [forms_1.Validators.required, forms_1.Validators.pattern('^[a-zA-Z0-9., ;:]{8,39}')]],
            konu: [null, [forms_1.Validators.required, forms_1.Validators.pattern('^[a-zA-Z0-9., ;:]{10,100}')]],
            mesaj: [null, [forms_1.Validators.required, forms_1.Validators.pattern('^[a-zA-Z0-9., ;:]{5,255}')]],
        });
    };
    IletisimComponent.prototype.temizle = function () {
        this.reviewForm.setValue({ "adsoyad": "", "konu": "", "mesaj": "" });
    };
    IletisimComponent.prototype.onSubmit = function () {
        var _this = this;
        this.mail = new Object();
        this.mail.Gonderen = this.reviewForm.get("adsoyad").value;
        this.mail.Konu = this.reviewForm.get("konu").value;
        this.mail.Icerik = this.reviewForm.get("mesaj").value;
        this._sinaService.getMailGonder(this.mail)
            .subscribe(function (answer) {
            if (answer == 0) {
                alert("Mail başarıyla gönderildi.");
                _this.temizle();
            }
            else if (answer == 1) {
                alert("Mail gönderimi başarısız.");
            }
            else if (answer == 2) {
                alert("Sadece bir adet mail gönderim hakkınız bulunmaktadır.");
                _this.temizle();
            }
        }, function (resError) { return _this.errorMsg = resError; });
    };
    IletisimComponent = __decorate([
        core_1.Component({
            templateUrl: 'app/giris/iletisim.component.html',
            providers: [sina_service_1.SinaService]
        }),
        __metadata("design:paramtypes", [sina_service_1.SinaService, forms_1.FormBuilder])
    ], IletisimComponent);
    return IletisimComponent;
}());
exports.IletisimComponent = IletisimComponent;
//# sourceMappingURL=iletisim.component.js.map