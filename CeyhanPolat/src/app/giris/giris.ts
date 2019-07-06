import { Component } from "@angular/core";
import { CPService } from "../cp.service";

@Component({
    templateUrl: './giris.html',
    providers: [CPService]
})

export class GirisComponent{ 
    rasgeleSiir: any;
    kisaBiyografi: any;
    errorMsg: string;

    constructor(private _cpService: CPService) {
    }

    ngOnInit() {
        this._cpService.getRasgeleSiir()
            .subscribe(resRasgeleSiirData => this.rasgeleSiir = resRasgeleSiirData,
                resError => this.errorMsg = resError);

        this._cpService.getKisaBiyografi()
            .subscribe(resKisaBiyografiData => this.kisaBiyografi = resKisaBiyografiData,
                resError => this.errorMsg = resError);
    }
}