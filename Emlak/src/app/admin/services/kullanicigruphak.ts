import { Injectable } from "@angular/core";
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IKullaniciGrupHak } from '../model/IKullaniciGrupHak';

@Injectable()
export class KullaniciGrupHakService {
    private linkIndex: string = "Ajax/KullaniciGrupHak/Index";
    private linkEkle: string = "Ajax/KullaniciGrupHak/Ekle";
    private linkDuzenle: string = "Ajax/KullaniciGrupHak/Duzenle";
    private linkSil: string = "Ajax/KullaniciGrupHak/Sil";

    constructor(private http: HttpClient) {
    }

    getIndex(): Observable<Array<IKullaniciGrupHak>> {
        return this.http.get<Array<IKullaniciGrupHak>>(this.linkIndex);
    }

    getEkle(linkID: string): Observable<IKullaniciGrupHak> {
        let params = new HttpParams().set("linkID", linkID);
        return this.http.get<IKullaniciGrupHak>(this.linkEkle, { params: params });
    }

    postEkle(model: any): Observable<IKullaniciGrupHak> {
        return this.http.post<IKullaniciGrupHak>(this.linkEkle, model);
    }

    getDuzenle(id: string): Observable<IKullaniciGrupHak> {
        let params = new HttpParams().set("id", id);
        return this.http.get<IKullaniciGrupHak>(this.linkDuzenle, { params: params });
    }

    postDuzenle(model: any): Observable<IKullaniciGrupHak> {
        return this.http.post<IKullaniciGrupHak>(this.linkDuzenle, model);
    }

    getSil(id: string): Observable<boolean> {
        let params = new HttpParams().set("id", id);
        return this.http.get<boolean>(this.linkSil, { params: params });
    }
}