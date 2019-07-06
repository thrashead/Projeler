import { Injectable } from "@angular/core";
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from "rxjs";

@Injectable()
export class SinaService {
    private mailGonderLink: string = "Ajax/MailGonder";
    private resimlerLink: string = "Ajax/Resimler";
   
    constructor(private _http: HttpClient) {
    }

    getResimler() {
        return this._http.get(this.resimlerLink);
    }

    getMailGonder(mail: any) {
        let params = new HttpParams().set("mail", JSON.stringify(mail));
        return this._http.get(this.mailGonderLink, { params: params });
    }
}