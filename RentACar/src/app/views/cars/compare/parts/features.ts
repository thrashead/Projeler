import { Component, Input } from '@angular/core';
import { CarCompare } from '../../../../models/CarCompare';

@Component({
    selector: 'rac-carcomparefeatures',
    templateUrl: './features.html'
})

export class CarsCompareFeaturesComponent {
    @Input() carCompare: Array<CarCompare>;
    @Input() feats: any;

    ngOnInit() {

    }
}
