import * as tslib_1 from "tslib";
import { Injectable } from "@angular/core";
import { HttpClient } from '@angular/common/http';
var ZiyaretciService = /** @class */ (function () {
    function ZiyaretciService(http) {
        this.http = http;
        this.linkIndex = "Ajax/Ziyaretci/Index";
        this.linkSil = "Ajax/Ziyaretci/Sil";
    }
    ZiyaretciService.prototype.getIndex = function () {
        return this.http.get(this.linkIndex);
    };
    ZiyaretciService.prototype.getSil = function () {
        return this.http.get(this.linkSil);
    };
    ZiyaretciService = tslib_1.__decorate([
        Injectable(),
        tslib_1.__metadata("design:paramtypes", [HttpClient])
    ], ZiyaretciService);
    return ZiyaretciService;
}());
export { ZiyaretciService };
//# sourceMappingURL=ziyaretci.js.map