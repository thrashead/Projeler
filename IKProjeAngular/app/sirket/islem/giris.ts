import { Component, ViewEncapsulation } from "@angular/core";
import { SirketService } from "../../services/sirket.service";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";

@Component({
    templateUrl: 'app/sirket/islem/giris.html',
    styleUrls: [
        'Content/css/sayfalar/Giris.css'
    ],
    encapsulation: ViewEncapsulation.None,
    providers: [SirketService]
})

export class SirketIslemGirisComponent {
    girisForm: FormGroup;
    girisData: any;
    errorMsg: string;

    constructor(private sirketService: SirketService, private formBuilder: FormBuilder) {
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

        this.sirketService.GirisYap(this.girisData)
            .subscribe(data => {
                if (data == true) {
                    window.location.reload();
                }
                else {
                    alert("Kullanıcı adı veya şifre hatalı.");
                }
            });
    }
}