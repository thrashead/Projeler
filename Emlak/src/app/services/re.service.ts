import { Injectable } from "@angular/core";
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from "rxjs";

import { IRealEstates } from '../model/IRealEstates';
import { IRealEstatesForList } from '../model/IRealEstatesForList';
import { IListResult } from '../model/IListResult';

@Injectable()
export class REService {
    private linkEmlakDetay: string = "RE/Detay";
    private linkEmlakListele: string = "RE/Listele";
    private linkEmlakDetayliAraSession: string = "RE/DetayliAramaSession";
    private linkKategoriler: string = "RE/Kategoriler";
    private linkSehirler: string = "RE/Sehirler";

    constructor(private _http: HttpClient) {
    }

    //Emlak Detay
    getEmlakDetay(link: string): Observable<IRealEstates> {
        let params = new HttpParams().set("link", link);
        return this._http.get<IRealEstates>(this.linkEmlakDetay, { params: params });
    }

    //Emlak Listele
    getEmlakListele(reData: any): Observable<Array<IRealEstatesForList>> {
        let params = new HttpParams().set("reData", JSON.stringify(reData));
        return this._http.get<Array<IRealEstatesForList>>(this.linkEmlakListele, { params: params });
    }

    //Emlak Detaylı Arama Session
    getEmlakDetayliArama(realCP: any): Observable<boolean> {
        return this._http.post<boolean>(this.linkEmlakDetayliAraSession, { realCP });
    }

    //Kategoriler
    getKategoriler(parentID: string): Observable<Array<IListResult>> {
        let params = new HttpParams().set("parentID", parentID);
        return this._http.get<Array<IListResult>>(this.linkKategoriler, { params: params });
    }

    //Şehirler
    getSehirler(): Observable<Array<IListResult>> {
        return this._http.get<Array<IListResult>>(this.linkSehirler);
    }
}