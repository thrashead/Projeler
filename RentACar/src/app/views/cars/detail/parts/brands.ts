import { Component } from '@angular/core';
import { SiteService } from '../../../../services/site';

@Component({
    selector: 'rac-cardetailbrands',
    templateUrl: './brands.html'
})

export class CarsDetailBrandsComponent {
    errorMsg: string;

    more: string;
    brands: string;

    carMakes: any;

    constructor(private service: SiteService) {
    }

    ngOnInit() {
        this.GetLangContent();
        this.GetCarMakes();
    }

    GetLangContent() {
        this.service.get("Site", "GetLangContentByCode", "cmn_more", 1).subscribe((resData: any) => {
            this.more = resData.ShortDescription;
        }, resError => this.errorMsg = resError);

        this.service.get("Site", "GetLangContentByCode", "car_makes_brands", 1).subscribe((resData: any) => {
            this.brands = resData.ShortDescription;
        }, resError => this.errorMsg = resError);
    }

    GetCarMakes() {
        this.service.get("Site", "GetMakeList", 7, true).subscribe((resData: any) => {
            this.carMakes = resData;
        }, resError => this.errorMsg = resError);
    }
}
