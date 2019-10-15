import { Component, Output } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { SiteService } from '../../../services/site';
import { Lib } from '../../../lib/methods';
import { LangItem } from '../../../models/LangItem';

@Component({
    selector: 'rac-contactform',
    templateUrl: './form.html'
})

export class ContactFormComponent {
    errorMsg: string;

    @Output() alert: string;

    contactForm: FormGroup;

    data: any;

    constructor(private service: SiteService, private formBuilder: FormBuilder) {
    }

    ngOnInit() {
        this.SetLangContents();

        this.contactForm = this.formBuilder.group({
            Sender: new FormControl(null, [Validators.required, Validators.minLength(5), Validators.maxLength(50)]),
            Mail: new FormControl(null, Validators.compose([Validators.required, Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')])),
            Phone: new FormControl(null, [Validators.required, Validators.minLength(5), Validators.maxLength(15)]),
            Message: new FormControl(null, [Validators.required, Validators.minLength(25), Validators.maxLength(500)])
        });
    }

    onClick() {
        this.data = new Object();

        this.data.Sender = this.contactForm.get("Sender").value;
        this.data.Mail = this.contactForm.get("Mail").value;
        this.data.Phone = this.contactForm.get("Phone").value;
        this.data.Message = this.contactForm.get("Message").value;

        this.service.post("Site", "SendContactForm", this.data).subscribe((resData: any) => {
            $("#modalAlert").addClass("show");

            if (resData == true) {
                this.alert = this.langs.contact.Alert;

                this.contactForm.reset();
            }
            else {
                this.alert = this.langs.contact.Error;
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
            this.langs.contact = new Object();

            resData.forEach((item, i) => {
                switch (item.Code) {
                    case "cntct_opnhrs": this.langs.openhours = item; break;
                    case "cmn_error_onemsg": this.langs.contact.Error = item.ShortDescription; break;
                    case "cntct_form":
                        switch (item.ShortCode) {
                            case "text": this.langs.contact.Text = item.ShortDescription2; break;
                            case "name": this.langs.contact.Sender = item.ShortDescription; break;
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
                            case "cmnt": this.langs.contact.Message = item.ShortDescription; break;
                            case "sbmt": this.langs.contact.Submit = item.ShortDescription; break;
                            case "alert": this.langs.contact.Alert = item.ShortDescription; break;
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
        this.langItems.push(Lib.SetLangItem(this.langItem, "cmn_error_onemsg"));
    }
}
