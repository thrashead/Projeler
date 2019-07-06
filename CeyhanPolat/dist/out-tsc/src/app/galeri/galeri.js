import * as tslib_1 from "tslib";
import { Component } from "@angular/core";
import { CPService } from "../cp.service";
let GaleriComponent = class GaleriComponent {
    constructor(_cpService) {
        this._cpService = _cpService;
    }
    ngOnInit() {
        this._cpService.getGaleri()
            .subscribe((resGaleriData) => {
            this.galeri = resGaleriData;
            setTimeout(function () {
                $('#cpGallery').tdGallery({
                    imagefolder: "Gallery",
                    thumbfolder: "Thumb"
                });
            }, 500);
        }, resError => this.errorMsg = resError);
    }
};
GaleriComponent = tslib_1.__decorate([
    Component({
        templateUrl: './galeri.html',
        providers: [CPService]
    })
], GaleriComponent);
export { GaleriComponent };
//# sourceMappingURL=galeri.js.map