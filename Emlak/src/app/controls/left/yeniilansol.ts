import { Component } from "@angular/core";
import { EmlakAjaxService } from "../../services/emlakajax";
import { SolAjaxService } from "../../services/solajax";

@Component({
    selector: "emlak-yeniilansol",
    templateUrl: './yeniilansol.html'
})

export class YeniIlanSolComponent {
    ilanlar: any;

    constructor(private _emlakService: EmlakAjaxService, private _solService: SolAjaxService) {
    }

    ngOnInit() {
        this._solService.getYeniIlanlar("0")
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