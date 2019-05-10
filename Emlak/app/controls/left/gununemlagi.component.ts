import { Component } from "@angular/core";
import { EmlakService } from "../../emlak.service";
import { SolService } from "../../sol.service";

@Component({
    selector: "emlak-gununemlagi",
    templateUrl: 'app/controls/left/gununemlagi.component.html',
    providers: [EmlakService, SolService]
})

export class GununEmlagiComponent{
    emlak: {};

    constructor(private _emlakService: EmlakService, private _solService: SolService) {
    }

    ngOnInit() {
        this._solService.getGununIlani()
            .subscribe(resData => this.emlak = resData,
                resError => this.errorMsg = resError);

        this.KodlaGetir();
    }

    //KodlaGetir
    errorMsg: string;

    gununIlaniText: string;
    detayLinkText: string = "resimyok";

    KodlaGetir() {
        this._emlakService.getKodlaGetir("guil")
            .subscribe(resData => this.gununIlaniText = resData,
                resError => this.errorMsg = resError);

        this._emlakService.getKodlaGetir("dtyr")
            .subscribe(resData => this.detayLinkText = resData,
                resError => this.errorMsg = resError);
    }
}