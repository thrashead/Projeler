import { Component, Input } from '@angular/core';

@Component({
    selector: 'rac-cardetailbreadcumbs',
    templateUrl: './breadcumbs.html'
})

export class CarsDetailBreadCumbsComponent {
    @Input() title;
    @Input() url;

    @Input() langs: any;

    ngOnInit() {
    }
}
