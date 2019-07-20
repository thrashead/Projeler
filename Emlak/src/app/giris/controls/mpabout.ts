import { Component } from "@angular/core";
import { EmlakAjaxService } from "../../services/emlakajax";

@Component({
    selector: 'emlak-mpabout',
    templateUrl: './mpabout.html'
})

export class MPAboutComponent {
    about: any;

    constructor(private _emlakService: EmlakAjaxService) {
    }

    ngOnInit() {
        this._emlakService.getIcerikGetir("Hakkimizda")
            .subscribe(resData => this.about = resData,
                resError => this.errorMsg = resError);

        this.KodlaGetir();
    }

    //KodlaGetir
    errorMsg: string;

    devamText: string;
    hakkimizdaText: string;

    KodlaGetir() {
        this._emlakService.getKodlaGetir("devm")
            .subscribe(resData => this.devamText = resData,
                resError => this.errorMsg = resError);

        this._emlakService.getKodlaGetir("abus")
            .subscribe(resData => this.hakkimizdaText = resData,
                resError => this.errorMsg = resError);
    }
}