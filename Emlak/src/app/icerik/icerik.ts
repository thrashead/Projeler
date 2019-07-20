import { Component } from "@angular/core";
import { EmlakAjaxService } from "../services/emlakajax";
import { ActivatedRoute, Params } from '@angular/router';

@Component({
    templateUrl: './icerik.html'
})

export class IcerikComponent {
    icerik: any;
    public link: string;

    errorMsg: string;

    constructor(private _emlakService: EmlakAjaxService, private route: ActivatedRoute) {
    }

    ngOnInit() {
        this.route.params.subscribe((params: Params) => {
            this.link = params['link'];

            this._emlakService.getIcerikGetir(this.link)
                .subscribe((resData) => {
                    this.icerik = resData;
                },
                    resError => this.errorMsg = resError);
        });
    }
}