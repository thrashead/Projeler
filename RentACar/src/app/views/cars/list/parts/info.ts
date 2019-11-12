import { Component, Output, EventEmitter } from '@angular/core';
import { SiteService } from '../../../../services/site';
import { SearchFilters } from '../../../../models/searchfilters';
import { LangItem } from '../../../../models/LangItem';
import { Lib } from '../../../../lib/methods';

@Component({
    selector: 'rac-carlistinfo',
    templateUrl: './info.html'
})

export class CarsListInfoComponent {
    errorMsg: string;

    searchFilters: SearchFilters;

    @Output() orderChange = new EventEmitter<any>();

    lastCarList: any;

    constructor(private service: SiteService) {
    }

    ngOnInit() {
        this.SetLangContents();
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

    //LangContents
    langItems: Array<LangItem>;
    langItem: LangItem;
    langs: any;

    //LangContent
    SetLangContents() {
        this.PushLangItems();

        this.service.post("Site", "SetLangContents", this.langItems).subscribe((resData: any) => {
            this.langs = new Object();
            this.langs.orderList = new Array<any>();

            resData.forEach((item, i) => {
                switch (item.Code) {
                    case "car_list_sort": this.langs.sortorder = item.ShortDescription; break;
                    case "car_list_recview": this.langs.recentview = item.ShortDescription; break;
                    case "car_comp_head": this.langs.compare = item.ShortDescription; break;
                    case "order": this.langs.orderList.push(item); break;
                }
            });

            this.GetCarLastVisitedList();
        }, resError => this.errorMsg = resError);
    }

    PushLangItems() {
        this.langItems = new Array<LangItem>();

        this.langItems.push(Lib.SetLangItem(this.langItem, "car_list_sort"));
        this.langItems.push(Lib.SetLangItem(this.langItem, "car_list_recview"));
        this.langItems.push(Lib.SetLangItem(this.langItem, "car_comp_head"));
        this.langItems.push(Lib.SetLangItem(this.langItem, "order"));
    }
}