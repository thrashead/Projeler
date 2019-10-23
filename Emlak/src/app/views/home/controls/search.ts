import { Component, AfterContentInit } from "@angular/core";
import { Router } from '@angular/router';
import { FormBuilder, FormGroup } from "@angular/forms";
import { EmlakAjaxService } from '../../../services/emlakajax';
import { REAjaxService } from '../../../services/reajax';
import { LangItem } from '../../../model/LangItem';
import { Lib } from '../../../lib/methods';

@Component({
    selector: 'emlak-search',
    templateUrl: './search.html'
})

export class SearchComponent implements AfterContentInit {
    errorMsg: string;

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
    langItems: Array<LangItem>;
    langItem: LangItem;

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
        this.PushLangItems();

        this.emlakService.postLangItems(this.langItems).subscribe((resData: any) => {
            resData.forEach((item, i) => {
                switch (item.Code) {
                    case "dstc": this.dstcText = item.Value; break;
                    case "sctm": this.sctmText = item.Value; break;
                    case "scfs": this.scfsText = item.Value; break;
                    case "scfr": this.scfrText = item.Value; break;
                    case "ctgy": this.ctgyText = item.Value; break;
                    case "sctg": this.sctgText = item.Value; break;
                    case "sall": this.sallText = item.Value; break;
                    case "sclr": this.sclrText = item.Value; break;
                    case "susd": this.susdText = item.Value; break;
                    case "sdmg": this.sdmgText = item.Value; break;
                    case "arlk": this.arlkText = item.Value; break;
                    case "ttle": this.ttleText = item.Value; break;
                    case "city": this.cityText = item.Value; break;
                    case "ilce": this.ilceText = item.Value; break;
                    case "semt": this.semtText = item.Value; break;
                    case "prcd": this.prcdText = item.Value; break;
                    case "fall": this.fallText = item.Value; break;
                    case "fdgz": this.fdgzText = item.Value; break;
                    case "fwoc": this.fwocText = item.Value; break;
                    case "flif": this.flifText = item.Value; break;
                    case "felc": this.felcText = item.Value; break;
                    case "foth": this.fothText = item.Value; break;
                    case "wall": this.wallText = item.Value; break;
                    case "wsun": this.wsunText = item.Value; break;
                    case "wkat": this.wkatText = item.Value; break;
                    case "wair": this.wairText = item.Value; break;
                    case "wcom": this.wcomText = item.Value; break;
                    case "wcen": this.wcenText = item.Value; break;
                    case "wsto": this.wstoText = item.Value; break;
                    case "woth": this.wothText = item.Value; break;
                    case "dsbt": this.dsbtText = item.Value; break;
                    case "bage": this.binaYasiText = item.Value; break;
                    case "wtyp": this.isinmaTipiText = item.Value; break;
                    case "drmc": this.salonSayisiText = item.Value; break;
                    case "ftyp": this.yakitTipiText = item.Value; break;
                    case "pric": this.fiyatText = item.Value; break;
                    case "area": this.alanText = item.Value; break;
                    case "flrn": this.bulunduguKatText = item.Value; break;
                    case "flrc": this.katSayisiText = item.Value; break;
                    case "romc": this.odasayisiText = item.Value; break;
                    case "stts": this.durumText = item.Value; break;
                    case "arkc": this.arkaCepheText = item.Value; break;
                    case "otoy": this.otobanText = item.Value; break;
                    case "guve": this.guvenlikText = item.Value; break;
                    case "deny": this.denizeYakinText = item.Value; break;
                    case "dens": this.denizeSifirText = item.Value; break;
                    case "kapi": this.kapiciText = item.Value; break;
                    case "oyup": this.oyunParkiText = item.Value; break;
                    case "yanm": this.yanginMerdiveniText = item.Value; break;
                    case "balk": this.balkonText = item.Value; break;
                    case "jaku": this.jakuziText = item.Value; break;
                    case "once": this.onCepheText = item.Value; break;
                    case "manz": this.manzaraText = item.Value; break;
                    case "touy": this.topluUlasimText = item.Value; break;
                    case "hidr": this.hidroforText = item.Value; break;
                    case "metr": this.metroText = item.Value; break;
                    case "jene": this.jeneratorText = item.Value; break;
                    case "pvcd": this.pVCDogramaText = item.Value; break;
                    case "yuzh": this.yuzmeHavuzuText = item.Value; break;
                    case "celk": this.celikKapiText = item.Value; break;
                    case "katu": this.kabloTVUyduText = item.Value; break;
                    case "cady": this.caddeyeYakinText = item.Value; break;
                    case "merk": this.merkezdeText = item.Value; break;
                    case "asan": this.asansorText = item.Value; break;
                    case "mant": this.mantolamaText = item.Value; break;
                    case "bahc": this.bahceText = item.Value; break;
                    case "otop": this.otoparkText = item.Value; break;
                    case "siti": this.siteIciText = item.Value; break;
                    case "alar": this.alarmText = item.Value; break;
                    case "gord": this.goruntuluDiafon = item.Value; break;
                    case "klim": this.klimaText = item.Value; break;
                }
            });
        }, resError => this.errorMsg = resError);
    }

    PushLangItems() {
        this.langItems = new Array<LangItem>();

        this.langItems.push(Lib.SetLangItem(this.langItem, "dstc"));
        this.langItems.push(Lib.SetLangItem(this.langItem, "sctm"));
        this.langItems.push(Lib.SetLangItem(this.langItem, "scfs"));
        this.langItems.push(Lib.SetLangItem(this.langItem, "scfr"));
        this.langItems.push(Lib.SetLangItem(this.langItem, "ctgy"));
        this.langItems.push(Lib.SetLangItem(this.langItem, "sctg"));
        this.langItems.push(Lib.SetLangItem(this.langItem, "sall"));
        this.langItems.push(Lib.SetLangItem(this.langItem, "sclr"));
        this.langItems.push(Lib.SetLangItem(this.langItem, "susd"));
        this.langItems.push(Lib.SetLangItem(this.langItem, "sdmg"));
        this.langItems.push(Lib.SetLangItem(this.langItem, "arlk"));
        this.langItems.push(Lib.SetLangItem(this.langItem, "ttle"));
        this.langItems.push(Lib.SetLangItem(this.langItem, "city"));
        this.langItems.push(Lib.SetLangItem(this.langItem, "ilce"));
        this.langItems.push(Lib.SetLangItem(this.langItem, "semt"));
        this.langItems.push(Lib.SetLangItem(this.langItem, "prcd"));
        this.langItems.push(Lib.SetLangItem(this.langItem, "fall"));
        this.langItems.push(Lib.SetLangItem(this.langItem, "fdgz"));
        this.langItems.push(Lib.SetLangItem(this.langItem, "fwoc"));
        this.langItems.push(Lib.SetLangItem(this.langItem, "flif"));
        this.langItems.push(Lib.SetLangItem(this.langItem, "felc"));
        this.langItems.push(Lib.SetLangItem(this.langItem, "foth"));
        this.langItems.push(Lib.SetLangItem(this.langItem, "wall"));
        this.langItems.push(Lib.SetLangItem(this.langItem, "wsun"));
        this.langItems.push(Lib.SetLangItem(this.langItem, "wkat"));
        this.langItems.push(Lib.SetLangItem(this.langItem, "wair"));
        this.langItems.push(Lib.SetLangItem(this.langItem, "wcom"));
        this.langItems.push(Lib.SetLangItem(this.langItem, "wcen"));
        this.langItems.push(Lib.SetLangItem(this.langItem, "wsto"));
        this.langItems.push(Lib.SetLangItem(this.langItem, "woth"));
        this.langItems.push(Lib.SetLangItem(this.langItem, "dsbt"));
        this.langItems.push(Lib.SetLangItem(this.langItem, "bage"));
        this.langItems.push(Lib.SetLangItem(this.langItem, "wtyp"));
        this.langItems.push(Lib.SetLangItem(this.langItem, "drmc"));
        this.langItems.push(Lib.SetLangItem(this.langItem, "ftyp"));
        this.langItems.push(Lib.SetLangItem(this.langItem, "pric"));
        this.langItems.push(Lib.SetLangItem(this.langItem, "area"));
        this.langItems.push(Lib.SetLangItem(this.langItem, "flrn"));
        this.langItems.push(Lib.SetLangItem(this.langItem, "flrc"));
        this.langItems.push(Lib.SetLangItem(this.langItem, "romc"));
        this.langItems.push(Lib.SetLangItem(this.langItem, "stts"));
        this.langItems.push(Lib.SetLangItem(this.langItem, "arkc"));
        this.langItems.push(Lib.SetLangItem(this.langItem, "otoy"));
        this.langItems.push(Lib.SetLangItem(this.langItem, "guve"));
        this.langItems.push(Lib.SetLangItem(this.langItem, "deny"));
        this.langItems.push(Lib.SetLangItem(this.langItem, "dens"));
        this.langItems.push(Lib.SetLangItem(this.langItem, "kapi"));
        this.langItems.push(Lib.SetLangItem(this.langItem, "oyup"));
        this.langItems.push(Lib.SetLangItem(this.langItem, "yanm"));
        this.langItems.push(Lib.SetLangItem(this.langItem, "balk"));
        this.langItems.push(Lib.SetLangItem(this.langItem, "jaku"));
        this.langItems.push(Lib.SetLangItem(this.langItem, "once"));
        this.langItems.push(Lib.SetLangItem(this.langItem, "manz"));
        this.langItems.push(Lib.SetLangItem(this.langItem, "touy"));
        this.langItems.push(Lib.SetLangItem(this.langItem, "hidr"));
        this.langItems.push(Lib.SetLangItem(this.langItem, "metr"));
        this.langItems.push(Lib.SetLangItem(this.langItem, "jene"));
        this.langItems.push(Lib.SetLangItem(this.langItem, "pvcd"));
        this.langItems.push(Lib.SetLangItem(this.langItem, "yuzh"));
        this.langItems.push(Lib.SetLangItem(this.langItem, "celk"));
        this.langItems.push(Lib.SetLangItem(this.langItem, "katu"));
        this.langItems.push(Lib.SetLangItem(this.langItem, "cady"));
        this.langItems.push(Lib.SetLangItem(this.langItem, "merk"));
        this.langItems.push(Lib.SetLangItem(this.langItem, "asan"));
        this.langItems.push(Lib.SetLangItem(this.langItem, "mant"));
        this.langItems.push(Lib.SetLangItem(this.langItem, "bahc"));
        this.langItems.push(Lib.SetLangItem(this.langItem, "otop"));
        this.langItems.push(Lib.SetLangItem(this.langItem, "siti"));
        this.langItems.push(Lib.SetLangItem(this.langItem, "alar"));
        this.langItems.push(Lib.SetLangItem(this.langItem, "gord"));
        this.langItems.push(Lib.SetLangItem(this.langItem, "klim"));
    }
}