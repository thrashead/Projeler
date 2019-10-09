import { Component, Input } from '@angular/core';
import { CarCompare } from '../../../../models/CarCompare';

@Component({
    selector: 'rac-carcomparemechanical',
    templateUrl: './mechanical.html'
})

export class CarsCompareMechanicalComponent {
    @Input() carCompare: Array<CarCompare>;
    @Input() mech: any;

    ngOnInit() {

    }
}
