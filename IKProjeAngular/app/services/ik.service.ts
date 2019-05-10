import { Injectable } from "@angular/core";
import { Http, Response } from "@angular/http";
import "rxjs/add/operator/map";
import "rxjs/add/operator/catch";
import "rxjs/add/observable/throw";
import { Observable } from "rxjs/Observable";

@Injectable()
export class IKService {
    private sirketLogolarLink: string = "IKService/SirketLogolar";
    private aktifKullaniciLink: string = "IKService/AktifKullanici";
    private aktifFirmaLink: string = "IKService/AktifFirma";
    private girisYontemiLink: string = "IKService/GirisYontemi";
    private girisDurumLink: string = "IKService/GirisDurum";
    private girisSehirlerLink: string = "IKService/Sehirler";
    private girisSektorlerLink: string = "IKService/Sektorler";
    private girisCinsiyetlerLink: string = "IKService/Cinsiyetler";

    constructor(private http: Http) {
    }

    SirketLogolar() {
        return this.http.get(this.sirketLogolarLink)
            .map((response: Response) => response.json())
            .catch(this.errorHandler);
    }

    AktifKullanici() {
        return this.http.get(this.aktifKullaniciLink)
            .map((response: Response) => {
                if (response.text() != "") {
                    return response.json();
                }
                else {
                    return null;
                }
            })
            .catch(this.errorHandler);
    }

    AktifFirma() {
        return this.http.get(this.aktifFirmaLink)
            .map((response: Response) => {
                if (response.text() != "") {
                    return response.json();
                }
                else {
                    return null;
                }
            })
            .catch(this.errorHandler);
    }

    GirisYontemi() {
        return this.http.get(this.girisYontemiLink)
            .map((response: Response) => response.json())
            .catch(this.errorHandler);
    }

    GirisDurum() {
        return this.http.get(this.girisDurumLink)
            .map((response: Response) => response.json())
            .catch(this.errorHandler);
    }

    Sehirler(kodlar: any, haric: boolean = false) {
        return this.http.get(this.girisSehirlerLink, { params: { "kodlar": kodlar, "haric": haric } })
            .map((response: Response) => response.json())
            .catch(this.errorHandler);
    }

    Sektorler(kodlar: any, haric: boolean = false) {
        return this.http.get(this.girisSektorlerLink, { params: { "kodlar": kodlar, "haric": haric } })
            .map((response: Response) => response.json())
            .catch(this.errorHandler);
    }

    Cinsiyetler(kodlar: any, haric: boolean = false) {
        return this.http.get(this.girisCinsiyetlerLink, { params: { "kodlar": kodlar, "haric": haric } })
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