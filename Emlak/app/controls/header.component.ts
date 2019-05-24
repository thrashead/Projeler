import { Component, HostListener } from "@angular/core";
import { EmlakService } from "../emlak.service";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";

@Component({
    selector: "emlak-header",
    templateUrl: 'app/controls/header.component.html',
    providers: [EmlakService]
})

export class HeaderComponent {
    diller: [];

    girisForm: FormGroup;
    girisData: any;
    
    constructor(private _emlakService: EmlakService, private _formBuilder: FormBuilder) {
    }

    ngOnInit() {
        this.girisForm = this._formBuilder.group({
            kullanici: [null, [Validators.required, Validators.minLength(3), Validators.maxLength(25)]],
            sifre: [null, [Validators.required, Validators.minLength(3), Validators.maxLength(25)]]
        });

        this._emlakService.getLangs()
            .subscribe(resData => this.diller = resData,
                resError => this.errorMsg = resError);

        this.KodlaGetir();
    }

    onSubmit() {
        this.girisData = new Object();
        this.girisData.Username = this.girisForm.get("kullanici").value;
        this.girisData.Password = this.girisForm.get("sifre").value;

        this._emlakService.getAdminGiris(this.girisData)
            .subscribe((answer) => {
                if (answer == true) {
                    window.location.href = "Admin/Giris/AnaSayfa";
                }
                else {
                    this._emlakService.getKodlaGetir("iacc")
                        .subscribe((resData) => {
                            this.lblSonucText = resData;

                            $("#lblsonuc").fadeIn("slow");
                        },
                            resError => this.errorMsg = resError);
                }
            },
                resError => this.errorMsg = resError);
    }

    onKeyDown(event: any) {
        if (event.keyCode != "13") {
            return false;
        }
        else {
            this.onSubmit();
        }
    }

    //a linkine click eventi eklemek için gerekli
    @HostListener("click")
    onClick(lang: string) {
        if (lang != undefined) {
            this._emlakService.chanegeLang(lang)
                .subscribe((resData) => {
                    if (resData == true) {
                        window.location.reload();
                    }
                },
                    resError => this.errorMsg = resError);
        }
    }

    //KodlaGetir
    errorMsg: string;

    anaSayfaText: string;
    hakkimizdaText: string;
    iletisimText: string;
    kullaniciAdiText: string;
    sifreText: string;
    lblSonucText: string;
    btnGirisText: string;

    KodlaGetir() {
        this._emlakService.getKodlaGetir("mnpg")
            .subscribe(resData => this.anaSayfaText = resData,
                resError => this.errorMsg = resError);

        this._emlakService.getKodlaGetir("abus")
            .subscribe(resData => this.hakkimizdaText = resData,
                resError => this.errorMsg = resError);

        this._emlakService.getKodlaGetir("cont")
            .subscribe(resData => this.iletisimText = resData,
                resError => this.errorMsg = resError);

        this._emlakService.getKodlaGetir("usna")
            .subscribe(resData => this.kullaniciAdiText = resData,
                resError => this.errorMsg = resError);

        this._emlakService.getKodlaGetir("pass")
            .subscribe(resData => this.sifreText = resData,
                resError => this.errorMsg = resError);

        this._emlakService.getKodlaGetir("entr")
            .subscribe(resData => this.btnGirisText = resData,
                resError => this.errorMsg = resError);

        this._emlakService.getKodlaGetir("iacc")
            .subscribe(resData => { this.lblSonucText = resData },
                resError => this.errorMsg = resError);
    }
}