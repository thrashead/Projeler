import { Component } from "@angular/core";
import { EmlakService } from "../../emlak.service";

@Component({
    selector: 'emlak-mpabout',
    templateUrl: 'app/giris/controls/mpabout.component.html',
    providers: [EmlakService]
})

export class MPAboutComponent {
    about: {};

    constructor(private _emlakService: EmlakService) {
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