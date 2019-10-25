import { Component } from '@angular/core';
import { SiteService } from '../../services/site';
import { LangItem } from '../../model/LangItem';
import { Lib } from '../../lib/methods';

@Component({
    selector: 'emlak-layout',
    templateUrl: './layout.html'
})

export class LayoutComponent {
    errorMsg: string;

    constructor(private service: SiteService) {
    }

    ngOnInit() {
        this.KodlaGetir();
    }

    //KodlaGetir
    langItems: Array<LangItem>;
    langItem: LangItem;

    anaSayfaText: string;
    hakkimizdaText: string;
    iletisimText: string;
    yeniilanText: string;
    tumilanText: string;
    haberlerText: string;
    ilanlarText: string;
    hizlilinkText: string;
    kategorilerText: string;
    iceriklerText: string;
    satilikilanText: string;
    kiralikilanText: string;
    girisText: string;

    KodlaGetir() {
        this.PushLangItems();

        this.service.post("Site", "GetLangItems", this.langItems).subscribe((resData: any) => {
            resData.forEach((item, i) => {
                switch (item.Code) {
                    case "news": this.haberlerText = item.Value; break;
                    case "mnpg": this.anaSayfaText = item.Value; break;
                    case "abus": this.hakkimizdaText = item.Value; break;
                    case "cont": this.iletisimText = item.Value; break;
                    case "ilan": this.ilanlarText = item.Value; break;
                    case "alli": this.tumilanText = item.Value; break;
                    case "newi": this.yeniilanText = item.Value; break;
                    case "qklk": this.hizlilinkText = item.Value; break;
                    case "stlk": this.satilikilanText = item.Value; break;
                    case "krlk": this.kiralikilanText = item.Value; break;
                    case "ctgs": this.kategorilerText = item.Value; break;
                    case "cnts": this.iceriklerText = item.Value; break;
                    case "entr": this.girisText = item.Value; break;
                }
            });
        }, resError => this.errorMsg = resError);
    }

    PushLangItems() {
        this.langItems = new Array<LangItem>();

        this.langItems.push(Lib.SetLangItem(this.langItem, "news"));
        this.langItems.push(Lib.SetLangItem(this.langItem, "mnpg"));
        this.langItems.push(Lib.SetLangItem(this.langItem, "abus"));
        this.langItems.push(Lib.SetLangItem(this.langItem, "cont"));
        this.langItems.push(Lib.SetLangItem(this.langItem, "ilan"));
        this.langItems.push(Lib.SetLangItem(this.langItem, "alli"));
        this.langItems.push(Lib.SetLangItem(this.langItem, "newi"));
        this.langItems.push(Lib.SetLangItem(this.langItem, "qklk"));
        this.langItems.push(Lib.SetLangItem(this.langItem, "stlk"));
        this.langItems.push(Lib.SetLangItem(this.langItem, "krlk"));
        this.langItems.push(Lib.SetLangItem(this.langItem, "ctgs"));
        this.langItems.push(Lib.SetLangItem(this.langItem, "cnts"));
        this.langItems.push(Lib.SetLangItem(this.langItem, "entr"));
    }
}
