import { Injectable } from "@angular/core";
import { HttpClient, HttpParams } from '@angular/common/http';

@Injectable({ providedIn: 'root' })
export class SiteService {
    constructor(private http: HttpClient) {
    }

    get(controller: string, action: string, param: any = null, param2: any = null, param3: any = null, param4: any = null) {
        let params = new HttpParams().set("param", param).set("param2", param2).set("param3", param3).set("param4", param4);
        return this.http.get(controller + "/" + action, { params: params });
    }

    post(controller: string, action: string, model: any) {
        return this.http.post(controller + "/" + action, model);
    }
}