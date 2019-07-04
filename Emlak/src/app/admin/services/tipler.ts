import { Injectable } from "@angular/core";
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ITipler } from '../model/ITipler';

@Injectable()
export class TiplerService {
    private linkIndex: string = "Ajax/Tipler/Index";
    private linkEkle: string = "Ajax/Tipler/Ekle";
    private linkDuzenle: string = "Ajax/Tipler/Duzenle";
    private linkSil: string = "Ajax/Tipler/Sil";

    constructor(private http: HttpClient) {
    }

    getIndex(): Observable<Array<ITipler>> {
        return this.http.get<Array<ITipler>>(this.linkIndex);
    }

    getEkle(): Observable<ITipler> {
        return this.http.get<ITipler>(this.linkEkle);
    }

    postEkle(model: any): Observable<ITipler> {
        return this.http.post<ITipler>(this.linkEkle, model);
    }

    getDuzenle(id: string): Observable<ITipler> {
        let params = new HttpParams().set("id", id);
        return this.http.get<ITipler>(this.linkDuzenle, { params: params });
    }

    postDuzenle(model: any): Observable<ITipler> {
        return this.http.post<ITipler>(this.linkDuzenle, model);
    }

    getSil(id: string): Observable<boolean> {
        let params = new HttpParams().set("id", id);
        return this.http.get<boolean>(this.linkSil, { params: params });
    }
}