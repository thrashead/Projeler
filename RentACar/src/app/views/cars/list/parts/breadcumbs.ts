import { Component, Input } from '@angular/core';

@Component({
    selector: 'rac-carlistbreadcumbs',
    templateUrl: './breadcumbs.html'
})

export class CarsListBreadCumbsComponent {
    @Input() langs: any;

    ngOnInit() {
    }
}
