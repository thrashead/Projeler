import { Component } from "@angular/core";
import { IKService } from "../../services/ik.service";

@Component({
    selector: 'giris-sehirler',
    templateUrl: 'app/giris/kontroller/sehirler.html',
    providers: [IKService]
})

export class GirisSehirlerComponent {
    //rasgeleSiir: [];

    constructor(private ikService: IKService) {
    }

    ngOnInit() {
        //this.ikService.Data()
        //    .subscribe(data => this.rasgeleSiir = data);
    }
}