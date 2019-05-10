import { Component } from "@angular/core";
import { IKService } from "../services/ik.service";

@Component({
    selector: 'app-ust',
    templateUrl: 'app/kontroller/ust.html',
    providers: [IKService]
})

export class UstComponent{ 
    durum: boolean;
    aktifKullanici: any;
    aktifFirma: any;
    errorMsg: string;

    constructor(private ikService: IKService) {
    }

    ngOnInit() {
        this.ikService.GirisDurum()
            .subscribe(data => this.durum = data);

        this.ikService.AktifKullanici()
            .subscribe(data => this.aktifKullanici = data);

        this.ikService.AktifFirma()
            .subscribe(data => this.aktifFirma = data);
    }
}