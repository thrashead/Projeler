import { Component } from "@angular/core";

declare global {
    interface JQuery {
        tdSlider(obj: any): JQuery;
    }
}

@Component({
    selector: "sina-app",
    templateUrl: 'app/app.component.html'
})

export class AppComponent {

    constructor() {

    }

    ngOnInit() {

    }

    onOver(event: any) {
        $(".sol .menu ul li a").removeClass("golgeli");
        $(event.target).addClass("golgeli");
    }

    onLeave(event: any) {
        $(".sol .menu ul li a").removeClass("golgeli");
    }

    onClick(event: any) {
        $(".sol .menu ul li a").removeClass("kareli");
        $(event.target).addClass("kareli");
    }
}