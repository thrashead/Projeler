import { Component } from "@angular/core";
import { ActivatedRoute, Params } from '@angular/router';
import { LangItem } from '../../model/LangItem';
import { Lib } from '../../lib/methods';
import { SiteService } from '../../services/site';

@Component({
    templateUrl: './index.html'
})

export class ContentIndexComponent {
    errorMsg: string;

    icerik: any;
    public link: string;

    constructor(private service: SiteService, private route: ActivatedRoute) {
    }

    ngOnInit() {
        this.KodlaGetir();
    }

    IcerikGetir() {
        this.route.params.subscribe((params: Params) => {
            this.link = params['link'];

            this.service.get("Site", "IcerikGetir", this.link).subscribe((resData: any) => {
                this.icerik = resData;
            }, resError => this.errorMsg = resError);
        });
    }

    //KodlaGetir
    langItems: Array<LangItem>;
    langItem: LangItem;

    ilanlarText: string;
    aramaText: string;
    araText: string;

    KodlaGetir() {
        this.PushLangItems();

        this.service.post("Site", "GetLangItems", this.langItems).subscribe((resData: any) => {
            resData.forEach((item, i) => {
                switch (item.Code) {
                    case "ilan": this.ilanlarText = item.Value; break;
                    case "dsbt": this.aramaText = item.Value; break;
                    case "serc": this.araText = item.Value; break;
                }
            });

            this.IcerikGetir();
        }, resError => this.errorMsg = resError);
    }

    PushLangItems() {
        this.langItems = new Array<LangItem>();

        this.langItems.push(Lib.SetLangItem(this.langItem, "ilan"));
        this.langItems.push(Lib.SetLangItem(this.langItem, "dsbt"));
        this.langItems.push(Lib.SetLangItem(this.langItem, "serc"));
    }
}