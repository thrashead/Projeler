import * as tslib_1 from "tslib";
import { Injectable } from "@angular/core";
import { HttpClient, HttpParams } from '@angular/common/http';
var HomeAjaxService = /** @class */ (function () {
    function HomeAjaxService(_http) {
        this._http = _http;
        this.linkSlider = "Home/Slider";
        this.linkVitrinIlanlar = "Home/VitrinIlanlar";
    }
    //Slider
    HomeAjaxService.prototype.getSlider = function () {
        return this._http.get(this.linkSlider);
    };
    //Vitrin İlanları
    HomeAjaxService.prototype.getVitrinIlanlar = function (adet) {
        var params = new HttpParams().set("adet", adet);
        return this._http.get(this.linkVitrinIlanlar, { params: params });
    };
    HomeAjaxService = tslib_1.__decorate([
        Injectable(),
        tslib_1.__metadata("design:paramtypes", [HttpClient])
    ], HomeAjaxService);
    return HomeAjaxService;
}());
export { HomeAjaxService };
//# sourceMappingURL=home.service.js.map