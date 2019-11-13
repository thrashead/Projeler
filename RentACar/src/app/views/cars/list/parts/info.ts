import { Component, Output, EventEmitter, Input } from '@angular/core';
import { SiteService } from '../../../../services/site';
import { SearchFilters } from '../../../../models/searchfilters';

@Component({
    selector: 'rac-carlistinfo',
    templateUrl: './info.html'
})

export class CarsListInfoComponent {
    errorMsg: string;

    searchFilters: SearchFilters;

    @Output() orderChange = new EventEmitter<any>();

    lastCarList: any;

    @Input() langs: any;

    constructor(private service: SiteService) {
    }

    ngOnInit() {
        this.GetCarLastVisitedList();
    }

    onChange(event) {
        var target = event.target || event.srcElement || event.currentTarget;

        this.searchFilters = {} as SearchFilters;

        this.SetSearchFilters(target.value);
    }

    //SetSearchFilters
    SetSearchFilters(order: string) {
        this.service.get("Site", "GetSearchFilters").subscribe((resData: any) => {
            if (resData != null) {
                this.searchFilters = resData;
            }

            this.searchFilters.Order = order;

            this.service.post("Site", "SetSearchFilters", this.searchFilters).subscribe((resData: any) => {
                this.searchFilters = resData;

                this.orderChange.emit(this.searchFilters);
            }, resError => this.errorMsg = resError);
        }, resError => this.errorMsg = resError);
    }

    //CarLastVisitedList
    GetCarLastVisitedList() {
        this.service.get("Site", "GetCarLastVisitedList").subscribe((resData: any) => {
            this.lastCarList = resData;
        }, resError => this.errorMsg = resError);
    }
}