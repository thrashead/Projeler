import { Component } from "@angular/core";
import { EmlakService } from "../services/emlak.service";
import { SolService } from "../services/sol.service";

@Component({
    templateUrl: './haberler.html',
    providers: [EmlakService, SolService]
})

export class HaberlerComponent {
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
    
    haberlerText: string;

    KodlaGetir() {
        this._emlakService.getKodlaGetir("news")
            .subscribe(resData => this.haberlerText = resData,
                resError => this.errorMsg = resError);
    }
}