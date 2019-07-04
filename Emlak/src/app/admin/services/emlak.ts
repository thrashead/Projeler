import { Injectable } from "@angular/core";
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IEmlak } from '../model/IEmlak';

@Injectable()
export class EmlakService {
    private linkIndex: string = "Ajax/Emlak/Index";
    private linkEkle: string = "Ajax/Emlak/Ekle";
    private linkDuzenle: string = "Ajax/Emlak/Duzenle";
    private linkSil: string = "Ajax/Emlak/Sil";
    private linkKaldir: string = "Ajax/Emlak/Kaldir";
    private linkKopyala: string = "Ajax/Emlak/Kopyala";

    constructor(private http: HttpClient) {
    }

    getIndex(): Observable<Array<IEmlak>> {
        return this.http.get<Array<IEmlak>>(this.linkIndex);
    }

    getEkle(): Observable<IEmlak> {
        return this.http.get<IEmlak>(this.linkEkle);
    }

    postEkle(model: any): Observable<IEmlak> {
        return this.http.post<IEmlak>(this.linkEkle, model);
    }

    getDuzenle(id: string): Observable<IEmlak> {
        let params = new HttpParams().set("id", id);
        return this.http.get<IEmlak>(this.linkDuzenle, { params: params });
    }

    postDuzenle(model: any): Observable<IEmlak> {
        return this.http.post<IEmlak>(this.linkDuzenle, model);
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