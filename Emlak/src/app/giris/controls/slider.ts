import { Component } from "@angular/core";
import { HomeService } from "../../services/home.service";

@Component({
    selector: 'emlak-slider',
    templateUrl: './slider.html',
    providers: [HomeService]
})

export class SliderComponent {
    slider: any;

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