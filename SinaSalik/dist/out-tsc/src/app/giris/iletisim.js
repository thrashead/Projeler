import * as tslib_1 from "tslib";
import { Component } from "@angular/core";
import { Validators } from "@angular/forms";
import { SinaService } from "../sina.service";
let IletisimComponent = class IletisimComponent {
    constructor(_sinaService, _formBuilder) {
        this._sinaService = _sinaService;
        this._formBuilder = _formBuilder;
    }
    ngOnInit() {
        this.reviewForm = this._formBuilder.group({
            adsoyad: [null, [Validators.required, Validators.pattern('^[a-zA-Z0-9., ;:]{8,39}')]],
            konu: [null, [Validators.required, Validators.pattern('^[a-zA-Z0-9., ;:]{10,100}')]],
            mesaj: [null, [Validators.required, Validators.pattern('^[a-zA-Z0-9., ;:]{5,255}')]],
        });
    }
    temizle() {
        this.reviewForm.setValue({ "adsoyad": "", "konu": "", "mesaj": "" });
    }
    onSubmit() {
        this.mail = new Object();
        this.mail.Gonderen = this.reviewForm.get("adsoyad").value;
        this.mail.Konu = this.reviewForm.get("konu").value;
        this.mail.Icerik = this.reviewForm.get("mesaj").value;
        this._sinaService.getMailGonder(this.mail)
            .subscribe((answer) => {
            if (answer == 0) {
                alert("Mail başarıyla gönderildi.");
                this.temizle();
            }
            else if (answer == 1) {
                alert("Mail gönderimi başarısız.");
            }
            else if (answer == 2) {
                alert("Sadece bir adet mail gönderim hakkınız bulunmaktadır.");
                this.temizle();
            }
        }, resError => this.errorMsg = resError);
    }
};
IletisimComponent = tslib_1.__decorate([
    Component({
        templateUrl: './iletisim.html',
        providers: [SinaService]
    })
], IletisimComponent);
export { IletisimComponent };
//# sourceMappingURL=iletisim.js.map