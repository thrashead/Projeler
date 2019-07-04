import { Injectable } from "@angular/core";
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IFormEleman } from '../model/IFormEleman';

@Injectable()
export class FormElemanService {
    private linkIndex: string = "Ajax/FormEleman/Index";
    private linkEkle: string = "Ajax/FormEleman/Ekle";
    private linkDuzenle: string = "Ajax/FormEleman/Duzenle";
    private linkSil: string = "Ajax/FormEleman/Sil";
    private linkKopyala: string = "Ajax/FormEleman/Kopyala";

    constructor(private http: HttpClient) {
    }

    getIndex(): Observable<Array<IFormEleman>> {
        return this.http.get<Array<IFormEleman>>(this.linkIndex);
    }

    getEkle(linkID: string): Observable<IFormEleman> {
        let params = new HttpParams().set("linkID", linkID);
        return this.http.get<IFormEleman>(this.linkEkle, { params: params });
    }

    postEkle(model: any): Observable<IFormEleman> {
        return this.http.post<IFormEleman>(this.linkEkle, model);
    }

    getDuzenle(id: string): Observable<IFormEleman> {
        let params = new HttpParams().set("id", id);
        return this.http.get<IFormEleman>(this.linkDuzenle, { params: params });
    }

    postDuzenle(model: any): Observable<IFormEleman> {
        return this.http.post<IFormEleman>(this.linkDuzenle, model);
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