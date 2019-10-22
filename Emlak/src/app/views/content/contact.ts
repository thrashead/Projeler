import { Component } from "@angular/core";
import { EmlakAjaxService } from "../../services/emlakajax";

@Component({
    templateUrl: './contact.html'
})

export class ContentContactComponent {
    iletisim: any;
    public link: string;

    errorMsg: string;

    constructor(private _emlakService: EmlakAjaxService) {
    }

    ngOnInit() {
        this._emlakService.getIcerikGetir("Iletisim")
            .subscribe((resData: any) => {
                this.iletisim = resData;
            },
                resError => this.errorMsg = resError);
    }
}