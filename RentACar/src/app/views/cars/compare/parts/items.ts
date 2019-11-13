import { Component, Input } from '@angular/core';
import { SiteService } from '../../../../services/site';
import { CarCompare } from '../../../../models/CarCompare';

@Component({
    selector: 'rac-carcompareitems',
    templateUrl: './items.html'
})

export class CarsCompareItemsComponent {
    errorMsg: string;

    carCompare: Array<CarCompare>;

    @Input() langs: any;

    constructor(private service: SiteService) {
    }

    ngOnInit() {
        this.GetCarCompareList();
    }

    //CarCompareList
    GetCarCompareList() {
        this.service.get("Site", "GetCarCompareList").subscribe((resData: any) => {
            this.carCompare = new Array<CarCompare>();

            this.carCompare = resData;
        }, resError => this.errorMsg = resError);
    }
}
