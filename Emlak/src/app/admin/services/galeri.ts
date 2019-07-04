import { Injectable } from "@angular/core";
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IGaleri } from '../model/IGaleri';

@Injectable()
export class GaleriService {
    private linkIndex: string = "Ajax/Galeri/Index";
    private linkEkle: string = "Ajax/Galeri/Ekle";
    private linkDuzenle: string = "Ajax/Galeri/Duzenle";
    private linkSil: string = "Ajax/Galeri/Sil";
    private linkKaldir: string = "Ajax/Galeri/Kaldir";
    private linkKopyala: string = "Ajax/Galeri/Kopyala";

    constructor(private http: HttpClient) {
    }

    getIndex(): Observable<Array<IGaleri>> {
        return this.http.get<Array<IGaleri>>(this.linkIndex);
    }

    getEkle(): Observable<IGaleri> {
        return this.http.get<IGaleri>(this.linkEkle);
    }

    postEkle(model: any): Observable<IGaleri> {
        return this.http.post<IGaleri>(this.linkEkle, model);
    }

    getDuzenle(id: string): Observable<IGaleri> {
        let params = new HttpParams().set("id", id);
        return this.http.get<IGaleri>(this.linkDuzenle, { params: params });
    }

    postDuzenle(model: any): Observable<IGaleri> {
        return this.http.post<IGaleri>(this.linkDuzenle, model);
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