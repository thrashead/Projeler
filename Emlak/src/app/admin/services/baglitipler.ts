import { Injectable } from "@angular/core";
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IBagliTipler } from '../model/IBagliTipler';

@Injectable()
export class BagliTiplerService {
    private linkIndex: string = "Ajax/BagliTipler/Index";
    private linkEkle: string = "Ajax/BagliTipler/Ekle";
    private linkDuzenle: string = "Ajax/BagliTipler/Duzenle";
    private linkSil: string = "Ajax/BagliTipler/Sil";
    private linkKopyala: string = "Ajax/BagliTipler/Kopyala";
    private linkTipDoldur: string = "Ajax/BagliTipler/TipDoldur";

    constructor(private http: HttpClient) {
    }

    getIndex(): Observable<Array<IBagliTipler>> {
        return this.http.get<Array<IBagliTipler>>(this.linkIndex);
    }

    getEkle(): Observable<IBagliTipler> {
        return this.http.get<IBagliTipler>(this.linkEkle);
    }

    postEkle(model: any): Observable<IBagliTipler> {
        return this.http.post<IBagliTipler>(this.linkEkle, model);
    }

    getDuzenle(id: string): Observable<IBagliTipler> {
        let params = new HttpParams().set("id", id);
        return this.http.get<IBagliTipler>(this.linkDuzenle, { params: params });
    }

    postDuzenle(model: any): Observable<IBagliTipler> {
        return this.http.post<IBagliTipler>(this.linkDuzenle, model);
    }

    getSil(id: string): Observable<boolean> {
        let params = new HttpParams().set("id", id);
        return this.http.get<boolean>(this.linkSil, { params: params });
    }

    getKopyala(id: string): Observable<boolean> {
        let params = new HttpParams().set("id", id);
        return this.http.get<boolean>(this.linkKopyala, { params: params });
    }

    getTipDoldur(typeID: string): Observable<any> {
        let params = new HttpParams().set("typeID", typeID);
        return this.http.get<any>(this.linkTipDoldur, { params: params });
    }
}