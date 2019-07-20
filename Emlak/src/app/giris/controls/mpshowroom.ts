import { Component } from "@angular/core";
import { EmlakAjaxService } from "../../services/emlakajax";
import { HomeAjaxService } from "../../services/homeajax";

@Component({
    selector: 'emlak-mpshowroom',
    templateUrl: './mpshowroom.html'
})

export class MPShowroomComponent {
    ilanlar: any;

    constructor(private _emlakService: EmlakAjaxService, private _homeService: HomeAjaxService) {
    }

    ngOnInit() {
        this._homeService.getVitrinIlanlar("3")
            .subscribe(resData => this.ilanlar = resData,
                resError => this.errorMsg = resError);

        this.KodlaGetir();
    }

    //KodlaGetir
    errorMsg: string;

    vitrinIlanlarText: string;
    tumIlanlarText: string;
    vitrinIlanlarResimText: string = "resimyok";
    detayLinkText: string = "resimyok";

    KodlaGetir() {
        this._emlakService.getKodlaGetir("swrm")
            .subscribe(resData => this.vitrinIlanlarText = resData,
                resError => this.errorMsg = resError);

        this._emlakService.getKodlaGetir("alli")
            .subscribe(resData => this.tumIlanlarText = resData,
                resError => this.errorMsg = resError);

        this._emlakService.getKodlaGetir("newr")
            .subscribe(resData => this.vitrinIlanlarResimText = resData,
                resError => this.errorMsg = resError);

        this._emlakService.getKodlaGetir("dtyr")
            .subscribe(resData => this.detayLinkText = resData,
                resError => this.errorMsg = resError);
    }
}