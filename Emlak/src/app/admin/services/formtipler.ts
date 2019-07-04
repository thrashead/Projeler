import { Injectable } from "@angular/core";
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IFormTipler } from '../model/IFormTipler';

@Injectable()
export class FormTiplerService {
    private linkIndex: string = "Ajax/FormTipler/Index";
    private linkEkle: string = "Ajax/FormTipler/Ekle";
    private linkDuzenle: string = "Ajax/FormTipler/Duzenle";
    private linkSil: string = "Ajax/FormTipler/Sil";

    constructor(private http: HttpClient) {
    }

    getIndex(): Observable<Array<IFormTipler>> {
        return this.http.get<Array<IFormTipler>>(this.linkIndex);
    }

    getEkle(): Observable<IFormTipler> {
        return this.http.get<IFormTipler>(this.linkEkle);
    }

    postEkle(model: any): Observable<IFormTipler> {
        return this.http.post<IFormTipler>(this.linkEkle, model);
    }

    getDuzenle(id: string): Observable<IFormTipler> {
        let params = new HttpParams().set("id", id);
        return this.http.get<IFormTipler>(this.linkDuzenle, { params: params });
    }

    postDuzenle(model: any): Observable<IFormTipler> {
        return this.http.post<IFormTipler>(this.linkDuzenle, model);
    }

    getSil(id: string): Observable<boolean> {
        let params = new HttpParams().set("id", id);
        return this.http.get<boolean>(this.linkSil, { params: params });
    }
}