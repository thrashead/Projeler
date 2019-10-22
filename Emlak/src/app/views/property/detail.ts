import { Component } from "@angular/core";
import { EmlakAjaxService } from "../../services/emlakajax";
import { REAjaxService } from "../../services/reajax";
import { ActivatedRoute, Params } from '@angular/router';

@Component({
    templateUrl: './detail.html'
})

export class PropertyDetailComponent {
    emlak: any;
    public link: string;

    features: Array<string>;

    constructor(private _emlakService: EmlakAjaxService, private _reService: REAjaxService, private route: ActivatedRoute) {
    }

    ngOnInit() {
        this.route.params.subscribe((params: Params) => {
            this.link = params['link'];
            this.features = new Array();

            this._reService.getEmlakDetay(this.link)
                .subscribe((resData: any) => {
                    this.emlak = resData;

                    this.KodlaGetir();

                    $('#image-gallery').lightSlider({
                        gallery: true,
                        item: 1,
                        thumbItem: 9,
                        slideMargin: 0,
                        speed: 500,
                        auto: true,
                        loop: true,
                        onSliderLoad: function () {
                            $('#image-gallery').removeClass('cS-hidden');
                        }
                    });
                },
                    resError => this.errorMsg = resError);
        });
    }

    //KodlaGetir
    errorMsg: string;

    sehirText: string;
    ilceText: string;
    semtText: string;

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

    descText: string;
    featText: string;
    adnfText: string;

    KodlaGetir() {
        this._emlakService.getKodlaGetir("desc")
            .subscribe(resData => this.descText = resData,
                resError => this.errorMsg = resError);

        this._emlakService.getKodlaGetir("adnf")
            .subscribe(resData => this.adnfText = resData,
                resError => this.errorMsg = resError);

        this._emlakService.getKodlaGetir("feat")
            .subscribe(resData => this.featText = resData,
                resError => this.errorMsg = resError);

        this._emlakService.getKodlaGetir("city")
            .subscribe(resData => this.sehirText = resData,
                resError => this.errorMsg = resError);

        this._emlakService.getKodlaGetir("ilce")
            .subscribe(resData => this.ilceText = resData,
                resError => this.errorMsg = resError);

        this._emlakService.getKodlaGetir("semt")
            .subscribe(resData => this.semtText = resData,
                resError => this.errorMsg = resError);

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
            .subscribe((resData: any) => { 
                this.arkaCepheText = resData;

                if(this.emlak.ArkaCephe == true) {  
                    this.features.push(this.arkaCepheText);
                }
            }, resError => this.errorMsg = resError);

        this._emlakService.getKodlaGetir("otoy")
            .subscribe((resData: any) => { 
                this.otobanText = resData;

                if(this.emlak.Otoban == true) { 
                    this.features.push(this.otobanText);
                }
            }, resError => this.errorMsg = resError);

        this._emlakService.getKodlaGetir("guve")
            .subscribe((resData: any) => { 
                this.guvenlikText = resData;

                if(this.emlak.Guvenlik == true) { 
                    this.features.push(this.guvenlikText);
                }
            }, resError => this.errorMsg = resError);

        this._emlakService.getKodlaGetir("deny")
            .subscribe((resData: any) => { 
                this.denizeYakinText = resData;

                if(this.emlak.DenizeYakin == true) { 
                    this.features.push(this.denizeYakinText);
                }
            }, resError => this.errorMsg = resError);

        this._emlakService.getKodlaGetir("dens")
            .subscribe((resData: any) => { 
                this.denizeSifirText = resData;

                if(this.emlak.DenizeSifir == true) { 
                    this.features.push(this.denizeSifirText);
                }
            }, resError => this.errorMsg = resError);

        this._emlakService.getKodlaGetir("kapi")
            .subscribe((resData: any) => { 
                this.kapiciText = resData;

                if(this.emlak.Kapici == true) { 
                    this.features.push(this.kapiciText);
                }
            }, resError => this.errorMsg = resError);

        this._emlakService.getKodlaGetir("oyup")
            .subscribe((resData: any) => { 
                this.oyunParkiText = resData;

                if(this.emlak.OyunParki == true) { 
                    this.features.push(this.oyunParkiText);
                }
            }, resError => this.errorMsg = resError);

        this._emlakService.getKodlaGetir("yanm")
            .subscribe((resData: any) => { 
                this.yanginMerdiveniText = resData;

                if(this.emlak.YanginMerdiveni == true) { 
                    this.features.push(this.yanginMerdiveniText);
                }
            }, resError => this.errorMsg = resError);

        this._emlakService.getKodlaGetir("balk")
            .subscribe((resData: any) => { 
                this.balkonText = resData;

                if(this.emlak.Balkon == true) { 
                    this.features.push(this.balkonText);
                }
            }, resError => this.errorMsg = resError);

        this._emlakService.getKodlaGetir("jaku")
            .subscribe((resData: any) => { 
                this.jakuziText = resData;

                if(this.emlak.Jakuzi == true) { 
                    this.features.push(this.jakuziText);
                }
            }, resError => this.errorMsg = resError);

        this._emlakService.getKodlaGetir("once")
            .subscribe((resData: any) => { 
                this.onCepheText = resData;    

                if(this.emlak.OnCephe == true) {  
                    this.features.push(this.onCepheText);
                }
            }, resError => this.errorMsg = resError);

        this._emlakService.getKodlaGetir("manz")
            .subscribe((resData: any) => { 
                this.manzaraText = resData;

                if(this.emlak.Manzara == true) { 
                    this.features.push(this.manzaraText);
                }
            }, resError => this.errorMsg = resError);

        this._emlakService.getKodlaGetir("touy")
            .subscribe((resData: any) => { 
                this.topluUlasimText = resData;

                if(this.emlak.TopluUlasim == true) { 
                    this.features.push(this.topluUlasimText);
                }
            }, resError => this.errorMsg = resError);

        this._emlakService.getKodlaGetir("hidr")
            .subscribe((resData: any) => { 
                this.hidroforText = resData;

                if(this.emlak.Hidrofor == true) { 
                    this.features.push(this.hidroforText);
                }
            }, resError => this.errorMsg = resError);

        this._emlakService.getKodlaGetir("metr")
            .subscribe((resData: any) => { 
                this.metroText = resData;

                if(this.emlak.Metro == true) { 
                    this.features.push(this.metroText);
                }
            }, resError => this.errorMsg = resError);

        this._emlakService.getKodlaGetir("jene")
            .subscribe((resData: any) => { 
                this.jeneratorText = resData;

                if(this.emlak.Jenerator == true) { 
                    this.features.push(this.jeneratorText);
                }
            }, resError => this.errorMsg = resError);

        this._emlakService.getKodlaGetir("pvcd")
            .subscribe((resData: any) => { 
                this.pVCDogramaText = resData;

                if(this.emlak.PVCDograma == true) { 
                    this.features.push(this.pVCDogramaText);
                }
            }, resError => this.errorMsg = resError);

        this._emlakService.getKodlaGetir("yuzh")
            .subscribe((resData: any) => { 
                this.yuzmeHavuzuText = resData;

                if(this.emlak.YuzmeHavuzu == true) { 
                    this.features.push(this.yuzmeHavuzuText);
                }
            }, resError => this.errorMsg = resError);

        this._emlakService.getKodlaGetir("celk")
            .subscribe((resData: any) => { 
                this.celikKapiText = resData;

                if(this.emlak.CelikKapi == true) { 
                    this.features.push(this.celikKapiText);
                }
            }, resError => this.errorMsg = resError);

        this._emlakService.getKodlaGetir("katu")
            .subscribe((resData: any) => { 
                this.kabloTVUyduText = resData;

                if(this.emlak.KabloTVUydu == true) { 
                    this.features.push(this.kabloTVUyduText);
                }
            }, resError => this.errorMsg = resError);

        this._emlakService.getKodlaGetir("cady")
            .subscribe((resData: any) => { 
                this.caddeyeYakinText = resData;

                if(this.emlak.CaddeyeYakin == true) { 
                    this.features.push(this.caddeyeYakinText);
                }
            }, resError => this.errorMsg = resError);

        this._emlakService.getKodlaGetir("merk")
            .subscribe((resData: any) => { 
                this.merkezdeText = resData;

                if(this.emlak.Merkezde == true) { 
                    this.features.push(this.merkezdeText);
                }
            }, resError => this.errorMsg = resError);

        this._emlakService.getKodlaGetir("asan")
            .subscribe((resData: any) => { 
                this.asansorText = resData;

                if(this.emlak.Asansor == true) { 
                    this.features.push(this.asansorText);
                }
            }, resError => this.errorMsg = resError);

        this._emlakService.getKodlaGetir("mant")
            .subscribe((resData: any) => { 
                this.mantolamaText = resData;

                if(this.emlak.Mantolama == true) { 
                    this.features.push(this.mantolamaText);
                }
            }, resError => this.errorMsg = resError);

        this._emlakService.getKodlaGetir("bahc")
            .subscribe((resData: any) => { 
                this.bahceText = resData;

                if(this.emlak.Bahce == true) { 
                    this.features.push(this.bahceText);
                }
            }, resError => this.errorMsg = resError);

        this._emlakService.getKodlaGetir("otop")
            .subscribe((resData: any) => { 
                this.otoparkText = resData;

                if(this.emlak.Otopark == true) { 
                    this.features.push(this.otoparkText);
                }
            }, resError => this.errorMsg = resError);

        this._emlakService.getKodlaGetir("siti")
            .subscribe((resData: any) => { 
                this.siteIciText = resData;

                if(this.emlak.SiteIci == true) { 
                    this.features.push(this.siteIciText);
                }
            }, resError => this.errorMsg = resError);

        this._emlakService.getKodlaGetir("alar")
            .subscribe((resData: any) => { 
                this.alarmText = resData;

                if(this.emlak.Alarm == true) { 
                    this.features.push(this.alarmText);
                }
            }, resError => this.errorMsg = resError);

        this._emlakService.getKodlaGetir("gord")
            .subscribe((resData: any) => { 
                this.goruntuluDiafon = resData;

                if(this.emlak.GoruntuluDiafon == true) { 
                    this.features.push(this.goruntuluDiafon);
                }
            }, resError => this.errorMsg = resError);

        this._emlakService.getKodlaGetir("klim")
            .subscribe((resData: any) => { 
                this.klimaText = resData;

                if(this.emlak.Klima == true) { 
                    this.features.push(this.klimaText);
                }
            }, resError => this.errorMsg = resError);
    }
}