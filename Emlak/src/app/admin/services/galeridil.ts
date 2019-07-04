import { Injectable } from "@angular/core";
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IGaleriDil } from '../model/IGaleriDil';

@Injectable()
export class GaleriDilService {
    private linkIndex: string = "Ajax/GaleriDil/Index";
    private linkEkle: string = "Ajax/GaleriDil/Ekle";
    private linkDuzenle: string = "Ajax/GaleriDil/Duzenle";
    private linkSil: string = "Ajax/GaleriDil/Sil";
    private linkKaldir: string = "Ajax/GaleriDil/Kaldir";

    constructor(private http: HttpClient) {
    }

    getIndex(): Observable<Array<IGaleriDil>> {
        return this.http.get<Array<IGaleriDil>>(this.linkIndex);
    }

    getEkle(linkID: string): Observable<IGaleriDil> {
        let params = new HttpParams().set("linkID", linkID);
        return this.http.get<IGaleriDil>(this.linkEkle, { params: params });
    }

    postEkle(model: any): Observable<IGaleriDil> {
        return this.http.post<IGaleriDil>(this.linkEkle, model);
    }

    getDuzenle(id: string): Observable<IGaleriDil> {
        let params = new HttpParams().set("id", id);
        return this.http.get<IGaleriDil>(this.linkDuzenle, { params: params });
    }

    postDuzenle(model: any): Observable<IGaleriDil> {
        return this.http.post<IGaleriDil>(this.linkDuzenle, model);
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