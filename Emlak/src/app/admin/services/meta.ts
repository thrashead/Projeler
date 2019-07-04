import { Injectable } from "@angular/core";
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IMetalar } from '../model/IMetalar';

@Injectable()
export class MetaService {
    private linkIndex: string = "Ajax/Meta/Index";
    private linkEkle: string = "Ajax/Meta/Ekle";
    private linkDuzenle: string = "Ajax/Meta/Duzenle";
    private linkSil: string = "Ajax/Meta/Sil";
    private linkKaldir: string = "Ajax/Meta/Kaldir";
    private linkKopyala: string = "Ajax/Meta/Kopyala";

    constructor(private http: HttpClient) {
    }

    getIndex(): Observable<Array<IMetalar>> {
        return this.http.get<Array<IMetalar>>(this.linkIndex);
    }

    getEkle(): Observable<IMetalar> {
        return this.http.get<IMetalar>(this.linkEkle);
    }

    postEkle(model: any): Observable<IMetalar> {
        return this.http.post<IMetalar>(this.linkEkle, model);
    }

    getDuzenle(id: string): Observable<IMetalar> {
        let params = new HttpParams().set("id", id);
        return this.http.get<IMetalar>(this.linkDuzenle, { params: params });
    }

    postDuzenle(model: any): Observable<IMetalar> {
        return this.http.post<IMetalar>(this.linkDuzenle, model);
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