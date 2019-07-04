import { Injectable } from "@angular/core";
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from "rxjs";

import { ISlider } from '../model/ISlider';
import { IRealEstatesForList } from '../model/IRealEstatesForList';

@Injectable()
export class HomeService {
    private linkSlider: string = "Home/Slider";
    private linkVitrinIlanlar: string = "Home/VitrinIlanlar";

    constructor(private _http: HttpClient) {
    }

    //Slider
    getSlider(): Observable<Array<ISlider>> {
        return this._http.get<Array<ISlider>>(this.linkSlider);
    }

    //Vitrin İlanları
    getVitrinIlanlar(adet: string): Observable<Array<IRealEstatesForList>> {
        let params = new HttpParams().set("adet", adet);
        return this._http.get<Array<IRealEstatesForList>>(this.linkVitrinIlanlar, { params: params });
    }
}