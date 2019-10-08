import { Component } from '@angular/core';
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
            let langNewsItems: Array<LangItem>;
            let langNews: LangItem;
            langNewsItems = new Array<LangItem>();

            langNewsItems.push(Lib.SetLangItem(langNews, "home_newsletter_msg", "yes"));
            langNewsItems.push(Lib.SetLangItem(langNews, "home_newsletter_msg", "no"));

            if (answer) {
                this.service.post("Site", "SetLangContents", langNewsItems).subscribe((resData: any) => {
                    resData.forEach((item, i) => {
                        switch (item.Code) {
                            case "home_newsletter_msg":
                                switch (item.ShortCode) {
                                    case "yes": alert(item.ShortDescription2); break;
                                }
                                break;
                        }
                    });

                    this.newsForm.reset();
                }, resError => this.errorMsg = resError);
            }
            else {
                this.service.post("Site", "SetLangContents", langNewsItems).subscribe((resData: any) => {
                    resData.forEach((item, i) => {
                        switch (item.Code) {
                            case "home_newsletter_msg":
                                switch (item.ShortCode) {
                                    case "no": alert(item.ShortDescription2); break;
                                }
                                break;
                        }
                    });
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
                    case "cntct_form":
                        switch (item.ShortCode) {
                            case "name": this.langs.name = item.ShortDescription2; break;
                            case "mail": this.langs.mail = item.ShortDescription2; break;
                        }
                        break;
                }
            });
        }, resError => this.errorMsg = resError);
    }

    PushLangItems() {
        this.langItems = new Array<LangItem>();

        this.langItems.push(Lib.SetLangItem(this.langItem, "home_newsletter"));
        this.langItems.push(Lib.SetLangItem(this.langItem, "cntct_form", "name"));
        this.langItems.push(Lib.SetLangItem(this.langItem, "cntct_form", "mail"));
    }
}
