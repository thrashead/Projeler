import { Component, Input } from '@angular/core';
import { CarCompare } from '../../../../models/CarCompare';

@Component({
    selector: 'rac-carcomparebasic',
    templateUrl: './basic.html'
})

export class CarsCompareBasicComponent {
    @Input() compareLength: number;
    @Input() carCompare: Array<CarCompare>;

    ngOnInit() {

    }
}
