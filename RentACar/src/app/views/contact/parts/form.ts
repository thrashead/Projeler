import { Component } from '@angular/core';
import { SiteService } from '../../../services/site';
import { LangItem } from '../../../models/LangItem';
import { Lib } from '../../../lib/methods';

@Component({
    selector: 'rac-contactform',
    templateUrl: './form.html'
})

export class ContactFormComponent {
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
            this.langs.contact = new Object();

            resData.forEach((item, i) => {
                switch (item.Code) {
                    case "cntct_opnhrs": this.langs.openhours = item; break;
                    case "cntct_form":
                        switch (item.ShortCode) {
                            case "text": this.langs.contact.Text = item.ShortDescription2; break;
                            case "name": this.langs.contact.Name = item.ShortDescription; break;
                            case "mail":
                                this.langs.contact.Mail = item.ShortDescription;
                                this.langs.contact.Mail2 = item.Description2;
                                break;
                            case "phone":
                                this.langs.contact.Phone = item.ShortDescription;
                                this.langs.contact.Phone2 = item.Description2;
                                break;
                            case "fax":
                                this.langs.contact.Fax = item.ShortDescription;
                                this.langs.contact.Fax2 = item.Description2;
                                break;
                            case "adres":
                                this.langs.contact.Address = item.ShortDescription;
                                this.langs.contact.Address2 = item.Description2;
                                break;
                            case "cmnt": this.langs.contact.Comment = item.ShortDescription; break;
                            case "sbmt": this.langs.contact.Submit = item.ShortDescription; break;
                        }
                        break;
                    case "cntct_info":
                        switch (item.ShortCode) {
                            case "title": this.langs.contactinfo = item.ShortDescription; break;
                        }
                        break;
                }
            });
        }, resError => this.errorMsg = resError);
    }

    PushLangItems() {
        this.langItems = new Array<LangItem>();

        this.langItems.push(Lib.SetLangItem(this.langItem, "cntct_opnhrs"));
        this.langItems.push(Lib.SetLangItem(this.langItem, "cntct_form"));
        this.langItems.push(Lib.SetLangItem(this.langItem, "cntct_info", "title"));
    }
}
