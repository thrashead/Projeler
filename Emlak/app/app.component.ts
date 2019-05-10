import { Component, OnInit } from "@angular/core";
import { EmlakService } from "./emlak.service";

declare global {
    interface JQuery {
        flexslider(obj: any): JQuery;
        tdSlider(obj: any): JQuery;
    }
}

@Component({
    selector: "emlak-app",
    templateUrl: 'app/app.component.html',
    providers: [EmlakService]
})

export class AppComponent implements OnInit {
    constructor() {

    }

    ngOnInit() {
        $("#scrolltop").click(function () {
            $("html, body").animate({
                scrollTop: 0
            }, 1000);
        });
    }
}