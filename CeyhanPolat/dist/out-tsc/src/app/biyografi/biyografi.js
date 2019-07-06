import * as tslib_1 from "tslib";
import { Component } from "@angular/core";
import { CPService } from "../cp.service";
let BiyografiComponent = class BiyografiComponent {
    constructor(_cpService) {
        this._cpService = _cpService;
    }
    ngOnInit() {
        this._cpService.getBiyografi()
            .subscribe(resBiyografiData => this.biyografi = resBiyografiData, resError => this.errorMsg = resError);
    }
};
BiyografiComponent = tslib_1.__decorate([
    Component({
        templateUrl: './biyografi.html',
        providers: [CPService]
    })
], BiyografiComponent);
export { BiyografiComponent };
//# sourceMappingURL=biyografi.js.map