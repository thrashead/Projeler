import { Injectable } from "@angular/core";
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IBaglantilar } from '../model/IBaglantilar';

@Injectable()
export class BaglantiService {
    private linkIndex: string = "Ajax/Baglanti/Index";
    private linkEkle: string = "Ajax/Baglanti/Ekle";
    private linkDuzenle: string = "Ajax/Baglanti/Duzenle";
    private linkSil: string = "Ajax/Baglanti/Sil";
    private linkNesneDoldur: string = "Ajax/Baglanti/NesneDoldur";

    constructor(private http: HttpClient) {
    }

    getIndex(): Observable<Array<IBaglantilar>> {
        return this.http.get<Array<IBaglantilar>>(this.linkIndex);
    }

    getEkle(linkID: string): Observable<IBaglantilar> {
        let params = new HttpParams().set("linkID", linkID);
        return this.http.get<IBaglantilar>(this.linkEkle, { params: params });
    }

    postEkle(model: any): Observable<IBaglantilar> {
        return this.http.post<IBaglantilar>(this.linkEkle, model);
    }

    getDuzenle(id: string): Observable<IBaglantilar> {
        let params = new HttpParams().set("id", id);
        return this.http.get<IBaglantilar>(this.linkDuzenle, { params: params });
    }

    postDuzenle(model: any): Observable<IBaglantilar> {
        return this.http.post<IBaglantilar>(this.linkDuzenle, model);
    }

    getSil(id: string): Observable<boolean> {
        let params = new HttpParams().set("id", id);
        return this.http.get<boolean>(this.linkSil, { params: params });
    }

    getNesneDoldur(linkTypeID: string): Observable<any> {
        let params = new HttpParams().set("linkTypeID", linkTypeID);
        return this.http.get<any>(this.linkNesneDoldur, { params: params });
    }
}