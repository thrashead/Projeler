import { Injectable } from "@angular/core";
import { Http, Response } from "@angular/http";
import "rxjs/add/operator/map";
import "rxjs/add/operator/catch";
import "rxjs/add/observable/throw";
import { Observable } from "rxjs/Observable";

@Injectable()
export class REService {
    private linkEmlakDetay: string = "RE/Detay";
    private linkEmlakListele: string = "RE/Listele";
    private linkEmlakDetayliAraSession: string = "RE/DetayliAramaSession";
    private linkKategoriler: string = "RE/Kategoriler";
    private linkSehirler: string = "RE/Sehirler";

    constructor(private _http: Http) {
    }

    //Emlak Detay
    getEmlakDetay(link: string) {
        return this._http.get(this.linkEmlakDetay, { params: { "link": link } })
            .map((response: Response) => response.json())
            .catch(this._errorHandler);
    }

    //Emlak Listele
    getEmlakListele(reData: any) {
        return this._http.get(this.linkEmlakListele, { params: { "reData": JSON.stringify(reData) } })
            .map((response: Response) => response.json())
            .catch(this._errorHandler);
    }

    //Emlak Detaylı Arama Session
    getEmlakDetayliArama(realCP: any) {
        return this._http.get(this.linkEmlakDetayliAraSession, { params: { "realCP": JSON.stringify(realCP) } })
            .map((response: Response) => response.json())
            .catch(this._errorHandler);
    }

    //Kategoriler
    getKategoriler(parentID: number) {
        return this._http.get(this.linkKategoriler, { params: { "parentID": parentID } })
            .map((response: Response) => response.json())
            .catch(this._errorHandler);
    }

    //Şehirler
    getSehirler() {
        return this._http.get(this.linkSehirler)
            .map((response: Response) => response.json())
            .catch(this._errorHandler);
    }

    _errorHandler(error: Response) {
        console.error(error);
        return Observable.throw(error || "Server Error");
    }
}