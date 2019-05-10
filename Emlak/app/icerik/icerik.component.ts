import { Component } from "@angular/core";
import { EmlakService } from "../emlak.service";
import { ActivatedRoute, Params } from '@angular/router';

@Component({
    templateUrl: 'app/icerik/icerik.component.html',
    providers: [EmlakService]
})

export class IcerikComponent {
    icerik: {};
    public link: string;

    errorMsg: string;

    constructor(private _emlakService: EmlakService, private route: ActivatedRoute) {
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