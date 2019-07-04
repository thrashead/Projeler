import { Component } from "@angular/core";
import { EmlakService } from "../services/emlak.service";
import { REService } from "../services/re.service";
import { ActivatedRoute, Params } from '@angular/router';

@Component({
    templateUrl: './emlakdetay.html',
    providers: [EmlakService, REService]
})

export class EmlakDetayComponent {
    emlak: {};
    public link: string;

    constructor(private _emlakService: EmlakService, private _reService: REService, private route: ActivatedRoute) {

    }

    ngOnInit() {
        this.route.params.subscribe((params: Params) => {
            this.link = params['link'];

            this._reService.getEmlakDetay(this.link)
                .subscribe((resData) => {
                    this.emlak = resData;

                    $("#slider").html("");

                    for (var i = 0; i < resData.Pictures.length; i++) {
                        $("#slider").append("<img src=\"Uploads\/" + resData.Pictures[i] + "\" data-tab=\"" + resData.Baslik + "\" />")
                    }

                    $("#slider").tdSlider({
                        autostart: false,
                        slideonclick: true,
                        imagestretch: true,
                        width: 340,
                        height: 255,
                        direction: "LTR",
                        duration: 1000,
                        effect: "slide",
                        showbuttons: true,
                        buttonstyle: "thumb",
                        thumbheight: 65,
                        thumbwidth: 90,
                        tabeffect: "fade",
                        border: 0
                    });
                },
                    resError => this.errorMsg = resError);

            this.KodlaGetir();
        });
    }

    //KodlaGetir
    errorMsg: string;

    satilikText: string;
    kiralikText: string;
    kodText: string;
    sahipText: string;
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
        this._emlakService.getKodlaGetir("dtys")
            .subscribe(resData => this.satilikText = resData,
                resError => this.errorMsg = resError);

        this._emlakService.getKodlaGetir("dtyk")
            .subscribe(resData => this.kiralikText = resData,
                resError => this.errorMsg = resError);

        this._emlakService.getKodlaGetir("code")
            .subscribe(resData => this.kodText = resData,
                resError => this.errorMsg = resError);

        this._emlakService.getKodlaGetir("ownr")
            .subscribe(resData => this.sahipText = resData,
                resError => this.errorMsg = resError);

        this._emlakService.getKodlaGetir("pric")
            .subscribe(resData => this.fiyatText = resData,
                resError => this.errorMsg = resError);

        this._emlakService.getKodlaGetir("romc")
            .subscribe(resData => this.odasayisiText = resData,
                resError => this.errorMsg = resError);

        this._emlakService.getKodlaGetir("drmc")
            .subscribe(resData => this.salonSayisiText = resData,
                resError => this.errorMsg = resError);

        this._emlakService.getKodlaGetir("area")
            .subscribe(resData => this.alanText = resData,
                resError => this.errorMsg = resError);

        this._emlakService.getKodlaGetir("flrc")
            .subscribe(resData => this.katSayisiText = resData,
                resError => this.errorMsg = resError);

        this._emlakService.getKodlaGetir("flrn")
            .subscribe(resData => this.bulunduguKatText = resData,
                resError => this.errorMsg = resError);

        this._emlakService.getKodlaGetir("stts")
            .subscribe(resData => this.durumText = resData,
                resError => this.errorMsg = resError);

        this._emlakService.getKodlaGetir("wtyp")
            .subscribe(resData => this.isinmaTipiText = resData,
                resError => this.errorMsg = resError);

        this._emlakService.getKodlaGetir("ftyp")
            .subscribe(resData => this.yakitTipiText = resData,
                resError => this.errorMsg = resError);

        this._emlakService.getKodlaGetir("bage")
            .subscribe(resData => this.binaYasiText = resData,
                resError => this.errorMsg = resError);

        this._emlakService.getKodlaGetir("arkc")
            .subscribe(resData => this.arkaCepheText = resData,
                resError => this.errorMsg = resError);

        this._emlakService.getKodlaGetir("otoy")
            .subscribe(resData => this.otobanText = resData,
                resError => this.errorMsg = resError);

        this._emlakService.getKodlaGetir("guve")
            .subscribe(resData => this.guvenlikText = resData,
                resError => this.errorMsg = resError);

        this._emlakService.getKodlaGetir("deny")
            .subscribe(resData => this.denizeYakinText = resData,
                resError => this.errorMsg = resError);

        this._emlakService.getKodlaGetir("dens")
            .subscribe(resData => this.denizeSifirText = resData,
                resError => this.errorMsg = resError);

        this._emlakService.getKodlaGetir("kapi")
            .subscribe(resData => this.kapiciText = resData,
                resError => this.errorMsg = resError);

        this._emlakService.getKodlaGetir("oyup")
            .subscribe(resData => this.oyunParkiText = resData,
                resError => this.errorMsg = resError);

        this._emlakService.getKodlaGetir("yanm")
            .subscribe(resData => this.yanginMerdiveniText = resData,
                resError => this.errorMsg = resError);

        this._emlakService.getKodlaGetir("balk")
            .subscribe(resData => this.balkonText = resData,
                resError => this.errorMsg = resError);

        this._emlakService.getKodlaGetir("jaku")
            .subscribe(resData => this.jakuziText = resData,
                resError => this.errorMsg = resError);

        this._emlakService.getKodlaGetir("once")
            .subscribe(resData => this.onCepheText = resData,
                resError => this.errorMsg = resError);

        this._emlakService.getKodlaGetir("manz")
            .subscribe(resData => this.manzaraText = resData,
                resError => this.errorMsg = resError);

        this._emlakService.getKodlaGetir("touy")
            .subscribe(resData => this.topluUlasimText = resData,
                resError => this.errorMsg = resError);

        this._emlakService.getKodlaGetir("hidr")
            .subscribe(resData => this.hidroforText = resData,
                resError => this.errorMsg = resError);

        this._emlakService.getKodlaGetir("metr")
            .subscribe(resData => this.metroText = resData,
                resError => this.errorMsg = resError);

        this._emlakService.getKodlaGetir("jene")
            .subscribe(resData => this.jeneratorText = resData,
                resError => this.errorMsg = resError);

        this._emlakService.getKodlaGetir("pvcd")
            .subscribe(resData => this.pVCDogramaText = resData,
                resError => this.errorMsg = resError);

        this._emlakService.getKodlaGetir("yuzh")
            .subscribe(resData => this.yuzmeHavuzuText = resData,
                resError => this.errorMsg = resError);

        this._emlakService.getKodlaGetir("celk")
            .subscribe(resData => this.celikKapiText = resData,
                resError => this.errorMsg = resError);

        this._emlakService.getKodlaGetir("katu")
            .subscribe(resData => this.kabloTVUyduText = resData,
                resError => this.errorMsg = resError);

        this._emlakService.getKodlaGetir("cady")
            .subscribe(resData => this.caddeyeYakinText = resData,
                resError => this.errorMsg = resError);

        this._emlakService.getKodlaGetir("merk")
            .subscribe(resData => this.merkezdeText = resData,
                resError => this.errorMsg = resError);

        this._emlakService.getKodlaGetir("asan")
            .subscribe(resData => this.asansorText = resData,
                resError => this.errorMsg = resError);

        this._emlakService.getKodlaGetir("mant")
            .subscribe(resData => this.mantolamaText = resData,
                resError => this.errorMsg = resError);

        this._emlakService.getKodlaGetir("bahc")
            .subscribe(resData => this.bahceText = resData,
                resError => this.errorMsg = resError);

        this._emlakService.getKodlaGetir("otop")
            .subscribe(resData => this.otoparkText = resData,
                resError => this.errorMsg = resError);

        this._emlakService.getKodlaGetir("siti")
            .subscribe(resData => this.siteIciText = resData,
                resError => this.errorMsg = resError);

        this._emlakService.getKodlaGetir("alar")
            .subscribe(resData => this.alarmText = resData,
                resError => this.errorMsg = resError);

        this._emlakService.getKodlaGetir("gord")
            .subscribe(resData => this.goruntuluDiafon = resData,
                resError => this.errorMsg = resError);

        this._emlakService.getKodlaGetir("klim")
            .subscribe(resData => this.klimaText = resData,
                resError => this.errorMsg = resError);
    }
}