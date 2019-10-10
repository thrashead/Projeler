import { Component, AfterViewChecked } from '@angular/core';
import { SiteService } from '../../../services/site';
import { SearchFilters } from '../../../models/searchfilters';
import { FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { Lib } from '../../../lib/methods';
import { ComboBox } from '../../../lib/combobox';
import { LangItem } from '../../../models/LangItem';

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

    constructor(private service: SiteService, private formBuilder: FormBuilder, private router: Router) {
    }

    ngOnInit() {
        this.SetLangContents();
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

        this.searchFilters.BodyTypeCode =  bodyType.length > 0 ? bodyType.parent("div").attr("data-type") : null;
        this.searchFilters.MakeCode = this.searchForm.get("MakeCode").value;
        this.searchFilters.ModelCode = this.searchForm.get("ModelCode").value;
        this.searchFilters.CarStatusCode = this.searchForm.get("CarStatusCode").value;
        this.searchFilters.PriceMin = minPrice;
        this.searchFilters.PriceMax = maxPrice;
        this.searchFilters.YearMin = this.searchForm.get("YearMin").value;
        this.searchFilters.YearMax = this.searchForm.get("YearMax").value;

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
        this.ComboCarMakes(false, null, true);
        this.ComboCarModelsByMakeCode("all", false, null, true);
        this.ComboCarStatus(false, null, true);
        this.IconBodyTypes();

        ComboBox.FillYear("slcYearMin");
        ComboBox.FillYear("slcYearMax");
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
                    case "mnsrc_whcvhcl": this.langs.whichVehicle = item.ShortDescription; break;
                    case "src_bodytype": this.langs.bodyTypeText = item.ShortDescription; break;
                    case "src_make": this.langs.makeText = item.ShortDescription; break;
                    case "src_model": this.langs.modelText = item.ShortDescription; break;
                    case "src_status": this.langs.carStatusText = item.ShortDescription; break;
                    case "src_minyear": this.langs.minYearText = item.ShortDescription; break;
                    case "src_maxyear": this.langs.maxYearText = item.ShortDescription; break;
                    case "src_prcrng": this.langs.priceRangeText = item.ShortDescription; break;
                    case "src_src": this.langs.search = item.ShortDescription2; break;
                    case "src_dtlsrc": this.langs.detailSearch = item.ShortDescription2; break;
                }
            });
        }, resError => this.errorMsg = resError);
    }

    PushLangItems() {
        this.langItems = new Array<LangItem>();

        this.langItems.push(Lib.SetLangItem(this.langItem, "mnsrc_whcvhcl"));
        this.langItems.push(Lib.SetLangItem(this.langItem, "src_bodytype"));
        this.langItems.push(Lib.SetLangItem(this.langItem, "src_make"));
        this.langItems.push(Lib.SetLangItem(this.langItem, "src_model"));
        this.langItems.push(Lib.SetLangItem(this.langItem, "src_status"));
        this.langItems.push(Lib.SetLangItem(this.langItem, "src_minyear"));
        this.langItems.push(Lib.SetLangItem(this.langItem, "src_maxyear"));
        this.langItems.push(Lib.SetLangItem(this.langItem, "src_prcrng"));
        this.langItems.push(Lib.SetLangItem(this.langItem, "src_src"));
        this.langItems.push(Lib.SetLangItem(this.langItem, "src_dtlsrc"));
    }
}
