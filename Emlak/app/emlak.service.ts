import { Injectable } from "@angular/core";
import { Http, Response } from "@angular/http";
import "rxjs/add/operator/map";
import "rxjs/add/operator/catch";
import "rxjs/add/observable/throw";
import { Observable } from "rxjs/Observable";

@Injectable()
export class EmlakService {
    private linkKodlaGetir: string = "Shared/KodlaGetir";
    private linkLangs: string = "Shared/GetLangs";
    private linkChangeLang: string = "Shared/ChangeLang";
    private linkAdminGiris: string = "Ajax/Ajax/Login";
    private linkRasgeleBanner: string = "Shared/RasgeleBanner";
    private linkIcerikGetir: string = "Shared/IcerikGetir";
    private linkKategoriler: string = "Shared/Kategoriler";

    constructor(private _http: Http) {
    }

    //Kodla Getir (Lang)
    getKodlaGetir(kod: string) {
        return this._http.get(this.linkKodlaGetir, { params: { "kod": kod } })
            .map((response: Response) => response.json())
            .catch(this._errorHandler);
    }

    //Diller
    getLangs() {
        return this._http.get(this.linkLangs)
            .map((response: Response) => response.json())
            .catch(this._errorHandler);
    }

    //Dil Değiştir
    chanegeLang(lang: string) {
        return this._http.get(this.linkChangeLang, { params: { "lang": lang } })
            .map((response: Response) => response.json())
            .catch(this._errorHandler);
    }

    //Admin Giris
    getAdminGiris(login: any): Observable<boolean> {
        return this._http.post(this.linkAdminGiris, { login })
            .map((response: Response) => response.json())
            .catch(this._errorHandler);
    }

    //Rasgele Banner
    getRasgeleBanner() {
        return this._http.get(this.linkRasgeleBanner)
            .map((response: Response) => response.json())
            .catch(this._errorHandler);
    }

    //İçerik Getir
    getIcerikGetir(kod: string) {
        return this._http.get(this.linkIcerikGetir, { params: { "kod": kod } })
            .map((response: Response) => response.json())
            .catch(this._errorHandler);
    }

    //Kategoriler
    getKategoriler() {
        return this._http.get(this.linkKategoriler)
            .map((response: Response) => response.json())
            .catch(this._errorHandler);
    }

    _errorHandler(error: Response) {
        console.error(error);
        return Observable.throw(error || "Server Error");
    }
}