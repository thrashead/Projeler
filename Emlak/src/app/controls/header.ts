import { Component, HostListener } from "@angular/core";
import { EmlakAjaxService } from "../services/emlakajax";
import { SharedService } from '../admin/services/shared';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Router } from '@angular/router';

@Component({
    selector: "emlak-header",
    templateUrl: './header.html'
})

export class HeaderComponent {
    diller: any;

    girisForm: FormGroup;
    girisData: any;
    
    constructor(private service: SharedService, private emlakService: EmlakAjaxService, private _formBuilder: FormBuilder, private router: Router) {
    }

    ngOnInit() {
        this.girisForm = this._formBuilder.group({
            kullanici: [null, [Validators.required, Validators.minLength(3), Validators.maxLength(25)]],
            sifre: [null, [Validators.required, Validators.minLength(3), Validators.maxLength(25)]]
        });

        this.emlakService.getLangs()
            .subscribe(resData => this.diller = resData,
                resError => this.errorMsg = resError);

        this.KodlaGetir();
    }

    onSubmit() {
        this.girisData = new Object();
        this.girisData.Username = this.girisForm.get("kullanici").value;
        this.girisData.Password = this.girisForm.get("sifre").value;

        this.service.postLogin(this.girisData)
            .subscribe((answer: any) => {
                if (answer == true) {
                    this.router.navigate(['/Admin/AnaSayfa']);
                }
                else {
                    this.emlakService.getKodlaGetir("iacc")
                        .subscribe((resData: any) => {
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
            this.emlakService.chanegeLang(lang)
                .subscribe((resData: any) => {
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
        this.emlakService.getKodlaGetir("mnpg")
            .subscribe(resData => this.anaSayfaText = resData,
                resError => this.errorMsg = resError);

        this.emlakService.getKodlaGetir("abus")
            .subscribe(resData => this.hakkimizdaText = resData,
                resError => this.errorMsg = resError);

        this.emlakService.getKodlaGetir("cont")
            .subscribe(resData => this.iletisimText = resData,
                resError => this.errorMsg = resError);

        this.emlakService.getKodlaGetir("usna")
            .subscribe(resData => this.kullaniciAdiText = resData,
                resError => this.errorMsg = resError);

        this.emlakService.getKodlaGetir("pass")
            .subscribe(resData => this.sifreText = resData,
                resError => this.errorMsg = resError);

        this.emlakService.getKodlaGetir("entr")
            .subscribe(resData => this.btnGirisText = resData,
                resError => this.errorMsg = resError);

        this.emlakService.getKodlaGetir("iacc")
            .subscribe(resData => { this.lblSonucText = resData },
                resError => this.errorMsg = resError);
    }
}