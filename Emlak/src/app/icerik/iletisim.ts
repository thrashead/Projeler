import { Component } from "@angular/core";
import { EmlakAjaxService } from "../services/emlakajax";

@Component({
    templateUrl: './iletisim.html'
})

export class IletisimComponent {
    iletisim: any;

    errorMsg: string;

    constructor(private _emlakService: EmlakAjaxService) {
    }

    ngOnInit() {
        this._emlakService.getIcerikGetir("Iletisim")
            .subscribe(resData => this.iletisim = resData,
                resError => this.errorMsg = resError);
    }
}