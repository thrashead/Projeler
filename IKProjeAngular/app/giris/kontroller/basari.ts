import { Component } from "@angular/core";
import { IKService } from "../../services/ik.service";

@Component({
    selector: 'giris-basari',
    templateUrl: 'app/giris/kontroller/basari.html',
    providers: [IKService]
})

export class GirisBasariComponent {
    //rasgeleSiir: [];

    constructor(private ikService: IKService) {
    }

    ngOnInit() {
        //this.ikService.Data()
        //    .subscribe(data => this.rasgeleSiir = data);
    }
}