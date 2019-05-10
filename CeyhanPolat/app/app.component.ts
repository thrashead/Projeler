import { Component } from "@angular/core";
import { CPService } from "./cp.service";
import { FormGroup, FormControl } from '@angular/forms'
import { Router } from '@angular/router';

declare global {
    interface JQuery {
        flexslider(obj: any): JQuery;
        watermark(obj: string): JQuery;
        datepicker(obj: any): JQuery;
        tdGallery(obj: any): JQuery;
    }
}

@Component({
    selector: "cp-app",
    templateUrl: 'app/app.component.html',
    providers: [CPService]
})

export class AppComponent {
    menu: [];
    slider: [];
    aramaData: any;
    siirArama: string;
    siirAramaListe: string;
    errorMsg: string;

    searchForm = new FormGroup({
        firstdate: new FormControl(),
        lastdate: new FormControl(),
        poetryname: new FormControl()
    });

    onSubmit(event: any) {
        let fd: string = event.target.firstdate.value;
        let ld: string = event.target.lastdate.value;
        let pn: string = event.target.poetryname.value;

        if (fd == "" && ld == "" && pn == "") {
            this.router.navigate(['/Biyografi']).then(() => { this.router.navigate(['/Siirleri']) });
        }
        else {
            this.aramaData = [{
                "firstdate": fd,
                "lastdate": ld,
                "poetryname": pn,
            }];

            this._cpService.getSiirArama(this.aramaData)
                .subscribe((resSiirAramaData) => {
                    this.siirArama = resSiirAramaData;

                    if (this.siirArama == "Y") {
                        this.router.navigate(['/Biyografi']).then(() => { this.router.navigate(['/Siirleri']) });
                    }
                },
                    resError => this.errorMsg = resError);
        }
    }

    constructor(private _cpService: CPService, private router: Router) {

    }

    onKeyUp(kelime: string) {
        this._cpService.getSiirAramaListe(kelime)
            .subscribe((resSiirAramaListeData) => {
                this.siirAramaListe = resSiirAramaListeData

                if (this.siirAramaListe.length > 0) {
                    $("#siirsearchlist").css("display", "");
                }
            },
                resError => this.errorMsg = resError);
    }

    onFocus() {
        if ($("#siirsearchlist li").length > 0) {
            setTimeout(function () {
                $("#siirsearchlist").css("display", "");
            }, 100);
        }
    }

    onBlur() {
        if ($("#siirsearchlist li").length > 0) {
            setTimeout(function () {
                $("#siirsearchlist").css("display", "none");
            }, 100);
        }
    }

    ngOnInit() {
        this._cpService.getMenu()
            .subscribe((resMenuData) => {
                this.menu = resMenuData;
            },
                resError => this.errorMsg = resError);

        this._cpService.getSlider()
            .subscribe((resSliderData) => {
                this.slider = resSliderData;

                setTimeout(function () {
                    var d = new Date();
                    $("#poetryname").watermark("Şiir İsmi");
                    $("#firstdate").watermark("İlk Tarih");
                    $("#lastdate").watermark("Son Tarih");
                    $("#firstdate").datepicker({ dateFormat: "dd.mm.yy", defaultDate: new Date("03/30/1944") });
                    $("#lastdate").datepicker({ dateFormat: "dd.mm.yy", defaultDate: new Date("01/06/1982") });

                    $('#slider').flexslider({
                        animation: "slide",
                        slideshowSpeed: 3000,
                        animationSpeed: 1000
                    });
                }, 500);
            },
                resError => this.errorMsg = resError);
    }
}