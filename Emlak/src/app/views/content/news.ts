import { Component, Input } from "@angular/core";
import { EmlakAjaxService } from "../../services/emlakajax";
import { SolAjaxService } from '../../services/solajax';
import { LangItem } from '../../model/LangItem';
import { Lib } from '../../lib/methods';

@Component({
    templateUrl: './news.html'
})

export class ContentNewsComponent {
    errorMsg: string;

    haberler: any;

    constructor(private _emlakService: EmlakAjaxService, private _solService: SolAjaxService) {
    }

    ngOnInit() {
        this._solService.getHaberler()
            .subscribe((resData: any) => {
                const length = Math.ceil(resData.length / 8);

                this.haberler = Array.from({ length }).map((x, j) => ({
                    Items: resData.filter((y, i) => i >= 8 * j && i < 8 * (j + 1))
                }));
            }, resError => this.errorMsg = resError);

        this.KodlaGetir();
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

        this._emlakService.postLangItems(this.langItems).subscribe((resData: any) => {
            resData.forEach((item, i) => {
                switch (item.Code) {
                    case "news": this.haberlerText = item.Value; break;
                    case "devm": this.devamText = item.Value; break;
                    case "ilan": this.ilanlarText = item.Value; break;
                    case "dsbt": this.aramaText = item.Value; break;
                    case "serc": this.araText = item.Value; break;
                }
            });
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