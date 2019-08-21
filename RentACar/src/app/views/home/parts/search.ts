import { Component } from '@angular/core';
import { SiteService } from '../../../services/site';

@Component({
    selector: 'rac-homesearch',
    templateUrl: './search.html'
})

export class HomeSearchComponent {
    errorMsg: string;

    vehicleType: string; 
    whichVehicle: string; 
    makeText: string; 
    modelText: string; 
    vehicleStatusText: string; 
    minYearText: string; 
    maxYearText: string; 
    priceRange: string; 
    allText: string; 
    search: string; 
    detailSearch: string; 

    VehicleTypes: any;

    constructor(private service: SiteService) {
    }

    ngOnInit() {
        this.GetLangContent();
        this.GetCategories();
    }

    //LangContent
    GetLangContent() {
        this.service.get("Site", "GetLangContentByCode", "mnsrc_whcvhcl", 1).subscribe((resData: any) => {
            this.whichVehicle = resData.ShortDescription;
        }, resError => this.errorMsg = resError);

        this.service.get("Site", "GetLangContentByCode", "src_vhcltype", 1).subscribe((resData: any) => {
            this.vehicleType = resData.ShortDescription;
        }, resError => this.errorMsg = resError);

        this.service.get("Site", "GetLangContentByCode", "src_makeinfo", 1).subscribe((resData: any) => {
            this.makeText = resData.ShortDescription;
        }, resError => this.errorMsg = resError);

        this.service.get("Site", "GetLangContentByCode", "src_mdlinfo", 1).subscribe((resData: any) => {
            this.modelText = resData.ShortDescription;
        }, resError => this.errorMsg = resError);

        this.service.get("Site", "GetLangContentByCode", "src_vhclsts", 1).subscribe((resData: any) => {
            this.vehicleStatusText = resData.ShortDescription;
        }, resError => this.errorMsg = resError);

        this.service.get("Site", "GetLangContentByCode", "src_minyear", 1).subscribe((resData: any) => {
            this.minYearText = resData.ShortDescription;
        }, resError => this.errorMsg = resError);

        this.service.get("Site", "GetLangContentByCode", "src_maxyear", 1).subscribe((resData: any) => {
            this.maxYearText = resData.ShortDescription;
        }, resError => this.errorMsg = resError);

        this.service.get("Site", "GetLangContentByCode", "src_prcrng", 1).subscribe((resData: any) => {
            this.priceRange = resData.ShortDescription;
        }, resError => this.errorMsg = resError);

        this.service.get("Site", "GetLangContentByCode", "src_src", 1).subscribe((resData: any) => {
            this.search = resData.ShortDescription;
        }, resError => this.errorMsg = resError);

        this.service.get("Site", "GetLangContentByCode", "src_dtlsrc", 1).subscribe((resData: any) => {
            this.detailSearch = resData.ShortDescription;
        }, resError => this.errorMsg = resError);

        this.service.get("Site", "GetLangContentByCode", "src_all", 1).subscribe((resData: any) => {
            this.allText = resData.ShortDescription;
        }, resError => this.errorMsg = resError);
    }

    //Categories
    GetCategories() {
        this.service.get("Site", "SubCategoriesByCode", "vehicle_type").subscribe((resData: any) => {
            this.VehicleTypes = resData;
        }, resError => this.errorMsg = resError);
    }
}
