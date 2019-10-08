﻿import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { SiteService } from '../../../services/site';
import { LangItem } from '../../../models/LangItem';
import { Lib } from '../../../lib/methods';

@Component({
    selector: 'rac-homenewsletter',
    templateUrl: './newsletter.html'
})

export class HomeNewsletterComponent {
    errorMsg: string;

    newsForm: FormGroup;
    data: any;

    name: string;
    mail: string;

    constructor(private service: SiteService, private formBuilder: FormBuilder) {
    }

    ngOnInit() {
        this.SetLangContents();

        this.newsForm = this.formBuilder.group({
            Name: new FormControl(null, [Validators.required, Validators.minLength(3)]),
            Mail: new FormControl(null, Validators.compose([Validators.required, Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')])),
        });
    }

    onClick() {
        this.data = new Object();
        this.data.Name = this.newsForm.get("Name").value;
        this.data.Mail = this.newsForm.get("Mail").value;

        this.service.post("Site", "SendNewsletter", this.data).subscribe((answer: boolean) => {
            if (answer) {
                this.service.get("Site", "GetLangContentByCodeAndShortCode", "home_newsletter_msg", "yes", 1).subscribe((resData: any) => {
                    alert(resData.ShortDescription2);

                    this.newsForm.reset();
                }, resError => this.errorMsg = resError);
            }
            else {
                this.service.get("Site", "GetLangContentByCodeAndShortCode", "home_newsletter_msg", "no", 1).subscribe((resData: any) => {
                    alert(resData.ShortDescription2);
                }, resError => this.errorMsg = resError);
            }
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
                    case "home_newsletter": this.langs.newsletter = item; break;
                }
            });
        }, resError => this.errorMsg = resError);

        this.service.get("Site", "GetLangContentByCodeAndShortCode", "cntct_form", "name", 1).subscribe((resData: any) => {
            this.name = resData.ShortDescription2;
        }, resError => this.errorMsg = resError);

        this.service.get("Site", "GetLangContentByCodeAndShortCode", "cntct_form", "mail", 1).subscribe((resData: any) => {
            this.mail = resData.ShortDescription2;
        }, resError => this.errorMsg = resError);
    }

    PushLangItems() {
        this.langItems = new Array<LangItem>();

        this.langItems.push(Lib.SetLangItem(this.langItem, "home_newsletter"));
    }
}
