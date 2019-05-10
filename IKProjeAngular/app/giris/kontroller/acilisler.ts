import { Component } from "@angular/core";
import { IKService } from "../../services/ik.service";

@Component({
    selector: 'giris-acilisler',
    templateUrl: 'app/giris/kontroller/acilisler.html',
    providers: [IKService]
})

export class GirisAcilIslerComponent{ 
    //rasgeleSiir: [];

    constructor(private ikService: IKService) {
    }

    ngOnInit() {
        //this.ikService.Data()
        //    .subscribe(data => this.rasgeleSiir = data);
    }
}