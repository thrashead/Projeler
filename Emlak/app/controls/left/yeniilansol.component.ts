import { Component } from "@angular/core";
import { EmlakService } from "../../emlak.service";
import { SolService } from "../../sol.service";

@Component({
    selector: "emlak-yeniilansol",
    templateUrl: 'app/controls/left/yeniilansol.component.html',
    providers: [EmlakService, SolService]
})

export class YeniIlanSolComponent {
    ilanlar: [];

    constructor(private _emlakService: EmlakService, private _solService: SolService) {
    }

    ngOnInit() {
        this._solService.getYeniIlanlar(0)
            .subscribe(resData => this.ilanlar = resData,
                resError => this.errorMsg = resError);

        this.KodlaGetir();
    }

    //KodlaGetir
    errorMsg: string;

    yeniIlanlarText: string;
    detayLinkText: string = "resimyok";

    KodlaGetir() {
        this._emlakService.getKodlaGetir("newi")
            .subscribe(resData => this.yeniIlanlarText = resData,
                resError => this.errorMsg = resError);

        this._emlakService.getKodlaGetir("dtyr")
            .subscribe(resData => this.detayLinkText = resData,
                resError => this.errorMsg = resError);
    }
}