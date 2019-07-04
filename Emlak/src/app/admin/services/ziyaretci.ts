import { Injectable } from "@angular/core";
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IZiyaretci } from '../model/IZiyaretci';

@Injectable()
export class ZiyaretciService {
    private linkIndex: string = "Ajax/Ziyaretci/Index";
    private linkSil: string = "Ajax/Ziyaretci/Sil";

    constructor(private http: HttpClient) {
    }

    getIndex(): Observable<Array<IZiyaretci>> {
        return this.http.get<Array<IZiyaretci>>(this.linkIndex);
    }

    getSil(): Observable<boolean> {
        return this.http.get<boolean>(this.linkSil);
    }
}