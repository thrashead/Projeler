import { Component } from "@angular/core";
import { ActivatedRoute, Params } from '@angular/router';
import { EmlakAjaxService } from "../../services/emlakajax";
import { LangItem } from '../../model/LangItem';
import { Lib } from '../../lib/methods';

@Component({
    templateUrl: './index.html'
})

export class ContentIndexComponent {
    errorMsg: string;

    icerik: any;
    public link: string;

    constructor(private _emlakService: EmlakAjaxService, private route: ActivatedRoute) {
    }

    ngOnInit() {
        this.route.params.subscribe((params: Params) => {
            this.link = params['link'];

            this._emlakService.getIcerikGetir(this.link)
                .subscribe((resData: any) => {
                    this.icerik = resData;
                },
                    resError => this.errorMsg = resError);
        });

        this.KodlaGetir();
    }

    //KodlaGetir
    langItems: Array<LangItem>;
    langItem: LangItem;

    ilanlarText: string;
    aramaText: string;
    araText: string;

    KodlaGetir() {
        this.PushLangItems();

        this._emlakService.postLangItems(this.langItems).subscribe((resData: any) => {
            resData.forEach((item, i) => {
                switch (item.Code) {
                    case "ilan": this.ilanlarText = item.Value; break;
                    case "dsbt": this.aramaText = item.Value; break;
                    case "serc": this.araText = item.Value; break;
                }
            });
        }, resError => this.errorMsg = resError);
    }

    PushLangItems() {
        this.langItems = new Array<LangItem>();

        this.langItems.push(Lib.SetLangItem(this.langItem, "ilan"));
        this.langItems.push(Lib.SetLangItem(this.langItem, "dsbt"));
        this.langItems.push(Lib.SetLangItem(this.langItem, "serc"));
    }
}