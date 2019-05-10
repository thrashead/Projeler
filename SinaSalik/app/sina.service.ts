import { Injectable } from "@angular/core";
import { Http, Response } from "@angular/http";
import "rxjs/add/operator/map";
import "rxjs/add/operator/catch";
import "rxjs/add/observable/throw";
import { Observable } from "rxjs/Observable";

@Injectable()
export class SinaService {
    private mailGonderLink: string = "Ajax/MailGonder";
    private resimlerLink: string = "Ajax/Resimler";
   
    constructor(private _http: Http) {
    }

    getResimler() {
        return this._http.get(this.resimlerLink)
            .map((response: Response) => response.json())
            .catch(this._errorHandler);
    }

    getMailGonder(mail: any) {
        return this._http.get(this.mailGonderLink, { params: { "mail": JSON.stringify(mail) } })
            .map((response: Response) => response.json())
            .catch(this._errorHandler);
    }

    _errorHandler(error: Response) {
        console.error(error);
        return Observable.throw(error || "Server Error");
    }
}