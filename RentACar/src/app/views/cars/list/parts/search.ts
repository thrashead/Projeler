import { Component } from '@angular/core';
import { SiteService } from '../../../../services/site';

@Component({
    selector: 'rac-carlistsearch',
    templateUrl: './search.html'
})

export class CarsListSearchComponent {
    errorMsg: string;

    searchTitle: string;
    makeText: string;
    modelText: string;
    carStatusText: string;
    priceRangeText: string;
    bodyTypeText: string;
    fuelTypeText: string;
    search: string;
    removeFilter: string;

    CarMakes: any;
    CarModels: any;
    CarStatus: any;
    BodyTypes: any;
    FuelTypes: any;

    constructor(private service: SiteService) {
    }

    ngOnInit() {
        this.GetLangContent();
        this.ComboCarMakes(false, null, true);
        this.ComboCarModelsByMakeCode("all", false, null, true);
        this.ComboCarStatus(false, null, true);
        this.ComboBodyTypes(false, null, true);
        this.ComboFuelTypes(false, null, true);
    }

    onChange(event) {
        var target = event.target || event.srcElement || event.currentTarget;
        this.ComboCarModelsByMakeCode(target.value, false, null, true);
    }

    //LangContent
    GetLangContent() {
        this.service.get("Site", "GetLangContentByCode", "src_fltr_ttl", 1).subscribe((resData: any) => {
            this.searchTitle = resData.ShortDescription;
        }, resError => this.errorMsg = resError);

        this.service.get("Site", "GetLangContentByCode", "src_makeinfo", 1).subscribe((resData: any) => {
            this.makeText = resData.ShortDescription2;
        }, resError => this.errorMsg = resError);

        this.service.get("Site", "GetLangContentByCode", "src_mdlinfo", 1).subscribe((resData: any) => {
            this.modelText = resData.ShortDescription2;
        }, resError => this.errorMsg = resError);

        this.service.get("Site", "GetLangContentByCode", "src_vhclsts", 1).subscribe((resData: any) => {
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
            this.removeFilter = resData.ShortDescription;
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