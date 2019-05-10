import { Component } from "@angular/core";
import { HomeService } from "../../home.service";

@Component({
    selector: 'emlak-slider',
    templateUrl: 'app/giris/controls/slider.component.html',
    providers: [HomeService]
})

export class SliderComponent {
    slider: [];

    errorMsg: string;

    constructor(private _homeService: HomeService) {
    }

    ngOnInit() {
        this._homeService.getSlider()
            .subscribe((resData) => {
                this.slider = resData;

                setTimeout(function () {
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