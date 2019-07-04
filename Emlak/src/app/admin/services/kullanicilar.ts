import { Injectable } from "@angular/core";
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IKullanicilar } from '../model/IKullanicilar';

@Injectable()
export class KullanicilarService {
    private linkIndex: string = "Ajax/Kullanicilar/Index";
    private linkEkle: string = "Ajax/Kullanicilar/Ekle";
    private linkDuzenle: string = "Ajax/Kullanicilar/Duzenle";
    private linkSil: string = "Ajax/Kullanicilar/Sil";
    private linkKaldir: string = "Ajax/Kullanicilar/Kaldir";
    private linkGrupDegistir: string = "Ajax/Kullanicilar/GrupDegistir";

    constructor(private http: HttpClient) {
    }

    getIndex(): Observable<Array<IKullanicilar>> {
        return this.http.get<Array<IKullanicilar>>(this.linkIndex);
    }

    getEkle(): Observable<IKullanicilar> {
        return this.http.get<IKullanicilar>(this.linkEkle);
    }

    postEkle(model: any): Observable<IKullanicilar> {
        return this.http.post<IKullanicilar>(this.linkEkle, model);
    }

    getDuzenle(id: string): Observable<IKullanicilar> {
        let params = new HttpParams().set("id", id);
        return this.http.get<IKullanicilar>(this.linkDuzenle, { params: params });
    }

    postDuzenle(model: any): Observable<IKullanicilar> {
        return this.http.post<IKullanicilar>(this.linkDuzenle, model);
    }

    getGrupDegistir(id: string): Observable<IKullanicilar> {
        let params = new HttpParams().set("id", id);
        return this.http.get<IKullanicilar>(this.linkGrupDegistir, { params: params });
    }

    postGrupDegistir(model: any): Observable<IKullanicilar> {
        return this.http.post<IKullanicilar>(this.linkGrupDegistir, model);
    }

    getSil(id: string): Observable<boolean> {
        let params = new HttpParams().set("id", id);
        return this.http.get<boolean>(this.linkSil, { params: params });
    }

    getKaldir(id: string): Observable<boolean> {
        let params = new HttpParams().set("id", id);
        return this.http.get<boolean>(this.linkKaldir, { params: params });
    }
}