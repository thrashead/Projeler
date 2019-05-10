import { Component, AfterContentInit } from "@angular/core";
import { IKService } from "../services/ik.service";

@Component({
    selector: 'app-menu',
    templateUrl: 'app/kontroller/menu.html',
    providers: [IKService]
})

export class MenuComponent implements AfterContentInit {
    Giris: string;
    Durum: boolean;

    constructor(private ikService: IKService) {
    }

    ngAfterContentInit() {
        this.ikService.GirisDurum()
            .subscribe(data => this.Durum = data);

        this.ikService.GirisYontemi()
            .subscribe(data => this.Giris = data);
    }
}