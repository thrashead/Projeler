import { Component } from "@angular/core";
import { ModelService } from "../../../services/model";
import { SharedService } from '../../../services/shared';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators, FormControl } from "@angular/forms";
declare var DataTable;

@Component({
    templateUrl: './update.html'
})

export class AdminRealEstatesUpdateComponent {
    errorMsg: string;
    id: string;

    duzenleForm: FormGroup;
    data: any;

    model: any;

    insertShow: boolean;
    updateShow: boolean;
    deleteShow: boolean;
    removeShow: boolean;

    callTable: boolean;

    constructor(private service: ModelService, private sharedService: SharedService, private route: ActivatedRoute, private router: Router, private formBuilder: FormBuilder) {
    }

    ngOnInit() {
        this.callTable = true;
        this.UserRightsControl($("#hdnModel").val());

        this.duzenleForm = this.formBuilder.group({
            ID: new FormControl(null, [Validators.required, Validators.min(1)]),
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
        this.data.ID = this.duzenleForm.get("ID").value;
        this.data.Baslik = this.duzenleForm.get("Baslik").value;
        this.data.Code = this.duzenleForm.get("Code").value;
        this.data.Fiyat = this.duzenleForm.get("Fiyat").value;
        this.data.Yeni = this.duzenleForm.get("Yeni").value;
        this.data.GununEmlagi = this.duzenleForm.get("GununEmlagi").value;
        this.data.Sehir = this.duzenleForm.get("Sehir").value;
        this.data.Ilce = this.duzenleForm.get("Ilce").value;
        this.data.Semt = this.duzenleForm.get("Semt").value;
        this.data.Sahibi = this.duzenleForm.get("Sahibi").value;
        this.data.OdaSayisi = this.duzenleForm.get("OdaSayisi").value;
        this.data.KatSayisi = this.duzenleForm.get("KatSayisi").value;
        this.data.IsinmaTipi = this.duzenleForm.get("IsinmaTipi").value;
        this.data.SalonSayisi = this.duzenleForm.get("SalonSayisi").value;
        this.data.BulunduguKat = this.duzenleForm.get("BulunduguKat").value;
        this.data.YakitTipi = this.duzenleForm.get("YakitTipi").value;
        this.data.Alan = this.duzenleForm.get("Alan").value;
        this.data.Durum = this.duzenleForm.get("Durum").value;
        this.data.BinaYasi = this.duzenleForm.get("BinaYasi").value;
        this.data.ArkaCephe = this.duzenleForm.get("ArkaCephe").value;
        this.data.OnCephe = this.duzenleForm.get("OnCephe").value;
        this.data.CaddeyeYakin = this.duzenleForm.get("CaddeyeYakin").value;
        this.data.DenizeSifir = this.duzenleForm.get("DenizeSifir").value;
        this.data.DenizeYakin = this.duzenleForm.get("DenizeYakin").value;
        this.data.Manzara = this.duzenleForm.get("Manzara").value;
        this.data.Merkezde = this.duzenleForm.get("Merkezde").value;
        this.data.Metro = this.duzenleForm.get("Metro").value;
        this.data.Otoban = this.duzenleForm.get("Otoban").value;
        this.data.TopluUlasim = this.duzenleForm.get("TopluUlasim").value;
        this.data.Asansor = this.duzenleForm.get("Asansor").value;
        this.data.Bahce = this.duzenleForm.get("Bahce").value;
        this.data.Guvenlik = this.duzenleForm.get("Guvenlik").value;
        this.data.Hidrofor = this.duzenleForm.get("Hidrofor").value;
        this.data.Mantolama = this.duzenleForm.get("Mantolama").value;
        this.data.Jenerator = this.duzenleForm.get("Jenerator").value;
        this.data.Kapici = this.duzenleForm.get("Kapici").value;
        this.data.Satilik = this.duzenleForm.get("Satilik").value;
        this.data.Otopark = this.duzenleForm.get("Otopark").value;
        this.data.OyunParki = this.duzenleForm.get("OyunParki").value;
        this.data.PVCDograma = this.duzenleForm.get("PVCDograma").value;
        this.data.SiteIci = this.duzenleForm.get("SiteIci").value;
        this.data.YanginMerdiveni = this.duzenleForm.get("YanginMerdiveni").value;
        this.data.YuzmeHavuzu = this.duzenleForm.get("YuzmeHavuzu").value;
        this.data.Alarm = this.duzenleForm.get("Alarm").value;
        this.data.Balkon = this.duzenleForm.get("Balkon").value;
        this.data.CelikKapi = this.duzenleForm.get("CelikKapi").value;
        this.data.GoruntuluDiafon = this.duzenleForm.get("GoruntuluDiafon").value;
        this.data.Jakuzi = this.duzenleForm.get("Jakuzi").value;
        this.data.KabloTVUydu = this.duzenleForm.get("KabloTVUydu").value;
        this.data.Klima = this.duzenleForm.get("Klima").value;
        this.data.Active = this.duzenleForm.get("Active").value;
        this.data.Url = this.duzenleForm.get("Url").value;
        this.data.Enlem = this.duzenleForm.get("Enlem").value;
        this.data.Boylam = this.duzenleForm.get("Boylam").value;

        this.service.post("RealEstates", "Update", this.data)
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

    UserRightsControl(Model: any) {
        this.sharedService.getHasRight(Model, "i").subscribe((iRight: boolean) => {
            this.insertShow = iRight;
            this.sharedService.getHasRight(Model, "u").subscribe((uRight: boolean) => {
                this.updateShow = uRight;
                this.sharedService.getHasRight(Model, "d").subscribe((dRight: boolean) => {
                    this.deleteShow = dRight;
                    this.sharedService.getHasRight(Model, "r").subscribe((rmvRight: boolean) => {
                        this.removeShow = rmvRight;

                        if (this.callTable == true) {
                            this.route.params.subscribe((params: Params) => {
                                this.id = params['id'];
                                this.service.get("RealEstates", "Update", this.id).subscribe((resData: any) => {
                                    this.model = resData;
                                    this.callTable = false;

                                    DataTable();

                                    $(document).off("click", ".fg-button").on("click", ".fg-button", () => {
                                        setTimeout(() => {
                                            this.UserRightsControl($("#hdnModel").val());
                                        }, 1);
                                    });
                                }, resError => this.errorMsg = resError);
                            });
                        }

                        setTimeout(() => {
                            if ($(".dropdown-menu").first().find("a").length <= 0) {
                                $(".btn-group").remove();
                            }
                        }, 1);

                    }, resError => this.errorMsg = resError);
                }, resError => this.errorMsg = resError);
            }, resError => this.errorMsg = resError);
        }, resError => this.errorMsg = resError);
    }
}