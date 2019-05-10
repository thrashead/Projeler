import { Injectable } from "@angular/core";
import { Http, Response } from "@angular/http";
import "rxjs/add/operator/map";
import "rxjs/add/operator/catch";
import "rxjs/add/observable/throw";
import { Observable } from "rxjs/Observable";

@Injectable()
export class CPService {
    private menuLink: string = "Ajax/Menu";
    private sliderLink: string = "Ajax/Slider";
    private rasgeleSiirLink: string = "Ajax/RasgeleSiir";
    private kisaBiyografiLink: string = "Ajax/KisaBiyografi";
    private biyografiLink: string = "Ajax/Biyografi";
    private galeriLink: string = "Ajax/Galeri";
    private siirleriLink: string = "Ajax/Siirleri";
    private siirLink: string = "Ajax/Siir";
    private yorumGonderLink: string = "Ajax/YorumGonder";
    //
    private siirAramaListeLink: string = "Ajax/SiirAramaListe";
    private siirAramaLink: string = "Ajax/SiirArama";
    private siirAramaTemizleLink: string = "Ajax/SiirAramaTemizle";

    constructor(private _http: Http) {
    }

    getMenu() {
        return this._http.get(this.menuLink)
            .map((response: Response) => response.json())
            .catch(this._errorHandler);
    }

    getSlider() {
        return this._http.get(this.sliderLink)
            .map((response: Response) => response.json())
            .catch(this._errorHandler);
    }

    getRasgeleSiir() {
        return this._http.get(this.rasgeleSiirLink)
            .map((response: Response) => response.json())
            .catch(this._errorHandler);
    }

    getKisaBiyografi() {
        return this._http.get(this.kisaBiyografiLink)
            .map((response: Response) => response.json())
            .catch(this._errorHandler);
    }

    getBiyografi() {
        return this._http.get(this.biyografiLink)
            .map((response: Response) => response.json())
            .catch(this._errorHandler);
    }

    getGaleri() {
        return this._http.get(this.galeriLink)
            .map((response: Response) => response.json())
            .catch(this._errorHandler);
    }

    getSiirleri() {
        return this._http.get(this.siirleriLink)
            .map((response: Response) => response.json())
            .catch(this._errorHandler);
    }

    getSiir(link: string) {
        return this._http.get(this.siirLink, { params: { "link" : link }})
            .map((response: Response) => response.json())
            .catch(this._errorHandler);
    }

    setYorum(yorum: any) {
        return this._http.get(this.yorumGonderLink, { params: { "yorum": yorum } })
            .map((response: Response) => response.json())
            .catch(this._errorHandler);
    }

    //

    getSiirAramaListe(kelime: string) {
        return this._http.get(this.siirAramaListeLink, { params: { "kelime": kelime } })
            .map((response: Response) => response.json())
            .catch(this._errorHandler);
    }

    getSiirArama(kelime: any) {
        return this._http.get(this.siirAramaLink, { params: { "kelime": kelime } })
            .map((response: Response) => response.json())
            .catch(this._errorHandler);
    }

    getSiirAramaTemizle(kelime: any) {
        return this._http.get(this.siirAramaTemizleLink, { params: { "kelime": kelime } })
            .map((response: Response) => response.json())
            .catch(this._errorHandler);
    }

    _errorHandler(error: Response) {
        console.error(error);
        return Observable.throw(error || "Server Error");
    }
}