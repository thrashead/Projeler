import { Component, ViewEncapsulation } from "@angular/core";
import { IKService } from "../services/ik.service";

@Component({
    templateUrl: 'app/is/detay.html',
    styleUrls: [
        'Content/css/sayfalar/Sayfa.css',
        'Content/css/sayfalar/IsDetay.css'
    ],
    encapsulation: ViewEncapsulation.None,
    providers: [IKService]
})

export class IsDetayComponent {
    //rasgeleSiir: [];

    constructor(private ikService: IKService) {
    }

    ngOnInit() {
        //this.ikService.Data()
        //    .subscribe(data => this.rasgeleSiir = data);
    }
}