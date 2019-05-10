import { Injectable } from "@angular/core";
import { Http, Response } from "@angular/http";
import "rxjs/add/operator/map";
import "rxjs/add/operator/catch";
import "rxjs/add/observable/throw";
import { Observable } from "rxjs/Observable";

@Injectable()
export class AramaService {
    private calismalarLink: string = "AramaService/Calismalar";
    private bolumlerLink: string = "AramaService/Bolumler";
    private pozisyonlarLink: string = "AramaService/Pozisyonlar";
    private egitimlerLink: string = "AramaService/Egitimler";
    private sektorlerLink: string = "AramaService/Sektorler";
    private tecrubelerLink: string = "AramaService/Tecrubeler";
    private guncelliklerLink: string = "AramaService/Guncellikler";
    private digerseceneklerLink: string = "AramaService/DigerSecenekler";
    private sehirDonLink: string = "AramaService/SehirDon";
    private calismaDonLink: string = "AramaService/CalismaDon";

    constructor(private http: Http) {
    }

    Calismalar(kodlar: any, haric: boolean = false) {
        return this.http.get(this.calismalarLink, { params: { "kodlar": kodlar, "haric": haric } })
            .map((response: Response) => response.json())
            .catch(this.errorHandler);
    }

    Bolumler(kodlar: any, haric: boolean = false) {
        return this.http.get(this.bolumlerLink, { params: { "kodlar": kodlar, "haric": haric } })
            .map((response: Response) => response.json())
            .catch(this.errorHandler);
    }

    Pozisyonlar(kodlar: any, haric: boolean = false) {
        return this.http.get(this.pozisyonlarLink, { params: { "kodlar": kodlar, "haric": haric } })
            .map((response: Response) => response.json())
            .catch(this.errorHandler);
    }

    Egitimler(kodlar: any, haric: boolean = false) {
        return this.http.get(this.egitimlerLink, { params: { "kodlar": kodlar, "haric": haric } })
            .map((response: Response) => response.json())
            .catch(this.errorHandler);
    }

    Sektorler(kodlar: any, haric: boolean = false) {
        return this.http.get(this.sektorlerLink, { params: { "kodlar": kodlar, "haric": haric } })
            .map((response: Response) => response.json())
            .catch(this.errorHandler);
    }

    Tecrubeler(kodlar: any, haric: boolean = false) {
        return this.http.get(this.tecrubelerLink, { params: { "kodlar": kodlar, "haric": haric } })
            .map((response: Response) => response.json())
            .catch(this.errorHandler);
    }

    Guncellikler(kodlar: any, haric: boolean = false) {
        return this.http.get(this.guncelliklerLink, { params: { "kodlar": kodlar, "haric": haric } })
            .map((response: Response) => response.json())
            .catch(this.errorHandler);
    }

    DigerSecenekler(kodlar: any, haric: boolean = false) {
        return this.http.get(this.digerseceneklerLink, { params: { "kodlar": kodlar, "haric": haric } })
            .map((response: Response) => response.json())
            .catch(this.errorHandler);
    }

    SehirDon(sehir: string) {
        return this.http.get(this.sehirDonLink, { params: { "sehir": sehir }})
            .map((response: Response) => response.json())
            .catch(this.errorHandler);
    }

    CalismaDon(tip: string) {
        return this.http.get(this.calismaDonLink, { params: { "tip": tip } })
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