import { Component } from "@angular/core";
import { EmlakService } from "../emlak.service";

@Component({
    templateUrl: 'app/icerik/iletisim.component.html',
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