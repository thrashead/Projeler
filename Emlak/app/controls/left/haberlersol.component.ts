import { Component } from "@angular/core";
import { EmlakService } from "../../emlak.service";
import { SolService } from "../../sol.service";

@Component({
    selector: "emlak-haberlersol",
    templateUrl: 'app/controls/left/haberlersol.component.html',
    providers: [EmlakService, SolService]
})

export class HaberlerSolComponent{
    haberler: [];

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

    haberText: string;

    KodlaGetir() {
        this._emlakService.getKodlaGetir("news")
            .subscribe(resData => this.haberText = resData,
                resError => this.errorMsg = resError);
    }
}