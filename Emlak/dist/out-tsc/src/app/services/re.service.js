import * as tslib_1 from "tslib";
import { Injectable } from "@angular/core";
import { HttpClient, HttpParams } from '@angular/common/http';
var REAjaxService = /** @class */ (function () {
    function REAjaxService(_http) {
        this._http = _http;
        this.linkEmlakDetay = "RE/Detay";
        this.linkEmlakListele = "RE/Listele";
        this.linkEmlakDetayliAraSession = "RE/DetayliAramaSession";
        this.linkKategoriler = "RE/Kategoriler";
        this.linkSehirler = "RE/Sehirler";
    }
    //Emlak Detay
    REAjaxService.prototype.getEmlakDetay = function (link) {
        var params = new HttpParams().set("link", link);
        return this._http.get(this.linkEmlakDetay, { params: params });
    };
    //Emlak Listele
    REAjaxService.prototype.getEmlakListele = function (reData) {
        var params = new HttpParams().set("reData", JSON.stringify(reData));
        return this._http.get(this.linkEmlakListele, { params: params });
    };
    //Emlak Detaylı Arama Session
    REAjaxService.prototype.getEmlakDetayliArama = function (realCP) {
        return this._http.post(this.linkEmlakDetayliAraSession, { realCP: realCP });
    };
    //Kategoriler
    REAjaxService.prototype.getKategoriler = function (parentID) {
        var params = new HttpParams().set("parentID", parentID);
        return this._http.get(this.linkKategoriler, { params: params });
    };
    //Şehirler
    REAjaxService.prototype.getSehirler = function () {
        return this._http.get(this.linkSehirler);
    };
    REAjaxService = tslib_1.__decorate([
        Injectable(),
        tslib_1.__metadata("design:paramtypes", [HttpClient])
    ], REAjaxService);
    return REAjaxService;
}());
export { REAjaxService };
//# sourceMappingURL=re.service.js.map