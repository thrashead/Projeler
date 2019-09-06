import { Component } from '@angular/core';
import { SiteService } from '../../../services/site';

@Component({
    selector: 'rac-contactform',
    templateUrl: './form.html'
})

export class ContactFormComponent {
    errorMsg: string;

    contactinfo: string;

    form: any;
    openhours: any;

    constructor(private service: SiteService) {
    }

    ngOnInit() {
        this.GetLangContent();
    }

    //LangContent
    GetLangContent() {
        this.service.get("Site", "GetLangContentByCode", "cntct_form").subscribe((resData: any) => {
            this.form = new Object();

            resData.forEach((item, index) => {
                switch (item.ShortCode) {
                    case "text":
                        this.form.Text = item;
                        break;
                    case "name":
                        this.form.Name = item;
                        break;
                    case "mail":
                        this.form.Mail = item;
                        break;
                    case "phone":
                        this.form.Phone = item;
                        break;
                    case "fax":
                        this.form.Fax = item;
                        break;
                    case "adres":
                        this.form.Address = item;
                        break;
                    case "cmnt":
                        this.form.Comment = item;
                        break;
                    case "sbmt":
                        this.form.Submit = item;
                        break;
                }
            });
        }, resError => this.errorMsg = resError);

        this.service.get("Site", "GetLangContentByCodeAndShortCode", "cntct_info", "title", 1).subscribe((resData: any) => {
            this.contactinfo = resData.ShortDescription;
        }, resError => this.errorMsg = resError);

        this.service.get("Site", "GetLangContentByCode", "cntct_opnhrs", 1).subscribe((resData: any) => {
            this.openhours = resData;
        }, resError => this.errorMsg = resError);
    }
}
