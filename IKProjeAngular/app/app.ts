import { Component, AfterContentInit } from "@angular/core";
import { IKService } from "./services/ik.service";
import { Router } from "@angular/router";

declare global {
    interface JQuery {
        watermark(obj: any): JQuery;
        mask(obj: any): JQuery;
        mousewheel(obj: any): JQuery;
        ckeditor(obj: any): JQuery;
        tdCalendar(obj: any): JQuery;
        tdSelect(obj: any): JQuery;
    }
}

@Component({
    selector: "ik-app",
    templateUrl: 'app/app.html',
    providers: [IKService]
})

export class AppComponent implements AfterContentInit {
    Kullanici: string;
    Firma: string;
    Giris: string;

    constructor(private ikService: IKService, private router: Router) {
    }

    ngAfterContentInit() {
        this.ikService.AktifKullanici()
            .subscribe(data => this.Kullanici = data != null ? data : "");

        this.ikService.AktifFirma()
            .subscribe(data => this.Firma = data != null ? data : "");

        this.ikService.GirisYontemi()
            .subscribe(data => this.Giris = data);
    }
}