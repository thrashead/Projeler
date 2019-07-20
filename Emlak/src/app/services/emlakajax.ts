import { Injectable } from "@angular/core";
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from "rxjs";
import { IDil } from '../admin/model/IDil';
import { IListResult } from '../model/IListResult';
import { ICategoryDetail } from '../model/ICategoryDetail';

@Injectable()
export class EmlakAjaxService {
    private linkKodlaGetir: string = "Shared/KodlaGetir";
    private linkLangs: string = "Shared/GetLangs";
    private linkChangeLang: string = "Shared/ChangeLang";
    private linkAdminGiris: string = "Ajax/Ajax/Login";
    private linkRasgeleBanner: string = "Shared/RasgeleBanner";
    private linkIcerikGetir: string = "Shared/IcerikGetir";
    private linkKategoriler: string = "Shared/Kategoriler";

    constructor(private _http: HttpClient) {
    }

    //Kodla Getir (Lang)
    getKodlaGetir(kod: string): Observable<string> {
        let params = new HttpParams().set("kod", kod);
        return this._http.get<string>(this.linkKodlaGetir, { params: params });
    }

    //Diller
    getLangs(): Observable<IDil> {
        return this._http.get<IDil>(this.linkLangs);
    }

    //Dil Değiştir
    chanegeLang(lang: string) {
        let params = new HttpParams().set("lang", lang);
        return this._http.get(this.linkChangeLang, { params: params });
    }

    //Admin Giris
    postAdminGiris(login: any): Observable<boolean> {
        return this._http.post<boolean>(this.linkAdminGiris, { login });
    }

    //Rasgele Banner
    getRasgeleBanner(): Observable<string> {
        return this._http.get<string>(this.linkRasgeleBanner);
    }

    //İçerik Getir
    getIcerikGetir(kod: string): Observable<IListResult> {
        let params = new HttpParams().set("kod", kod);
        return this._http.get<IListResult>(this.linkIcerikGetir, { params: params });
    }

    //Kategoriler
    getKategoriler(): Observable<Array<ICategoryDetail>> {
        return this._http.get<Array<ICategoryDetail>>(this.linkKategoriler);
    }
}