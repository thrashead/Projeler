import { Injectable } from "@angular/core";
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ILoglar } from '../model/ILoglar';

@Injectable()
export class LoglarService {
    private linkIndex: string = "Ajax/Loglar/Index";

    constructor(private http: HttpClient) {
    }

    getIndex(): Observable<Array<ILoglar>> {
        return this.http.get<Array<ILoglar>>(this.linkIndex);
    }
}