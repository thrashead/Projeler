import { Component } from "@angular/core";
import { EmlakService } from "../../services/emlak";
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators, FormControl } from "@angular/forms";

@Component({
    templateUrl: './ekle.html',
    providers: [EmlakService]
})

export class AdminEmlakEkleComponent {
    errorMsg: string;

    ekleForm: FormGroup;
    data: any;

    model: {};

    constructor(private service: EmlakService, private router: Router, private formBuilder: FormBuilder) {
    }

    ngOnInit() {
        this.ekleForm = this.formBuilder.group({
            Baslik: new FormControl(null, [Validators.required, Validators.minLength(3), Validators.maxLength(255)]),
            Code: new FormControl(null),
            Fiyat: new FormControl(null),
            Yeni: new FormControl(null),
            GununEmlagi: new FormControl(null),
            Sehir: new FormControl(null),
            Ilce: new FormControl(null),
            Semt: new FormControl(null),
            Sahibi: new FormControl(null),
            OdaSayisi: new FormControl(null),
            KatSayisi: new FormControl(null),
            IsinmaTipi: new FormControl(null),
            SalonSayisi: new FormControl(null),
            BulunduguKat: new FormControl(null),
            YakitTipi: new FormControl(null),
            Alan: new FormControl(null),
            Durum: new FormControl(null),
            BinaYasi: new FormControl(null),
            ArkaCephe: new FormControl(null),
            OnCephe: new FormControl(null),
            CaddeyeYakin: new FormControl(null),
            DenizeSifir: new FormControl(null),
            DenizeYakin: new FormControl(null),
            Manzara: new FormControl(null),
            Merkezde: new FormControl(null),
            Metro: new FormControl(null),
            Otoban: new FormControl(null),
            TopluUlasim: new FormControl(null),
            Asansor: new FormControl(null),
            Bahce: new FormControl(null),
            Guvenlik: new FormControl(null),
            Hidrofor: new FormControl(null),
            Mantolama: new FormControl(null),
            Jenerator: new FormControl(null),
            Kapici: new FormControl(null),
            Satilik: new FormControl(null),
            Otopark: new FormControl(null),
            OyunParki: new FormControl(null),
            PVCDograma: new FormControl(null),
            SiteIci: new FormControl(null),
            YanginMerdiveni: new FormControl(null),
            YuzmeHavuzu: new FormControl(null),
            Alarm: new FormControl(null),
            Balkon: new FormControl(null),
            CelikKapi: new FormControl(null),
            GoruntuluDiafon: new FormControl(null),
            Jakuzi: new FormControl(null),
            KabloTVUydu: new FormControl(null),
            Klima: new FormControl(null),
            Active: new FormControl(null),
            Url: new FormControl(null),
            Enlem: new FormControl(null),
            Boylam: new FormControl(null),
        });
    }

    onSubmit() {
        this.data = new Object();
        this.data.Title = this.ekleForm.get("Title").value;
        this.data.Code = this.ekleForm.get("Code").value;
        this.data.Active = this.ekleForm.get("Active").value;

        this.service.postEkle(this.data)
            .subscribe((answer) => {
                if (answer.Mesaj == null) {
                    this.router.navigate(['/Admin/Emlak']);
                }
                else {
                    $(".alertMessage").text(answer.Mesaj);
                    $(".alert-error").fadeIn("slow");
                }
            },
                resError => this.errorMsg = resError);
    }
}