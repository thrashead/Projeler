import { Injectable } from "@angular/core";
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IUrunDil } from '../model/IUrunDil';

@Injectable()
export class UrunDilService {
    private linkIndex: string = "Ajax/UrunDil/Index";
    private linkEkle: string = "Ajax/UrunDil/Ekle";
    private linkDuzenle: string = "Ajax/UrunDil/Duzenle";
    private linkSil: string = "Ajax/UrunDil/Sil";
    private linkKaldir: string = "Ajax/UrunDil/Kaldir";

    constructor(private http: HttpClient) {
    }

    getIndex(): Observable<Array<IUrunDil>> {
        return this.http.get<Array<IUrunDil>>(this.linkIndex);
    }

    getEkle(linkID: string): Observable<IUrunDil> {
        let params = new HttpParams().set("linkID", linkID);
        return this.http.get<IUrunDil>(this.linkEkle, { params: params });
    }

    postEkle(model: any): Observable<IUrunDil> {
        return this.http.post<IUrunDil>(this.linkEkle, model);
    }

    getDuzenle(id: string): Observable<IUrunDil> {
        let params = new HttpParams().set("id", id);
        return this.http.get<IUrunDil>(this.linkDuzenle, { params: params });
    }

    postDuzenle(model: any): Observable<IUrunDil> {
        return this.http.post<IUrunDil>(this.linkDuzenle, model);
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