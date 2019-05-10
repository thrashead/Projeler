import { Component } from "@angular/core";
import { IKService } from "../services/ik.service";

@Component({
    selector: 'app-alt',
    templateUrl: 'app/kontroller/alt.html',
    providers: [IKService]
})

export class AltComponent {
    //rasgeleSiir: [];

    constructor(private ikService: IKService) {
    }

    ngOnInit() {
        //this.ikService.Data()
        //    .subscribe(data => this.rasgeleSiir = data);
    }
}