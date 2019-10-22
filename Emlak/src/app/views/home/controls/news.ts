import { Component } from "@angular/core";
import { EmlakAjaxService } from '../../../services/emlakajax';
import { SolAjaxService } from '../../../services/solajax';

@Component({
    selector: 'emlak-news',
    templateUrl: './news.html'
})

export class NewsComponent {
    errorMsg: string;

    haberlerText: string;
    haberLinkText: string;

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

    KodlaGetir() {
        this._emlakService.getKodlaGetir("news")
            .subscribe(resData => this.haberlerText = resData,
                resError => this.errorMsg = resError);

        this._emlakService.getKodlaGetir("devm")
            .subscribe(resData => this.haberLinkText = resData,
                resError => this.errorMsg = resError);
    }
}