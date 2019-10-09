import { Component, Input } from '@angular/core';
import { CarCompare } from '../../../../models/CarCompare';

@Component({
    selector: 'rac-carcompareextint',
    templateUrl: './extint.html'
})

export class CarsCompareExtIntComponent {
    @Input() compareLength: number;
    @Input() carCompare: Array<CarCompare>;

    ngOnInit() {

    }
}
