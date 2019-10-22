import { Component } from "@angular/core";
import { EmlakAjaxService } from "../../services/emlakajax";
import { SolAjaxService } from '../../services/solajax';

@Component({
    templateUrl: './news.html'
})

export class ContentNewsComponent {
    errorMsg: string;

    haberlerText: string;
    devamText: string;

    haberler: any;

    constructor(private _emlakService: EmlakAjaxService, private _solService: SolAjaxService) {
    }

    ngOnInit() {
        this._solService.getHaberler()
            .subscribe((resData: any) => {
                const length = Math.ceil(resData.length / 8);

                this.haberler = Array.from({ length }).map((x, j) => ({
                    Items: resData.filter((y, i) => i >= 8 * j && i < 8 * (j + 1))
                }));
            },
                resError => this.errorMsg = resError);

        this.KodlaGetir();
    }

    //KodlaGetir
    KodlaGetir() {
        this._emlakService.getKodlaGetir("news")
            .subscribe(resData => this.haberlerText = resData,
                resError => this.errorMsg = resError);

        this._emlakService.getKodlaGetir("devm")
            .subscribe(resData => this.devamText = resData,
                resError => this.errorMsg = resError);
    }
}