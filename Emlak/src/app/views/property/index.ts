import { Component } from "@angular/core";
import { ActivatedRoute, Params } from '@angular/router';
import { SiteService } from '../../services/site';
import { LangItem } from '../../model/LangItem';
import { Lib } from '../../lib/methods';

@Component({
    templateUrl: './index.html'
})

export class PropertyIndexComponent {
    errorMsg: string;

    liste: any;
    public reData: any;
    public link: string;
    baslik: string;
    sayfa: number;
    sayfalar: number[] = new Array();

    constructor(private service: SiteService, private route: ActivatedRoute) {
    }

    ngOnInit() {
        this.route.params.subscribe((params: Params) => {
            this.link = params['link'] == undefined ? "tumu" : params['link'];

            this.reData = new Object();
            this.reData.OrderBy = "";
            this.reData.Word = this.link;
            this.reData.Page = 1;
            this.reData.Detail = params['detail'];

            this.Listele(this.reData);
        });
    }

    Listele(data: any) {
        $("#lblSonuc").css("display", "none");

        this.service.post("Site", "Listele", data).subscribe((resData: any) => {
            this.liste = resData;

            if (this.liste.Adet > 12) {
                $(".IcerikMetin.Paging").css("display", "block");
            }
            else if (this.liste.Adet <= 0) {
                $("#lblSonuc").css("display", "block");
            }

            this.sayfalar = this.sayiList(this.liste.SayfaSayisi);

            this.KodlaGetir();
        }, resError => this.errorMsg = resError);
    }

    sayiList(adet: number) {
        let sayilar: number[] = new Array();

        for (var i = 0; i < adet; i++) {
            sayilar[i] = i + 1;
        }

        return sayilar;
    }

    onClick(event: any) {
        var target = event.target || event.srcElement || event.currentTarget;

        var orderBy = $(".sort-by-list li.active a").attr("data-value");
        var page = 1;

        $(".pagination ul li").removeClass("active");

        if (target == undefined) {
            target = $(".pagination ul li").eq(0).children("a");
            target.parent().addClass("active");
        }
        else {
            target.parentNode.classList.add("active");
            page = parseInt(target.text);
        }

        this.route.params.subscribe((params: Params) => {
            this.reData = new Object();
            this.reData.OrderBy = orderBy;
            this.reData.Word = this.link;
            this.reData.Page = page;
            this.reData.Detail = params['detail'];

            this.Listele(this.reData);
        });
    }

    onOrder(event: any) {
        var target = event.target || event.srcElement || event.currentTarget;
        let orderBy;

        $(".sort-by-list li").removeClass("active");

        if (target.hasAttribute("data-vale")) {
            orderBy = target.attributes["data-value"].value;
            target.parentNode.classList.add("active");
        }
        else {
            orderBy = target.parentNode.attributes["data-value"].value;
            target.parentNode.parentNode.classList.add("active");
        }

        $(".pagination ul li").removeClass("active");
        $(".pagination ul li").eq(0).addClass("active");

        this.route.params.subscribe((params: Params) => {
            this.reData = new Object();
            this.reData.OrderBy = orderBy;
            this.reData.Word = this.link;
            this.reData.Page = 1;
            this.reData.Detail = params['detail'];

            this.Listele(this.reData);
        });
    }

    //KodlaGetir
    langItems: Array<LangItem>;
    langItem: LangItem;

    lang: any;

    atozText: string;
    ztoaText: string;
    to19Text: string;
    to91Text: string;
    dto9Text: string;
    dto1Text: string;
    pageText: string;
    noprText: string;

    KodlaGetir() {
        this.PushLangItems();

        this.service.post("Site", "GetLangItems", this.langItems).subscribe((resData: any) => {
            this.lang = new Object();

            resData.forEach((item, i) => {
                switch (item.Code) {
                    case "atoz": this.atozText = item.Value; break;
                    case "ztoa": this.ztoaText = item.Value; break;
                    case "1to9": this.to19Text = item.Value; break;
                    case "9to1": this.to91Text = item.Value; break;
                    case "dto9": this.dto9Text = item.Value; break;
                    case "dto1": this.dto1Text = item.Value; break;
                    case "page": this.pageText = item.Value; break;
                    case "nopr": this.noprText = item.Value; break;

                    //Search
                    case "sdet": this.lang.sdetText = item.Value; break;
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

        this.langItems.push(Lib.SetLangItem(this.langItem, "atoz"));
        this.langItems.push(Lib.SetLangItem(this.langItem, "ztoa"));
        this.langItems.push(Lib.SetLangItem(this.langItem, "1to9"));
        this.langItems.push(Lib.SetLangItem(this.langItem, "9to1"));
        this.langItems.push(Lib.SetLangItem(this.langItem, "dto9"));
        this.langItems.push(Lib.SetLangItem(this.langItem, "dto1"));
        this.langItems.push(Lib.SetLangItem(this.langItem, "page"));
        this.langItems.push(Lib.SetLangItem(this.langItem, "nopr"));

        //Search
        this.langItems.push(Lib.SetLangItem(this.langItem, "sdet"));
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