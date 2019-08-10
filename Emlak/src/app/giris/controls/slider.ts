import { Component } from "@angular/core";
import { HomeAjaxService } from "../../services/homeajax";

@Component({
    selector: 'emlak-slider',
    templateUrl: './slider.html'
})

export class SliderComponent {
    slider: any;

    errorMsg: string;

    constructor(private _homeService: HomeAjaxService) {
    }

    ngOnInit() {
        this._homeService.getSlider()
            .subscribe((resData: any) => {
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