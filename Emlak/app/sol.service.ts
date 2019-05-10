import { Injectable } from "@angular/core";
import { Http, Response } from "@angular/http";
import "rxjs/add/operator/map";
import "rxjs/add/operator/catch";
import "rxjs/add/observable/throw";
import { Observable } from "rxjs/Observable";

@Injectable()
export class SolService {
    private linkSolAraSonuc: string = "Sol/AramaSonuc";
    private linkGununIlani: string = "Sol/GununIlani";
    private linkYeniIlanlar: string = "Sol/YeniIlanlar";
    private linkHaberler: string = "Sol/Haberler";
    private linkSayac: string = "Sol/Sayac";
    private linkSayfalar: string = "Sol/Sayfalar";
    private linkKategoriMenu: string = "Sol/KategoriMenu";

    constructor(private _http: Http) {
    }

    //Sol Arama Sonuc
    getSolAraSonuc(kelime: string, tip: string) {
        return this._http.get(this.linkSolAraSonuc, { params: { "kelime": kelime, "tip": tip } })
            .map((response: Response) => response.json())
            .catch(this._errorHandler);
    }

    //Gunun İlanı
    getGununIlani() {
        return this._http.get(this.linkGununIlani)
            .map((response: Response) => response.json())
            .catch(this._errorHandler);
    }

    //Yeni İlanlar
    getYeniIlanlar(adet: number) {
        return this._http.get(this.linkYeniIlanlar, { params: { "adet": adet } })
            .map((response: Response) => response.json())
            .catch(this._errorHandler);
    }

    //Haberler
    getHaberler() {
        return this._http.get(this.linkHaberler)
            .map((response: Response) => response.json())
            .catch(this._errorHandler);
    }

    //Sayac
    getSayac() {
        return this._http.get(this.linkSayac)
            .map((response: Response) => response.json())
            .catch(this._errorHandler);
    }

    //Sayfalar
    getSayfalar() {
        return this._http.get(this.linkSayfalar)
            .map((response: Response) => response.json())
            .catch(this._errorHandler);
    }

    //KategoriMenu
    getKategoriMenu() {
        return this._http.get(this.linkKategoriMenu)
            .map((response: Response) => response.json())
            .catch(this._errorHandler);
    }

    _errorHandler(error: Response) {
        console.error(error);
        return Observable.throw(error || "Server Error");
    }
}