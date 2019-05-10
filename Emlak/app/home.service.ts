﻿import { Injectable } from "@angular/core";
import { Http, Response } from "@angular/http";
import "rxjs/add/operator/map";
import "rxjs/add/operator/catch";
import "rxjs/add/observable/throw";
import { Observable } from "rxjs/Observable";

@Injectable()
export class HomeService {
    private linkSlider: string = "Home/Slider";
    private linkVitrinIlanlar: string = "Home/VitrinIlanlar";

    constructor(private _http: Http) {
    }

    //Slider
    getSlider() {
        return this._http.get(this.linkSlider)
            .map((response: Response) => response.json())
            .catch(this._errorHandler);
    }

    //Vitrin İlanları
    getVitrinIlanlar(adet: number) {
        return this._http.get(this.linkVitrinIlanlar, { params: { "adet": adet } })
            .map((response: Response) => response.json())
            .catch(this._errorHandler);
    }

    _errorHandler(error: Response) {
        console.error(error);
        return Observable.throw(error || "Server Error");
    }
}