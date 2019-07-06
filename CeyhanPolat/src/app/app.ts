import { Component } from "@angular/core";

declare global {
    interface JQuery {
        flexslider(obj: any): JQuery;
        datepicker(obj: any): JQuery;
        tdGallery(obj: any): JQuery;
    }
}

@Component({
    selector: "cp-app",
    templateUrl: './app.html'
})

export class AppComponent {
    ngOnInit() {
    }
}