import * as tslib_1 from "tslib";
import { Component } from "@angular/core";
let LayoutComponent = class LayoutComponent {
    ngOnInit() {
    }
    onOver(event) {
        $(".sol .menu ul li a").removeClass("golgeli");
        $(event.target).addClass("golgeli");
    }
    onLeave(event) {
        $(".sol .menu ul li a").removeClass("golgeli");
    }
    onClick(event) {
        $(".sol .menu ul li a").removeClass("kareli");
        $(event.target).addClass("kareli");
    }
};
LayoutComponent = tslib_1.__decorate([
    Component({
        selector: 'app-layout',
        templateUrl: './layout.html'
    })
], LayoutComponent);
export { LayoutComponent };
//# sourceMappingURL=layout.js.map