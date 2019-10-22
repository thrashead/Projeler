import { Component } from "@angular/core";
import { EmlakAjaxService } from "../../../services/emlakajax";
import { HomeAjaxService } from '../../../services/homeajax';

@Component({
    selector: "emlak-contentrelist",
    templateUrl: './relist.html'
})

export class ContentReListComponent {
    errorMsg: string;

    ilanlarText: string;

    ilanlar: any;

    constructor(private homeService: HomeAjaxService, private emlakService: EmlakAjaxService) {
    }

    ngOnInit() {
        this.homeService.getVitrinIlanlar("5")
            .subscribe(resData => this.ilanlar = resData,
                resError => this.errorMsg = resError);

        this.KodlaGetir();
    }

    //KodlaGetir
    KodlaGetir() {
        this.emlakService.getKodlaGetir("ilan")
            .subscribe(resData => this.ilanlarText = resData,
                resError => this.errorMsg = resError);
    }
}