import { Injectable } from "@angular/core";
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IKategori } from '../model/IKategori';

@Injectable()
export class KategoriService {
    private linkIndex: string = "Ajax/Kategori/Index";
    private linkEkle: string = "Ajax/Kategori/Ekle";
    private linkDuzenle: string = "Ajax/Kategori/Duzenle";
    private linkSil: string = "Ajax/Kategori/Sil";
    private linkKaldir: string = "Ajax/Kategori/Kaldir";
    private linkKopyala: string = "Ajax/Kategori/Kopyala";

    constructor(private http: HttpClient) {
    }

    getIndex(): Observable<Array<IKategori>> {
        return this.http.get<Array<IKategori>>(this.linkIndex);
    }

    getEkle(): Observable<IKategori> {
        return this.http.get<IKategori>(this.linkEkle);
    }

    postEkle(model: any): Observable<IKategori> {
        return this.http.post<IKategori>(this.linkEkle, model);
    }

    getDuzenle(id: string): Observable<IKategori> {
        let params = new HttpParams().set("id", id);
        return this.http.get<IKategori>(this.linkDuzenle, { params: params });
    }

    postDuzenle(model: any): Observable<IKategori> {
        return this.http.post<IKategori>(this.linkDuzenle, model);
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