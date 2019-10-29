import { Component } from "@angular/core";
import { ModelService } from "../../../services/model";
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators, FormControl } from "@angular/forms";

@Component({
    templateUrl: './insert.html'
})

export class AdminRealEstatesInsertComponent {
    errorMsg: string;

    ekleForm: FormGroup;
    data: any;

    model: any;

    constructor(private service: ModelService, private router: Router, private formBuilder: FormBuilder) {
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
        this.data.Baslik = this.ekleForm.get("Baslik").value;
        this.data.Code = this.ekleForm.get("Code").value;
        this.data.Fiyat = this.ekleForm.get("Fiyat").value;
        this.data.Yeni = this.ekleForm.get("Yeni").value;
        this.data.GununEmlagi = this.ekleForm.get("GununEmlagi").value;
        this.data.Sehir = this.ekleForm.get("Sehir").value;
        this.data.Ilce = this.ekleForm.get("Ilce").value;
        this.data.Semt = this.ekleForm.get("Semt").value;
        this.data.Sahibi = this.ekleForm.get("Sahibi").value;
        this.data.OdaSayisi = this.ekleForm.get("OdaSayisi").value;
        this.data.KatSayisi = this.ekleForm.get("KatSayisi").value;
        this.data.IsinmaTipi = this.ekleForm.get("IsinmaTipi").value;
        this.data.SalonSayisi = this.ekleForm.get("SalonSayisi").value;
        this.data.BulunduguKat = this.ekleForm.get("BulunduguKat").value;
        this.data.YakitTipi = this.ekleForm.get("YakitTipi").value;
        this.data.Alan = this.ekleForm.get("Alan").value;
        this.data.Durum = this.ekleForm.get("Durum").value;
        this.data.BinaYasi = this.ekleForm.get("BinaYasi").value;
        this.data.ArkaCephe = this.ekleForm.get("ArkaCephe").value;
        this.data.OnCephe = this.ekleForm.get("OnCephe").value;
        this.data.CaddeyeYakin = this.ekleForm.get("CaddeyeYakin").value;
        this.data.DenizeSifir = this.ekleForm.get("DenizeSifir").value;
        this.data.DenizeYakin = this.ekleForm.get("DenizeYakin").value;
        this.data.Manzara = this.ekleForm.get("Manzara").value;
        this.data.Merkezde = this.ekleForm.get("Merkezde").value;
        this.data.Metro = this.ekleForm.get("Metro").value;
        this.data.Otoban = this.ekleForm.get("Otoban").value;
        this.data.TopluUlasim = this.ekleForm.get("TopluUlasim").value;
        this.data.Asansor = this.ekleForm.get("Asansor").value;
        this.data.Bahce = this.ekleForm.get("Bahce").value;
        this.data.Guvenlik = this.ekleForm.get("Guvenlik").value;
        this.data.Hidrofor = this.ekleForm.get("Hidrofor").value;
        this.data.Mantolama = this.ekleForm.get("Mantolama").value;
        this.data.Jenerator = this.ekleForm.get("Jenerator").value;
        this.data.Kapici = this.ekleForm.get("Kapici").value;
        this.data.Satilik = this.ekleForm.get("Satilik").value;
        this.data.Otopark = this.ekleForm.get("Otopark").value;
        this.data.OyunParki = this.ekleForm.get("OyunParki").value;
        this.data.PVCDograma = this.ekleForm.get("PVCDograma").value;
        this.data.SiteIci = this.ekleForm.get("SiteIci").value;
        this.data.YanginMerdiveni = this.ekleForm.get("YanginMerdiveni").value;
        this.data.YuzmeHavuzu = this.ekleForm.get("YuzmeHavuzu").value;
        this.data.Alarm = this.ekleForm.get("Alarm").value;
        this.data.Balkon = this.ekleForm.get("Balkon").value;
        this.data.CelikKapi = this.ekleForm.get("CelikKapi").value;
        this.data.GoruntuluDiafon = this.ekleForm.get("GoruntuluDiafon").value;
        this.data.Jakuzi = this.ekleForm.get("Jakuzi").value;
        this.data.KabloTVUydu = this.ekleForm.get("KabloTVUydu").value;
        this.data.Klima = this.ekleForm.get("Klima").value;
        this.data.Active = this.ekleForm.get("Active").value;
        this.data.Url = this.ekleForm.get("Url").value;
        this.data.Enlem = this.ekleForm.get("Enlem").value;
        this.data.Boylam = this.ekleForm.get("Boylam").value;

        this.service.post("RealEstates", "Insert", this.data)
            .subscribe((answer: any) => {
                if (answer.Mesaj == null) {
                    this.router.navigate(['/Admin/RealEstates']);
                }
                else {
                    $(".alertMessage").text(answer.Mesaj);
                    $(".alert-error").fadeIn("slow");
                }
            },
                resError => this.errorMsg = resError);
    }
}