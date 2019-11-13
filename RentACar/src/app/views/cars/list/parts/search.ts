import { Component, OnDestroy, Output, EventEmitter, Input } from '@angular/core';
import { FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { ActivatedRoute, Params } from '@angular/router';
import { SiteService } from '../../../../services/site';
import { SearchFilters } from '../../../../models/searchfilters';

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

    @Input() langs: any;
    @Input() booknowLangs: any;

    constructor(private service: SiteService, private route: ActivatedRoute, private formBuilder: FormBuilder) {
    }

    ngOnInit() {
        this.searchFilters = {} as SearchFilters;

        this.route.params.subscribe((params: Params) => {
            this.url = params['url'];
            this.SetSearchFilters();
        });

        this.FillCombo();

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
                if (resData.HomeSearch == true) {
                    this.searchFilters = resData;
                    this.searchFilters.HomeSearch = false;
                }
                else {
                    this.searchFilters.Order = resData.Order;
                }
            }

            this.service.post("Site", "SetSearchFilters", this.searchFilters).subscribe((resData: any) => {
                this.searchFilters = resData;

                this.searchFilter.emit(this.searchFilters);
            }, resError => this.errorMsg = resError);
        }, resError => this.errorMsg = resError);
    }

    FillCombo() {
        this.ComboCarMakes(false, null, true);
    }

    //CarMakes
    ComboCarMakes(withID: boolean = true, selectedID: string = null, addEmpty: boolean = false) {
        this.service.get("Site", "ComboCarMakes", withID, selectedID, addEmpty).subscribe((resData: any) => {
            this.CarMakes = resData;

            this.ComboCarStatus(false, null, true);
        }, resError => this.errorMsg = resError);
    }

    //CarStatus
    ComboCarStatus(withID: boolean = true, selectedID: string = null, addEmpty: boolean = false) {
        this.service.get("Site", "ComboCarStatus", withID, selectedID, addEmpty).subscribe((resData: any) => {
            this.CarStatus = resData;

            this.ComboBodyTypes(false, null, true);
        }, resError => this.errorMsg = resError);
    }

    //BodyTypes
    ComboBodyTypes(withID: boolean = true, selectedID: string = null, addEmpty: boolean = false) {
        this.service.get("Site", "ComboBodyTypes", withID, selectedID, addEmpty).subscribe((resData: any) => {
            this.BodyTypes = resData;

            this.ComboFuelTypes(false, null, true);
        }, resError => this.errorMsg = resError);
    }

    //FuelTypes
    ComboFuelTypes(withID: boolean = true, selectedID: string = null, addEmpty: boolean = false) {
        this.service.get("Site", "ComboFuelTypes", withID, selectedID, addEmpty).subscribe((resData: any) => {
            this.FuelTypes = resData;

            this.ComboCarModelsByMakeCode("all", false, null, true);
        }, resError => this.errorMsg = resError);
    }

    //CarModelsByMakeCode
    ComboCarModelsByMakeCode(makeCode: string = null, withID: boolean = true, selectedID: string = null, addEmpty: boolean = false) {
        this.service.get("Site", "ComboCarModelsByMakeCode", makeCode, withID, selectedID, addEmpty).subscribe((resData: any) => {
            this.CarModels = resData;
        }, resError => this.errorMsg = resError);
    }

    //ClearSearchFilters
    ClearSearchFilters() {
        this.service.get("Site", "ClearSearchFilters", this.url).subscribe((resData: any) => {
            this.searchFilter.emit(resData);
        }, resError => this.errorMsg = resError);
    }
}