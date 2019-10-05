import { Component } from '@angular/core';
import { SiteService } from '../../../services/site';

@Component({
    selector: 'rac-homeauto',
    templateUrl: './auto.html'
})

export class HomeAutoComponent {
    errorMsg: string;

    allmakes: string;
    registered: string;

    auto: any;

    makeList: any;
    carList: any;

    constructor(private service: SiteService) {
    }

    ngOnInit() {
        this.GetLangContent();
        this.GetMakeList();
        this.GetCarListByMakeCode();
    }

    onClick($event: any, code: string) {
        var target = $event.target || $event.srcElement || $event.currentTarget;

        this.TabbedShowRoom(target);

        this.GetCarListByMakeCode(code);
    }

    //LangContent
    GetLangContent() {
        this.service.get("Site", "GetLangContentByCode", "home_auto", 1).subscribe((resData: any) => {
            this.auto = resData;
        }, resError => this.errorMsg = resError);

        this.service.get("Site", "GetLangContentByCode", "car_list_make", 1).subscribe((resData: any) => {
            this.allmakes = resData.ShortDescription;
        }, resError => this.errorMsg = resError);

        this.service.get("Site", "GetLangContentByCode", "cmn_rgstryr", 1).subscribe((resData: any) => {
            this.registered = resData.ShortDescription2;
        }, resError => this.errorMsg = resError);
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
}
