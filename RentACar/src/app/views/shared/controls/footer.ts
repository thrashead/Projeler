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

    address: any;
    phone: any;
    mail: any;
    fax: any;
    menu: any;

    carList: any;

    constructor(private service: SiteService) {
    }

    ngOnInit() {
        this.SetLangContents();
        this.GetLastCars();
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
                    case "cmn_lst_auto": this.langs.latestautos = item.ShortDescription; break;
                    case "ftr_feat_nohagg": this.langs.nohagg = item.ShortDescription; break;
                    case "ftr_feat_dealer": this.langs.dealer = item.ShortDescription; break;
                    case "ftr_feat_sftychk": this.langs.sftychk = item.ShortDescription; break;
                    case "cmn_readmore": this.langs.readmore = item.ShortDescription; break;
                    case "cmn_cntctus": this.langs.contactus = item.ShortDescription; break;
                    case "cntct_opnhrs": this.langs.openhours = item; break;
                    case "ftr_about": this.langs.about = item; break;
                }
            });

        }, resError => this.errorMsg = resError);

        this.service.get("Site", "GetLangContentByCodeAndShortCode", "cntct_form", "adres", 1).subscribe((resData: any) => {
            this.address = resData.Description2;
        }, resError => this.errorMsg = resError);

        this.service.get("Site", "GetLangContentByCodeAndShortCode", "cntct_form", "phone", 1).subscribe((resData: any) => {
            this.phone = resData;
        }, resError => this.errorMsg = resError);

        this.service.get("Site", "GetLangContentByCodeAndShortCode", "cntct_form", "fax", 1).subscribe((resData: any) => {
            this.fax = resData;
        }, resError => this.errorMsg = resError);

        this.service.get("Site", "GetLangContentByCodeAndShortCode", "cntct_form", "mail", 1).subscribe((resData: any) => {
            this.mail = resData;
        }, resError => this.errorMsg = resError);

        this.service.get("Site", "GetLangContentByCode", "menu").subscribe((resData: any) => {
            this.menu = new Object();

            resData.forEach((item, i) => {
                switch (item.ShortCode) {
                    case "home":
                        this.menu.Home = item.ShortDescription2;
                        break;
                    case "list":
                        this.menu.List = item.ShortDescription2;
                        break;
                    case "compr":
                        this.menu.Compare = item.ShortDescription2;
                        break;
                    case "about":
                        this.menu.About = item.ShortDescription2;
                        break;
                    case "blog":
                        this.menu.Blog = item.ShortDescription2;
                        break;
                    case "cntct":
                        this.menu.Contact = item.ShortDescription2;
                        break;
                }
            });
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
    }

    //GetLastCars
    GetLastCars() {
        this.service.get("Site", "GetLastCars", 3).subscribe((resData: any) => {
            this.carList = resData;
        }, resError => this.errorMsg = resError);
    }
}
