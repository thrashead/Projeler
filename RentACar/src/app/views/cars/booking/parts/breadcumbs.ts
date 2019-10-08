import { Component } from '@angular/core';
import { SiteService } from '../../../../services/site';
import { LangItem } from '../../../../models/LangItem';
import { Lib } from '../../../../lib/methods';

@Component({
    selector: 'rac-carbookingbreadcumbs',
    templateUrl: './breadcumbs.html'
})

export class CarsBookingBreadCumbsComponent {
    errorMsg: string;

    constructor(private service: SiteService) {
    }

    ngOnInit() {
        this.SetLangContents();
    }

    //LangContents
    langItems: Array<LangItem>;
    langItem: LangItem;
    langs: any;

    //LangContent
    SetLangContents() {
        this.PushLangItems();

        this.service.post("Site", "SetLangContents", this.langItems).subscribe((resData: any) => {
            this.langs = new Object();
            this.langs.menu = new Object();

            resData.forEach((item, i) => {
                switch (item.Code) {
                    case "menu":
                        switch (item.ShortCode) {
                            case "home": this.langs.menu.home = item.ShortDescription2; break;
                        }
                        break;
                    case "extra_menu":
                        switch (item.ShortCode) {
                            case "book": this.langs.menu.book = item.ShortDescription2; break;
                        }
                        break;
                }
            });
        }, resError => this.errorMsg = resError);
    }

    PushLangItems() {
        this.langItems = new Array<LangItem>();

        this.langItems.push(Lib.SetLangItem(this.langItem, "menu", "home"));
        this.langItems.push(Lib.SetLangItem(this.langItem, "extra_menu", "book"));
    }
}
