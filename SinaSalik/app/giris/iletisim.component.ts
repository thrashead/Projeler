import { Component } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { SinaService } from "../sina.service";

@Component({
    templateUrl: 'app/giris/iletisim.component.html',
    providers: [SinaService]
})

export class IletisimComponent {
    reviewForm: FormGroup;
    mail: any;
    errorMsg: string;

    constructor(private _sinaService: SinaService, private _formBuilder: FormBuilder) {
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
            },
                resError => this.errorMsg = resError);
    }

    //Patterns
    //isValid(text: string, type: string) {
    //    var pattern;
    //
    //    switch (type) {
    //        case "username": pattern = new RegExp(/^[a-z0-9_-]{5,12}$/); break;
    //        case "password": pattern = new RegExp(/^[a-z0-9_-]{8,255}$/); break;
    //        case "hex": pattern = new RegExp(/^#?([a-f0-9]{6}|[a-f0-9]{3})$/); break;
    //        case "rewrite": pattern = new RegExp(/^[a-z0-9-]+$/); break;
    //        case "email": pattern = new RegExp(/^([a-z0-9_\.-]+)@([\da-z\.-]+)\.([a-z\.]{2,6})$/); break;
    //        case "url": pattern = new RegExp(/^(https?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \.-]*)*\/?$/); break;
    //        case "ipaddress": pattern = new RegExp(/^(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/); break;
    //        case "htmltag": pattern = new RegExp(/^<([a-z]+)([^<]+)*(?:>(.*)<\/\1>|\s+\/>)$/); break;
    //        case "text": pattern = new RegExp(/^[a-zA-Z0-9., ;:]{5,255}$/); break;
    //        default: pattern = new RegExp(/^[a-zA-Z0-9., ;:]{5,255}$/); break;
    //    }
    //
    //    return pattern.test(text);
    //}
}