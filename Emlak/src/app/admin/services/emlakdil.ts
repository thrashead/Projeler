import { Injectable } from "@angular/core";
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IEmlakDil } from '../model/IEmlakDil';

@Injectable()
export class EmlakDilService {
    private linkIndex: string = "Ajax/EmlakDil/Index";
    private linkEkle: string = "Ajax/EmlakDil/Ekle";
    private linkDuzenle: string = "Ajax/EmlakDil/Duzenle";
    private linkSil: string = "Ajax/EmlakDil/Sil";
    private linkKaldir: string = "Ajax/EmlakDil/Kaldir";

    constructor(private http: HttpClient) {
    }

    getIndex(): Observable<Array<IEmlakDil>> {
        return this.http.get<Array<IEmlakDil>>(this.linkIndex);
    }

    getEkle(linkID: string): Observable<IEmlakDil> {
        let params = new HttpParams().set("linkID", linkID);
        return this.http.get<IEmlakDil>(this.linkEkle, { params: params });
    }

    postEkle(model: any): Observable<IEmlakDil> {
        return this.http.post<IEmlakDil>(this.linkEkle, model);
    }

    getDuzenle(id: string): Observable<IEmlakDil> {
        let params = new HttpParams().set("id", id);
        return this.http.get<IEmlakDil>(this.linkDuzenle, { params: params });
    }

    postDuzenle(model: any): Observable<IEmlakDil> {
        return this.http.post<IEmlakDil>(this.linkDuzenle, model);
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