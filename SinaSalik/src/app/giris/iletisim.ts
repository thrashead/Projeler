import { Component } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { SinaService } from "../sina.service";

@Component({
    templateUrl: './iletisim.html',
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
}