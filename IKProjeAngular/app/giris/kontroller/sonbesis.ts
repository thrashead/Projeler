import { Component } from "@angular/core";
import { IKService } from "../../services/ik.service";

@Component({
    selector: 'giris-sonbesis',
    templateUrl: 'app/giris/kontroller/sonbesis.html',
    providers: [IKService]
})

export class GirisSonBesIsComponent {
    //rasgeleSiir: [];

    constructor(private ikService: IKService) {
    }

    ngOnInit() {
        //this.ikService.Data()
        //    .subscribe(data => this.rasgeleSiir = data);
    }
}