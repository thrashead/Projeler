import { Component } from '@angular/core';
import { SiteService } from '../../../services/site';
import { ScriptsComponent } from '../../shared/controls/scripts';

@Component({
    selector: 'hr-homeslider',
    templateUrl: './slider.html'
})

export class HomeSliderComponent {
    errorMsg: string;

    constructor(private service: SiteService) {
    }

    ngOnInit() {
        ScriptsComponent.Slick('.main-slider-sec');
    }
}
