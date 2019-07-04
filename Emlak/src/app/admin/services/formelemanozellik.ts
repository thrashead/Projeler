import { Injectable } from "@angular/core";
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IFormElemanOzellik } from '../model/IFormElemanOzellik';

@Injectable()
export class FormElemanOzellikService {
    private linkIndex: string = "Ajax/FormElemanOzellik/Index";
    private linkEkle: string = "Ajax/FormElemanOzellik/Ekle";
    private linkDuzenle: string = "Ajax/FormElemanOzellik/Duzenle";
    private linkSil: string = "Ajax/FormElemanOzellik/Sil";
    private linkKopyala: string = "Ajax/FormElemanOzellik/Kopyala";

    constructor(private http: HttpClient) {
    }

    getIndex(): Observable<Array<IFormElemanOzellik>> {
        return this.http.get<Array<IFormElemanOzellik>>(this.linkIndex);
    }

    getEkle(linkID: string): Observable<IFormElemanOzellik> {
        let params = new HttpParams().set("linkID", linkID);
        return this.http.get<IFormElemanOzellik>(this.linkEkle, { params: params });
    }

    postEkle(model: any): Observable<IFormElemanOzellik> {
        return this.http.post<IFormElemanOzellik>(this.linkEkle, model);
    }

    getDuzenle(id: string): Observable<IFormElemanOzellik> {
        let params = new HttpParams().set("id", id);
        return this.http.get<IFormElemanOzellik>(this.linkDuzenle, { params: params });
    }

    postDuzenle(model: any): Observable<IFormElemanOzellik> {
        return this.http.post<IFormElemanOzellik>(this.linkDuzenle, model);
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