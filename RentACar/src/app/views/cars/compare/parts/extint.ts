import { Component, Input } from '@angular/core';
import { CarCompare } from '../../../../models/CarCompare';

@Component({
    selector: 'rac-carcompareextint',
    templateUrl: './extint.html'
})

export class CarsCompareExtIntComponent {
    @Input() carCompare: Array<CarCompare>;
    @Input() extint: any;

    ngOnInit() {

    }
}
