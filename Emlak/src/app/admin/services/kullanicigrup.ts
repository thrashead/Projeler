import { Injectable } from "@angular/core";
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IKullaniciGrup } from '../model/IKullaniciGrup';

@Injectable()
export class KullaniciGrupService {
    private linkIndex: string = "Ajax/KullaniciGrup/Index";
    private linkEkle: string = "Ajax/KullaniciGrup/Ekle";
    private linkDuzenle: string = "Ajax/KullaniciGrup/Duzenle";
    private linkSil: string = "Ajax/KullaniciGrup/Sil";

    constructor(private http: HttpClient) {
    }

    getIndex(): Observable<Array<IKullaniciGrup>> {
        return this.http.get<Array<IKullaniciGrup>>(this.linkIndex);
    }

    getEkle(): Observable<IKullaniciGrup> {
        return this.http.get<IKullaniciGrup>(this.linkEkle);
    }

    postEkle(model: any): Observable<IKullaniciGrup> {
        return this.http.post<IKullaniciGrup>(this.linkEkle, model);
    }

    getDuzenle(id: string): Observable<IKullaniciGrup> {
        let params = new HttpParams().set("id", id);
        return this.http.get<IKullaniciGrup>(this.linkDuzenle, { params: params });
    }

    postDuzenle(model: any): Observable<IKullaniciGrup> {
        return this.http.post<IKullaniciGrup>(this.linkDuzenle, model);
    }

    getSil(id: string): Observable<boolean> {
        let params = new HttpParams().set("id", id);
        return this.http.get<boolean>(this.linkSil, { params: params });
    }
}