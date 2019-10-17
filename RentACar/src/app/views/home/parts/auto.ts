import { Component } from '@angular/core';
import { SiteService } from '../../../services/site';
import { LangItem } from '../../../models/LangItem';
import { Lib } from '../../../lib/methods';

@Component({
    selector: 'rac-homeauto',
    templateUrl: './auto.html'
})

export class HomeAutoComponent {
    errorMsg: string;

    makeList: any;
    carList: any;

    constructor(private service: SiteService) {
    }

    ngOnInit() {
        this.SetLangContents();
        this.GetMakeList();
        this.GetCarListByMakeCode();
    }

    onClick($event: any, code: string) {
        var target = $event.target || $event.srcElement || $event.currentTarget;

        this.TabbedShowRoom(target);

        this.GetCarListByMakeCode(code);
    }

    //MakeList
    GetMakeList() {
        this.service.get("Site", "GetMakeList").subscribe((resData: any) => {
            this.makeList = resData;
        }, resError => this.errorMsg = resError);
    }

    //CarListByMakeCode
    GetCarListByMakeCode(code: string = null) {
        code = code == "all" ? null : code;

        this.service.get("Site", "GetCarListByMakeCode", code, 6).subscribe((resData: any) => {
            this.carList = resData;
        }, resError => this.errorMsg = resError);
    }

    TabbedShowRoom(target: any) {
        var model = target.attributes["data-model"].value;
        var activeTab = $("ul#autoBest").children("li.active");
        var faSpan = activeTab.find("span.fa");

        $("#tabAutoBest > div.tab").attr("data-model", model);

        activeTab.removeClass("active");

        $(target).parent("li").append(faSpan);
        $(target).parent("li").addClass("active");

        $("#tabAutoBest .tab").hide();
        $("#tabAutoBest .tab[data-model='" + model + "']").fadeIn("slow");
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
                    case "home_auto": this.langs.auto = item; break;
                    case "car_list_make": this.langs.allmakes = item.ShortDescription; break;
                    case "cmn_rgstryr": this.langs.registered = item.ShortDescription2; break;
                    case "cmn_price_opt": this.langs.DayPrice = item.ShortDescription; break;
                }
            });
        }, resError => this.errorMsg = resError);
    }

    PushLangItems() {
        this.langItems = new Array<LangItem>();

        this.langItems.push(Lib.SetLangItem(this.langItem, "home_auto"));
        this.langItems.push(Lib.SetLangItem(this.langItem, "car_list_make"));
        this.langItems.push(Lib.SetLangItem(this.langItem, "cmn_rgstryr"));
        this.langItems.push(Lib.SetLangItem(this.langItem, "cmn_price_opt"));
    }
}
