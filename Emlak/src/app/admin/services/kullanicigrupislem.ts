import { Injectable } from "@angular/core";
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IKullaniciGrupIslem } from '../model/IKullaniciGrupIslem';

@Injectable()
export class KullaniciGrupIslemService {
    private linkIndex: string = "Ajax/KullaniciGrupIslem/Index";
    private linkEkle: string = "Ajax/KullaniciGrupIslem/Ekle";
    private linkDuzenle: string = "Ajax/KullaniciGrupIslem/Duzenle";
    private linkSil: string = "Ajax/KullaniciGrupIslem/Sil";

    constructor(private http: HttpClient) {
    }

    getIndex(): Observable<Array<IKullaniciGrupIslem>> {
        return this.http.get<Array<IKullaniciGrupIslem>>(this.linkIndex);
    }

    getEkle(): Observable<IKullaniciGrupIslem> {
        return this.http.get<IKullaniciGrupIslem>(this.linkEkle);
    }

    postEkle(model: any): Observable<IKullaniciGrupIslem> {
        return this.http.post<IKullaniciGrupIslem>(this.linkEkle, model);
    }

    getDuzenle(id: string): Observable<IKullaniciGrupIslem> {
        let params = new HttpParams().set("id", id);
        return this.http.get<IKullaniciGrupIslem>(this.linkDuzenle, { params: params });
    }

    postDuzenle(model: any): Observable<IKullaniciGrupIslem> {
        return this.http.post<IKullaniciGrupIslem>(this.linkDuzenle, model);
    }

    getSil(id: string): Observable<boolean> {
        let params = new HttpParams().set("id", id);
        return this.http.get<boolean>(this.linkSil, { params: params });
    }
}