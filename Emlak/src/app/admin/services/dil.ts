import { Injectable } from "@angular/core";
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IDil } from '../model/IDil';

@Injectable()
export class DilService {
    private linkIndex: string = "Ajax/Dil/Index";
    private linkEkle: string = "Ajax/Dil/Ekle";
    private linkDuzenle: string = "Ajax/Dil/Duzenle";
    private linkSil: string = "Ajax/Dil/Sil";
    private linkKaldir: string = "Ajax/Dil/Kaldir";
    private linkEkleYukle: string = "Ajax/Dil/EkleYukle";
    private linkDuzenleYukle: string = "Ajax/Dil/DuzenleYukle";

    constructor(private http: HttpClient) {
    }

    getIndex(): Observable<Array<IDil>> {
        return this.http.get<Array<IDil>>(this.linkIndex);
    }

    getEkle(): Observable<IDil> {
        return this.http.get<IDil>(this.linkEkle);
    }

    postEkle(model: any): Observable<IDil> {
        return this.http.post<IDil>(this.linkEkle, model);
    }

    getDuzenle(id: string): Observable<IDil> {
        let params = new HttpParams().set("id", id);
        return this.http.get<IDil>(this.linkDuzenle, { params: params });
    }

    postDuzenle(model: any): Observable<IDil> {
        return this.http.post<IDil>(this.linkDuzenle, model);
    }

    getSil(id: string): Observable<boolean> {
        let params = new HttpParams().set("id", id);
        return this.http.get<boolean>(this.linkSil, { params: params });
    }

    getKaldir(id: string): Observable<boolean> {
        let params = new HttpParams().set("id", id);
        return this.http.get<boolean>(this.linkKaldir, { params: params });
    }

    postEkleYukle(model: any): Observable<IDil> {
        return this.http.post<IDil>(this.linkEkleYukle, model);
    }

    postDuzenleYukle(model: any): Observable<IDil> {
        return this.http.post<IDil>(this.linkDuzenleYukle, model);
    }
}