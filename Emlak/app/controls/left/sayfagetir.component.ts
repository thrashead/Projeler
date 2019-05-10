﻿import { Component } from "@angular/core";
import { EmlakService } from "../../emlak.service";
import { SolService } from "../../sol.service";

@Component({
    selector: "emlak-sayfagetir",
    templateUrl: 'app/controls/left/sayfagetir.component.html',
    providers: [EmlakService, SolService]
})

export class SayfaGetirComponent{ 
    sayfalar: [];

    sayac: string;

    constructor(private _emlakService: EmlakService, private _solService: SolService) {
    }

    ngOnInit() {
        this._solService.getSayac()
            .subscribe(resData => this.sayac = resData,
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