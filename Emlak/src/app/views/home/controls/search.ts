import { Component } from "@angular/core";
import { Router } from '@angular/router';
import { FormBuilder, FormGroup } from "@angular/forms";
import { SiteService } from '../../../services/site';
import { LangItem } from '../../../model/LangItem';
import { Lib } from '../../../lib/methods';

@Component({
    selector: 'emlak-search',
    templateUrl: './search.html'
})

export class SearchComponent {
    errorMsg: string;

    searchForm: FormGroup;
    realCPList: any;
    kategoriList: any;
    sehirList: any;
    durumList: any;
    yakitList: any;
    isinmaList: any;

    constructor(private service: SiteService, private _router: Router, private _formBuilder: FormBuilder) {
    }

    ngOnInit() {
        this.KodlaGetir();
        this.ComboDoldur();
        this.FormOlustur();

        var $SearchToggle = $('.search-form .search-toggle');
        $SearchToggle.hide();

        $('.search-form .toggle-btn').off("click").on('click', function (e) {
            e.preventDefault();
            $SearchToggle.slideToggle(300);
        });

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

                let leftCss = max > 99999 ? " style='left:-20px;'" : max > 9999 ? " style='left:-15px;'" : max > 999 ? " style='left:-10px;'" : max > 99 ? " style='left:-5px;'" : "";

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
        }, resError => this.errorMsg = resError);

        this.service.get("Site", "Kategoriler", 0).subscribe((resData: any) => {
            this.kategoriList = resData;
        }, resError => this.errorMsg = resError);

        this.service.get("Site", "Durumlar").subscribe((resData: any) => {
            this.durumList = resData;
        }, resError => this.errorMsg = resError);

        this.service.get("Site", "YakitTipleri").subscribe((resData: any) => {
            this.yakitList = resData;
        }, resError => this.errorMsg = resError);

        this.service.get("Site", "IsinmaTipleri").subscribe((resData: any) => {
            this.isinmaList = resData;
        }, resError => this.errorMsg = resError);
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

        this.service.post("Site", "DetayliAramaSession", this.realCPList).subscribe((resData: any) => {
            if (resData == true) {
                this._router.navigate(['/Emlak/Listele', { detail: true }]);
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
        this.searchForm = this._formBuilder.group({
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
    arlkText: string;
    ttleText: string;
    cityText: string;
    ilceText: string;
    semtText: string;
    prcdText: string;
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

        this.service.post("Site", "GetLangItems", this.langItems).subscribe((resData: any) => {
            resData.forEach((item, i) => {
                switch (item.Code) {
                    case "dstc": this.dstcText = item.Value; break;
                    case "sctm": this.sctmText = item.Value; break;
                    case "scfs": this.scfsText = item.Value; break;
                    case "scfr": this.scfrText = item.Value; break;
                    case "ctgy": this.ctgyText = item.Value; break;
                    case "sctg": this.sctgText = item.Value; break;
                    case "sall": this.sallText = item.Value; break;
                    case "arlk": this.arlkText = item.Value; break;
                    case "ttle": this.ttleText = item.Value; break;
                    case "city": this.cityText = item.Value; break;
                    case "ilce": this.ilceText = item.Value; break;
                    case "semt": this.semtText = item.Value; break;
                    case "prcd": this.prcdText = item.Value; break;
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
        this.langItems.push(Lib.SetLangItem(this.langItem, "arlk"));
        this.langItems.push(Lib.SetLangItem(this.langItem, "ttle"));
        this.langItems.push(Lib.SetLangItem(this.langItem, "city"));
        this.langItems.push(Lib.SetLangItem(this.langItem, "ilce"));
        this.langItems.push(Lib.SetLangItem(this.langItem, "semt"));
        this.langItems.push(Lib.SetLangItem(this.langItem, "prcd"));
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