import { Component } from "@angular/core";
import { CPService } from "../cp.service";
import { Router } from '@angular/router';

@Component({
    templateUrl: './siirleri.html',
    providers: [CPService]
})

export class SiirleriComponent {
    siirleri: any;
    kelime: any;
    errorMsg: string;

    constructor(private _cpService: CPService, private router: Router) {
    }

    onClick(id: string) {
        $(this).attr("disabled", "disabled");
        $("#processframe").css("display", "block");

        if (id == "" || id == null) {
            this.kelime = {
                "FirstDate": "",
                "LastDate": "",
                "PoetryName": "",
            };

            this._cpService.getSiirAramaTemizle()
                .subscribe((result) => {
                    if (result == true) {
                        this.router.navigate(['/Biyografi']).then(() => { this.router.navigate(['/Siirleri']) });
                    }
                    else {
                        $("#processframe").css("display", "none");
                        alert("Arama kriterleri temizlenemedi...");
                    }
                },
                    resError => this.errorMsg = resError);
        }
        else {
            let fd: string = id != "clearfirstdate" ? $("#clearfirstdate").text().replace(" [x]", "") : "";
            let ld: string = id != "clearlastdate" ? $("#clearlastdate").text().replace(" [x]", "") : "";
            let pn: string = id != "clearpoetryname" ? $("#clearpoetryname").text().replace(" [x]", "") : "";

            this.kelime = {
                "FirstDate": fd,
                "LastDate": ld,
                "PoetryName": pn,
            };

            if (fd == "" && ld == "" && pn == "") {
                this._cpService.getSiirAramaTemizle()
                    .subscribe((result) => {
                        if (result == true) {
                            this.router.navigate(['/Biyografi']).then(() => { this.router.navigate(['/Siirleri']) });
                        }
                        else {
                            $("#processframe").css("display", "none");
                            alert("Arama kriterleri temizlenemedi...");
                        }
                    },
                        resError => this.errorMsg = resError);
            }
            else {
                this._cpService.getSiirArama(this.kelime)
                    .subscribe((result) => {
                        if (result == "Y") {
                            this.router.navigate(['/Biyografi']).then(() => { this.router.navigate(['/Siirleri']) });
                        }
                    },
                        resError => this.errorMsg = resError);
            }
        }
    }

    ngOnInit() {
        this._cpService.getSiirleri()
            .subscribe(resSiirleriData => this.siirleri = resSiirleriData,
                resError => this.errorMsg = resError);
    }
}