import { Component } from "@angular/core";
import { ActivatedRoute, Params, Router, RouterEvent, ActivationEnd } from '@angular/router';
import { EmlakAjaxService } from '../../services/emlakajax';
import { REAjaxService } from '../../services/reajax';
import { LangItem } from '../../model/LangItem';
import { Lib } from '../../lib/methods';

@Component({
    templateUrl: './index.html',
    providers: [EmlakAjaxService, REAjaxService]
})

export class PropertyIndexComponent {
    errorMsg: string;

    liste: any;
    public reData: any;
    public link: string;
    baslik: string;
    sayfa: number;
    sayfalar: number[] = new Array();

    constructor(private _emlakService: EmlakAjaxService, private _reService: REAjaxService, private router: Router, private route: ActivatedRoute) {
    }

    ngOnInit() {
        this.route.params.subscribe((params: Params) => {
            this.link = params['link'];
            this.reData = new Object();
            this.reData.OrderBy = "";
            this.reData.Word = params['link'];
            this.reData.Page = 1;
            this.reData.Detail = params['detail'];

            this.Listele(this.reData);

            this.KodlaGetir();
        });
    }

    Listele(data: any) {
        $("#lblSonuc").css("display", "none");

        this._reService.getEmlakListele(data)
            .subscribe((resData: any) => {
                this.liste = resData;

                if (this.liste.Adet > 12) {
                    $(".IcerikMetin.Paging").css("display", "block");
                }
                else if (this.liste.Adet <= 0) {
                    $("#lblSonuc").css("display", "block");
                }

                this.sayfalar = this.sayiList(this.liste.SayfaSayisi);
            },
                resError => this.errorMsg = resError);
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

        $(".pagination ul li").removeClass("active");
        target.parentNode.classList.add("active");

        this.route.params.subscribe((params: Params) => {
            this.reData = new Object();
            this.reData.OrderBy = orderBy;
            this.reData.Word = this.link;
            this.reData.Page = parseInt(target.text);
            this.reData.Detail = params['detail'];

            this.Listele(this.reData);

            this.KodlaGetir();
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

            this.KodlaGetir();
        });
    }

    //KodlaGetir
    langItems: Array<LangItem>;
    langItem: LangItem;

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

        this._emlakService.postLangItems(this.langItems).subscribe((resData: any) => {
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
    }
}