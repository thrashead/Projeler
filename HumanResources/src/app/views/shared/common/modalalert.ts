import { Component, Input } from '@angular/core';
import { SiteService } from '../../../services/site';
import { Lib } from '../../../lib/methods';
import { LangItem } from '../../../models/LangItem';

@Component({
    selector: 'hr-modalalert',
    templateUrl: './modalalert.html'
})

export class ModalAlertComponent {
    errorMsg: string;
    @Input() alert: string;

    constructor(private service: SiteService) {
    }

    ngOnInit() {
        this.SetLangContents();
    }

    onClick() {
        $("#modalAlert").removeClass("show");
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

            resData.forEach((item, i) => {
                switch (item.Code) {
                    case "cmn_cnfrm_ok":
                        this.langs.Ok = item.ShortDescription;
                        break;
                }
            });
        }, resError => this.errorMsg = resError);
    }

    PushLangItems() {
        this.langItems = new Array<LangItem>();

        this.langItems.push(Lib.SetLangItem(this.langItem, "cmn_cnfrm_ok"));
    }
}
