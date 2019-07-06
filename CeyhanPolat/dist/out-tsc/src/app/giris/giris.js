import * as tslib_1 from "tslib";
import { Component } from "@angular/core";
import { CPService } from "../cp.service";
let GirisComponent = class GirisComponent {
    constructor(_cpService) {
        this._cpService = _cpService;
    }
    ngOnInit() {
        this._cpService.getRasgeleSiir()
            .subscribe(resRasgeleSiirData => this.rasgeleSiir = resRasgeleSiirData, resError => this.errorMsg = resError);
        this._cpService.getKisaBiyografi()
            .subscribe(resKisaBiyografiData => this.kisaBiyografi = resKisaBiyografiData, resError => this.errorMsg = resError);
    }
};
GirisComponent = tslib_1.__decorate([
    Component({
        templateUrl: './giris.html',
        providers: [CPService]
    })
], GirisComponent);
export { GirisComponent };
//# sourceMappingURL=giris.js.map