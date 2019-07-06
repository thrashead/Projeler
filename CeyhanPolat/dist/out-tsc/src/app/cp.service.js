import * as tslib_1 from "tslib";
import { Injectable } from "@angular/core";
import { HttpParams } from '@angular/common/http';
let CPService = class CPService {
    constructor(_http) {
        this._http = _http;
        this.menuLink = "Ajax/Menu";
        this.sliderLink = "Ajax/Slider";
        this.rasgeleSiirLink = "Ajax/RasgeleSiir";
        this.kisaBiyografiLink = "Ajax/KisaBiyografi";
        this.biyografiLink = "Ajax/Biyografi";
        this.galeriLink = "Ajax/Galeri";
        this.siirleriLink = "Ajax/Siirleri";
        this.siirLink = "Ajax/Siir";
        this.yorumGonderLink = "Ajax/YorumGonder";
        //
        this.siirAramaListeLink = "Ajax/SiirAramaListe";
        this.siirAramaLink = "Ajax/SiirArama";
        this.siirAramaTemizleLink = "Ajax/SiirAramaTemizle";
    }
    getMenu() {
        return this._http.get(this.menuLink);
    }
    getSlider() {
        return this._http.get(this.sliderLink);
    }
    getRasgeleSiir() {
        return this._http.get(this.rasgeleSiirLink);
    }
    getKisaBiyografi() {
        return this._http.get(this.kisaBiyografiLink);
    }
    getBiyografi() {
        return this._http.get(this.biyografiLink);
    }
    getGaleri() {
        return this._http.get(this.galeriLink);
    }
    getSiirleri() {
        return this._http.get(this.siirleriLink);
    }
    getSiir(link) {
        let params = new HttpParams().set("link", link);
        return this._http.get(this.siirLink, { params: params });
    }
    setYorum(yorum) {
        let params = new HttpParams().set("yorum", JSON.stringify(yorum));
        return this._http.get(this.yorumGonderLink, { params: params });
    }
    getSiirAramaListe(kelime) {
        let params = new HttpParams().set("kelime", kelime);
        return this._http.get(this.siirAramaListeLink, { params: params });
    }
    getSiirArama(kelime) {
        let params = new HttpParams().set("kelime", JSON.stringify(kelime));
        return this._http.get(this.siirAramaLink, { params: params });
    }
    getSiirAramaTemizle() {
        return this._http.get(this.siirAramaTemizleLink);
    }
};
CPService = tslib_1.__decorate([
    Injectable()
], CPService);
export { CPService };
//# sourceMappingURL=cp.service.js.map