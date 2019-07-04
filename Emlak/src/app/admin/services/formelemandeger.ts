import { Injectable } from "@angular/core";
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IFormElemanDeger } from '../model/IFormElemanDeger';

@Injectable()
export class FormElemanDegerService {
    private linkIndex: string = "Ajax/FormElemanDeger/Index";
    private linkEkle: string = "Ajax/FormElemanDeger/Ekle";
    private linkDuzenle: string = "Ajax/FormElemanDeger/Duzenle";
    private linkSil: string = "Ajax/FormElemanDeger/Sil";
    private linkKopyala: string = "Ajax/FormElemanDeger/Kopyala";

    constructor(private http: HttpClient) {
    }

    getIndex(): Observable<Array<IFormElemanDeger>> {
        return this.http.get<Array<IFormElemanDeger>>(this.linkIndex);
    }

    getEkle(linkID: string): Observable<IFormElemanDeger> {
        let params = new HttpParams().set("linkID", linkID);
        return this.http.get<IFormElemanDeger>(this.linkEkle, { params: params });
    }

    postEkle(model: any): Observable<IFormElemanDeger> {
        return this.http.post<IFormElemanDeger>(this.linkEkle, model);
    }

    getDuzenle(id: string): Observable<IFormElemanDeger> {
        let params = new HttpParams().set("id", id);
        return this.http.get<IFormElemanDeger>(this.linkDuzenle, { params: params });
    }

    postDuzenle(model: any): Observable<IFormElemanDeger> {
        return this.http.post<IFormElemanDeger>(this.linkDuzenle, model);
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