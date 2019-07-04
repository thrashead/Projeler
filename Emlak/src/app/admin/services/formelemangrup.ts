import { Injectable } from "@angular/core";
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IFormElemanGrup } from '../model/IFormElemanGrup';

@Injectable()
export class FormElemanGrupService {
    private linkIndex: string = "Ajax/FormElemanGrup/Index";
    private linkEkle: string = "Ajax/FormElemanGrup/Ekle";
    private linkDuzenle: string = "Ajax/FormElemanGrup/Duzenle";
    private linkSil: string = "Ajax/FormElemanGrup/Sil";
    private linkKopyala: string = "Ajax/FormElemanGrup/Kopyala";

    constructor(private http: HttpClient) {
    }

    getIndex(): Observable<Array<IFormElemanGrup>> {
        return this.http.get<Array<IFormElemanGrup>>(this.linkIndex);
    }

    getEkle(): Observable<IFormElemanGrup> {
        return this.http.get<IFormElemanGrup>(this.linkEkle);
    }

    postEkle(model: any): Observable<IFormElemanGrup> {
        return this.http.post<IFormElemanGrup>(this.linkEkle, model);
    }

    getDuzenle(id: string): Observable<IFormElemanGrup> {
        let params = new HttpParams().set("id", id);
        return this.http.get<IFormElemanGrup>(this.linkDuzenle, { params: params });
    }

    postDuzenle(model: any): Observable<IFormElemanGrup> {
        return this.http.post<IFormElemanGrup>(this.linkDuzenle, model);
    }

    getSil(id: string): Observable<boolean> {
        let params = new HttpParams().set("id", id);
        return this.http.get<boolean>(this.linkSil, { params: params });
    }

    getKopyala(id: string): Observable<boolean> {
        let params = new HttpParams().set("id", id);
        return this.http.get<boolean>(this.linkKopyala, { params: params });
    }
}