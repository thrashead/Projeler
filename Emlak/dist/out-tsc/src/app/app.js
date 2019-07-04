import * as tslib_1 from "tslib";
import { Component } from "@angular/core";
var AppComponent = /** @class */ (function () {
    function AppComponent() {
    }
    AppComponent.prototype.ngOnInit = function () {
        $("#scrolltop").click(function () {
            $("html, body").animate({
                scrollTop: 0
            }, 1000);
        });
    };
    AppComponent = tslib_1.__decorate([
        Component({
            selector: "emlak-app",
            templateUrl: './app.html'
        }),
        tslib_1.__metadata("design:paramtypes", [])
    ], AppComponent);
    return AppComponent;
}());
export { AppComponent };
//# sourceMappingURL=app.js.map