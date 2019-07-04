import * as tslib_1 from "tslib";
import { Injectable } from "@angular/core";
import { HttpClient, HttpParams } from '@angular/common/http';
var SolService = /** @class */ (function () {
    function SolService(_http) {
        this._http = _http;
        this.linkSolAraSonuc = "Sol/AramaSonuc";
        this.linkGununIlani = "Sol/GununIlani";
        this.linkYeniIlanlar = "Sol/YeniIlanlar";
        this.linkHaberler = "Sol/Haberler";
        this.linkSayac = "Sol/Sayac";
        this.linkSayfalar = "Sol/Sayfalar";
        this.linkKategoriMenu = "Sol/KategoriMenu";
    }
    //Sol Arama Sonuc
    SolService.prototype.getSolAraSonuc = function (kelime, tip) {
        var params = new HttpParams().set("kelime", kelime).set("tip", tip);
        return this._http.get(this.linkSolAraSonuc, { params: params });
    };
    //Gunun İlanı
    SolService.prototype.getGununIlani = function () {
        return this._http.get(this.linkGununIlani);
    };
    //Yeni İlanlar
    SolService.prototype.getYeniIlanlar = function (adet) {
        var params = new HttpParams().set("adet", adet);
        return this._http.get(this.linkYeniIlanlar, { params: params });
    };
    //Haberler
    SolService.prototype.getHaberler = function () {
        return this._http.get(this.linkHaberler);
    };
    //Sayac
    SolService.prototype.getSayac = function () {
        return this._http.get(this.linkSayac);
    };
    //Sayfalar
    SolService.prototype.getSayfalar = function () {
        return this._http.get(this.linkSayfalar);
    };
    //KategoriMenu
    SolService.prototype.getKategoriMenu = function () {
        return this._http.get(this.linkKategoriMenu);
    };
    SolService = tslib_1.__decorate([
        Injectable(),
        tslib_1.__metadata("design:paramtypes", [HttpClient])
    ], SolService);
    return SolService;
}());
export { SolService };
//# sourceMappingURL=sol.service.js.map