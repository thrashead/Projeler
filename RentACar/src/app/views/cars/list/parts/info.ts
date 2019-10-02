import { Component, Output, EventEmitter } from '@angular/core';
import { SiteService } from '../../../../services/site';

@Component({
    selector: 'rac-carlistinfo',
    templateUrl: './info.html'
})

export class CarsListInfoComponent {
    errorMsg: string;

    sortorder: string;
    recentview: string;
    compare: string;

    lastCarList: any;
    orderList: any;

    @Output() orderChange = new EventEmitter<any>();

    constructor(private service: SiteService) {
    }

    ngOnInit() {
        this.GetLangContent();
        this.GetCarLastVisitedList();
    }

    onChange(event) {
        var target = event.target || event.srcElement || event.currentTarget;

        this.orderChange.emit(target.value);
    }

    //LangContent
    GetLangContent() {
        this.service.get("Site", "GetLangContentByCode", "car_list_sort", 1).subscribe((resData: any) => {
            this.sortorder = resData.ShortDescription;
        }, resError => this.errorMsg = resError);

        this.service.get("Site", "GetLangContentByCode", "car_list_recview", 1).subscribe((resData: any) => {
            this.recentview = resData.ShortDescription;
        }, resError => this.errorMsg = resError);

        this.service.get("Site", "GetLangContentByCode", "car_comp_head", 1).subscribe((resData: any) => {
            this.compare = resData.ShortDescription;
        }, resError => this.errorMsg = resError);

        this.service.get("Site", "GetLangContentByCode", "order").subscribe((resData: any) => {
            this.orderList = resData;
        }, resError => this.errorMsg = resError);
    }

    //CarLastVisitedList
    GetCarLastVisitedList() {
        this.service.get("Site", "GetCarLastVisitedList").subscribe((resData: any) => {
            this.lastCarList = resData;
        }, resError => this.errorMsg = resError);
    }
}