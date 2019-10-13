import { Component, OnDestroy, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { SiteService } from '../../../../services/site';
import { Lib } from '../../../../lib/methods';
import { LangItem } from '../../../../models/LangItem';
import { SearchFilters } from '../../../../models/searchfilters';
import { ActivatedRoute, Params } from '@angular/router';

@Component({
    selector: 'rac-carlistsearch',
    templateUrl: './search.html'
})

export class CarsListSearchComponent implements OnDestroy {
    errorMsg: string;

    @Output() searchFilter = new EventEmitter<any>();

    searchForm: FormGroup;
    searchFilters: SearchFilters;

    url: string;

    CarMakes: any;
    CarModels: any;
    CarStatus: any;
    BodyTypes: any;
    FuelTypes: any;

    constructor(private service: SiteService, private route: ActivatedRoute, private formBuilder: FormBuilder) {
    }

    ngOnInit() {
        this.searchFilters = {} as SearchFilters;

        this.route.params.subscribe((params: Params) => {
            this.url = params['url'];
            this.SetSearchFilters();
        });

        this.SetLangContents();

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
        this.ApplySearchFilters();
        this.SetSearchFilters();
    }

    ApplySearchFilters() {
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
    }

    //SetSearchFilters
    SetSearchFilters() {
        if (this.url != null) {
            this.searchFilters.MakeUrl = this.url;
        }

        this.service.get("Site", "GetSearchFilters").subscribe((resData: any) => {
            if (resData != null) {
                this.searchFilters.Order = resData.Order;
            }

            this.service.post("Site", "SetSearchFilters", this.searchFilters).subscribe((resData: any) => {
                this.searchFilters = resData;

                this.searchFilter.emit(this.searchFilters);
            }, resError => this.errorMsg = resError);
        }, resError => this.errorMsg = resError);
    }

    //ClearSearchFilters
    ClearSearchFilters() {
        this.service.get("Site", "ClearSearchFilters", this.url).subscribe((resData: any) => {
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

    //LangContents
    langItems: Array<LangItem>;
    langItem: LangItem;
    langs: any;

    //LangContent
    SetLangContents() {
        this.PushLangItems();

        this.service.post("Site", "SetLangContents", this.langItems).subscribe((resData: any) => {
            this.langs = new Object();

            resData.forEach((item, i) => {
                switch (item.Code) {
                    case "src_fltr_ttl": this.langs.searchTitle = item.ShortDescription; break;
                    case "src_make": this.langs.makeText = item.ShortDescription2; break;
                    case "src_model": this.langs.modelText = item.ShortDescription2; break;
                    case "src_status": this.langs.carStatusText = item.ShortDescription2; break;
                    case "src_bodytype": this.langs.bodyTypeText = item.ShortDescription2; break;
                    case "src_fueltype": this.langs.fuelTypeText = item.ShortDescription2; break;
                    case "src_prcrng": this.langs.priceRangeText = item.ShortDescription2; break;
                    case "src_src": this.langs.search = item.ShortDescription2; break;
                    case "src_fltr_rmv": this.langs.clearFilter = item.ShortDescription; break;
                }
            });
        }, resError => this.errorMsg = resError);
    }

    PushLangItems() {
        this.langItems = new Array<LangItem>();

        this.langItems.push(Lib.SetLangItem(this.langItem, "src_fltr_ttl"));
        this.langItems.push(Lib.SetLangItem(this.langItem, "src_make"));
        this.langItems.push(Lib.SetLangItem(this.langItem, "src_model"));
        this.langItems.push(Lib.SetLangItem(this.langItem, "src_status"));
        this.langItems.push(Lib.SetLangItem(this.langItem, "src_bodytype"));
        this.langItems.push(Lib.SetLangItem(this.langItem, "src_fueltype"));
        this.langItems.push(Lib.SetLangItem(this.langItem, "src_prcrng"));
        this.langItems.push(Lib.SetLangItem(this.langItem, "src_src"));
        this.langItems.push(Lib.SetLangItem(this.langItem, "src_fltr_rmv"));
    }
}