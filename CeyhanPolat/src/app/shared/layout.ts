import { Component } from "@angular/core";
import { FormGroup, FormControl } from '@angular/forms'
import { Router } from '@angular/router';
import { CPService } from '../cp.service';

@Component({
    selector: 'app-layout',
    templateUrl: './layout.html',
    providers: [CPService]
})

export class LayoutComponent {
    menu: any;
    slider: any;
    aramaData: any;
    siirArama: any;
    siirAramaListe: any;
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
            this.aramaData = {
                "FirstDate": fd,
                "LastDate": ld,
                "PoetryName": pn,
            };

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