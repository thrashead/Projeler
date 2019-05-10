import { Component, ViewEncapsulation } from "@angular/core";
import { AdayService } from "../../services/aday.service";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { AppMgr } from "../../library";

@Component({
    templateUrl: 'app/aday/islem/giris.html',
    styleUrls: [
        'Content/css/sayfalar/Giris.css'
    ],
    encapsulation: ViewEncapsulation.None,
    providers: [AdayService]
})

export class AdayIslemGirisComponent {
    girisForm: FormGroup;
    girisData: any;
    errorMsg: string;

    constructor(private adayService: AdayService, private formBuilder: FormBuilder) {
    }

    ngOnInit() {
        this.girisForm = this.formBuilder.group({
            username: [null, [Validators.required, Validators.minLength(5), Validators.maxLength(20)]],
            password: [null, [Validators.required, Validators.minLength(5), Validators.maxLength(20)]],
        });
    }

    onSubmit() {
        this.girisData = new Object();
        this.girisData.KullaniciAdi = this.girisForm.get("username").value;
        this.girisData.Sifre = this.girisForm.get("password").value;

        this.adayService.GirisYap(this.girisData)
            .subscribe(data => {
                if (data == true) {
                    window.location.href = AppMgr.MainPath;
                }
                else {
                    alert("Kullanıcı adı veya şifre hatalı.");
                }
            });
    }
}