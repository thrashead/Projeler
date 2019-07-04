import { Injectable } from "@angular/core";
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IIcerik } from '../model/IIcerik';

@Injectable()
export class IcerikService {
    private linkIndex: string = "Ajax/Icerik/Index";
    private linkEkle: string = "Ajax/Icerik/Ekle";
    private linkDuzenle: string = "Ajax/Icerik/Duzenle";
    private linkSil: string = "Ajax/Icerik/Sil";
    private linkKaldir: string = "Ajax/Icerik/Kaldir";
    private linkKopyala: string = "Ajax/Icerik/Kopyala";

    constructor(private http: HttpClient) {
    }

    getIndex(): Observable<Array<IIcerik>> {
        return this.http.get<Array<IIcerik>>(this.linkIndex);
    }

    getEkle(): Observable<IIcerik> {
        return this.http.get<IIcerik>(this.linkEkle);
    }

    postEkle(model: any): Observable<IIcerik> {
        return this.http.post<IIcerik>(this.linkEkle, model);
    }

    getDuzenle(id: string): Observable<IIcerik> {
        let params = new HttpParams().set("id", id);
        return this.http.get<IIcerik>(this.linkDuzenle, { params: params });
    }

    postDuzenle(model: any): Observable<IIcerik> {
        return this.http.post<IIcerik>(this.linkDuzenle, model);
    }

    getSil(id: string): Observable<boolean> {
        let params = new HttpParams().set("id", id);
        return this.http.get<boolean>(this.linkSil, { params: params });
    }

    getKaldir(id: string): Observable<boolean> {
        let params = new HttpParams().set("id", id);
        return this.http.get<boolean>(this.linkKaldir, { params: params });
    }

    getKopyala(id: string): Observable<boolean> {
        let params = new HttpParams().set("id", id);
        return this.http.get<boolean>(this.linkKopyala, { params: params });
    }
}