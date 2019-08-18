import { Component } from '@angular/core';

@Component({
    selector: 'rac-homeauto',
    templateUrl: './auto.html'
})

export class HomeAutoComponent {
    ngOnInit() {
        this.TabbedShowRoom();
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
