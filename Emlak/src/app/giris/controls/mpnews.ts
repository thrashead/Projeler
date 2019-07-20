import { Component } from "@angular/core";
import { EmlakAjaxService } from "../../services/emlakajax";
import { SolAjaxService } from "../../services/solajax";

@Component({
    selector: 'emlak-mpnews',
    templateUrl: './mpnews.html'
})

export class MPNewsComponent{ 
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