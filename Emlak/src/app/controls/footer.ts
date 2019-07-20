import { Component } from "@angular/core";
import { EmlakAjaxService } from "../services/emlakajax";

@Component({
    selector: "emlak-footer",
    templateUrl: './footer.html'
})

export class FooterComponent {
    kategoriler: any;

    anaSayfaText: string;
    yeniIlanlarText: string;
    tumIlanlarText: string;
    hakkimizdaText: string;
    iletisimText: string;
    yasalUyari: any;

    errorMsg: string;

    constructor(private _emlakService: EmlakAjaxService) {
    }

    ngOnInit() {
        this._emlakService.getKategoriler()
            .subscribe(resData => this.kategoriler = resData,
                resError => this.errorMsg = resError);

        this._emlakService.getKodlaGetir("mnpg")
        .subscribe(resData => this.anaSayfaText = resData,
            resError => this.errorMsg = resError);

        this._emlakService.getKodlaGetir("newi")
            .subscribe(resData => this.yeniIlanlarText = resData,
                resError => this.errorMsg = resError);

        this._emlakService.getKodlaGetir("alli")
            .subscribe(resData => this.tumIlanlarText = resData,
                resError => this.errorMsg = resError);

        this._emlakService.getKodlaGetir("abus")
            .subscribe(resData => this.hakkimizdaText = resData,
                resError => this.errorMsg = resError);

        this._emlakService.getKodlaGetir("cont")
            .subscribe(resData => this.iletisimText = resData,
                resError => this.errorMsg = resError);

        this._emlakService.getIcerikGetir("Yasal-Uyari")
            .subscribe(resData => this.yasalUyari = resData,
                resError => this.errorMsg = resError);
    }
}