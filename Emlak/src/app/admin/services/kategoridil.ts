import { Injectable } from "@angular/core";
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IKategoriDil } from '../model/IKategoriDil';

@Injectable()
export class KategoriDilService {
    private linkIndex: string = "Ajax/KategoriDil/Index";
    private linkEkle: string = "Ajax/KategoriDil/Ekle";
    private linkDuzenle: string = "Ajax/KategoriDil/Duzenle";
    private linkSil: string = "Ajax/KategoriDil/Sil";
    private linkKaldir: string = "Ajax/KategoriDil/Kaldir";

    constructor(private http: HttpClient) {
    }

    getIndex(): Observable<Array<IKategoriDil>> {
        return this.http.get<Array<IKategoriDil>>(this.linkIndex);
    }

    getEkle(linkID: string): Observable<IKategoriDil> {
        let params = new HttpParams().set("linkID", linkID);
        return this.http.get<IKategoriDil>(this.linkEkle, { params: params });
    }

    postEkle(model: any): Observable<IKategoriDil> {
        return this.http.post<IKategoriDil>(this.linkEkle, model);
    }

    getDuzenle(id: string): Observable<IKategoriDil> {
        let params = new HttpParams().set("id", id);
        return this.http.get<IKategoriDil>(this.linkDuzenle, { params: params });
    }

    postDuzenle(model: any): Observable<IKategoriDil> {
        return this.http.post<IKategoriDil>(this.linkDuzenle, model);
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