import * as tslib_1 from "tslib";
import { Injectable } from "@angular/core";
import { HttpClient } from '@angular/common/http';
var GirisService = /** @class */ (function () {
    function GirisService(http) {
        this.http = http;
    }
    GirisService = tslib_1.__decorate([
        Injectable(),
        tslib_1.__metadata("design:paramtypes", [HttpClient])
    ], GirisService);
    return GirisService;
}());
export { GirisService };
//# sourceMappingURL=giris.js.map