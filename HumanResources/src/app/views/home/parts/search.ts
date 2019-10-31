import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { SiteService } from '../../../services/site';
import { LangItem } from '../../../models/LangItem';
import { Lib } from '../../../lib/methods';

@Component({
    selector: 'hr-homesearch',
    templateUrl: './search.html'
})

export class HomeSearchComponent {
    errorMsg: string;

    searchForm: FormGroup;

    data: any;

    constructor(private service: SiteService, private formBuilder: FormBuilder) {
    }

    ngOnInit() {
        this.SetLangContents();

        this.searchForm = this.formBuilder.group({
            Words: new FormControl(null, [Validators.required, Validators.minLength(3), Validators.maxLength(255)]),
            City: new FormControl(null),
        });

        setTimeout(() => {
            Lib.ComboChange("slcCity");
        }, 2500);
    }

    onClick() {
        this.data = new Object();

        this.data.Words = this.searchForm.get("Words").value;
        this.data.City = $("#slcCity").children("option[selected='selected']").val();

        this.service.post("Search", "HomeSearch", this.data).subscribe((answer: boolean) => {

        }, resError => this.errorMsg = resError);
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
                    case "hdr_pnl": this.langs.panelLogin = item.ShortDescription; break;
                }
            });
        }, resError => this.errorMsg = resError);
    }

    PushLangItems() {
        this.langItems = new Array<LangItem>();

        this.langItems.push(Lib.SetLangItem(this.langItem, "hdr_pnl"));
    }
}
