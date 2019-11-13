import { Component } from "@angular/core";
import { SiteService } from '../../services/site';
import { LangItem } from '../../models/LangItem';
import { Lib } from '../../lib/methods';

@Component({
    templateUrl: './index.html'
})

export class ContactComponent {
    errorMsg: string;

    constructor(private service: SiteService) {
    }

    ngOnInit() {
        this.SetLangContents();
    }

    //LangContents
    langItems: Array<LangItem>;
    langItem: LangItem;
    headerLangs: any;
    breadcumbsLangs: any;
    formLangs: any;

    //LangContent
    SetLangContents() {
        this.PushLangItems();

        this.service.post("Site", "SetLangContents", this.langItems).subscribe((resData: any) => {
            this.headerLangs = new Object();
            this.breadcumbsLangs = new Object();
            this.breadcumbsLangs.menu = new Object();
            this.formLangs = new Object();
            this.formLangs.contact = new Object();

            resData.forEach((item, i) => {
                switch (item.Code) {
                    //Header
                    case "cntct_head": this.headerLangs.header = item; break;

                    //BreadCumbs
                    case "menu":
                        switch (item.ShortCode) {
                            case "home": this.breadcumbsLangs.menu.home = item.ShortDescription2; break;
                            case "cntct": this.breadcumbsLangs.menu.contact = item.ShortDescription2; break;
                        }
                        break;

                    //Form
                    case "cntct_opnhrs": this.formLangs.openhours = item; break;
                    case "cmn_error_onemsg": this.formLangs.contact.Error = item.ShortDescription; break;
                    case "cntct_form":
                        switch (item.ShortCode) {
                            case "text": this.formLangs.contact.Text = item.ShortDescription2; break;
                            case "name": this.formLangs.contact.Sender = item.ShortDescription; break;
                            case "mail":
                                this.formLangs.contact.Mail = item.ShortDescription;
                                this.formLangs.contact.Mail2 = item.Description2;
                                break;
                            case "phone":
                                this.formLangs.contact.Phone = item.ShortDescription;
                                this.formLangs.contact.Phone2 = item.Description2;
                                break;
                            case "fax":
                                this.formLangs.contact.Fax = item.ShortDescription;
                                this.formLangs.contact.Fax2 = item.Description2;
                                break;
                            case "adres":
                                this.formLangs.contact.Address = item.ShortDescription;
                                this.formLangs.contact.Address2 = item.Description2;
                                break;
                            case "cmnt": this.formLangs.contact.Message = item.ShortDescription; break;
                            case "sbmt": this.formLangs.contact.Submit = item.ShortDescription; break;
                            case "alert": this.formLangs.contact.Alert = item.ShortDescription; break;
                        }
                        break;
                    case "cntct_info":
                        switch (item.ShortCode) {
                            case "title": this.formLangs.contactinfo = item.ShortDescription; break;
                        }
                        break;
                }
            });

        }, resError => this.errorMsg = resError);
    }

    PushLangItems() {
        this.langItems = new Array<LangItem>();

        //Header
        this.langItems.push(Lib.SetLangItem(this.langItem, "cntct_head"));

        //BreadCumbs
        this.langItems.push(Lib.SetLangItem(this.langItem, "menu", "home"));
        this.langItems.push(Lib.SetLangItem(this.langItem, "menu", "cntct"));

        //Form
        this.langItems.push(Lib.SetLangItem(this.langItem, "cntct_opnhrs"));
        this.langItems.push(Lib.SetLangItem(this.langItem, "cntct_form"));
        this.langItems.push(Lib.SetLangItem(this.langItem, "cntct_info", "title"));
        this.langItems.push(Lib.SetLangItem(this.langItem, "cmn_error_onemsg"));
    }
}