import { Component } from "@angular/core";
import { SolService } from "../../services/sol.service";

@Component({
    selector: "emlak-kategorimenu",
    templateUrl: './kategorimenu.html',
    providers: [SolService]
})

export class KategoriMenuComponent {
    kategoriMenu: any;

    errorMsg: string;

    constructor(private _solService: SolService) {
    }

    ngOnInit() {
        this._solService.getKategoriMenu()
            .subscribe(resData => this.kategoriMenu = resData,
                resError => this.errorMsg = resError);
    }
}