import { Component } from "@angular/core";
import { SiteService } from '../../services/site';
import { ActivatedRoute, Params } from '@angular/router';
import { LangItem } from '../../model/LangItem';
import { Lib } from '../../lib/methods';

@Component({
    templateUrl: './detail.html'
})

export class PropertyDetailComponent {
    errorMsg: string;

    emlak: any;
    public link: string;

    features: Array<string>;

    constructor(private service: SiteService, private route: ActivatedRoute) {
    }

    ngOnInit() {
        this.route.params.subscribe((params: Params) => {
            this.link = params['link'];
            this.features = new Array();

            this.service.get("Site", "Detay", this.link).subscribe((resData: any) => {
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
            }, resError => this.errorMsg = resError);
        });
    }

    //KodlaGetir
    langItems: Array<LangItem>;
    langItem: LangItem;

    ilanlarText: string;

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
        this.PushLangItems();

        this.service.post("Site", "GetLangItems", this.langItems).subscribe((resData: any) => {
            resData.forEach((item, i) => {
                switch (item.Code) {
                    case "ilan": this.ilanlarText = item.Value; break;
                    case "desc": this.descText = item.Value; break;
                    case "adnf": this.adnfText = item.Value; break;
                    case "feat": this.featText = item.Value; break;
                    case "city": this.sehirText = item.Value; break;
                    case "ilce": this.ilceText = item.Value; break;
                    case "semt": this.semtText = item.Value; break;
                    case "dtys": this.satilikText = item.Value; break;
                    case "dtyk": this.kiralikText = item.Value; break;
                    case "code": this.kodText = item.Value; break;
                    case "ownr": this.sahipText = item.Value; break;
                    case "pric": this.fiyatText = item.Value; break;
                    case "romc": this.odasayisiText = item.Value; break;
                    case "drmc": this.salonSayisiText = item.Value; break;
                    case "area": this.alanText = item.Value; break;
                    case "flrc": this.katSayisiText = item.Value; break;
                    case "flrn": this.bulunduguKatText = item.Value; break;
                    case "stts": this.durumText = item.Value; break;
                    case "wtyp": this.isinmaTipiText = item.Value; break;
                    case "ftyp": this.yakitTipiText = item.Value; break;
                    case "bage": this.binaYasiText = item.Value; break;

                    case "arkc":
                        this.arkaCepheText = item.Value;

                        if (this.emlak.ArkaCephe == true) {
                            this.features.push(this.arkaCepheText);
                        }
                        break;

                    case "otoy":
                        this.otobanText = item.Value;

                        if (this.emlak.Otoban == true) {
                            this.features.push(this.otobanText);
                        }
                        break;

                    case "guve":
                        this.guvenlikText = item.Value;

                        if (this.emlak.Guvenlik == true) {
                            this.features.push(this.guvenlikText);
                        }
                        break;

                    case "deny":
                        this.denizeYakinText = item.Value;

                        if (this.emlak.DenizeYakin == true) {
                            this.features.push(this.denizeYakinText);
                        }
                        break;

                    case "dens":
                        this.denizeSifirText = item.Value;

                        if (this.emlak.DenizeSifir == true) {
                            this.features.push(this.denizeSifirText);
                        }
                        break;

                    case "kapi":
                        this.kapiciText = item.Value;

                        if (this.emlak.Kapici == true) {
                            this.features.push(this.kapiciText);
                        }
                        break;

                    case "oyup":
                        this.oyunParkiText = item.Value;

                        if (this.emlak.OyunParki == true) {
                            this.features.push(this.oyunParkiText);
                        }
                        break;

                    case "yanm":
                        this.yanginMerdiveniText = item.Value;

                        if (this.emlak.YanginMerdiveni == true) {
                            this.features.push(this.yanginMerdiveniText);
                        }
                        break;

                    case "balk":
                        this.balkonText = item.Value;

                        if (this.emlak.Balkon == true) {
                            this.features.push(this.balkonText);
                        }
                        break;

                    case "jaku":
                        this.jakuziText = item.Value;

                        if (this.emlak.Jakuzi == true) {
                            this.features.push(this.jakuziText);
                        }
                        break;

                    case "once":
                        this.onCepheText = item.Value;

                        if (this.emlak.OnCephe == true) {
                            this.features.push(this.onCepheText);
                        }
                        break;

                    case "manz":
                        this.manzaraText = item.Value;

                        if (this.emlak.Manzara == true) {
                            this.features.push(this.manzaraText);
                        }
                        break;

                    case "touy":
                        this.topluUlasimText = item.Value;

                        if (this.emlak.TopluUlasim == true) {
                            this.features.push(this.topluUlasimText);
                        }
                        break;

                    case "hidr":
                        this.hidroforText = item.Value;

                        if (this.emlak.Hidrofor == true) {
                            this.features.push(this.hidroforText);
                        }
                        break;

                    case "metr":
                        this.metroText = item.Value;

                        if (this.emlak.Metro == true) {
                            this.features.push(this.metroText);
                        }
                        break;

                    case "jene":
                        this.jeneratorText = item.Value;

                        if (this.emlak.Jenerator == true) {
                            this.features.push(this.jeneratorText);
                        }
                        break;

                    case "pvcd":
                        this.pVCDogramaText = item.Value;

                        if (this.emlak.PVCDograma == true) {
                            this.features.push(this.pVCDogramaText);
                        }
                        break;

                    case "yuzh":
                        this.yuzmeHavuzuText = item.Value;

                        if (this.emlak.YuzmeHavuzu == true) {
                            this.features.push(this.yuzmeHavuzuText);
                        }
                        break;

                    case "celk":
                        this.celikKapiText = item.Value;

                        if (this.emlak.CelikKapi == true) {
                            this.features.push(this.celikKapiText);
                        }
                        break;

                    case "katu":
                        this.kabloTVUyduText = item.Value;

                        if (this.emlak.KabloTVUydu == true) {
                            this.features.push(this.kabloTVUyduText);
                        }
                        break;

                    case "cady":
                        this.caddeyeYakinText = item.Value;

                        if (this.emlak.CaddeyeYakin == true) {
                            this.features.push(this.caddeyeYakinText);
                        }
                        break;

                    case "merk":
                        this.merkezdeText = item.Value;

                        if (this.emlak.Merkezde == true) {
                            this.features.push(this.merkezdeText);
                        }
                        break;

                    case "asan":
                        this.asansorText = item.Value;

                        if (this.emlak.Asansor == true) {
                            this.features.push(this.asansorText);
                        }
                        break;

                    case "mant":
                        this.mantolamaText = item.Value;

                        if (this.emlak.Mantolama == true) {
                            this.features.push(this.mantolamaText);
                        }
                        break;

                    case "bahc":
                        this.bahceText = item.Value;

                        if (this.emlak.Bahce == true) {
                            this.features.push(this.bahceText);
                        }
                        break;

                    case "otop":
                        this.otoparkText = item.Value;

                        if (this.emlak.Otopark == true) {
                            this.features.push(this.otoparkText);
                        }
                        break;

                    case "siti":
                        this.siteIciText = item.Value;

                        if (this.emlak.SiteIci == true) {
                            this.features.push(this.siteIciText);
                        }
                        break;

                    case "alar":
                        this.alarmText = item.Value;

                        if (this.emlak.Alarm == true) {
                            this.features.push(this.alarmText);
                        }
                        break;

                    case "gord":
                        this.goruntuluDiafon = item.Value;

                        if (this.emlak.GoruntuluDiafon == true) {
                            this.features.push(this.goruntuluDiafon);
                        }
                        break;

                    case "klim":
                        this.klimaText = item.Value;

                        if (this.emlak.Klima == true) {
                            this.features.push(this.klimaText);
                        }
                        break;
                }
            });
        }, resError => this.errorMsg = resError);
    }

    PushLangItems() {
        this.langItems = new Array<LangItem>();

        this.langItems.push(Lib.SetLangItem(this.langItem, "ilan"));
        this.langItems.push(Lib.SetLangItem(this.langItem, "news"));
        this.langItems.push(Lib.SetLangItem(this.langItem, "desc"));
        this.langItems.push(Lib.SetLangItem(this.langItem, "adnf"));
        this.langItems.push(Lib.SetLangItem(this.langItem, "feat"));
        this.langItems.push(Lib.SetLangItem(this.langItem, "city"));
        this.langItems.push(Lib.SetLangItem(this.langItem, "ilce"));
        this.langItems.push(Lib.SetLangItem(this.langItem, "semt"));
        this.langItems.push(Lib.SetLangItem(this.langItem, "dtys"));
        this.langItems.push(Lib.SetLangItem(this.langItem, "dtyk"));
        this.langItems.push(Lib.SetLangItem(this.langItem, "code"));
        this.langItems.push(Lib.SetLangItem(this.langItem, "ownr"));
        this.langItems.push(Lib.SetLangItem(this.langItem, "pric"));
        this.langItems.push(Lib.SetLangItem(this.langItem, "romc"));
        this.langItems.push(Lib.SetLangItem(this.langItem, "drmc"));
        this.langItems.push(Lib.SetLangItem(this.langItem, "area"));
        this.langItems.push(Lib.SetLangItem(this.langItem, "flrc"));
        this.langItems.push(Lib.SetLangItem(this.langItem, "flrn"));
        this.langItems.push(Lib.SetLangItem(this.langItem, "stts"));
        this.langItems.push(Lib.SetLangItem(this.langItem, "wtyp"));
        this.langItems.push(Lib.SetLangItem(this.langItem, "ftyp"));
        this.langItems.push(Lib.SetLangItem(this.langItem, "bage"));
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