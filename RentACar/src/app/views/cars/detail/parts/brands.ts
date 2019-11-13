import { Component, Input } from '@angular/core';
import { SiteService } from '../../../../services/site';

@Component({
    selector: 'rac-cardetailbrands',
    templateUrl: './brands.html'
})

export class CarsDetailBrandsComponent {
    errorMsg: string;

    carMakes: any;

    @Input() langs: any;

    constructor(private service: SiteService) {
    }

    ngOnInit() {
        this.GetCarMakes();
    }

    GetCarMakes() {
        this.service.get("Site", "GetMakeList", 7, true).subscribe((resData: any) => {
            this.carMakes = resData;
        }, resError => this.errorMsg = resError);
    }
}
