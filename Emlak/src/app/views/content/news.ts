import { Component } from "@angular/core";
import { LangItem } from '../../model/LangItem';
import { Lib } from '../../lib/methods';
import { SiteService } from '../../services/site';

@Component({
    templateUrl: './news.html'
})

export class ContentNewsComponent {
    errorMsg: string;

    haberler: any;

    constructor(private service: SiteService) {
    }

    ngOnInit() {
        this.KodlaGetir();
    }

    Haberler() {
        this.service.get("Site", "Haberler").subscribe((resData: any) => {
            const length = Math.ceil(resData.length / 8);

            this.haberler = Array.from({ length }).map((x, j) => ({
                Items: resData.filter((y, i) => i >= 8 * j && i < 8 * (j + 1))
            }));

            setTimeout(() => {
                $(".owl-carousel").css("opacity", "1");
                $(".owl-carousel").css("display", "block");
            }, 300);
        }, resError => this.errorMsg = resError);
    }

    //KodlaGetir
    langItems: Array<LangItem>;
    langItem: LangItem;

    haberlerText: string;
    devamText: string;
    ilanlarText: string;
    aramaText: string;
    araText: string;

    KodlaGetir() {
        this.PushLangItems();

        this.service.post("Site", "GetLangItems", this.langItems).subscribe((resData: any) => {
            resData.forEach((item, i) => {
                switch (item.Code) {
                    case "news": this.haberlerText = item.Value; break;
                    case "devm": this.devamText = item.Value; break;
                    case "ilan": this.ilanlarText = item.Value; break;
                    case "dsbt": this.aramaText = item.Value; break;
                    case "serc": this.araText = item.Value; break;
                }
            });

            this.Haberler();
        }, resError => this.errorMsg = resError);
    }

    PushLangItems() {
        this.langItems = new Array<LangItem>();

        this.langItems.push(Lib.SetLangItem(this.langItem, "news"));
        this.langItems.push(Lib.SetLangItem(this.langItem, "devm"));
        this.langItems.push(Lib.SetLangItem(this.langItem, "ilan"));
        this.langItems.push(Lib.SetLangItem(this.langItem, "dsbt"));
        this.langItems.push(Lib.SetLangItem(this.langItem, "serc"));
    }
}