import { Component } from "@angular/core";
import { EmlakService } from "../services/emlak.service";

@Component({
    templateUrl: './iletisim.html',
    providers: [EmlakService]
})

export class IletisimComponent {
    iletisim: {};

    errorMsg: string;

    constructor(private _emlakService: EmlakService) {
    }

    ngOnInit() {
        this._emlakService.getIcerikGetir("Iletisim")
            .subscribe(resData => this.iletisim = resData,
                resError => this.errorMsg = resError);
    }
}