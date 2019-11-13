import { Component, Input } from '@angular/core';
import { SiteService } from '../../../services/site';
import { ScriptsComponent } from '../../shared/controls/scripts';

@Component({
    selector: 'rac-homeslider',
    templateUrl: './slider.html'
})

export class HomeSliderComponent {
    errorMsg: string;

    Slider: any;

    @Input() langs: any;

    constructor(private service: SiteService) {
    }

    ngOnInit() {
        this.GetSlider();
    }

    //Slider
    GetSlider() {
        this.service.get("Site", "SliderByCode", "mainslider", null).subscribe((resData: any) => {
            this.Slider = resData;

            ScriptsComponent.Carousel();
        }, resError => this.errorMsg = resError);
    }
}
