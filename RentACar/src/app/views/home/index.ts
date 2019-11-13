import { Component } from "@angular/core";
import { SiteService } from '../../services/site';
import { LangItem } from '../../models/LangItem';
import { Lib } from '../../lib/methods';

@Component({
    templateUrl: './index.html'
})

export class IndexComponent {
    errorMsg: string;

    constructor(private service: SiteService) {
    }

    ngOnInit() {
        this.SetLangContents();
    }

    //LangContents
    langItems: Array<LangItem>;
    langItem: LangItem;

    sliderLangs: any;
    searchLangs: any;
    featuredLangs: any;
    welcomeLangs: any;
    worldLangs: any;
    asksLangs: any;
    autoLangs: any;
    newsletterLangs: any;

    //LangContent
    SetLangContents() {
        this.PushLangItems();

        this.service.post("Site", "SetLangContents", this.langItems).subscribe((resData: any) => {
            this.sliderLangs = new Object();
            this.searchLangs = new Object();
            this.featuredLangs = new Object();
            this.welcomeLangs = new Object();
            this.worldLangs = new Object();
            this.asksLangs = new Object();
            this.autoLangs = new Object();
            this.newsletterLangs = new Object();

            resData.forEach((item, i) => {
                switch (item.Code) {
                    //Asks
                    case "home_asks_search": this.asksLangs.search = item; break;
                    case "home_asks_compare": this.asksLangs.compare = item; break;
                    case "cmn_callus": this.asksLangs.callus = item.ShortDescription; break;
                    case "cntct_form":
                        switch (item.ShortCode) {
                            case "phone": this.asksLangs.phone = item.Description; break;
                        }
                        break;

                    //Auto
                    case "home_auto": this.autoLangs.auto = item; break;
                    case "car_list_make": this.autoLangs.allmakes = item.ShortDescription; break;
                    case "cmn_rgstryr": this.autoLangs.registered = item.ShortDescription2; break;
                    case "cmn_price_opt":
                        this.autoLangs.DayPrice = item.ShortDescription;
                        this.featuredLangs.DayPrice = item.ShortDescription;
                        this.sliderLangs.DayPrice = item.ShortDescription;
                        break;

                    //Featured
                    case "home_ftrdvhcl": this.featuredLangs.featuredvehicles = item.ShortDescription; break;

                    //World
                    case "home_world": this.worldLangs.world = item; break;
                    case "cmn_readmore": this.worldLangs.readmore = item.ShortDescription; break;

                    //Newsletter
                    case "home_newsletter": this.newsletterLangs.newsletter = item; break;
                    case "cntct_form":
                        switch (item.ShortCode) {
                            case "name": this.newsletterLangs.name = item.ShortDescription2; break;
                            case "mail": this.newsletterLangs.mail = item.ShortDescription2; break;
                        }
                        break;

                    //Welcome
                    case "home_wlcm_loans": this.welcomeLangs.loans = item.ShortDescription; break;
                    case "home_wlcm_trade": this.welcomeLangs.trade = item.ShortDescription; break;
                    case "home_wlcm_guide": this.welcomeLangs.guide = item.ShortDescription; break;
                    case "home_wlcm_support": this.welcomeLangs.support = item.ShortDescription; break;

                    //Search
                    case "mnsrc_whcvhcl": this.searchLangs.whichVehicle = item.ShortDescription; break;
                    case "src_bodytype": this.searchLangs.bodyTypeText = item.ShortDescription; break;
                    case "src_make": this.searchLangs.makeText = item.ShortDescription; break;
                    case "src_model": this.searchLangs.modelText = item.ShortDescription; break;
                    case "src_status": this.searchLangs.carStatusText = item.ShortDescription; break;
                    case "src_minyear": this.searchLangs.minYearText = item.ShortDescription; break;
                    case "src_maxyear": this.searchLangs.maxYearText = item.ShortDescription; break;
                    case "src_prcrng": this.searchLangs.priceRangeText = item.ShortDescription; break;
                    case "src_src": this.searchLangs.search = item.ShortDescription2; break;
                    case "src_dtlsrc": this.searchLangs.detailSearch = item.ShortDescription2; break;

                    //Slider
                    case "cmn_detail": this.sliderLangs.detail = item.ShortDescription; break;
                }
            });
        }, resError => this.errorMsg = resError);
    }

    PushLangItems() {
        this.langItems = new Array<LangItem>();

        //Asks
        this.langItems.push(Lib.SetLangItem(this.langItem, "home_asks_search"));
        this.langItems.push(Lib.SetLangItem(this.langItem, "home_asks_compare"));
        this.langItems.push(Lib.SetLangItem(this.langItem, "cmn_callus"));
        this.langItems.push(Lib.SetLangItem(this.langItem, "cntct_form", "phone"));

        //Auto
        this.langItems.push(Lib.SetLangItem(this.langItem, "home_auto"));
        this.langItems.push(Lib.SetLangItem(this.langItem, "car_list_make"));
        this.langItems.push(Lib.SetLangItem(this.langItem, "cmn_rgstryr"));
        this.langItems.push(Lib.SetLangItem(this.langItem, "cmn_price_opt"));

        //Featured
        this.langItems.push(Lib.SetLangItem(this.langItem, "home_ftrdvhcl"));

        //World
        this.langItems.push(Lib.SetLangItem(this.langItem, "home_world"));
        this.langItems.push(Lib.SetLangItem(this.langItem, "cmn_readmore"));

        //Newsletter
        this.langItems.push(Lib.SetLangItem(this.langItem, "home_newsletter"));
        this.langItems.push(Lib.SetLangItem(this.langItem, "cntct_form", "name"));
        this.langItems.push(Lib.SetLangItem(this.langItem, "cntct_form", "mail"));

        //Welcome
        this.langItems.push(Lib.SetLangItem(this.langItem, "home_wlcm_loans"));
        this.langItems.push(Lib.SetLangItem(this.langItem, "home_wlcm_trade"));
        this.langItems.push(Lib.SetLangItem(this.langItem, "home_wlcm_guide"));
        this.langItems.push(Lib.SetLangItem(this.langItem, "home_wlcm_support"));

        //Search
        this.langItems.push(Lib.SetLangItem(this.langItem, "mnsrc_whcvhcl"));
        this.langItems.push(Lib.SetLangItem(this.langItem, "src_bodytype"));
        this.langItems.push(Lib.SetLangItem(this.langItem, "src_make"));
        this.langItems.push(Lib.SetLangItem(this.langItem, "src_model"));
        this.langItems.push(Lib.SetLangItem(this.langItem, "src_status"));
        this.langItems.push(Lib.SetLangItem(this.langItem, "src_minyear"));
        this.langItems.push(Lib.SetLangItem(this.langItem, "src_maxyear"));
        this.langItems.push(Lib.SetLangItem(this.langItem, "src_prcrng"));
        this.langItems.push(Lib.SetLangItem(this.langItem, "src_src"));
        this.langItems.push(Lib.SetLangItem(this.langItem, "src_dtlsrc"));

        //Slider
        this.langItems.push(Lib.SetLangItem(this.langItem, "cmn_detail"));
    }
}