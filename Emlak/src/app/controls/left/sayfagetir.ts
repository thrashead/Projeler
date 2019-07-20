import { Component } from "@angular/core";
import { EmlakAjaxService } from "../../services/emlakajax";
import { SolAjaxService } from "../../services/solajax";

@Component({
    selector: "emlak-sayfagetir",
    templateUrl: './sayfagetir.html'
})

export class SayfaGetirComponent{ 
    sayfalar: any;

    sayac: string;

    constructor(private _emlakService: EmlakAjaxService, private _solService: SolAjaxService) {
    }

    ngOnInit() {
        this._solService.getSayac()
            .subscribe(resData => this.sayac = resData.toString(),
                resError => this.errorMsg = resError);

        this._solService.getSayfalar()
            .subscribe(resData => this.sayfalar = resData,
                resError => this.errorMsg = resError);

        this.KodlaGetir();
    }

    //KodlaGetir
    errorMsg: string;

    anaSayfaText: string;
    ziyaretciText: string;

    KodlaGetir() {
        this._emlakService.getKodlaGetir("mnpg")
            .subscribe(resData => this.anaSayfaText = resData,
                resError => this.errorMsg = resError);

        this._emlakService.getKodlaGetir("ziya")
            .subscribe(resData => this.ziyaretciText = resData,
                resError => this.errorMsg = resError);
    }
}