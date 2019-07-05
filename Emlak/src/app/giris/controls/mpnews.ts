﻿import { Component } from "@angular/core";
import { EmlakService } from "../../services/emlak.service";
import { SolService } from "../../services/sol.service";

@Component({
    selector: 'emlak-mpnews',
    templateUrl: './mpnews.html',
    providers: [EmlakService, SolService]
})

export class MPNewsComponent{ 
    haberler: {};

    constructor(private _emlakService: EmlakService, private _solService: SolService) {
    }

    ngOnInit() {
        this._solService.getHaberler()
            .subscribe(resData => this.haberler = resData,
                resError => this.errorMsg = resError);

        this.KodlaGetir();
    }

    //KodlaGetir
    errorMsg: string;

    haberLinkText: string;
    haberlerText: string;

    KodlaGetir() {
        this._emlakService.getKodlaGetir("news")
            .subscribe(resData => this.haberlerText = resData,
                resError => this.errorMsg = resError);

        this._emlakService.getKodlaGetir("devm")
            .subscribe(resData => this.haberLinkText = resData,
                resError => this.errorMsg = resError);
    }
}