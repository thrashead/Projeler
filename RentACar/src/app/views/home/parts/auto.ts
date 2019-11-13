import { Component, Input } from '@angular/core';
import { SiteService } from '../../../services/site';

@Component({
    selector: 'rac-homeauto',
    templateUrl: './auto.html'
})

export class HomeAutoComponent {
    errorMsg: string;

    makeList: any;
    carList: any;

    @Input() langs: any;

    constructor(private service: SiteService) {
    }

    ngOnInit() {
        this.GetMakeList();
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

            this.GetCarListByMakeCode();
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
