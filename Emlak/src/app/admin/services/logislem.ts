import { Injectable } from "@angular/core";
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ILogIslem } from '../model/ILogIslem';

@Injectable()
export class LogIslemService {
    private linkIndex: string = "Ajax/LogIslem/Index";
    private linkEkle: string = "Ajax/LogIslem/Ekle";
    private linkDuzenle: string = "Ajax/LogIslem/Duzenle";
    private linkSil: string = "Ajax/LogIslem/Sil";

    constructor(private http: HttpClient) {
    }

    getIndex(): Observable<Array<ILogIslem>> {
        return this.http.get<Array<ILogIslem>>(this.linkIndex);
    }

    getEkle(linkID: string): Observable<ILogIslem> {
        let params = new HttpParams().set("linkID", linkID);
        return this.http.get<ILogIslem>(this.linkEkle, { params: params });
    }

    postEkle(model: any): Observable<ILogIslem> {
        return this.http.post<ILogIslem>(this.linkEkle, model);
    }

    getDuzenle(id: string): Observable<ILogIslem> {
        let params = new HttpParams().set("id", id);
        return this.http.get<ILogIslem>(this.linkDuzenle, { params: params });
    }

    postDuzenle(model: any): Observable<ILogIslem> {
        return this.http.post<ILogIslem>(this.linkDuzenle, model);
    }

    getSil(id: string): Observable<boolean> {
        let params = new HttpParams().set("id", id);
        return this.http.get<boolean>(this.linkSil, { params: params });
    }
}