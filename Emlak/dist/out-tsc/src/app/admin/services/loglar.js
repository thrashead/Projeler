import * as tslib_1 from "tslib";
import { Injectable } from "@angular/core";
import { HttpClient } from '@angular/common/http';
var LoglarService = /** @class */ (function () {
    function LoglarService(http) {
        this.http = http;
        this.linkIndex = "Ajax/Loglar/Index";
    }
    LoglarService.prototype.getIndex = function () {
        return this.http.get(this.linkIndex);
    };
    LoglarService = tslib_1.__decorate([
        Injectable(),
        tslib_1.__metadata("design:paramtypes", [HttpClient])
    ], LoglarService);
    return LoglarService;
}());
export { LoglarService };
//# sourceMappingURL=loglar.js.map