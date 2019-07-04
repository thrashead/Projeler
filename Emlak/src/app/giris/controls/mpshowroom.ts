import { Component } from "@angular/core";
import { EmlakService } from "../../services/emlak.service";
import { HomeService } from "../../services/home.service";

@Component({
    selector: 'emlak-mpshowroom',
    templateUrl: './mpshowroom.html',
    providers: [EmlakService, HomeService]
})

export class MPShowroomComponent {
    ilanlar: {};

    constructor(private _emlakService: EmlakService, private _homeService: HomeService) {
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