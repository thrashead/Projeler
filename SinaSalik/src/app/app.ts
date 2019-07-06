import { Component } from "@angular/core";

declare global {
    interface JQuery {
        tdSlider(obj: any): JQuery;
    }
}

@Component({
    selector: "sina-app",
    templateUrl: './app.html'
})

export class AppComponent {

    constructor() {

    }

    ngOnInit() {

    }
}