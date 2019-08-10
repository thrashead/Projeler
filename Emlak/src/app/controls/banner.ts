import { Component } from "@angular/core";
import { EmlakAjaxService } from "../services/emlakajax";

@Component({
    selector: "emlak-banner",
    templateUrl: './banner.html'
})

export class BannerComponent{ 
    constructor(private _emlakService: EmlakAjaxService) {
    }

    ngOnInit() {
        this._emlakService.getRasgeleBanner()
            .subscribe((resData: any) => {
                $("#UstBolge").css("background-image", "url('" +  resData + "')");
            },
                resError => this.errorMsg = resError);

        this.KodlaGetir();
    }

    //KodlaGetir
    errorMsg: string;

    satilikText: string;
    kiralikText: string;
    yeniText: string;
    listeleText: string;

    KodlaGetir() {
        this._emlakService.getKodlaGetir("fors")
            .subscribe(resData => this.satilikText = resData,
                resError => this.errorMsg = resError);

        this._emlakService.getKodlaGetir("forr")
            .subscribe(resData => this.kiralikText = resData,
                resError => this.errorMsg = resError);

        this._emlakService.getKodlaGetir("newb")
            .subscribe(resData => this.yeniText = resData,
                resError => this.errorMsg = resError);

        this._emlakService.getKodlaGetir("allb")
            .subscribe(resData => this.listeleText = resData,
                resError => this.errorMsg = resError);
    }
}