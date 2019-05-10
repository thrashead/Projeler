import { Injectable } from "@angular/core";
import { Http, Response } from "@angular/http";
import "rxjs/add/operator/map";
import "rxjs/add/operator/catch";
import "rxjs/add/observable/throw";
import { Observable } from "rxjs/Observable";

@Injectable()
export class AdayService {
    private kayitliAramalarLink: string = "AdayService/KayitliAramalar";
    private girisYapLink: string = "AdayService/GirisYap";

    constructor(private http: Http) {
    }

    GirisYap(aday: any) {
        return this.http.get(this.girisYapLink, { params: { "aday": JSON.stringify(aday) } })
            .map((response: Response) => response.json())
            .catch(this.errorHandler);
    }

    KayitliAramalar() {
        return this.http.get(this.kayitliAramalarLink)
            .map((response: Response) => response.json())
            .catch(this.errorHandler);
    }

    //Function(data: string) {
    //    return this._http.get(this.angLink, { params: { "data" : data }})
    //        .map((response: Response) => response.json())
    //        .catch(this._errorHandler);
    //}

    //Function(data: any) {
    //    return this._http.get(this.angLink, { params: { "data": JSON.stringify(data) } })
    //        .map((response: Response) => response.json())
    //        .catch(this._errorHandler);
    //}

    errorHandler(error: Response) {
        console.error(error);
        return Observable.throw(error || "Server Error");
    }
}