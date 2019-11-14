import { Component, Input } from "@angular/core";
import { SiteService } from '../../../services/site';

@Component({
    selector: 'emlak-slider',
    templateUrl: './slider.html'
})

export class SliderComponent {
    slider: any;

    errorMsg: string;

    @Input() lang: any;

    constructor(private service: SiteService) {
    }

    ngOnInit() {
        this.service.get("Site", "Slider").subscribe((resData: any) => {
            this.slider = resData;
        }, resError => this.errorMsg = resError);
    }
}