import { Component } from "@angular/core";
import { EmlakAjaxService } from "../../services/emlakajax";
import { SolAjaxService } from "../../services/solajax";

@Component({
    selector: "emlak-haberlersol",
    templateUrl: './haberlersol.html'
})

export class HaberlerSolComponent{
    haberler: any;

    constructor(private _emlakService: EmlakAjaxService, private _solService: SolAjaxService) {
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