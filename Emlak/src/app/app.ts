import { Component, OnInit } from "@angular/core";

declare global {
    interface JQuery {
        flexslider(obj: any): JQuery;
        tdSlider(obj: any): JQuery;
        dataTable(obj: any): JQuery;
        typeahead(obj: any): JQuery;
    }
}

@Component({
    selector: "emlak-app",
    templateUrl: './app.html'
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
