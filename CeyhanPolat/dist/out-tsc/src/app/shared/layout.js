import * as tslib_1 from "tslib";
import { Component } from "@angular/core";
import { FormGroup, FormControl } from '@angular/forms';
import { CPService } from '../cp.service';
let LayoutComponent = class LayoutComponent {
    constructor(_cpService, router) {
        this._cpService = _cpService;
        this.router = router;
        this.searchForm = new FormGroup({
            firstdate: new FormControl(),
            lastdate: new FormControl(),
            poetryname: new FormControl()
        });
    }
    onSubmit(event) {
        let fd = event.target.firstdate.value;
        let ld = event.target.lastdate.value;
        let pn = event.target.poetryname.value;
        if (fd == "" && ld == "" && pn == "") {
            this.router.navigate(['/Biyografi']).then(() => { this.router.navigate(['/Siirleri']); });
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
                    this.router.navigate(['/Biyografi']).then(() => { this.router.navigate(['/Siirleri']); });
                }
            }, resError => this.errorMsg = resError);
        }
    }
    onKeyUp(kelime) {
        this._cpService.getSiirAramaListe(kelime)
            .subscribe((resSiirAramaListeData) => {
            this.siirAramaListe = resSiirAramaListeData;
            if (this.siirAramaListe.length > 0) {
                $("#siirsearchlist").css("display", "");
            }
        }, resError => this.errorMsg = resError);
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
        }, resError => this.errorMsg = resError);
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
        }, resError => this.errorMsg = resError);
    }
};
LayoutComponent = tslib_1.__decorate([
    Component({
        selector: 'app-layout',
        templateUrl: './layout.html',
        providers: [CPService]
    })
], LayoutComponent);
export { LayoutComponent };
//# sourceMappingURL=layout.js.map