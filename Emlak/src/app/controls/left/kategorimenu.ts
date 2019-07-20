import { Component } from "@angular/core";
import { SolAjaxService } from "../../services/solajax";

@Component({
    selector: "emlak-kategorimenu",
    templateUrl: './kategorimenu.html'
})

export class KategoriMenuComponent {
    kategoriMenu: any;

    errorMsg: string;

    constructor(private _solService: SolAjaxService) {
    }

    ngOnInit() {
        this._solService.getKategoriMenu()
            .subscribe(resData => this.kategoriMenu = resData,
                resError => this.errorMsg = resError);
    }
}