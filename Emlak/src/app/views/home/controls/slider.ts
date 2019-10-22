import { Component } from "@angular/core";
import { HomeAjaxService } from "../../../services/homeajax";

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
        this._homeService.getBanners().subscribe((resData: any) => {
            this.slider = resData;
        }, resError => this.errorMsg = resError);
    }
}