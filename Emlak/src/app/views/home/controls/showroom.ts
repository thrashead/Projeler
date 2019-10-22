import { Component } from "@angular/core";
import { EmlakAjaxService } from '../../../services/emlakajax';
import { HomeAjaxService } from '../../../services/homeajax';

@Component({
    selector: 'emlak-showroom',
    templateUrl: './showroom.html'
})

export class ShowroomComponent {
    errorMsg: string;

    vitrinIlanlarText: string;

    ilanlar: any;

    constructor(private _emlakService: EmlakAjaxService, private _homeService: HomeAjaxService) {
    }

    ngOnInit() {
        this._homeService.getVitrinIlanlar("4")
            .subscribe(resData => this.ilanlar = resData,
                resError => this.errorMsg = resError);

        this.KodlaGetir();
    }

    //KodlaGetir

    KodlaGetir() {
        this._emlakService.getKodlaGetir("swrm")
            .subscribe(resData => this.vitrinIlanlarText = resData,
                resError => this.errorMsg = resError);
    }
}