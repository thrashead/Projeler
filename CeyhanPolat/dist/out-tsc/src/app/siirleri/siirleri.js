import * as tslib_1 from "tslib";
import { Component } from "@angular/core";
import { CPService } from "../cp.service";
let SiirleriComponent = class SiirleriComponent {
    constructor(_cpService, router) {
        this._cpService = _cpService;
        this.router = router;
    }
    onClick(id) {
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
                    this.router.navigate(['/Biyografi']).then(() => { this.router.navigate(['/Siirleri']); });
                }
                else {
                    $("#processframe").css("display", "none");
                    alert("Arama kriterleri temizlenemedi...");
                }
            }, resError => this.errorMsg = resError);
        }
        else {
            let fd = id != "clearfirstdate" ? $("#clearfirstdate").text().replace(" [x]", "") : "";
            let ld = id != "clearlastdate" ? $("#clearlastdate").text().replace(" [x]", "") : "";
            let pn = id != "clearpoetryname" ? $("#clearpoetryname").text().replace(" [x]", "") : "";
            this.kelime = {
                "FirstDate": fd,
                "LastDate": ld,
                "PoetryName": pn,
            };
            if (fd == "" && ld == "" && pn == "") {
                this._cpService.getSiirAramaTemizle()
                    .subscribe((result) => {
                    if (result == true) {
                        this.router.navigate(['/Biyografi']).then(() => { this.router.navigate(['/Siirleri']); });
                    }
                    else {
                        $("#processframe").css("display", "none");
                        alert("Arama kriterleri temizlenemedi...");
                    }
                }, resError => this.errorMsg = resError);
            }
            else {
                this._cpService.getSiirArama(this.kelime)
                    .subscribe((result) => {
                    if (result == "Y") {
                        this.router.navigate(['/Biyografi']).then(() => { this.router.navigate(['/Siirleri']); });
                    }
                }, resError => this.errorMsg = resError);
            }
        }
    }
    ngOnInit() {
        this._cpService.getSiirleri()
            .subscribe(resSiirleriData => this.siirleri = resSiirleriData, resError => this.errorMsg = resError);
    }
};
SiirleriComponent = tslib_1.__decorate([
    Component({
        templateUrl: './siirleri.html',
        providers: [CPService]
    })
], SiirleriComponent);
export { SiirleriComponent };
//# sourceMappingURL=siirleri.js.map