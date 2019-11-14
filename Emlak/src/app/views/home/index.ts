import { Component } from "@angular/core";
import { SiteService } from '../../services/site';
import { LangItem } from '../../model/LangItem';
import { Lib } from '../../lib/methods';

@Component({
    templateUrl: './index.html'
})

export class IndexComponent {
    errorMsg: string;

    constructor(private service: SiteService) {
    }

    ngOnInit() {
        this.KodlaGetir();
    }

    //KodlaGetir
    langItems: Array<LangItem>;
    langItem: LangItem;

    ziyaretciText: string;
    hakkimizdaText: string;
    devamText: string;
    yeniIlanlarText: string;
    haberlerText: string;
    gununIlaniText: string;
    vitrinIlanlarText: string;

    //Search
    lang: any;

    KodlaGetir() {
        this.PushLangItems();

        this.service.post("Site", "GetLangItems", this.langItems).subscribe((resData: any) => {
            this.lang = new Object();

            resData.forEach((item, i) => {
                switch (item.Code) {
                    case "ziya": this.ziyaretciText = item.Value; break;
                    case "abus": this.hakkimizdaText = item.Value; break;
                    case "devm": this.devamText = item.Value; break;
                    case "newi": this.yeniIlanlarText = item.Value; break;
                    case "news": this.haberlerText = item.Value; break;
                    case "guil": this.gununIlaniText = item.Value; break;
                    case "swrm": this.vitrinIlanlarText = item.Value; break;

                    //Search
                    case "dstc": this.lang.dstcText = item.Value; break;
                    case "sctm": this.lang.sctmText = item.Value; break;
                    case "scfs": this.lang.scfsText = item.Value; break;
                    case "scfr": this.lang.scfrText = item.Value; break;
                    case "ctgy": this.lang.ctgyText = item.Value; break;
                    case "sctg": this.lang.sctgText = item.Value; break;
                    case "sall": this.lang.sallText = item.Value; break;
                    case "arlk": this.lang.arlkText = item.Value; break;
                    case "ttle": this.lang.ttleText = item.Value; break;
                    case "city": this.lang.cityText = item.Value; break;
                    case "ilce": this.lang.ilceText = item.Value; break;
                    case "semt": this.lang.semtText = item.Value; break;
                    case "prcd": this.lang.prcdText = item.Value; break;
                    case "dsbt": this.lang.dsbtText = item.Value; break;
                    case "bage": this.lang.binaYasiText = item.Value; break;
                    case "wtyp": this.lang.isinmaTipiText = item.Value; break;
                    case "drmc": this.lang.salonSayisiText = item.Value; break;
                    case "ftyp": this.lang.yakitTipiText = item.Value; break;
                    case "pric": this.lang.fiyatText = item.Value; break;
                    case "area": this.lang.alanText = item.Value; break;
                    case "flrn": this.lang.bulunduguKatText = item.Value; break;
                    case "flrc": this.lang.katSayisiText = item.Value; break;
                    case "romc": this.lang.odasayisiText = item.Value; break;
                    case "stts": this.lang.durumText = item.Value; break;
                    case "arkc": this.lang.arkaCepheText = item.Value; break;
                    case "otoy": this.lang.otobanText = item.Value; break;
                    case "guve": this.lang.guvenlikText = item.Value; break;
                    case "deny": this.lang.denizeYakinText = item.Value; break;
                    case "dens": this.lang.denizeSifirText = item.Value; break;
                    case "kapi": this.lang.kapiciText = item.Value; break;
                    case "oyup": this.lang.oyunParkiText = item.Value; break;
                    case "yanm": this.lang.yanginMerdiveniText = item.Value; break;
                    case "balk": this.lang.balkonText = item.Value; break;
                    case "jaku": this.lang.jakuziText = item.Value; break;
                    case "once": this.lang.onCepheText = item.Value; break;
                    case "manz": this.lang.manzaraText = item.Value; break;
                    case "touy": this.lang.topluUlasimText = item.Value; break;
                    case "hidr": this.lang.hidroforText = item.Value; break;
                    case "metr": this.lang.metroText = item.Value; break;
                    case "jene": this.lang.jeneratorText = item.Value; break;
                    case "pvcd": this.lang.pVCDogramaText = item.Value; break;
                    case "yuzh": this.lang.yuzmeHavuzuText = item.Value; break;
                    case "celk": this.lang.celikKapiText = item.Value; break;
                    case "katu": this.lang.kabloTVUyduText = item.Value; break;
                    case "cady": this.lang.caddeyeYakinText = item.Value; break;
                    case "merk": this.lang.merkezdeText = item.Value; break;
                    case "asan": this.lang.asansorText = item.Value; break;
                    case "mant": this.lang.mantolamaText = item.Value; break;
                    case "bahc": this.lang.bahceText = item.Value; break;
                    case "otop": this.lang.otoparkText = item.Value; break;
                    case "siti": this.lang.siteIciText = item.Value; break;
                    case "alar": this.lang.alarmText = item.Value; break;
                    case "gord": this.lang.goruntuluDiafon = item.Value; break;
                    case "klim": this.lang.klimaText = item.Value; break;
                }
            });
        }, resError => this.errorMsg = resError);
    }

    PushLangItems() {
        this.langItems = new Array<LangItem>();

        this.langItems.push(Lib.SetLangItem(this.langItem, "ziya"));
        this.langItems.push(Lib.SetLangItem(this.langItem, "abus"));
        this.langItems.push(Lib.SetLangItem(this.langItem, "newi"));
        this.langItems.push(Lib.SetLangItem(this.langItem, "news"));
        this.langItems.push(Lib.SetLangItem(this.langItem, "devm"));
        this.langItems.push(Lib.SetLangItem(this.langItem, "guil"));
        this.langItems.push(Lib.SetLangItem(this.langItem, "swrm"));

        //Search
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