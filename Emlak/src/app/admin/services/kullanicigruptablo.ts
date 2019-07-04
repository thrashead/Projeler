import { Injectable } from "@angular/core";
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IKullaniciGrupTablo } from '../model/IKullaniciGrupTablo';

@Injectable()
export class KullaniciGrupTabloService {
    private linkIndex: string = "Ajax/KullaniciGrupTablo/Index";
    private linkEkle: string = "Ajax/KullaniciGrupTablo/Ekle";
    private linkDuzenle: string = "Ajax/KullaniciGrupTablo/Duzenle";
    private linkSil: string = "Ajax/KullaniciGrupTablo/Sil";

    constructor(private http: HttpClient) {
    }

    getIndex(): Observable<Array<IKullaniciGrupTablo>> {
        return this.http.get<Array<IKullaniciGrupTablo>>(this.linkIndex);
    }

    getEkle(linkID: string): Observable<IKullaniciGrupTablo> {
        let params = new HttpParams().set("linkID", linkID);
        return this.http.get<IKullaniciGrupTablo>(this.linkEkle, { params: params });
    }

    postEkle(model: any): Observable<IKullaniciGrupTablo> {
        return this.http.post<IKullaniciGrupTablo>(this.linkEkle, model);
    }

    getDuzenle(id: string): Observable<IKullaniciGrupTablo> {
        let params = new HttpParams().set("id", id);
        return this.http.get<IKullaniciGrupTablo>(this.linkDuzenle, { params: params });
    }

    postDuzenle(model: any): Observable<IKullaniciGrupTablo> {
        return this.http.post<IKullaniciGrupTablo>(this.linkDuzenle, model);
    }

    getSil(id: string): Observable<boolean> {
        let params = new HttpParams().set("id", id);
        return this.http.get<boolean>(this.linkSil, { params: params });
    }
}