import { Component, Input } from '@angular/core';

@Component({
    selector: 'rac-carbookingbreadcumbs',
    templateUrl: './breadcumbs.html'
})

export class CarsBookingBreadCumbsComponent {
    @Input() langs: any;

    ngOnInit() {
    }
}
