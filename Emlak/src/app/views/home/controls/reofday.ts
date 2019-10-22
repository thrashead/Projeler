import { Component } from "@angular/core";
import { EmlakAjaxService } from '../../../services/emlakajax';
import { SolAjaxService } from '../../../services/solajax';

@Component({
    selector: 'emlak-reofday',
    templateUrl: './reofday.html'
})

export class ReOfDayComponent {
    errorMsg: string;

    gununIlaniText: string;

    emlak: any;

    constructor(private _emlakService: EmlakAjaxService, private _solService: SolAjaxService) {
    }

    ngOnInit() {
        this._solService.getGununIlani()
            .subscribe(resData => this.emlak = resData,
                resError => this.errorMsg = resError);

        this.KodlaGetir();
    }

    //KodlaGetir

    KodlaGetir() {
        this._emlakService.getKodlaGetir("guil")
            .subscribe(resData => this.gununIlaniText = resData,
                resError => this.errorMsg = resError);
    }
}