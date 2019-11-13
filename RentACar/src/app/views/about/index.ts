import { Component } from "@angular/core";
import { SiteService } from '../../services/site';
import { LangItem } from '../../models/LangItem';
import { Lib } from '../../lib/methods';

@Component({
    templateUrl: './index.html'
})

export class AboutComponent {
    errorMsg: string;

    constructor(private service: SiteService) {
    }

    ngOnInit() {
        this.SetLangContents();
    }

    //LangContents
    langItems: Array<LangItem>;
    langItem: LangItem;

    moreLangs: any;
    breadcumbsLangs: any;
    headerLangs: any;
    workersLangs: any;
    bestLangs: any;
    whatLangs: any;

    //LangContent
    SetLangContents() {
        this.PushLangItems();

        this.service.post("Site", "SetLangContents", this.langItems).subscribe((resData: any) => {
            this.moreLangs = new Object();
            this.moreLangs.why = new Object();
            this.moreLangs.moreList = new Array<any>();
            this.breadcumbsLangs = new Object();
            this.breadcumbsLangs.menu = new Object();
            this.headerLangs = new Object();
            this.workersLangs = new Object();
            this.bestLangs = new Object();
            this.whatLangs = new Object();
            this.whatLangs.whathead = new Object();
            this.whatLangs.whatprice = new Object();
            this.whatLangs.whatfleet = new Object();
            this.whatLangs.whatsafety = new Object();

            resData.forEach((item, i) => {
                switch (item.Code) {
                    //More
                    case "about_more_info": this.moreLangs.moreList.push(item); break;
                    case "about_more":
                        switch (item.ShortCode) {
                            case "why": this.moreLangs.why = item; break;
                            case "info": this.moreLangs.info = item.ShortDescription; break;
                        }
                        break;

                    //BreadCumbs
                    case "menu":
                        switch (item.ShortCode) {
                            case "home": this.breadcumbsLangs.menu.home = item.ShortDescription2; break;
                            case "about": this.breadcumbsLangs.menu.about = item.ShortDescription2; break;
                        }
                        break;

                    //Header
                    case "about_head": this.headerLangs.header = item; break;

                    //Workers
                    case "about_workers": this.workersLangs.workers = item; break;

                    //Best
                    case "cmn_go_list": this.bestLangs.gotolist = item.ShortDescription2; break;
                    case "about_best": this.bestLangs.best = item; break;

                    //What
                    case "about_what":
                        switch (item.ShortCode) {
                            case "head": this.whatLangs.whathead = item; break;
                            case "price": this.whatLangs.whatprice = item; break;
                            case "fleet": this.whatLangs.whatfleet = item; break;
                            case "safety": this.whatLangs.whatsafety = item; break;
                        }
                        break;
                }
            });
        }, resError => this.errorMsg = resError);
    }

    PushLangItems() {
        this.langItems = new Array<LangItem>();

        //More
        this.langItems.push(Lib.SetLangItem(this.langItem, "about_more_info"));
        this.langItems.push(Lib.SetLangItem(this.langItem, "about_more", "why"));
        this.langItems.push(Lib.SetLangItem(this.langItem, "about_more", "info"));

        //BreadCumbs
        this.langItems.push(Lib.SetLangItem(this.langItem, "menu", "home"));
        this.langItems.push(Lib.SetLangItem(this.langItem, "menu", "about"));

        //Header
        this.langItems.push(Lib.SetLangItem(this.langItem, "about_head"));

        //Workers
        this.langItems.push(Lib.SetLangItem(this.langItem, "about_workers"));

        //Best
        this.langItems.push(Lib.SetLangItem(this.langItem, "cmn_go_list"));
        this.langItems.push(Lib.SetLangItem(this.langItem, "about_best"));

        //What
        this.langItems.push(Lib.SetLangItem(this.langItem, "about_what"));
    }
}