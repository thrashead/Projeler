import { Component, Output, EventEmitter, Input } from "@angular/core";
import { Router, ActivatedRoute, Params } from '@angular/router';
import { FormBuilder, FormGroup } from "@angular/forms";
import { SiteService } from '../../../services/site';

@Component({
    selector: 'emlak-propertysearch',
    templateUrl: './search.html'
})

export class PropertySearchComponent {
    errorMsg: string;

    @Output() searchFilter = new EventEmitter<any>();
    @Output() firstPage = new EventEmitter<any>();
    public reData: any;
    public link: string;
    public detail: string;

    searchForm: FormGroup;
    realCPList: any;
    kategoriList: any;
    sehirList: any;
    durumList: any;
    yakitList: any;
    isinmaList: any;

    @Input() lang: any;

    constructor(private service: SiteService, private router: Router, private formBuilder: FormBuilder, private route: ActivatedRoute) {
    }

    ngOnInit() {
        this.route.params.subscribe((params: Params) => {
            this.link = params['link'] == undefined ? "tumu" : params['link'];
            this.detail = params['detail'];
        });

        this.FormOlustur();

        this.ComboDoldur();

        $(".tdslider").each(function (i) {
            var slider = $(this);

            var min = parseInt(slider.attr("data-min"));
            var max = parseInt(slider.attr("data-max"));
            var step = parseInt(slider.attr("data-step"));

            if (slider.length) {
                slider.slider({
                    min: min,
                    max: max,
                    step: step,
                    values: [min, max],
                    range: true,
                    slide: function (event, ui) {
                        slider.find(".ui-slider-handle span.min").text(ui.values[0]);
                        slider.find(".ui-slider-handle span.max").text(ui.values[1]);
                        slider.parent().find("input.j-min").val(ui.values[0]);
                        slider.parent().find("input.j-max").val(ui.values[1]);
                    },
                    stop: function (event, ui) {
                        slider.find(".ui-slider-handle span.min").text(ui.values[0]);
                        slider.find(".ui-slider-handle span.max").text(ui.values[1]);
                        slider.parent().find("input.j-min").val(ui.values[0]);
                        slider.parent().find("input.j-max").val(ui.values[1]);
                    }
                });

                let leftCss = max > 99999 ? " style='left:-20px;'" : max > 999 ? " style='left:-10px;'" : "";

                if (slider.find("span.min").length <= 0)
                    slider.find(".ui-slider-handle:first-of-type").append("<span class='min'>" + min + "</span>");

                if (slider.find("span.max").length <= 0)
                    slider.find(".ui-slider-handle:last-of-type").append("<span class='max'" + leftCss + ">" + max + "</span>");
            }
        });
    }

    ComboDoldur() {
        this.service.get("Site", "Sehirler").subscribe((resData: any) => {
            this.sehirList = resData;

            this.service.get("Site", "Kategoriler", 0).subscribe((resData: any) => {
                this.kategoriList = resData;

                this.service.get("Site", "Durumlar").subscribe((resData: any) => {
                    this.durumList = resData;

                    this.service.get("Site", "YakitTipleri").subscribe((resData: any) => {
                        this.yakitList = resData;

                        this.service.get("Site", "IsinmaTipleri").subscribe((resData: any) => {
                            this.isinmaList = resData;
                        }, resError => this.errorMsg = resError);
                    }, resError => this.errorMsg = resError);
                }, resError => this.errorMsg = resError);
            }, resError => this.errorMsg = resError);
        }, resError => this.errorMsg = resError);
    }

    onClick() {
        this.realCPList = new Object();

        if ($("#rbSatilik").is(':checked')) {
            this.realCPList.Satilik = true;
        }
        else if ($("#rbKiralik").is(':checked')) {
            this.realCPList.Kiralik = true;
        }

        this.Doldur(this.realCPList);

        this.service.post("Site", "DetayliAramaSession", this.realCPList).subscribe((resData: any) => {
            if (resData == true) {
                if (!this.detail)
                    this.router.navigate(['/'], { skipLocationChange: true }).then(() => { this.router.navigate(['/Emlak/Listele', { detail: true }]) });

                this.reData = new Object();
                this.reData.OrderBy = "";
                this.reData.Word = this.link;
                this.reData.Page = 1;
                this.reData.Detail = this.detail;

                this.searchFilter.emit(resData);
                this.firstPage.emit($(".pagination ul li a").eq(0));
            }
        }, resError => this.errorMsg = resError);
    }

    Doldur(realCPList: any) {
        let kategori = parseInt(this.searchForm.get("kategori").value);
        let isinma = parseInt(this.searchForm.get("isinma").value);
        let yakit = parseInt(this.searchForm.get("yakit").value);
        let durum = parseInt(this.searchForm.get("durum").value);
        let sehir = parseInt(this.searchForm.get("sehir").value);

        realCPList.KatID = kategori == 0 ? null : kategori;
        realCPList.IsinmaTipi = isinma == 0 ? null : isinma;
        realCPList.YakitTipi = yakit == 0 ? null : yakit;
        realCPList.Durum = durum == 0 ? null : durum;
        realCPList.Sehir = sehir == 0 ? null : sehir;

        realCPList.AltKatID = 0;
        realCPList.Ilce = this.searchForm.get("ilce").value;
        realCPList.Semt = this.searchForm.get("semt").value;
        realCPList.Baslik = this.searchForm.get("baslik").value;
        realCPList.Fiyat = this.GetMin("fiyat1");
        realCPList.Fiyat2 = this.GetMax("fiyat2");
        realCPList.OdaSayisi = this.GetMin("roomCount1");
        realCPList.OdaSayisi2 = this.GetMax("roomCount2");
        realCPList.KatSayisi = this.GetMin("katSayi1");
        realCPList.KatSayisi2 = this.GetMax("katSayi2");
        realCPList.SalonSayisi = this.GetMin("salon1");
        realCPList.SalonSayisi2 = this.GetMax("salon2");
        realCPList.BulunduguKat = this.GetMin("bulunduguKat1");
        realCPList.BulunduguKat2 = this.GetMax("bulunduguKat2");
        realCPList.Alan = this.GetMin("alan1");
        realCPList.Alan2 = this.GetMax("alan2");
        realCPList.BinaYasi = this.GetMin("binaYas1");
        realCPList.BinaYasi2 = this.GetMax("binaYas2");

        realCPList.ArkaCephe = this.searchForm.get("arkaCephe").value;
        realCPList.OnCephe = this.searchForm.get("onCephe").value;
        realCPList.CaddeyeYakin = this.searchForm.get("caddeyeYakin").value;
        realCPList.DenizeSifir = this.searchForm.get("denizeSifir").value;
        realCPList.DenizeYakin = this.searchForm.get("denizeYakin").value;
        realCPList.Manzara = this.searchForm.get("manzarali").value;
        realCPList.Merkezde = this.searchForm.get("merkezde").value;
        realCPList.Metro = this.searchForm.get("metro").value;
        realCPList.Otoban = this.searchForm.get("otoban").value;
        realCPList.TopluUlasim = this.searchForm.get("topluUlasim").value;
        realCPList.Asansor = this.searchForm.get("asansor").value;
        realCPList.Bahce = this.searchForm.get("bahce").value;
        realCPList.Guvenlik = this.searchForm.get("guvenlik").value;
        realCPList.Hidrofor = this.searchForm.get("hidrofor").value;
        realCPList.Mantolama = this.searchForm.get("mantolama").value;
        realCPList.Jenerator = this.searchForm.get("jenerator").value;
        realCPList.Kapici = this.searchForm.get("kapici").value;
        realCPList.Otopark = this.searchForm.get("otopark").value;
        realCPList.OyunParki = this.searchForm.get("oyunParki").value;
        realCPList.PVCDograma = this.searchForm.get("pVCDograma").value;
        realCPList.SiteIci = this.searchForm.get("siteIci").value;
        realCPList.YanginMerdiveni = this.searchForm.get("yanginMerdiveni").value;
        realCPList.YuzmeHavuzu = this.searchForm.get("yuzmeHavuzu").value;
        realCPList.Alarm = this.searchForm.get("alarm").value;
        realCPList.Balkon = this.searchForm.get("balkon").value;
        realCPList.CelikKapi = this.searchForm.get("celikKapi").value;
        realCPList.GoruntuluDiafon = this.searchForm.get("goruntuluDiafon").value;
        realCPList.Jakuzi = this.searchForm.get("jakuzi").value;
        realCPList.KabloTVUydu = this.searchForm.get("kabloTVUydu").value;
        realCPList.Klima = this.searchForm.get("klima").value;

        realCPList.Alan = isNaN(realCPList.Alan) ? null : realCPList.Alan;
        realCPList.Alan2 = isNaN(realCPList.Alan2) ? null : realCPList.Alan2;
        realCPList.KatID = isNaN(realCPList.KatID) ? null : realCPList.KatID;
        realCPList.AltKatID = isNaN(realCPList.AltKatID) ? null : realCPList.AltKatID;
        realCPList.Sehir = isNaN(realCPList.Sehir) ? null : realCPList.Sehir;
        realCPList.BinaYasi = isNaN(realCPList.BinaYasi) ? null : realCPList.BinaYasi;
        realCPList.BinaYasi2 = isNaN(realCPList.BinaYasi2) ? null : realCPList.BinaYasi2;
        realCPList.BulunduguKat = isNaN(realCPList.BulunduguKat) ? null : realCPList.BulunduguKat;
        realCPList.BulunduguKat2 = isNaN(realCPList.BulunduguKat2) ? null : realCPList.BulunduguKat2;
        realCPList.Fiyat = isNaN(realCPList.Fiyat) ? null : realCPList.Fiyat;
        realCPList.Fiyat2 = isNaN(realCPList.Fiyat2) ? null : realCPList.Fiyat2;
        realCPList.KatSayisi = isNaN(realCPList.KatSayisi) ? null : realCPList.KatSayisi;
        realCPList.KatSayisi2 = isNaN(realCPList.KatSayisi2) ? null : realCPList.KatSayisi2;
        realCPList.OdaSayisi = isNaN(realCPList.OdaSayisi) ? null : realCPList.OdaSayisi;
        realCPList.OdaSayisi2 = isNaN(realCPList.OdaSayisi2) ? null : realCPList.OdaSayisi2;
        realCPList.SalonSayisi = isNaN(realCPList.SalonSayisi) ? null : realCPList.SalonSayisi;
        realCPList.SalonSayisi2 = isNaN(realCPList.SalonSayisi2) ? null : realCPList.SalonSayisi2;
        realCPList.Durum = isNaN(realCPList.Durum) ? null : realCPList.Durum;
        realCPList.YakitTipi = isNaN(realCPList.YakitTipi) ? null : realCPList.YakitTipi;
        realCPList.IsinmaTipi = isNaN(realCPList.IsinmaTipi) ? null : realCPList.IsinmaTipi;
        realCPList.Alarm = realCPList.Alarm == null ? false : realCPList.Alarm;
        realCPList.ArkaCephe = realCPList.ArkaCephe == null ? false : realCPList.ArkaCephe;
        realCPList.Asansor = realCPList.Asansor == null ? false : realCPList.Asansor;
        realCPList.Bahce = realCPList.Bahce == null ? false : realCPList.Bahce;
        realCPList.Balkon = realCPList.Balkon == null ? false : realCPList.Balkon;
        realCPList.CaddeyeYakin = realCPList.CaddeyeYakin == null ? false : realCPList.CaddeyeYakin;
        realCPList.CelikKapi = realCPList.CelikKapi == null ? false : realCPList.CelikKapi;
        realCPList.DenizeSifir = realCPList.DenizeSifir == null ? false : realCPList.DenizeSifir;
        realCPList.DenizeYakin = realCPList.DenizeYakin == null ? false : realCPList.DenizeYakin;
        realCPList.GoruntuluDiafon = realCPList.GoruntuluDiafon == null ? false : realCPList.GoruntuluDiafon;
        realCPList.Guvenlik = realCPList.Guvenlik == null ? false : realCPList.Guvenlik;
        realCPList.Hidrofor = realCPList.Hidrofor == null ? false : realCPList.Hidrofor;
        realCPList.Jakuzi = realCPList.Jakuzi == null ? false : realCPList.Jakuzi;
        realCPList.Jenerator = realCPList.Jenerator == null ? false : realCPList.Jenerator;
        realCPList.KabloTVUydu = realCPList.KabloTVUydu == null ? false : realCPList.KabloTVUydu;
        realCPList.Kapici = realCPList.Kapici == null ? false : realCPList.Kapici;
        realCPList.Klima = realCPList.Klima == null ? false : realCPList.Klima;
        realCPList.Mantolama = realCPList.Mantolama == null ? false : realCPList.Mantolama;
        realCPList.Manzara = realCPList.Manzara == null ? false : realCPList.Manzara;
        realCPList.Merkezde = realCPList.Merkezde == null ? false : realCPList.Merkezde;
        realCPList.Metro = realCPList.Metro == null ? false : realCPList.Metro;
        realCPList.OnCephe = realCPList.OnCephe == null ? false : realCPList.OnCephe;
        realCPList.Otoban = realCPList.Otoban == null ? false : realCPList.Otoban;
        realCPList.Otopark = realCPList.Otopark == null ? false : realCPList.Otopark;
        realCPList.OyunParki = realCPList.OyunParki == null ? false : realCPList.OyunParki;
        realCPList.PVCDograma = realCPList.PVCDograma == null ? false : realCPList.PVCDograma;
        realCPList.SiteIci = realCPList.SiteIci == null ? false : realCPList.SiteIci;
        realCPList.TopluUlasim = realCPList.TopluUlasim == null ? false : realCPList.TopluUlasim;
        realCPList.YanginMerdiveni = realCPList.YanginMerdiveni == null ? false : realCPList.YanginMerdiveni;
        realCPList.YuzmeHavuzu = realCPList.YuzmeHavuzu == null ? false : realCPList.YuzmeHavuzu;
    }

    //Form Oluştur
    FormOlustur() {
        this.searchForm = this.formBuilder.group({
            satilik: [null],
            kategori: [null],
            durum: [null],
            roomCount1: [null],
            roomCount2: [null],
            baslik: [null],
            salon1: [null],
            salon2: [null],
            sehir: [null],
            katSayi1: [null],
            katSayi2: [null],
            ilce: [null],
            bulunduguKat1: [null],
            bulunduguKat2: [null],
            semt: [null],
            alan1: [null],
            alan2: [null],
            fiyat1: [null],
            fiyat2: [null],
            yakit: [null],
            binaYas1: [null],
            binaYas2: [null],
            isinma: [null],
            caddeyeYakin: [null],
            merkezde: [null],
            asansor: [null],
            mantolama: [null],
            bahce: [null],
            otopark: [null],
            siteIci: [null],
            alarm: [null],
            goruntuluDiafon: [null],
            klima: [null],
            onCephe: [null],
            manzarali: [null],
            topluUlasim: [null],
            hidrofor: [null],
            metro: [null],
            jenerator: [null],
            pVCDograma: [null],
            yuzmeHavuzu: [null],
            celikKapi: [null],
            kabloTVUydu: [null],
            arkaCephe: [null],
            denizeYakin: [null],
            otoban: [null],
            guvenlik: [null],
            denizeSifir: [null],
            kapici: [null],
            oyunParki: [null],
            yanginMerdiveni: [null],
            balkon: [null],
            jakuzi: [null]
        });
    }

    GetMin(id: string) {
        let minPrice: number = parseInt($("#" + id).val().toString());
        minPrice = minPrice == 0 ? null : minPrice;

        return minPrice;
    }

    GetMax(id: string) {
        let maxPrice: number = parseInt($("#" + id).val().toString());
        maxPrice = maxPrice == 100000 ? null : maxPrice;

        return maxPrice;
    }
}