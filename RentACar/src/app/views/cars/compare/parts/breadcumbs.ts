import { Component, Input } from '@angular/core';

@Component({
    selector: 'rac-carcomparebreadcumbs',
    templateUrl: './breadcumbs.html'
})

export class CarsCompareBreadCumbsComponent {
    @Input() langs: any;

    ngOnInit() {
    }
}