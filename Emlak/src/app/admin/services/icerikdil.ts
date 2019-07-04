import { Injectable } from "@angular/core";
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IIcerikDil } from '../model/IIcerikDil';

@Injectable()
export class IcerikDilService {
    private linkIndex: string = "Ajax/IcerikDil/Index";
    private linkEkle: string = "Ajax/IcerikDil/Ekle";
    private linkDuzenle: string = "Ajax/IcerikDil/Duzenle";
    private linkSil: string = "Ajax/IcerikDil/Sil";
    private linkKaldir: string = "Ajax/IcerikDil/Kaldir";

    constructor(private http: HttpClient) {
    }

    getIndex(): Observable<Array<IIcerikDil>> {
        return this.http.get<Array<IIcerikDil>>(this.linkIndex);
    }

    getEkle(linkID: string): Observable<IIcerikDil> {
        let params = new HttpParams().set("linkID", linkID);
        return this.http.get<IIcerikDil>(this.linkEkle, { params: params });
    }

    postEkle(model: any): Observable<IIcerikDil> {
        return this.http.post<IIcerikDil>(this.linkEkle, model);
    }

    getDuzenle(id: string): Observable<IIcerikDil> {
        let params = new HttpParams().set("id", id);
        return this.http.get<IIcerikDil>(this.linkDuzenle, { params: params });
    }

    postDuzenle(model: any): Observable<IIcerikDil> {
        return this.http.post<IIcerikDil>(this.linkDuzenle, model);
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