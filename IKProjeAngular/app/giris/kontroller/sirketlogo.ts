import { Component } from "@angular/core";
import { IKService } from "../../services/ik.service";

@Component({
    selector: 'giris-sirketlogo',
    templateUrl: 'app/giris/kontroller/sirketlogo.html',
    providers: [IKService]
})

export class GirisSirketLogoComponent{ 
    sirketLogolar: [];

    constructor(private ikService: IKService) {
    }

    ngOnInit() {
        this.ikService.SirketLogolar()
            .subscribe(data => this.sirketLogolar = data);
    }
}