import { Injectable } from "@angular/core";
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ILogTipler } from '../model/ILogTipler';

@Injectable()
export class LogTiplerService {
    private linkIndex: string = "Ajax/LogTipler/Index";
    private linkEkle: string = "Ajax/LogTipler/Ekle";
    private linkDuzenle: string = "Ajax/LogTipler/Duzenle";
    private linkSil: string = "Ajax/LogTipler/Sil";

    constructor(private http: HttpClient) {
    }

    getIndex(): Observable<Array<ILogTipler>> {
        return this.http.get<Array<ILogTipler>>(this.linkIndex);
    }

    getEkle(): Observable<ILogTipler> {
        return this.http.get<ILogTipler>(this.linkEkle);
    }

    postEkle(model: any): Observable<ILogTipler> {
        return this.http.post<ILogTipler>(this.linkEkle, model);
    }

    getDuzenle(id: string): Observable<ILogTipler> {
        let params = new HttpParams().set("id", id);
        return this.http.get<ILogTipler>(this.linkDuzenle, { params: params });
    }

    postDuzenle(model: any): Observable<ILogTipler> {
        return this.http.post<ILogTipler>(this.linkDuzenle, model);
    }

    getSil(id: string): Observable<boolean> {
        let params = new HttpParams().set("id", id);
        return this.http.get<boolean>(this.linkSil, { params: params });
    }
}