import { Injectable } from "@angular/core";
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IResim } from '../model/IResim';

@Injectable()
export class ResimService {
    private linkIndex: string = "Ajax/Resim/Index";
    private linkEkle: string = "Ajax/Resim/Ekle";
    private linkDuzenle: string = "Ajax/Resim/Duzenle";
    private linkSil: string = "Ajax/Resim/Sil";
    private linkKaldir: string = "Ajax/Resim/Kaldir";
    private linkEkleYukle: string = "Ajax/Resim/EkleYukle";
    private linkDuzenleYukle: string = "Ajax/Resim/DuzenleYukle";

    constructor(private http: HttpClient) {
    }

    getIndex(): Observable<Array<IResim>> {
        return this.http.get<Array<IResim>>(this.linkIndex);
    }

    getEkle(): Observable<IResim> {
        return this.http.get<IResim>(this.linkEkle);
    }

    postEkle(model: any): Observable<IResim> {
        return this.http.post<IResim>(this.linkEkle, model);
    }

    getDuzenle(id: string): Observable<IResim> {
        let params = new HttpParams().set("id", id);
        return this.http.get<IResim>(this.linkDuzenle, { params: params });
    }

    postDuzenle(model: any): Observable<IResim> {
        return this.http.post<IResim>(this.linkDuzenle, model);
    }

    getSil(id: string): Observable<boolean> {
        let params = new HttpParams().set("id", id);
        return this.http.get<boolean>(this.linkSil, { params: params });
    }

    getKaldir(id: string): Observable<boolean> {
        let params = new HttpParams().set("id", id);
        return this.http.get<boolean>(this.linkKaldir, { params: params });
    }

    postEkleYukle(model: any): Observable<IResim> {
        return this.http.post<IResim>(this.linkEkleYukle, model);
    }

    postDuzenleYukle(model: any): Observable<IResim> {
        return this.http.post<IResim>(this.linkDuzenleYukle, model);
    }
}