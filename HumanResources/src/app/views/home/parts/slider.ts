import { Component } from '@angular/core';
import { SiteService } from '../../../services/site';

@Component({
    selector: 'hr-homeslider',
    templateUrl: './slider.html'
})

export class HomeSliderComponent {
    errorMsg: string;

    constructor(private service: SiteService) {
    }

    ngOnInit() {
    }
}
