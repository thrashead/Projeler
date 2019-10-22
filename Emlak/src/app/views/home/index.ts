import { Component } from "@angular/core";
import { EmlakAjaxService } from "../../services/emlakajax";
import { LangItem } from '../../model/LangItem';
import { Lib } from '../../lib/methods';

@Component({
    templateUrl: './index.html'
})

export class IndexComponent { 
    errorMsg: string;

    constructor(private _emlakService: EmlakAjaxService) {
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

    KodlaGetir() {
        this.PushLangItems();

        this._emlakService.postLangItems(this.langItems).subscribe((resData: any) => {
            resData.forEach((item, i) => {
                switch (item.Code) {
                    case "ziya": this.ziyaretciText = item.Value; break;
                    case "abus": this.hakkimizdaText = item.Value; break;
                    case "devm": this.devamText = item.Value; break;
                    case "newi": this.yeniIlanlarText = item.Value; break;
                    case "news": this.haberlerText = item.Value; break;
                    case "guil": this.gununIlaniText = item.Value; break;
                    case "swrm": this.vitrinIlanlarText = item.Value; break;
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
    }
}