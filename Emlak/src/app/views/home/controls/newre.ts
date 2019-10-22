import { Component } from "@angular/core";
import { EmlakAjaxService } from '../../../services/emlakajax';
import { SolAjaxService } from '../../../services/solajax';

@Component({
    selector: 'emlak-newre',
    templateUrl: './newre.html'
})

export class NewReComponent {
    errorMsg: string;

    yeniIlanlarText: string;

    ilanlar: any;

    constructor(private _emlakService: EmlakAjaxService, private _solService: SolAjaxService) {
    }

    ngOnInit() {
        this._solService.getYeniIlanlar("4")
            .subscribe(resData => this.ilanlar = resData,
                resError => this.errorMsg = resError);

        this.KodlaGetir();
    }

    //KodlaGetir

    KodlaGetir() {
        this._emlakService.getKodlaGetir("newi")
            .subscribe(resData => this.yeniIlanlarText = resData,
                resError => this.errorMsg = resError);
    }
}