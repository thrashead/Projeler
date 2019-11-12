import { Component } from '@angular/core';
import { SiteService } from '../../../services/site';
import { LangItem } from '../../../models/LangItem';
import { Lib } from '../../../lib/methods';

@Component({
    selector: 'rac-footer',
    templateUrl: './footer.html'
})

export class FooterComponent {
    errorMsg: string;

    carList: any;
    socialList: any;

    constructor(private service: SiteService) {
    }

    ngOnInit() {
        this.SetLangContents();
    }

    //GetLastCars
    GetLastCars() {
        this.service.get("Site", "GetLastCars", 3).subscribe((resData: any) => {
            this.carList = resData;

            this.GetNoLangContent();
        }, resError => this.errorMsg = resError);
    }

    //GetNoLangContent
    GetNoLangContent() {
        this.service.get("Site", "GetNoLangContentByCode", "social").subscribe((resData: any) => {
            this.socialList = resData;
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
            this.langs.menu = new Object();
            this.langs.contact = new Object();
            this.langs.contact.phone = new Object();
            this.langs.contact.fax = new Object();
            this.langs.contact.mail = new Object();

            resData.forEach((item, i) => {
                switch (item.Code) {
                    case "cmn_lst_auto": this.langs.latestautos = item.ShortDescription; break;
                    case "ftr_feat_nohagg": this.langs.nohagg = item.ShortDescription; break;
                    case "ftr_feat_dealer": this.langs.dealer = item.ShortDescription; break;
                    case "ftr_feat_sftychk": this.langs.sftychk = item.ShortDescription; break;
                    case "cmn_readmore": this.langs.readmore = item.ShortDescription; break;
                    case "cmn_cntctus": this.langs.contactus = item.ShortDescription; break;
                    case "cntct_opnhrs": this.langs.openhours = item; break;
                    case "ftr_about": this.langs.about = item; break;
                    case "menu":
                        switch (item.ShortCode) {
                            case "home": this.langs.menu.home = item.ShortDescription; break;
                            case "list": this.langs.menu.list = item.ShortDescription; break;
                            case "compr": this.langs.menu.compare = item.ShortDescription; break;
                            case "book": this.langs.menu.book = item.ShortDescription; break;
                            case "about": this.langs.menu.about = item.ShortDescription; break;
                            case "blog": this.langs.menu.blog = item.ShortDescription; break;
                            case "cntct": this.langs.menu.contact = item.ShortDescription; break;
                        }
                        break;
                    case "cntct_form":
                        switch (item.ShortCode) {
                            case "adres": this.langs.contact.address = item.Description2; break;
                            case "phone": this.langs.contact.phone = item; break;
                            case "fax": this.langs.contact.fax = item; break;
                            case "mail": this.langs.contact.mail = item; break;
                        }
                        break;
                }
            });

            this.GetLastCars();
        }, resError => this.errorMsg = resError);
    }

    PushLangItems() {
        this.langItems = new Array<LangItem>();

        this.langItems.push(Lib.SetLangItem(this.langItem, "cmn_lst_auto"));
        this.langItems.push(Lib.SetLangItem(this.langItem, "ftr_feat_nohagg"));
        this.langItems.push(Lib.SetLangItem(this.langItem, "ftr_feat_dealer"));
        this.langItems.push(Lib.SetLangItem(this.langItem, "ftr_feat_sftychk"));
        this.langItems.push(Lib.SetLangItem(this.langItem, "cmn_readmore"));
        this.langItems.push(Lib.SetLangItem(this.langItem, "cmn_cntctus"));
        this.langItems.push(Lib.SetLangItem(this.langItem, "cntct_opnhrs"));
        this.langItems.push(Lib.SetLangItem(this.langItem, "ftr_about"));
        this.langItems.push(Lib.SetLangItem(this.langItem, "menu"));
        this.langItems.push(Lib.SetLangItem(this.langItem, "cntct_form", "adres"));
        this.langItems.push(Lib.SetLangItem(this.langItem, "cntct_form", "phone"));
        this.langItems.push(Lib.SetLangItem(this.langItem, "cntct_form", "fax"));
        this.langItems.push(Lib.SetLangItem(this.langItem, "cntct_form", "mail"));
    }
}
