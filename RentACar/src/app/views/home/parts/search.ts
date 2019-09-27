import { Component, AfterViewChecked } from '@angular/core';
import { SiteService } from '../../../services/site';
import { Lib } from '../../../lib/methods';

@Component({
    selector: 'rac-homesearch',
    templateUrl: './search.html'
})

export class HomeSearchComponent implements AfterViewChecked {
    errorMsg: string;

    bodyTypeText: string;
    whichVehicle: string;
    makeText: string;
    modelText: string;
    carStatusText: string;
    minYearText: string;
    maxYearText: string;
    priceRangeText: string;
    search: string;
    detailSearch: string;

    CarMakes: any;
    CarModels: any;
    CarStatus: any;
    BodyTypes: any;

    constructor(private service: SiteService) {
    }

    ngOnInit() {
        this.GetLangContent();
        this.ComboCarMakes(false, null, true);
        this.ComboCarModelsByMakeCode("all", false, null, true);
        this.ComboCarStatus(false, null, true);
        this.IconBodyTypes();
        this.ComboYears();
    }

    ngAfterViewChecked() {
        $(".col-xs-2[data-filter='radioMainSearch'] label.b-search__main-type-svg").off("click").on("click", function () {
            var hasActive = $(this).hasClass("active");

            if (hasActive) {
                $(this).removeClass("active");
            }
            else {
                $("label.b-search__main-type-svg").removeClass("active");
                $(this).addClass("active");
            }
        });

        $(".col-xs-2[data-filter='radioMainSearch'] h5").off("click").on("click", function () {
            var hasActive = $(this).prev("label.b-search__main-type-svg").hasClass("active");

            if (hasActive) {
                $(this).prev("label.b-search__main-type-svg").removeClass("active");
            }
            else {
                $("label.b-search__main-type-svg").removeClass("active");
                $(this).prev("label.b-search__main-type-svg").addClass("active");
            }
        });
    }

    onChange(event) {
        var target = event.target || event.srcElement || event.currentTarget;
        this.ComboCarModelsByMakeCode(target.value, false, null, true);
    }

    //LangContent
    GetLangContent() {
        this.service.get("Site", "GetLangContentByCode", "mnsrc_whcvhcl", 1).subscribe((resData: any) => {
            this.whichVehicle = resData.ShortDescription;
        }, resError => this.errorMsg = resError);

        this.service.get("Site", "GetLangContentByCode", "src_bodytype", 1).subscribe((resData: any) => {
            this.bodyTypeText = resData.ShortDescription;
        }, resError => this.errorMsg = resError);

        this.service.get("Site", "GetLangContentByCode", "src_makeinfo", 1).subscribe((resData: any) => {
            this.makeText = resData.ShortDescription;
        }, resError => this.errorMsg = resError);

        this.service.get("Site", "GetLangContentByCode", "src_mdlinfo", 1).subscribe((resData: any) => {
            this.modelText = resData.ShortDescription;
        }, resError => this.errorMsg = resError);

        this.service.get("Site", "GetLangContentByCode", "src_vhclsts", 1).subscribe((resData: any) => {
            this.carStatusText = resData.ShortDescription;
        }, resError => this.errorMsg = resError);

        this.service.get("Site", "GetLangContentByCode", "src_minyear", 1).subscribe((resData: any) => {
            this.minYearText = resData.ShortDescription;
        }, resError => this.errorMsg = resError);

        this.service.get("Site", "GetLangContentByCode", "src_maxyear", 1).subscribe((resData: any) => {
            this.maxYearText = resData.ShortDescription;
        }, resError => this.errorMsg = resError);

        this.service.get("Site", "GetLangContentByCode", "src_prcrng", 1).subscribe((resData: any) => {
            this.priceRangeText = resData.ShortDescription;
        }, resError => this.errorMsg = resError);

        this.service.get("Site", "GetLangContentByCode", "src_src", 1).subscribe((resData: any) => {
            this.search = resData.ShortDescription2;
        }, resError => this.errorMsg = resError);

        this.service.get("Site", "GetLangContentByCode", "src_dtlsrc", 1).subscribe((resData: any) => {
            this.detailSearch = resData.ShortDescription2;
        }, resError => this.errorMsg = resError);
    }

    //CarMakes
    ComboCarMakes(withID: boolean = true, selectedID: string = null, addEmpty: boolean = false) {
        this.service.get("Site", "ComboCarMakes", withID, selectedID, addEmpty).subscribe((resData: any) => {
            this.CarMakes = resData;
        }, resError => this.errorMsg = resError);
    }

    //CarModelsByMakeCode
    ComboCarModelsByMakeCode(makeCode: string, withID: boolean = true, selectedID: string = null, addEmpty: boolean = false) {
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

    //BodyTypesIcon
    IconBodyTypes() {
        this.service.get("Site", "IconBodyTypes").subscribe((resData: any) => {
            this.BodyTypes = resData;
        }, resError => this.errorMsg = resError);
    }

    //Years
    ComboYears() {
        Lib.ComboYears("slcMinYear");
        Lib.ComboYears("slcMaxYear");
    }
}
