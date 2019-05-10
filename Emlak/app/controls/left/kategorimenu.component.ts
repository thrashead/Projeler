import { Component } from "@angular/core";
import { SolService } from "../../sol.service";

@Component({
    selector: "emlak-kategorimenu",
    templateUrl: 'app/controls/left/kategorimenu.component.html',
    providers: [SolService]
})

export class KategoriMenuComponent {
    kategoriMenu: [];

    errorMsg: string;

    constructor(private _solService: SolService) {
    }

    ngOnInit() {
        this._solService.getKategoriMenu()
            .subscribe(resData => this.kategoriMenu = resData,
                resError => this.errorMsg = resError);
    }
}