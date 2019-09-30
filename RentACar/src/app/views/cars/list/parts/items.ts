import { Component } from '@angular/core';
import { SiteService } from '../../../../services/site';

@Component({
    selector: 'rac-carlistitems',
    templateUrl: './items.html'
})

export class CarsListItemsComponent {
    errorMsg: string;

    detail: string;

    carList: any;

    constructor(private service: SiteService) {
    }

    ngOnInit() {
        this.GetLangContent();
        this.GetCarList();
    }

    //LangContent
    GetLangContent() {
        this.service.get("Site", "GetLangContentByCode", "cmn_detail", 1).subscribe((resData: any) => {
            this.detail = resData.ShortDescription;
        }, resError => this.errorMsg = resError);
    }

    //CarList
    GetCarList() {
        this.service.get("Site", "GetCarList").subscribe((resData: any) => {
            const length = Math.ceil(resData.length / 10);
            this.carList = Array.from({ length }).map((x, j) => ({
                Cars: resData.filter((y, i) => i >= 10 * j && i < 10 * (j + 1))
            }));
        }, resError => this.errorMsg = resError);
    }
}
