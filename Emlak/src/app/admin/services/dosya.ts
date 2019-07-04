import { Injectable } from "@angular/core";
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IDosya } from '../model/IDosya';

@Injectable()
export class DosyaService {
    private linkIndex: string = "Ajax/Dosya/Index";
    private linkEkle: string = "Ajax/Dosya/Ekle";
    private linkDuzenle: string = "Ajax/Dosya/Duzenle";
    private linkSil: string = "Ajax/Dosya/Sil";
    private linkKaldir: string = "Ajax/Dosya/Kaldir";
    private linkEkleYukle: string = "Ajax/Dosya/EkleYukle";
    private linkDuzenleYukle: string = "Ajax/Dosya/DuzenleYukle";

    constructor(private http: HttpClient) {
    }

    getIndex(): Observable<Array<IDosya>> {
        return this.http.get<Array<IDosya>>(this.linkIndex);
    }

    getEkle(): Observable<IDosya> {
        return this.http.get<IDosya>(this.linkEkle);
    }

    postEkle(model: any): Observable<IDosya> {
        return this.http.post<IDosya>(this.linkEkle, model);
    }

    getDuzenle(id: string): Observable<IDosya> {
        let params = new HttpParams().set("id", id);
        return this.http.get<IDosya>(this.linkDuzenle, { params: params });
    }

    postDuzenle(model: any): Observable<IDosya> {
        return this.http.post<IDosya>(this.linkDuzenle, model);
    }

    getSil(id: string): Observable<boolean> {
        let params = new HttpParams().set("id", id);
        return this.http.get<boolean>(this.linkSil, { params: params });
    }

    getKaldir(id: string): Observable<boolean> {
        let params = new HttpParams().set("id", id);
        return this.http.get<boolean>(this.linkKaldir, { params: params });
    }

    postEkleYukle(model: any): Observable<IDosya> {
        return this.http.post<IDosya>(this.linkEkleYukle, model);
    }

    postDuzenleYukle(model: any): Observable<IDosya> {
        return this.http.post<IDosya>(this.linkDuzenleYukle, model);
    }
}