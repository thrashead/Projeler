import * as tslib_1 from "tslib";
import { Component } from "@angular/core";
import { SinaService } from "../sina.service";
let GaleriComponent = class GaleriComponent {
    constructor(_sinaService) {
        this._sinaService = _sinaService;
    }
    ngOnInit() {
        this._sinaService.getResimler()
            .subscribe((resData) => {
            this.galeri = resData;
            setTimeout(function () {
                $("#slider").tdSlider({
                    autostart: false,
                    slideonclick: true,
                    imagestretch: false,
                    width: 600,
                    height: 500,
                    direction: "LTR",
                    duration: 1000,
                    effect: "fade",
                    showbuttons: true,
                    buttonstyle: "thumb",
                    thumbheight: 70,
                    thumbwidth: 100,
                    tabeffect: "fade",
                    tabbed: true,
                    border: 0
                });
            }, 500);
        }, resError => this.errorMsg = resError);
    }
};
GaleriComponent = tslib_1.__decorate([
    Component({
        templateUrl: './galeri.html',
        providers: [SinaService]
    })
], GaleriComponent);
export { GaleriComponent };
//# sourceMappingURL=galeri.js.map