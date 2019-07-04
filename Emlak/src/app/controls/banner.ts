import { Component } from "@angular/core";
import { EmlakService } from "../services/emlak.service";

@Component({
    selector: "emlak-banner",
    templateUrl: './banner.html',
    providers: [EmlakService]
})

export class BannerComponent{ 
    constructor(private _emlakService: EmlakService) {
    }

    ngOnInit() {
        this._emlakService.getRasgeleBanner()
            .subscribe((resData) => {
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