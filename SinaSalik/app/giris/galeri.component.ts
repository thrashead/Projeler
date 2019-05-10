import { Component } from "@angular/core";
import { SinaService } from "../sina.service";

@Component({
    templateUrl: 'app/giris/galeri.component.html',
    providers: [SinaService]
})

export class GaleriComponent {
    galeri: [];

    errorMsg: string;

    constructor(private _sinaService: SinaService) {
    }

    ngOnInit() {
        this._sinaService.getResimler()
            .subscribe((resData) => {
                this.galeri = resData;

                setTimeout(function () {
                    $("#slider").tdSlider({
                        autostart: false,
                        slideonclick: true,
                        imagestretch: false,
                        width: 600,
                        height: 500,
                        direction: "LTR",
                        duration: 1000,
                        effect: "fade",
                        showbuttons: true,
                        buttonstyle: "thumb",
                        thumbheight: 70,
                        thumbwidth: 100,
                        tabeffect: "fade",
                        tabbed: true,
                        border: 0
                    });
                }, 500);
            },
                resError => this.errorMsg = resError);
    }
}