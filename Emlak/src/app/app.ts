import { Component } from "@angular/core";

declare global {
    interface JQuery {
        dataTable(obj: any): JQuery;
        typeahead(obj: any): JQuery;
        carousel(): JQuery;
        carousel(obj: any): JQuery;
        owlCarousel(obj: any): JQuery;
        tdSlider(obj: any): JQuery;
        selectpicker(): JQuery;
        slider(obj: any): JQuery;
    }
}

@Component({
    selector: "emlak-app",
    templateUrl: './app.html'
})

export class AppComponent {
    constructor() {

    }
}
