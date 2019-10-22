import { Component, AfterContentInit } from "@angular/core";
import { Router } from '@angular/router';
import { FormBuilder, FormGroup } from "@angular/forms";
import { EmlakAjaxService } from '../../../services/emlak.service';
import { REAjaxService } from '../../../services/re.service';

@Component({
    selector: 'emlak-search',
    templateUrl: './search.html',
    providers: [EmlakAjaxService, REAjaxService]
})

export class SearchComponent implements AfterContentInit {
    detailSearchForm: FormGroup;
    realCPList: any;

    constructor(private emlakService: EmlakAjaxService, private _reService: REAjaxService, private _router: Router, private _formBuilder: FormBuilder) {
    }

    ngOnInit() {
        this.FormOlustur();

        this._reService.getSehirler()
            .subscribe((resData: any) => {
                for (var i = 0; i < resData.length; i++) {
                    $("#drpSehir").append("<option value=\"" + resData[i].Sehir + "\">" + resData[i].Sehir + "</option>");
                }
            },
                resError => this.errorMsg = resError);

        this._reService.getKategoriler("0")
            .subscribe((resData: any) => {
                $("#drpAltKategori").append("<option value=\"0\">Tümü</option>");

                for (var i = 0; i < resData.length; i++) {
                    $("#drpKategori").append("<option value=\"" + resData[i].ID + "\">" + resData[i].CategoryName + "</option>");
                }
            },
                resError => this.errorMsg = resError);

        this.KodlaGetir();
    }

    ngAfterContentInit() {
        setTimeout(function () {
            $("#drpDurum").val($("#drpDurum option:first").val());
            $("#drpIsinma").val($("#drpIsinma option:first").val());
            $("#drpYakit").val($("#drpYakit option:first").val());
        }, 500);
    }

    onSubmit() {
        this.realCPList = new Object();

        if ($("#rbSatilik").is(':checked')) {
            this.realCPList.Satilik = true;
        }
        else if ($("#rbKiralik").is(':checked')) {
            this.realCPList.Kiralik = true;
        }

        this.Doldur(this.realCPList);

        this._reService.getEmlakDetayliArama(this.realCPList)
            .subscribe((resData: any) => {
                if (resData == true) {
                    this._router.navigate(['/Emlak/Listele', { detail: true }]);
                }
            },
                resError => this.errorMsg = resError);
    }

    Doldur(realCPList: any) {
        realCPList.KatID = parseInt(this.detailSearchForm.get("kategori").value);
        realCPList.AltKatID = 0;
        realCPList.Baslik = this.detailSearchForm.get("baslik").value;
        realCPList.Fiyat = this.GetMin("fiyat1");
        realCPList.Fiyat2 = this.GetMax("fiyat1");
        realCPList.OdaSayisi = this.GetMin("roomCount1");
        realCPList.OdaSayisi2 = this.GetMax("roomCount1");
        realCPList.KatSayisi = this.GetMin("katSayi1");
        realCPList.KatSayisi2 = this.GetMax("katSayi1");
        realCPList.SalonSayisi = this.GetMin("salon1");
        realCPList.SalonSayisi2 = this.GetMax("salon1");
        realCPList.BulunduguKat = this.GetMin("bulunduguKat1");
        realCPList.BulunduguKat2 = this.GetMax("bulunduguKat1");
        realCPList.Alan = this.GetMin("alan1");
        realCPList.Alan2 = this.GetMax("alan1");
        realCPList.BinaYasi = this.GetMin("binaYas1");
        realCPList.BinaYasi2 = this.GetMax("binaYas1");
        realCPList.Sehir = this.detailSearchForm.get("sehir").value;
        realCPList.Ilce = this.detailSearchForm.get("ilce").value;
        realCPList.Semt = this.detailSearchForm.get("semt").value;
        realCPList.IsinmaTipi = this.detailSearchForm.get("isinma").value;
        realCPList.YakitTipi = this.detailSearchForm.get("yakit").value;
        realCPList.Durum = this.detailSearchForm.get("durum").value;

        realCPList.ArkaCephe = this.IsChecked("arkaCephe");
        realCPList.OnCephe = this.IsChecked("onCephe");
        realCPList.CaddeyeYakin = this.IsChecked("caddeyeYakin");
        realCPList.DenizeSifir = this.IsChecked("denizeSifir");
        realCPList.DenizeYakin = this.IsChecked("denizeYakin");
        realCPList.Manzara = this.IsChecked("manzarali");
        realCPList.Merkezde = this.IsChecked("merkezde");
        realCPList.Metro = this.IsChecked("metro");
        realCPList.Otoban = this.IsChecked("otoban");
        realCPList.TopluUlasim = this.IsChecked("topluUlasim");
        realCPList.Asansor = this.IsChecked("asansor");
        realCPList.Bahce = this.IsChecked("bahce");
        realCPList.Guvenlik = this.IsChecked("guvenlik");
        realCPList.Hidrofor = this.IsChecked("hidrofor");
        realCPList.Mantolama = this.IsChecked("mantolama");
        realCPList.Jenerator = this.IsChecked("jenerator");
        realCPList.Kapici = this.IsChecked("kapici");
        realCPList.Otopark = this.IsChecked("otopark");
        realCPList.OyunParki = this.IsChecked("oyunParki");
        realCPList.PVCDograma = this.IsChecked("pVCDograma");
        realCPList.SiteIci = this.IsChecked("siteIci");
        realCPList.YanginMerdiveni = this.IsChecked("yanginMerdiveni");
        realCPList.YuzmeHavuzu = this.IsChecked("yuzmeHavuzu");
        realCPList.Alarm = this.IsChecked("alarm");
        realCPList.Balkon = this.IsChecked("balkon");
        realCPList.CelikKapi = this.IsChecked("celikKapi");
        realCPList.GoruntuluDiafon = this.IsChecked("goruntuluDiafon");
        realCPList.Jakuzi = this.IsChecked("jakuzi");
        realCPList.KabloTVUydu = this.IsChecked("kabloTVUydu");
        realCPList.Klima = this.IsChecked("klima");

        realCPList.Alan = isNaN(realCPList.Alan) ? null : realCPList.Alan;
        realCPList.Alan2 = isNaN(realCPList.Alan2) ? null : realCPList.Alan2;
        realCPList.AltKatID = isNaN(realCPList.AltKatID) ? 0 : realCPList.AltKatID;
        realCPList.Baslik = realCPList.Baslik == null ? "" : realCPList.Baslik;
        realCPList.BinaYasi = isNaN(realCPList.BinaYasi) ? null : realCPList.BinaYasi;
        realCPList.BinaYasi2 = isNaN(realCPList.BinaYasi2) ? null : realCPList.BinaYasi2;
        realCPList.BulunduguKat = isNaN(realCPList.BulunduguKat) ? null : realCPList.BulunduguKat;
        realCPList.BulunduguKat2 = isNaN(realCPList.BulunduguKat2) ? null : realCPList.BulunduguKat2;
        realCPList.Durum = realCPList.Durum == null ? "Tümü" : realCPList.Durum;
        realCPList.Fiyat = isNaN(realCPList.Fiyat) ? null : realCPList.Fiyat;
        realCPList.Fiyat2 = isNaN(realCPList.Fiyat2) ? null : realCPList.Fiyat2;
        realCPList.Ilce = realCPList.Ilce == null ? "" : realCPList.Ilce;
        realCPList.IsinmaTipi = realCPList.IsinmaTipi == null ? "Farketmez" : realCPList.IsinmaTipi;
        realCPList.KatID = isNaN(realCPList.KatID) ? 0 : realCPList.KatID;
        realCPList.KatSayisi = isNaN(realCPList.KatSayisi) ? null : realCPList.KatSayisi;
        realCPList.KatSayisi2 = isNaN(realCPList.KatSayisi2) ? null : realCPList.KatSayisi2;
        realCPList.OdaSayisi = isNaN(realCPList.OdaSayisi) ? null : realCPList.OdaSayisi;
        realCPList.OdaSayisi2 = isNaN(realCPList.OdaSayisi2) ? null : realCPList.OdaSayisi2;
        realCPList.SalonSayisi = isNaN(realCPList.SalonSayisi) ? null : realCPList.SalonSayisi;
        realCPList.SalonSayisi2 = isNaN(realCPList.SalonSayisi2) ? null : realCPList.SalonSayisi2;
        realCPList.Sehir = realCPList.Sehir == null ? "Tümü" : realCPList.Sehir;
        realCPList.Semt = realCPList.Semt == null ? "" : realCPList.Semt;
        realCPList.YakitTipi = realCPList.YakitTipi == null ? "Farketmez" : realCPList.YakitTipi;
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
        this.detailSearchForm = this._formBuilder.group({
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
        return parseInt($("#" + id).prev(".tooltip").children(".tooltip-inner").text().split(':')[0].trim());
    }

    GetMax(id: string) {
        return parseInt($("#" + id).prev(".tooltip").children(".tooltip-inner").text().split(':')[1].trim());
    }

    IsChecked(id: string) {
        return $("#" + id).parent().hasClass("checked");
    }

    //KodlaGetir
    errorMsg: string;

    dstcText: string;
    sctmText: string;
    scfsText: string;
    scfrText: string;
    ctgyText: string;
    sctgText: string;
    sallText: string;
    sclrText: string;
    susdText: string;
    sdmgText: string;
    arlkText: string;
    ttleText: string;
    cityText: string;
    ilceText: string;
    semtText: string;
    prcdText: string;
    fallText: string;
    fdgzText: string;
    fwocText: string;
    flifText: string;
    felcText: string;
    fothText: string;
    wallText: string;
    wsunText: string;
    wkatText: string;
    wairText: string;
    wcomText: string;
    wcenText: string;
    wstoText: string;
    wothText: string;
    dsbtText: string;
    fiyatText: string;
    odasayisiText: string;
    salonSayisiText: string;
    alanText: string;
    katSayisiText: string;
    bulunduguKatText: string;
    durumText: string;
    isinmaTipiText: string;
    yakitTipiText: string;
    binaYasiText: string;
    arkaCepheText: string;
    otobanText: string;
    guvenlikText: string;
    denizeYakinText: string;
    denizeSifirText: string;
    kapiciText: string;
    oyunParkiText: string;
    yanginMerdiveniText: string;
    balkonText: string;
    jakuziText: string;
    onCepheText: string;
    manzaraText: string;
    topluUlasimText: string;
    hidroforText: string;
    metroText: string;
    jeneratorText: string;
    pVCDogramaText: string;
    yuzmeHavuzuText: string;
    celikKapiText: string;
    kabloTVUyduText: string;
    caddeyeYakinText: string;
    merkezdeText: string;
    asansorText: string;
    mantolamaText: string;
    bahceText: string;
    otoparkText: string;
    siteIciText: string;
    alarmText: string;
    goruntuluDiafon: string;
    klimaText: string;

    KodlaGetir() {
        this.emlakService.getKodlaGetir("dstc")
            .subscribe(resData => this.dstcText = resData,
                resError => this.errorMsg = resError);

        this.emlakService.getKodlaGetir("sctm")
            .subscribe(resData => this.sctmText = resData,
                resError => this.errorMsg = resError);

        this.emlakService.getKodlaGetir("scfs")
            .subscribe(resData => this.scfsText = resData,
                resError => this.errorMsg = resError);

        this.emlakService.getKodlaGetir("scfr")
            .subscribe(resData => this.scfrText = resData,
                resError => this.errorMsg = resError);

        this.emlakService.getKodlaGetir("ctgy")
            .subscribe(resData => this.ctgyText = resData,
                resError => this.errorMsg = resError);

        this.emlakService.getKodlaGetir("sctg")
            .subscribe(resData => this.sctgText = resData,
                resError => this.errorMsg = resError);

        this.emlakService.getKodlaGetir("sall")
            .subscribe(resData => this.sallText = resData,
                resError => this.errorMsg = resError);

        this.emlakService.getKodlaGetir("sclr")
            .subscribe(resData => this.sclrText = resData,
                resError => this.errorMsg = resError);

        this.emlakService.getKodlaGetir("susd")
            .subscribe(resData => this.susdText = resData,
                resError => this.errorMsg = resError);

        this.emlakService.getKodlaGetir("sdmg")
            .subscribe(resData => this.sdmgText = resData,
                resError => this.errorMsg = resError);

        this.emlakService.getKodlaGetir("arlk")
            .subscribe(resData => this.arlkText = resData,
                resError => this.errorMsg = resError);

        this.emlakService.getKodlaGetir("ttle")
            .subscribe(resData => this.ttleText = resData,
                resError => this.errorMsg = resError);

        this.emlakService.getKodlaGetir("city")
            .subscribe(resData => this.cityText = resData,
                resError => this.errorMsg = resError);

        this.emlakService.getKodlaGetir("ilce")
            .subscribe(resData => this.ilceText = resData,
                resError => this.errorMsg = resError);

        this.emlakService.getKodlaGetir("semt")
            .subscribe(resData => this.semtText = resData,
                resError => this.errorMsg = resError);

        this.emlakService.getKodlaGetir("prcd")
            .subscribe(resData => this.prcdText = resData,
                resError => this.errorMsg = resError);

        this.emlakService.getKodlaGetir("fall")
            .subscribe(resData => this.fallText = resData,
                resError => this.errorMsg = resError);

        this.emlakService.getKodlaGetir("fdgz")
            .subscribe(resData => this.fdgzText = resData,
                resError => this.errorMsg = resError);

        this.emlakService.getKodlaGetir("fwoc")
            .subscribe(resData => this.fwocText = resData,
                resError => this.errorMsg = resError);

        this.emlakService.getKodlaGetir("flif")
            .subscribe(resData => this.flifText = resData,
                resError => this.errorMsg = resError);

        this.emlakService.getKodlaGetir("felc")
            .subscribe(resData => this.felcText = resData,
                resError => this.errorMsg = resError);

        this.emlakService.getKodlaGetir("foth")
            .subscribe(resData => this.fothText = resData,
                resError => this.errorMsg = resError);

        this.emlakService.getKodlaGetir("wall")
            .subscribe(resData => this.wallText = resData,
                resError => this.errorMsg = resError);

        this.emlakService.getKodlaGetir("wsun")
            .subscribe(resData => this.wsunText = resData,
                resError => this.errorMsg = resError);

        this.emlakService.getKodlaGetir("wkat")
            .subscribe(resData => this.wkatText = resData,
                resError => this.errorMsg = resError);

        this.emlakService.getKodlaGetir("wair")
            .subscribe(resData => this.wairText = resData,
                resError => this.errorMsg = resError);

        this.emlakService.getKodlaGetir("wcom")
            .subscribe(resData => this.wcomText = resData,
                resError => this.errorMsg = resError);

        this.emlakService.getKodlaGetir("wcen")
            .subscribe(resData => this.wcenText = resData,
                resError => this.errorMsg = resError);

        this.emlakService.getKodlaGetir("wsto")
            .subscribe(resData => this.wstoText = resData,
                resError => this.errorMsg = resError);

        this.emlakService.getKodlaGetir("woth")
            .subscribe(resData => this.wothText = resData,
                resError => this.errorMsg = resError);

        this.emlakService.getKodlaGetir("dsbt")
            .subscribe(resData => this.dsbtText = resData,
                resError => this.errorMsg = resError);

        this.emlakService.getKodlaGetir("bage")
            .subscribe(resData => this.binaYasiText = resData,
                resError => this.errorMsg = resError);

        this.emlakService.getKodlaGetir("wtyp")
            .subscribe(resData => this.isinmaTipiText = resData,
                resError => this.errorMsg = resError);

        this.emlakService.getKodlaGetir("drmc")
            .subscribe(resData => this.salonSayisiText = resData,
                resError => this.errorMsg = resError);

        this.emlakService.getKodlaGetir("ftyp")
            .subscribe(resData => this.yakitTipiText = resData,
                resError => this.errorMsg = resError);

        this.emlakService.getKodlaGetir("pric")
            .subscribe(resData => this.fiyatText = resData,
                resError => this.errorMsg = resError);

        this.emlakService.getKodlaGetir("area")
            .subscribe(resData => this.alanText = resData,
                resError => this.errorMsg = resError);

        this.emlakService.getKodlaGetir("flrn")
            .subscribe(resData => this.bulunduguKatText = resData,
                resError => this.errorMsg = resError);

        this.emlakService.getKodlaGetir("flrc")
            .subscribe(resData => this.katSayisiText = resData,
                resError => this.errorMsg = resError);

        this.emlakService.getKodlaGetir("romc")
            .subscribe(resData => this.odasayisiText = resData,
                resError => this.errorMsg = resError);

        this.emlakService.getKodlaGetir("stts")
            .subscribe(resData => this.durumText = resData,
                resError => this.errorMsg = resError);

        this.emlakService.getKodlaGetir("arkc")
            .subscribe(resData => this.arkaCepheText = resData,
                resError => this.errorMsg = resError);

        this.emlakService.getKodlaGetir("otoy")
            .subscribe(resData => this.otobanText = resData,
                resError => this.errorMsg = resError);

        this.emlakService.getKodlaGetir("guve")
            .subscribe(resData => this.guvenlikText = resData,
                resError => this.errorMsg = resError);

        this.emlakService.getKodlaGetir("deny")
            .subscribe(resData => this.denizeYakinText = resData,
                resError => this.errorMsg = resError);

        this.emlakService.getKodlaGetir("dens")
            .subscribe(resData => this.denizeSifirText = resData,
                resError => this.errorMsg = resError);

        this.emlakService.getKodlaGetir("kapi")
            .subscribe(resData => this.kapiciText = resData,
                resError => this.errorMsg = resError);

        this.emlakService.getKodlaGetir("oyup")
            .subscribe(resData => this.oyunParkiText = resData,
                resError => this.errorMsg = resError);

        this.emlakService.getKodlaGetir("yanm")
            .subscribe(resData => this.yanginMerdiveniText = resData,
                resError => this.errorMsg = resError);

        this.emlakService.getKodlaGetir("balk")
            .subscribe(resData => this.balkonText = resData,
                resError => this.errorMsg = resError);

        this.emlakService.getKodlaGetir("jaku")
            .subscribe(resData => this.jakuziText = resData,
                resError => this.errorMsg = resError);

        this.emlakService.getKodlaGetir("once")
            .subscribe(resData => this.onCepheText = resData,
                resError => this.errorMsg = resError);

        this.emlakService.getKodlaGetir("manz")
            .subscribe(resData => this.manzaraText = resData,
                resError => this.errorMsg = resError);

        this.emlakService.getKodlaGetir("touy")
            .subscribe(resData => this.topluUlasimText = resData,
                resError => this.errorMsg = resError);

        this.emlakService.getKodlaGetir("hidr")
            .subscribe(resData => this.hidroforText = resData,
                resError => this.errorMsg = resError);

        this.emlakService.getKodlaGetir("metr")
            .subscribe(resData => this.metroText = resData,
                resError => this.errorMsg = resError);

        this.emlakService.getKodlaGetir("jene")
            .subscribe(resData => this.jeneratorText = resData,
                resError => this.errorMsg = resError);

        this.emlakService.getKodlaGetir("pvcd")
            .subscribe(resData => this.pVCDogramaText = resData,
                resError => this.errorMsg = resError);

        this.emlakService.getKodlaGetir("yuzh")
            .subscribe(resData => this.yuzmeHavuzuText = resData,
                resError => this.errorMsg = resError);

        this.emlakService.getKodlaGetir("celk")
            .subscribe(resData => this.celikKapiText = resData,
                resError => this.errorMsg = resError);

        this.emlakService.getKodlaGetir("katu")
            .subscribe(resData => this.kabloTVUyduText = resData,
                resError => this.errorMsg = resError);

        this.emlakService.getKodlaGetir("cady")
            .subscribe(resData => this.caddeyeYakinText = resData,
                resError => this.errorMsg = resError);

        this.emlakService.getKodlaGetir("merk")
            .subscribe(resData => this.merkezdeText = resData,
                resError => this.errorMsg = resError);

        this.emlakService.getKodlaGetir("asan")
            .subscribe(resData => this.asansorText = resData,
                resError => this.errorMsg = resError);

        this.emlakService.getKodlaGetir("mant")
            .subscribe(resData => this.mantolamaText = resData,
                resError => this.errorMsg = resError);

        this.emlakService.getKodlaGetir("bahc")
            .subscribe(resData => this.bahceText = resData,
                resError => this.errorMsg = resError);

        this.emlakService.getKodlaGetir("otop")
            .subscribe(resData => this.otoparkText = resData,
                resError => this.errorMsg = resError);

        this.emlakService.getKodlaGetir("siti")
            .subscribe(resData => this.siteIciText = resData,
                resError => this.errorMsg = resError);

        this.emlakService.getKodlaGetir("alar")
            .subscribe(resData => this.alarmText = resData,
                resError => this.errorMsg = resError);

        this.emlakService.getKodlaGetir("gord")
            .subscribe(resData => this.goruntuluDiafon = resData,
                resError => this.errorMsg = resError);

        this.emlakService.getKodlaGetir("klim")
            .subscribe(resData => this.klimaText = resData,
                resError => this.errorMsg = resError);
    }
}