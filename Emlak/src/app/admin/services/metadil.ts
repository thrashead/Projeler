import { Injectable } from "@angular/core";
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IMetalarDil } from '../model/IMetalarDil';

@Injectable()
export class MetaDilService {
    private linkIndex: string = "Ajax/MetaDil/Index";
    private linkEkle: string = "Ajax/MetaDil/Ekle";
    private linkDuzenle: string = "Ajax/MetaDil/Duzenle";
    private linkSil: string = "Ajax/MetaDil/Sil";
    private linkKaldir: string = "Ajax/MetaDil/Kaldir";

    constructor(private http: HttpClient) {
    }

    getIndex(): Observable<Array<IMetalarDil>> {
        return this.http.get<Array<IMetalarDil>>(this.linkIndex);
    }

    getEkle(linkID: string): Observable<IMetalarDil> {
        let params = new HttpParams().set("linkID", linkID);
        return this.http.get<IMetalarDil>(this.linkEkle, { params: params });
    }

    postEkle(model: any): Observable<IMetalarDil> {
        return this.http.post<IMetalarDil>(this.linkEkle, model);
    }

    getDuzenle(id: string): Observable<IMetalarDil> {
        let params = new HttpParams().set("id", id);
        return this.http.get<IMetalarDil>(this.linkDuzenle, { params: params });
    }

    postDuzenle(model: any): Observable<IMetalarDil> {
        return this.http.post<IMetalarDil>(this.linkDuzenle, model);
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