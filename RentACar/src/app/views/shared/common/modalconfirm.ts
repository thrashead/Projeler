﻿import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { SiteService } from '../../../services/site';
import { Lib } from '../../../lib/methods';
import { LangItem } from '../../../models/LangItem';

@Component({
    selector: 'rac-sharedmodalconfirm',
    templateUrl: './modalconfirm.html'
})

export class SharedModalConfirmComponent {
    errorMsg: string;
    @Input() confirm: string;

    constructor(private service: SiteService, private router: Router) {
    }

    ngOnInit() {
        this.SetLangContents();
    }

    onClick(result) {
        $("#modalConfirm").removeClass("show");

        if (result == true)
            this.router.navigate(['/']);
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
            this.langs.content = new Object();

            resData.forEach((item, i) => {
                switch (item.Code) {
                    case "cmn_cnfrm_ok":
                        this.langs.Ok = item.ShortDescription;
                        this.langs.Cancel = item.ShortDescription2;
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
