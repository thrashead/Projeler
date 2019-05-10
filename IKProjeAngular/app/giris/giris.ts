import { Component, ViewEncapsulation } from "@angular/core";
import { IKService } from "../services/ik.service";

@Component({
    templateUrl: 'app/giris/giris.html',
    styleUrls: [
        'Content/css/sayfalar/AnaSayfa.css'
    ],
    encapsulation: ViewEncapsulation.None,
    providers: [IKService]
})

export class GirisComponent {
    //rasgeleSiir: [];

    constructor(private ikService: IKService) {
    }

    ngOnInit() {
        //this.ikService.Data()
        //    .subscribe(data => this.rasgeleSiir = data);
    }
}