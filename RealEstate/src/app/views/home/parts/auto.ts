import { Component } from '@angular/core';
import { SiteService } from '../../../services/site';

@Component({
    selector: 're-homeauto',
    templateUrl: './auto.html'
})

export class HomeAutoComponent {
    errorMsg: string;

    auto: any;

    constructor(private service: SiteService) {
    }

    ngOnInit() {
        this.GetLangContent();

        this.TabbedShowRoom();
    }

    //LangContent
    GetLangContent() {
        this.service.get("Site", "GetLangContentByCode", "home_insert", 1).subscribe((resData: any) => {
            this.auto = resData;
        }, resError => this.errorMsg = resError);
    }

    TabbedShowRoom() {
        $("ul#autoBest li a").off("click").on("click", function () {
            var model = $(this).attr("data-model");
            var activeTab = $("ul#autoBest").children("li.active");
            var faSpan = activeTab.find("span.fa");

            activeTab.removeClass("active");
            $(this).parent("li").append(faSpan);
            $(this).parent("li").addClass("active");

            $("#tabAutoBest .tab").hide();
            $("#tabAutoBest .tab[data-model='" + model + "']").fadeIn("slow");
        });
    }
}
