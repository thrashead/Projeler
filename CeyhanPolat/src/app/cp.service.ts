import { Injectable } from "@angular/core";
import { HttpClient, HttpParams } from '@angular/common/http';

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

    constructor(private _http: HttpClient) {
    }

    getMenu() {
        return this._http.get(this.menuLink);
    }

    getSlider() {
        return this._http.get(this.sliderLink);
    }

    getRasgeleSiir() {
        return this._http.get(this.rasgeleSiirLink);
    }

    getKisaBiyografi() {
        return this._http.get(this.kisaBiyografiLink);
    }

    getBiyografi() {
        return this._http.get(this.biyografiLink);
    }

    getGaleri() {
        return this._http.get(this.galeriLink);
    }

    getSiirleri() {
        return this._http.get(this.siirleriLink);
    }

    getSiir(link: string) {
        let params = new HttpParams().set("link", link);
        return this._http.get(this.siirLink, { params: params});
    }

    setYorum(yorum: any) {
        return this._http.post(this.yorumGonderLink, yorum);
    }

    getSiirAramaListe(kelime: string) {
        let params = new HttpParams().set("kelime", kelime);
        return this._http.get(this.siirAramaListeLink, { params: params });
    }

    setSiirArama(kelime: any) {
        return this._http.post(this.siirAramaLink, kelime);
    }

    getSiirAramaTemizle() {
        return this._http.get(this.siirAramaTemizleLink);
    }
}