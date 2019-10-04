import { Component, Output, EventEmitter } from '@angular/core';
import { SiteService } from '../../../../services/site';
import { SearchFilters } from '../../../../models/searchfilters';

@Component({
    selector: 'rac-carlistinfo',
    templateUrl: './info.html'
})

export class CarsListInfoComponent {
    errorMsg: string;

    sortorder: string;
    recentview: string;
    compare: string;

    searchFilters: SearchFilters;

    @Output() orderChange = new EventEmitter<any>();

    lastCarList: any;
    orderList: any;

    constructor(private service: SiteService) {
    }

    ngOnInit() {
        this.GetLangContent();
        this.GetCarLastVisitedList();
    }

    onChange(event) {
        var target = event.target || event.srcElement || event.currentTarget;

        this.searchFilters = {} as SearchFilters;

        this.searchFilters.Order = target.value;

        this.SetSearchFilters(this.searchFilters);
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

    //SetSearchFilters
    SetSearchFilters(searchFilters: SearchFilters = null) {
        this.service.post("Site", "SetSearchFilters", searchFilters).subscribe((resData: any) => {
            this.searchFilters = resData;

            this.orderChange.emit(this.searchFilters);
        }, resError => this.errorMsg = resError);
    }

    //CarLastVisitedList
    GetCarLastVisitedList() {
        this.service.get("Site", "GetCarLastVisitedList").subscribe((resData: any) => {
            this.lastCarList = resData;
        }, resError => this.errorMsg = resError);
    }
}