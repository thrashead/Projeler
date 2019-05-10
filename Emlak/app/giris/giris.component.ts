import { Component } from "@angular/core";
import { EmlakService } from "../emlak.service";

@Component({
    templateUrl: 'app/giris/giris.component.html',
    providers: [EmlakService]
})

export class GirisComponent{ 

    constructor() {
    }

    ngOnInit() {
       
    }
}