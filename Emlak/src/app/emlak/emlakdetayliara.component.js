"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var emlak_service_1 = require("../emlak.service");
var forms_1 = require("@angular/forms");
var re_service_1 = require("../re.service");
var router_1 = require("@angular/router");
var EmlakDetayliAraComponent = /** @class */ (function () {
    function EmlakDetayliAraComponent(_emlakService, _reService, _router, _formBuilder) {
        this._emlakService = _emlakService;
        this._reService = _reService;
        this._router = _router;
        this._formBuilder = _formBuilder;
    }
    EmlakDetayliAraComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.FormOlustur();
        this._reService.getSehirler()
            .subscribe(function (resData) {
            for (var i = 0; i < resData.length; i++) {
                $("#drpSehir").append("<option value=\"" + resData[i].Sehir + "\">" + resData[i].Sehir + "</option>");
            }
        }, function (resError) { return _this.errorMsg = resError; });
        this._reService.getKategoriler(0)
            .subscribe(function (resData) {
            $("#drpAltKategori").append("<option value=\"0\">Tümü</option>");
            for (var i = 0; i < resData.length; i++) {
                $("#drpKategori").append("<option value=\"" + resData[i].ID + "\">" + resData[i].CategoryName + "</option>");
            }
        }, function (resError) { return _this.errorMsg = resError; });
        this.KodlaGetir();
    };
    EmlakDetayliAraComponent.prototype.ngAfterContentInit = function () {
        setTimeout(function () {
            $("#drpDurum").val($("#drpDurum option:first").val());
            $("#drpIsinma").val($("#drpIsinma option:first").val());
            $("#drpYakit").val($("#drpYakit option:first").val());
        }, 500);
    };
    EmlakDetayliAraComponent.prototype.katChange = function (event) {
        var _this = this;
        var target = event.target || event.srcElement || event.currentTarget;
        var katID = parseInt(target.value);
        $("#drpAltKategori").html("");
        $("#drpAltKategori").removeAttr("disabled");
        if (katID > 0) {
            this._reService.getKategoriler(katID)
                .subscribe(function (resData) {
                for (var i = 0; i < resData.length; i++) {
                    $("#drpAltKategori").append("<option value=\"" + resData[i].ID + "\">" + resData[i].CategoryName + "</option>");
                }
            }, function (resError) { return _this.errorMsg = resError; });
        }
        else {
            $("#drpAltKategori").append("<option value=\"0\">Tümü</option>");
            $("#drpAltKategori").attr("disabled", "disabled");
        }
    };
    EmlakDetayliAraComponent.prototype.onSubmit = function () {
        var _this = this;
        this.realCPList = new Object();
        if ($("#rbSatilik").is(':checked')) {
            this.realCPList.Satilik = true;
        }
        else if ($("#rbKiralik").is(':checked')) {
            this.realCPList.Kiralik = true;
        }
        this.Doldur(this.realCPList);
        this._reService.getEmlakDetayliArama(this.realCPList)
            .subscribe(function (resData) {
            if (resData == true) {
                _this._router.navigate(['/Emlak/Listele', { detail: true }]);
            }
        }, function (resError) { return _this.errorMsg = resError; });
    };
    EmlakDetayliAraComponent.prototype.Doldur = function (realCPList) {
        realCPList.KatID = parseInt(this.detayliAraForm.get("kategori").value);
        realCPList.AltKatID = parseInt(this.detayliAraForm.get("altKategori").value);
        realCPList.Baslik = this.detayliAraForm.get("baslik").value;
        realCPList.Fiyat = parseInt(this.detayliAraForm.get("fiyat1").value);
        realCPList.Fiyat2 = parseInt(this.detayliAraForm.get("fiyat2").value);
        realCPList.OdaSayisi = parseInt(this.detayliAraForm.get("roomCount1").value);
        realCPList.OdaSayisi2 = parseInt(this.detayliAraForm.get("roomCount2").value);
        realCPList.KatSayisi = parseInt(this.detayliAraForm.get("katSayi1").value);
        realCPList.KatSayisi2 = parseInt(this.detayliAraForm.get("katSayi2").value);
        realCPList.SalonSayisi = parseInt(this.detayliAraForm.get("salon1").value);
        realCPList.SalonSayisi2 = parseInt(this.detayliAraForm.get("salon2").value);
        realCPList.BulunduguKat = parseInt(this.detayliAraForm.get("bulunduguKat1").value);
        realCPList.BulunduguKat2 = parseInt(this.detayliAraForm.get("bulunduguKat2").value);
        realCPList.Alan = parseInt(this.detayliAraForm.get("alan1").value);
        realCPList.Alan2 = parseInt(this.detayliAraForm.get("alan2").value);
        realCPList.BinaYasi = parseInt(this.detayliAraForm.get("binaYas1").value);
        realCPList.BinaYasi2 = parseInt(this.detayliAraForm.get("binaYas2").value);
        realCPList.Sehir = this.detayliAraForm.get("sehir").value;
        realCPList.Ilce = this.detayliAraForm.get("ilce").value;
        realCPList.Semt = this.detayliAraForm.get("semt").value;
        realCPList.IsinmaTipi = this.detayliAraForm.get("isinma").value;
        realCPList.YakitTipi = this.detayliAraForm.get("yakit").value;
        realCPList.Durum = this.detayliAraForm.get("durum").value;
        realCPList.ArkaCephe = this.detayliAraForm.get("arkaCephe").value;
        realCPList.OnCephe = this.detayliAraForm.get("onCephe").value;
        realCPList.CaddeyeYakin = this.detayliAraForm.get("caddeyeYakin").value;
        realCPList.DenizeSifir = this.detayliAraForm.get("denizeSifir").value;
        realCPList.DenizeYakin = this.detayliAraForm.get("denizeYakin").value;
        realCPList.Manzara = this.detayliAraForm.get("manzarali").value;
        realCPList.Merkezde = this.detayliAraForm.get("merkezde").value;
        realCPList.Metro = this.detayliAraForm.get("metro").value;
        realCPList.Otoban = this.detayliAraForm.get("otoban").value;
        realCPList.TopluUlasim = this.detayliAraForm.get("topluUlasim").value;
        realCPList.Asansor = this.detayliAraForm.get("asansor").value;
        realCPList.Bahce = this.detayliAraForm.get("bahce").value;
        realCPList.Guvenlik = this.detayliAraForm.get("guvenlik").value;
        realCPList.Hidrofor = this.detayliAraForm.get("hidrofor").value;
        realCPList.Mantolama = this.detayliAraForm.get("mantolama").value;
        realCPList.Jenerator = this.detayliAraForm.get("jenerator").value;
        realCPList.Kapici = this.detayliAraForm.get("kapici").value;
        realCPList.Otopark = this.detayliAraForm.get("otopark").value;
        realCPList.OyunParki = this.detayliAraForm.get("oyunParki").value;
        realCPList.PVCDograma = this.detayliAraForm.get("pVCDograma").value;
        realCPList.SiteIci = this.detayliAraForm.get("siteIci").value;
        realCPList.YanginMerdiveni = this.detayliAraForm.get("yanginMerdiveni").value;
        realCPList.YuzmeHavuzu = this.detayliAraForm.get("yuzmeHavuzu").value;
        realCPList.Alarm = this.detayliAraForm.get("alarm").value;
        realCPList.Balkon = this.detayliAraForm.get("balkon").value;
        realCPList.CelikKapi = this.detayliAraForm.get("celikKapi").value;
        realCPList.GoruntuluDiafon = this.detayliAraForm.get("goruntuluDiafon").value;
        realCPList.Jakuzi = this.detayliAraForm.get("jakuzi").value;
        realCPList.KabloTVUydu = this.detayliAraForm.get("kabloTVUydu").value;
        realCPList.Klima = this.detayliAraForm.get("klima").value;
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
    };
    //Form Oluştur
    EmlakDetayliAraComponent.prototype.FormOlustur = function () {
        this.detayliAraForm = this._formBuilder.group({
            satilik: [null],
            kategori: [null],
            altKategori: [null],
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
    };
    EmlakDetayliAraComponent.prototype.KodlaGetir = function () {
        var _this = this;
        this._emlakService.getKodlaGetir("dstc")
            .subscribe(function (resData) { return _this.dstcText = resData; }, function (resError) { return _this.errorMsg = resError; });
        this._emlakService.getKodlaGetir("sctm")
            .subscribe(function (resData) { return _this.sctmText = resData; }, function (resError) { return _this.errorMsg = resError; });
        this._emlakService.getKodlaGetir("scfs")
            .subscribe(function (resData) { return _this.scfsText = resData; }, function (resError) { return _this.errorMsg = resError; });
        this._emlakService.getKodlaGetir("scfr")
            .subscribe(function (resData) { return _this.scfrText = resData; }, function (resError) { return _this.errorMsg = resError; });
        this._emlakService.getKodlaGetir("ctgy")
            .subscribe(function (resData) { return _this.ctgyText = resData; }, function (resError) { return _this.errorMsg = resError; });
        this._emlakService.getKodlaGetir("sctg")
            .subscribe(function (resData) { return _this.sctgText = resData; }, function (resError) { return _this.errorMsg = resError; });
        this._emlakService.getKodlaGetir("sall")
            .subscribe(function (resData) { return _this.sallText = resData; }, function (resError) { return _this.errorMsg = resError; });
        this._emlakService.getKodlaGetir("sclr")
            .subscribe(function (resData) { return _this.sclrText = resData; }, function (resError) { return _this.errorMsg = resError; });
        this._emlakService.getKodlaGetir("susd")
            .subscribe(function (resData) { return _this.susdText = resData; }, function (resError) { return _this.errorMsg = resError; });
        this._emlakService.getKodlaGetir("sdmg")
            .subscribe(function (resData) { return _this.sdmgText = resData; }, function (resError) { return _this.errorMsg = resError; });
        this._emlakService.getKodlaGetir("arlk")
            .subscribe(function (resData) { return _this.arlkText = resData; }, function (resError) { return _this.errorMsg = resError; });
        this._emlakService.getKodlaGetir("ttle")
            .subscribe(function (resData) { return _this.ttleText = resData; }, function (resError) { return _this.errorMsg = resError; });
        this._emlakService.getKodlaGetir("city")
            .subscribe(function (resData) { return _this.cityText = resData; }, function (resError) { return _this.errorMsg = resError; });
        this._emlakService.getKodlaGetir("ilce")
            .subscribe(function (resData) { return _this.ilceText = resData; }, function (resError) { return _this.errorMsg = resError; });
        this._emlakService.getKodlaGetir("semt")
            .subscribe(function (resData) { return _this.semtText = resData; }, function (resError) { return _this.errorMsg = resError; });
        this._emlakService.getKodlaGetir("prcd")
            .subscribe(function (resData) { return _this.prcdText = resData; }, function (resError) { return _this.errorMsg = resError; });
        this._emlakService.getKodlaGetir("fall")
            .subscribe(function (resData) { return _this.fallText = resData; }, function (resError) { return _this.errorMsg = resError; });
        this._emlakService.getKodlaGetir("fdgz")
            .subscribe(function (resData) { return _this.fdgzText = resData; }, function (resError) { return _this.errorMsg = resError; });
        this._emlakService.getKodlaGetir("fwoc")
            .subscribe(function (resData) { return _this.fwocText = resData; }, function (resError) { return _this.errorMsg = resError; });
        this._emlakService.getKodlaGetir("flif")
            .subscribe(function (resData) { return _this.flifText = resData; }, function (resError) { return _this.errorMsg = resError; });
        this._emlakService.getKodlaGetir("felc")
            .subscribe(function (resData) { return _this.felcText = resData; }, function (resError) { return _this.errorMsg = resError; });
        this._emlakService.getKodlaGetir("foth")
            .subscribe(function (resData) { return _this.fothText = resData; }, function (resError) { return _this.errorMsg = resError; });
        this._emlakService.getKodlaGetir("wall")
            .subscribe(function (resData) { return _this.wallText = resData; }, function (resError) { return _this.errorMsg = resError; });
        this._emlakService.getKodlaGetir("wsun")
            .subscribe(function (resData) { return _this.wsunText = resData; }, function (resError) { return _this.errorMsg = resError; });
        this._emlakService.getKodlaGetir("wkat")
            .subscribe(function (resData) { return _this.wkatText = resData; }, function (resError) { return _this.errorMsg = resError; });
        this._emlakService.getKodlaGetir("wair")
            .subscribe(function (resData) { return _this.wairText = resData; }, function (resError) { return _this.errorMsg = resError; });
        this._emlakService.getKodlaGetir("wcom")
            .subscribe(function (resData) { return _this.wcomText = resData; }, function (resError) { return _this.errorMsg = resError; });
        this._emlakService.getKodlaGetir("wcen")
            .subscribe(function (resData) { return _this.wcenText = resData; }, function (resError) { return _this.errorMsg = resError; });
        this._emlakService.getKodlaGetir("wsto")
            .subscribe(function (resData) { return _this.wstoText = resData; }, function (resError) { return _this.errorMsg = resError; });
        this._emlakService.getKodlaGetir("woth")
            .subscribe(function (resData) { return _this.wothText = resData; }, function (resError) { return _this.errorMsg = resError; });
        this._emlakService.getKodlaGetir("dsbt")
            .subscribe(function (resData) { return _this.dsbtText = resData; }, function (resError) { return _this.errorMsg = resError; });
        this._emlakService.getKodlaGetir("bage")
            .subscribe(function (resData) { return _this.binaYasiText = resData; }, function (resError) { return _this.errorMsg = resError; });
        this._emlakService.getKodlaGetir("wtyp")
            .subscribe(function (resData) { return _this.isinmaTipiText = resData; }, function (resError) { return _this.errorMsg = resError; });
        this._emlakService.getKodlaGetir("drmc")
            .subscribe(function (resData) { return _this.salonSayisiText = resData; }, function (resError) { return _this.errorMsg = resError; });
        this._emlakService.getKodlaGetir("ftyp")
            .subscribe(function (resData) { return _this.yakitTipiText = resData; }, function (resError) { return _this.errorMsg = resError; });
        this._emlakService.getKodlaGetir("pric")
            .subscribe(function (resData) { return _this.fiyatText = resData; }, function (resError) { return _this.errorMsg = resError; });
        this._emlakService.getKodlaGetir("area")
            .subscribe(function (resData) { return _this.alanText = resData; }, function (resError) { return _this.errorMsg = resError; });
        this._emlakService.getKodlaGetir("flrn")
            .subscribe(function (resData) { return _this.bulunduguKatText = resData; }, function (resError) { return _this.errorMsg = resError; });
        this._emlakService.getKodlaGetir("flrc")
            .subscribe(function (resData) { return _this.katSayisiText = resData; }, function (resError) { return _this.errorMsg = resError; });
        this._emlakService.getKodlaGetir("romc")
            .subscribe(function (resData) { return _this.odasayisiText = resData; }, function (resError) { return _this.errorMsg = resError; });
        this._emlakService.getKodlaGetir("stts")
            .subscribe(function (resData) { return _this.durumText = resData; }, function (resError) { return _this.errorMsg = resError; });
        this._emlakService.getKodlaGetir("arkc")
            .subscribe(function (resData) { return _this.arkaCepheText = resData; }, function (resError) { return _this.errorMsg = resError; });
        this._emlakService.getKodlaGetir("otoy")
            .subscribe(function (resData) { return _this.otobanText = resData; }, function (resError) { return _this.errorMsg = resError; });
        this._emlakService.getKodlaGetir("guve")
            .subscribe(function (resData) { return _this.guvenlikText = resData; }, function (resError) { return _this.errorMsg = resError; });
        this._emlakService.getKodlaGetir("deny")
            .subscribe(function (resData) { return _this.denizeYakinText = resData; }, function (resError) { return _this.errorMsg = resError; });
        this._emlakService.getKodlaGetir("dens")
            .subscribe(function (resData) { return _this.denizeSifirText = resData; }, function (resError) { return _this.errorMsg = resError; });
        this._emlakService.getKodlaGetir("kapi")
            .subscribe(function (resData) { return _this.kapiciText = resData; }, function (resError) { return _this.errorMsg = resError; });
        this._emlakService.getKodlaGetir("oyup")
            .subscribe(function (resData) { return _this.oyunParkiText = resData; }, function (resError) { return _this.errorMsg = resError; });
        this._emlakService.getKodlaGetir("yanm")
            .subscribe(function (resData) { return _this.yanginMerdiveniText = resData; }, function (resError) { return _this.errorMsg = resError; });
        this._emlakService.getKodlaGetir("balk")
            .subscribe(function (resData) { return _this.balkonText = resData; }, function (resError) { return _this.errorMsg = resError; });
        this._emlakService.getKodlaGetir("jaku")
            .subscribe(function (resData) { return _this.jakuziText = resData; }, function (resError) { return _this.errorMsg = resError; });
        this._emlakService.getKodlaGetir("once")
            .subscribe(function (resData) { return _this.onCepheText = resData; }, function (resError) { return _this.errorMsg = resError; });
        this._emlakService.getKodlaGetir("manz")
            .subscribe(function (resData) { return _this.manzaraText = resData; }, function (resError) { return _this.errorMsg = resError; });
        this._emlakService.getKodlaGetir("touy")
            .subscribe(function (resData) { return _this.topluUlasimText = resData; }, function (resError) { return _this.errorMsg = resError; });
        this._emlakService.getKodlaGetir("hidr")
            .subscribe(function (resData) { return _this.hidroforText = resData; }, function (resError) { return _this.errorMsg = resError; });
        this._emlakService.getKodlaGetir("metr")
            .subscribe(function (resData) { return _this.metroText = resData; }, function (resError) { return _this.errorMsg = resError; });
        this._emlakService.getKodlaGetir("jene")
            .subscribe(function (resData) { return _this.jeneratorText = resData; }, function (resError) { return _this.errorMsg = resError; });
        this._emlakService.getKodlaGetir("pvcd")
            .subscribe(function (resData) { return _this.pVCDogramaText = resData; }, function (resError) { return _this.errorMsg = resError; });
        this._emlakService.getKodlaGetir("yuzh")
            .subscribe(function (resData) { return _this.yuzmeHavuzuText = resData; }, function (resError) { return _this.errorMsg = resError; });
        this._emlakService.getKodlaGetir("celk")
            .subscribe(function (resData) { return _this.celikKapiText = resData; }, function (resError) { return _this.errorMsg = resError; });
        this._emlakService.getKodlaGetir("katu")
            .subscribe(function (resData) { return _this.kabloTVUyduText = resData; }, function (resError) { return _this.errorMsg = resError; });
        this._emlakService.getKodlaGetir("cady")
            .subscribe(function (resData) { return _this.caddeyeYakinText = resData; }, function (resError) { return _this.errorMsg = resError; });
        this._emlakService.getKodlaGetir("merk")
            .subscribe(function (resData) { return _this.merkezdeText = resData; }, function (resError) { return _this.errorMsg = resError; });
        this._emlakService.getKodlaGetir("asan")
            .subscribe(function (resData) { return _this.asansorText = resData; }, function (resError) { return _this.errorMsg = resError; });
        this._emlakService.getKodlaGetir("mant")
            .subscribe(function (resData) { return _this.mantolamaText = resData; }, function (resError) { return _this.errorMsg = resError; });
        this._emlakService.getKodlaGetir("bahc")
            .subscribe(function (resData) { return _this.bahceText = resData; }, function (resError) { return _this.errorMsg = resError; });
        this._emlakService.getKodlaGetir("otop")
            .subscribe(function (resData) { return _this.otoparkText = resData; }, function (resError) { return _this.errorMsg = resError; });
        this._emlakService.getKodlaGetir("siti")
            .subscribe(function (resData) { return _this.siteIciText = resData; }, function (resError) { return _this.errorMsg = resError; });
        this._emlakService.getKodlaGetir("alar")
            .subscribe(function (resData) { return _this.alarmText = resData; }, function (resError) { return _this.errorMsg = resError; });
        this._emlakService.getKodlaGetir("gord")
            .subscribe(function (resData) { return _this.goruntuluDiafon = resData; }, function (resError) { return _this.errorMsg = resError; });
        this._emlakService.getKodlaGetir("klim")
            .subscribe(function (resData) { return _this.klimaText = resData; }, function (resError) { return _this.errorMsg = resError; });
    };
    EmlakDetayliAraComponent = __decorate([
        core_1.Component({
            templateUrl: 'app/emlak/emlakdetayliara.component.html',
            providers: [emlak_service_1.EmlakService, re_service_1.REService]
        }),
        __metadata("design:paramtypes", [emlak_service_1.EmlakService, re_service_1.REService, router_1.Router, forms_1.FormBuilder])
    ], EmlakDetayliAraComponent);
    return EmlakDetayliAraComponent;
}());
exports.EmlakDetayliAraComponent = EmlakDetayliAraComponent;
//# sourceMappingURL=emlakdetayliara.component.js.map