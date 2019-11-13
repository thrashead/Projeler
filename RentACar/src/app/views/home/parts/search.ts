import { Component, AfterViewChecked, Input } from '@angular/core';
import { SiteService } from '../../../services/site';
import { SearchFilters } from '../../../models/searchfilters';
import { FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { ComboBox } from '../../../lib/combobox';

@Component({
    selector: 'rac-homesearch',
    templateUrl: './search.html'
})

export class HomeSearchComponent implements AfterViewChecked {
    errorMsg: string;

    searchForm: FormGroup;
    searchFilters: SearchFilters;

    CarMakes: any;
    CarModels: any;
    CarStatus: any;
    BodyTypes: any;

    @Input() langs: any;

    constructor(private service: SiteService, private formBuilder: FormBuilder, private router: Router) {
    }

    ngOnInit() {
        this.FillCombo();

        this.searchForm = this.formBuilder.group({
            MakeCode: new FormControl(null),
            ModelCode: new FormControl(null),
            PriceMin: new FormControl(null),
            PriceMax: new FormControl(null),
            YearMin: new FormControl(null),
            YearMax: new FormControl(null),
            BodyTypeCode: new FormControl(null),
            CarStatusCode: new FormControl(null),
        });
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

    onClick() {
        this.searchFilters = {} as SearchFilters;

        var bodyType = $(".b-search__main-type-svg.active");

        let minPrice: number = parseInt($("#txtPriceMin").val().toString());
        let maxPrice: number = parseInt($("#txtPriceMax").val().toString());

        minPrice = minPrice == 0 ? null : minPrice;
        maxPrice = maxPrice == 100000 ? null : maxPrice;

        this.searchFilters.BodyTypeCode = bodyType.length > 0 ? bodyType.parent("div").attr("data-type") : null;
        this.searchFilters.MakeCode = this.searchForm.get("MakeCode").value;
        this.searchFilters.ModelCode = this.searchForm.get("ModelCode").value;
        this.searchFilters.CarStatusCode = this.searchForm.get("CarStatusCode").value;
        this.searchFilters.PriceMin = minPrice;
        this.searchFilters.PriceMax = maxPrice;
        this.searchFilters.YearMin = this.searchForm.get("YearMin").value;
        this.searchFilters.YearMax = this.searchForm.get("YearMax").value;

        this.searchFilters.HomeSearch = true;

        this.SetSearchFilters(this.searchFilters);
    }

    onChange(event) {
        var target = event.target || event.srcElement || event.currentTarget;
        this.ComboCarModelsByMakeCode(target.value, false, null, true);
    }

    //SetSearchFilters
    SetSearchFilters(searchFilters: SearchFilters = null) {
        this.service.post("Site", "SetSearchFilters", searchFilters).subscribe((resData: any) => {
            this.searchFilters = resData;

            this.router.navigate(['/Cars/List']);
        }, resError => this.errorMsg = resError);
    }

    //ClearSearchFilters
    ClearSearchFilters() {
        this.service.get("Site", "ClearSearchFilters").subscribe((resData: any) => {
        }, resError => this.errorMsg = resError);
    }

    //ComboBox
    FillCombo() {
        ComboBox.FillYear("slcYearMin");
        ComboBox.FillYear("slcYearMax");

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

            this.IconBodyTypes();
        }, resError => this.errorMsg = resError);
    }

    //BodyTypesIcon
    IconBodyTypes() {
        this.service.get("Site", "IconBodyTypes").subscribe((resData: any) => {
            this.BodyTypes = resData;

            this.ComboCarModelsByMakeCode("all", false, null, true);
        }, resError => this.errorMsg = resError);
    }

    //CarModelsByMakeCode
    ComboCarModelsByMakeCode(makeCode: string, withID: boolean = true, selectedID: string = null, addEmpty: boolean = false) {
        this.service.get("Site", "ComboCarModelsByMakeCode", makeCode, withID, selectedID, addEmpty).subscribe((resData: any) => {
            this.CarModels = resData;
        }, resError => this.errorMsg = resError);
    }
}
