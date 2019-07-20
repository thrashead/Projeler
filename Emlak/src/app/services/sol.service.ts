import { Injectable } from "@angular/core";
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from "rxjs";

import { ISiralaREReturnJson } from '../model/ISiralaREReturnJson';
import { IRealEstates } from '../model/IRealEstates';
import { IListResult } from '../model/IListResult';
import { ICategoriesByParentID } from '../model/ICategoriesByParentID';

@Injectable()
export class SolAjaxService {
    private linkSolAraSonuc: string = "Sol/AramaSonuc";
    private linkGununIlani: string = "Sol/GununIlani";
    private linkYeniIlanlar: string = "Sol/YeniIlanlar";
    private linkHaberler: string = "Sol/Haberler";
    private linkSayac: string = "Sol/Sayac";
    private linkSayfalar: string = "Sol/Sayfalar";
    private linkKategoriMenu: string = "Sol/KategoriMenu";

    constructor(private _http: HttpClient) {
    }

    //Sol Arama Sonuc
    getSolAraSonuc(kelime: string, tip: string): Observable<any> {
        let params = new HttpParams().set("kelime", kelime).set("tip", tip);
        return this._http.get<any>(this.linkSolAraSonuc, {  params: params });
    }

    //Gunun İlanı
    getGununIlani(): Observable<IRealEstates> {
        return this._http.get<IRealEstates>(this.linkGununIlani);
    }

    //Yeni İlanlar
    getYeniIlanlar(adet: string): Observable<Array<IRealEstates>> {
        let params = new HttpParams().set("adet", adet);
        return this._http.get<Array<IRealEstates>>(this.linkYeniIlanlar, { params: params });
    }

    //Haberler
    getHaberler(): Observable<Array<IListResult>> {
        return this._http.get<Array<IListResult>>(this.linkHaberler);
    }

    //Sayac
    getSayac(): Observable<number> {
        return this._http.get<number>(this.linkSayac);
    }

    //Sayfalar
    getSayfalar(): Observable<Array<IListResult>> {
        return this._http.get<Array<IListResult>>(this.linkSayfalar);
    }

    //KategoriMenu
    getKategoriMenu(): Observable<Array<ICategoriesByParentID>> {
        return this._http.get<Array<ICategoriesByParentID>>(this.linkKategoriMenu);
    }
}