import { Component } from "@angular/core";

@Component({
    selector: 'app-layout',
    templateUrl: './layout.html'
})

export class LayoutComponent {
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