import { Injectable } from "@angular/core";
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IUrun } from '../model/IUrun';

@Injectable()
export class UrunService {
    private linkIndex: string = "Ajax/Urun/Index";
    private linkEkle: string = "Ajax/Urun/Ekle";
    private linkDuzenle: string = "Ajax/Urun/Duzenle";
    private linkSil: string = "Ajax/Urun/Sil";
    private linkKaldir: string = "Ajax/Urun/Kaldir";
    private linkKopyala: string = "Ajax/Urun/Kopyala";

    constructor(private http: HttpClient) {
    }

    getIndex(): Observable<Array<IUrun>> {
        return this.http.get<Array<IUrun>>(this.linkIndex);
    }

    getEkle(): Observable<IUrun> {
        return this.http.get<IUrun>(this.linkEkle);
    }

    postEkle(model: any): Observable<IUrun> {
        return this.http.post<IUrun>(this.linkEkle, model);
    }

    getDuzenle(id: string): Observable<IUrun> {
        let params = new HttpParams().set("id", id);
        return this.http.get<IUrun>(this.linkDuzenle, { params: params });
    }

    postDuzenle(model: any): Observable<IUrun> {
        return this.http.post<IUrun>(this.linkDuzenle, model);
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