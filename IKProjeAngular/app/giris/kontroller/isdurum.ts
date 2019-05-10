import { Component } from "@angular/core";
import { IKService } from "../../services/ik.service";

@Component({
    selector: 'giris-isdurum',
    templateUrl: 'app/giris/kontroller/isdurum.html',
    providers: [IKService]
})

export class GirisIsDurumComponent {
    //rasgeleSiir: [];

    constructor(private ikService: IKService) {
    }

    ngOnInit() {
        //this.ikService.Data()
        //    .subscribe(data => this.rasgeleSiir = data);
    }
}