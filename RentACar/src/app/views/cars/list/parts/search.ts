﻿import { Component, Output, EventEmitter, OnDestroy } from '@angular/core';
import { SiteService } from '../../../../services/site';
import { SearchFilters } from '../../../../models/searchfilters';
import { FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
    selector: 'rac-carlistsearch',
    templateUrl: './search.html'
})

export class CarsListSearchComponent implements OnDestroy {
    errorMsg: string;

    searchTitle: string;
    makeText: string;
    modelText: string;
    carStatusText: string;
    priceRangeText: string;
    bodyTypeText: string;
    fuelTypeText: string;
    search: string;
    clearFilter: string;

    @Output() searchFilter = new EventEmitter<any>();

    searchForm: FormGroup;
    searchFilters: SearchFilters;

    CarMakes: any;
    CarModels: any;
    CarStatus: any;
    BodyTypes: any;
    FuelTypes: any;

    constructor(private service: SiteService, private formBuilder: FormBuilder, private router: Router) {
    }

    ngOnInit() {
        this.GetLangContent();

        this.ComboCarMakes(false, null, true);
        this.ComboCarModelsByMakeCode("all", false, null, true);
        this.ComboCarStatus(false, null, true);
        this.ComboBodyTypes(false, null, true);
        this.ComboFuelTypes(false, null, true);

        this.searchForm = this.formBuilder.group({
            MakeCode: new FormControl(null),
            ModelCode: new FormControl(null),
            PriceMin: new FormControl(null),
            PriceMax: new FormControl(null),
            BodyTypeCode: new FormControl(null),
            CarStatusCode: new FormControl(null),
            FuelTypeCode: new FormControl(null),
        });
    }

    ngOnDestroy() {
        this.ClearSearchFilters();
    }

    onChange(event) {
        var target = event.target || event.srcElement || event.currentTarget;
        this.ComboCarModelsByMakeCode(target.value, false, null, true);
    }

    onClick() {
        this.searchFilters = {} as SearchFilters;

        let minPrice: number = parseInt($("#txtPriceMin").val().toString());
        let maxPrice: number = parseInt($("#txtPriceMax").val().toString());

        minPrice = minPrice == 0 ? null : minPrice;
        maxPrice = maxPrice == 100000 ? null : maxPrice;

        this.searchFilters.MakeCode = this.searchForm.get("MakeCode").value;
        this.searchFilters.ModelCode = this.searchForm.get("ModelCode").value;
        this.searchFilters.PriceMin = minPrice;
        this.searchFilters.PriceMax = maxPrice;
        this.searchFilters.BodyTypeCode = this.searchForm.get("BodyTypeCode").value;
        this.searchFilters.CarStatusCode = this.searchForm.get("CarStatusCode").value;
        this.searchFilters.FuelTypeCode = this.searchForm.get("FuelTypeCode").value;

        this.SetSearchFilters(this.searchFilters);
    }

    //LangContent
    GetLangContent() {
        this.service.get("Site", "GetLangContentByCode", "src_fltr_ttl", 1).subscribe((resData: any) => {
            this.searchTitle = resData.ShortDescription;
        }, resError => this.errorMsg = resError);

        this.service.get("Site", "GetLangContentByCode", "src_make", 1).subscribe((resData: any) => {
            this.makeText = resData.ShortDescription2;
        }, resError => this.errorMsg = resError);

        this.service.get("Site", "GetLangContentByCode", "src_model", 1).subscribe((resData: any) => {
            this.modelText = resData.ShortDescription2;
        }, resError => this.errorMsg = resError);

        this.service.get("Site", "GetLangContentByCode", "src_status", 1).subscribe((resData: any) => {
            this.carStatusText = resData.ShortDescription2;
        }, resError => this.errorMsg = resError);

        this.service.get("Site", "GetLangContentByCode", "src_bodytype", 1).subscribe((resData: any) => {
            this.bodyTypeText = resData.ShortDescription2;
        }, resError => this.errorMsg = resError);

        this.service.get("Site", "GetLangContentByCode", "src_fueltype", 1).subscribe((resData: any) => {
            this.fuelTypeText = resData.ShortDescription2;
        }, resError => this.errorMsg = resError);

        this.service.get("Site", "GetLangContentByCode", "src_prcrng", 1).subscribe((resData: any) => {
            this.priceRangeText = resData.ShortDescription2;
        }, resError => this.errorMsg = resError);

        this.service.get("Site", "GetLangContentByCode", "src_src", 1).subscribe((resData: any) => {
            this.search = resData.ShortDescription2;
        }, resError => this.errorMsg = resError);

        this.service.get("Site", "GetLangContentByCode", "src_fltr_rmv", 1).subscribe((resData: any) => {
            this.clearFilter = resData.ShortDescription;
        }, resError => this.errorMsg = resError);
    }

    //SetSearchFilters
    SetSearchFilters(searchFilters: SearchFilters = null) {
        this.service.post("Site", "SetSearchFilters", searchFilters).subscribe((resData: any) => {
            this.searchFilters = resData;

            this.searchFilter.emit(this.searchFilters);
        }, resError => this.errorMsg = resError);
    }

    //ClearSearchFilters
    ClearSearchFilters() {
        this.service.get("Site", "ClearSearchFilters").subscribe((resData: any) => {
            this.searchFilter.emit(resData);
        }, resError => this.errorMsg = resError);
    }

    //CarMakes
    ComboCarMakes(withID: boolean = true, selectedID: string = null, addEmpty: boolean = false) {
        this.service.get("Site", "ComboCarMakes", withID, selectedID, addEmpty).subscribe((resData: any) => {
            this.CarMakes = resData;
        }, resError => this.errorMsg = resError);
    }

    //CarModelsByMakeCode
    ComboCarModelsByMakeCode(makeCode: string = null, withID: boolean = true, selectedID: string = null, addEmpty: boolean = false) {
        this.service.get("Site", "ComboCarModelsByMakeCode", makeCode, withID, selectedID, addEmpty).subscribe((resData: any) => {
            this.CarModels = resData;
        }, resError => this.errorMsg = resError);
    }

    //CarStatus
    ComboCarStatus(withID: boolean = true, selectedID: string = null, addEmpty: boolean = false) {
        this.service.get("Site", "ComboCarStatus", withID, selectedID, addEmpty).subscribe((resData: any) => {
            this.CarStatus = resData;
        }, resError => this.errorMsg = resError);
    }

    //BodyTypes
    ComboBodyTypes(withID: boolean = true, selectedID: string = null, addEmpty: boolean = false) {
        this.service.get("Site", "ComboBodyTypes", withID, selectedID, addEmpty).subscribe((resData: any) => {
            this.BodyTypes = resData;
        }, resError => this.errorMsg = resError);
    }

    //FuelTypes
    ComboFuelTypes(withID: boolean = true, selectedID: string = null, addEmpty: boolean = false) {
        this.service.get("Site", "ComboFuelTypes", withID, selectedID, addEmpty).subscribe((resData: any) => {
            this.FuelTypes = resData;
        }, resError => this.errorMsg = resError);
    }
}