import * as tslib_1 from "tslib";
import { Injectable } from "@angular/core";
import { HttpClient, HttpParams } from '@angular/common/http';
var HomeService = /** @class */ (function () {
    function HomeService(_http) {
        this._http = _http;
        this.linkSlider = "Home/Slider";
        this.linkVitrinIlanlar = "Home/VitrinIlanlar";
    }
    //Slider
    HomeService.prototype.getSlider = function () {
        return this._http.get(this.linkSlider);
    };
    //Vitrin İlanları
    HomeService.prototype.getVitrinIlanlar = function (adet) {
        var params = new HttpParams().set("adet", adet);
        return this._http.get(this.linkVitrinIlanlar, { params: params });
    };
    HomeService = tslib_1.__decorate([
        Injectable(),
        tslib_1.__metadata("design:paramtypes", [HttpClient])
    ], HomeService);
    return HomeService;
}());
export { HomeService };
//# sourceMappingURL=home.service.js.map