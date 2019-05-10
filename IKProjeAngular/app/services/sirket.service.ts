import { Injectable } from "@angular/core";
import { Http, Response } from "@angular/http";
import "rxjs/add/operator/map";
import "rxjs/add/operator/catch";
import "rxjs/add/observable/throw";
import { Observable } from "rxjs/Observable";

@Injectable()
export class SirketService {
    private girisYapLink: string = "SirketService/GirisYap";

    constructor(private http: Http) {
    }

    GirisYap(sirket: any) {
        return this.http.get(this.girisYapLink, { params: { "sirket": JSON.stringify(sirket) } })
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