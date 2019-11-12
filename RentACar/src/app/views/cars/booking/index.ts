import { Component, Output } from "@angular/core";
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { SiteService } from '../../../services/site';
import { Lib } from '../../../lib/methods';
import { ComboBox } from '../../../lib/combobox';
import { LangItem } from '../../../models/LangItem';
import { BookSearchFilters } from '../../../models/booksearchfilters';

@Component({
    templateUrl: './index.html'
})

export class CarsBookComponent {
    errorMsg: string;
    @Output() alert: string;

    bookForm: FormGroup;
    searchFilters: BookSearchFilters;

    CarMakes: any;
    CarModels: any;
    CarStatus: any;
    BodyTypes: any;
    FuelTypes: any;
    DriveTypes: any;
    GearTypes: any;
    EngineTypes: any;
    ExtColors: any;
    IntColors: any;

    discount: any;


    constructor(private service: SiteService, private router: Router, private formBuilder: FormBuilder) {
    }

    ngOnInit() {
        this.SetLangContents();

        this.bookForm = this.formBuilder.group({
            StartDate: new FormControl(null, [Validators.required, Validators.minLength(8), Validators.maxLength(10)]),
            Time: new FormControl(null, [Validators.required, Validators.min(1), Validators.max(30)]),
            TimeType: new FormControl(null, Validators.required),
            MakeCode: new FormControl(null),
            ModelCode: new FormControl(null),
            PriceMin: new FormControl(null),
            PriceMax: new FormControl(null),
            YearMin: new FormControl(null),
            YearMax: new FormControl(null),
            CarStatusCode: new FormControl(null),
            FuelTypeCode: new FormControl(null),
            BodyTypeCode: new FormControl(null),
            DriveTypeCode: new FormControl(null),
            GearTypeCode: new FormControl(null),
            EngineTypeCode: new FormControl(null),
            EngineCapacity: new FormControl(null),
            GearCount: new FormControl(null),
            Cylinders: new FormControl(null),
            Mileage: new FormControl(null),
            Seats: new FormControl(null),
            Doors: new FormControl(null),
            ExteriorColor: new FormControl(null),
            InteriorColor: new FormControl(null),
        });
    }

    onChange(event) {
        var target = event.target || event.srcElement || event.currentTarget;
        this.ComboCarModelsByMakeCode(target.value, false, null, true);
    }

    onClick() {
        this.searchFilters = {} as BookSearchFilters;

        let startDate: string = Lib.ParseDateTime(this.bookForm.get("StartDate").value);
        let time = parseInt(this.bookForm.get("Time").value);
        let timetype = parseInt(this.bookForm.get("TimeType").value);
        let endDate: string = Lib.ApplyEndDate(startDate, time, timetype);
        let conDate: boolean = Lib.CheckDateTimeInterval(startDate);

        if (!conDate || endDate == null) {
            $("#modalAlert").addClass("show");
            this.alert = this.langs.error;
            return false;
        }

        let minPrice: number = parseInt($("#txtPriceMin").val().toString());
        let maxPrice: number = parseInt($("#txtPriceMax").val().toString());

        minPrice = minPrice == 0 ? null : minPrice;
        maxPrice = maxPrice == 100000 ? null : maxPrice;

        this.searchFilters.StartDate = startDate;
        this.searchFilters.EndDate = endDate;
        this.searchFilters.Time = time;
        this.searchFilters.TimeType = timetype;
        this.searchFilters.MakeCode = this.bookForm.get("MakeCode").value;
        this.searchFilters.ModelCode = this.bookForm.get("ModelCode").value;
        this.searchFilters.CarStatusCode = this.bookForm.get("CarStatusCode").value;
        this.searchFilters.FuelTypeCode = this.bookForm.get("FuelTypeCode").value;
        this.searchFilters.PriceMin = minPrice;
        this.searchFilters.PriceMax = maxPrice;
        this.searchFilters.YearMin = Lib.CheckNullAsAll(this.bookForm.get("YearMin").value);
        this.searchFilters.YearMax = Lib.CheckNullAsAll(this.bookForm.get("YearMax").value);
        this.searchFilters.BodyTypeCode = this.bookForm.get("BodyTypeCode").value;
        this.searchFilters.DriveTypeCode = this.bookForm.get("DriveTypeCode").value;
        this.searchFilters.GearTypeCode = this.bookForm.get("GearTypeCode").value;
        this.searchFilters.EngineTypeCode = this.bookForm.get("EngineTypeCode").value;
        this.searchFilters.EngineCapacity = this.bookForm.get("EngineCapacity").value;
        this.searchFilters.GearCount = Lib.CheckNullAsAll(this.bookForm.get("GearCount").value);
        this.searchFilters.Cylinders = Lib.CheckNullAsAll(this.bookForm.get("Cylinders").value);
        this.searchFilters.Mileage = this.bookForm.get("Mileage").value;
        this.searchFilters.Seats = Lib.CheckNullAsAll(this.bookForm.get("Seats").value);
        this.searchFilters.Doors = Lib.CheckNullAsAll(this.bookForm.get("Doors").value);
        this.searchFilters.ExteriorColor = this.bookForm.get("ExteriorColor").value;
        this.searchFilters.InteriorColor = this.bookForm.get("InteriorColor").value;

        this.SetSearchFilters();
    }

    //SetSearchFilters
    SetSearchFilters() {
        this.service.post("Site", "SetBookSearchFilters", this.searchFilters).subscribe((resData: any) => {
            this.searchFilters = resData;

            this.router.navigate(['/Cars/Book/Features']);
        }, resError => this.errorMsg = resError);
    }

    //ComboBox
    FillCombo() {
        ComboBox.FillYear("slcYearMin");
        ComboBox.FillYear("slcYearMax");
        ComboBox.FillNumber("slcGearCount", 1, 8);
        ComboBox.FillNumber("slcCylinders", 2, 12, 2);
        ComboBox.FillNumber("slcSeats");
        ComboBox.FillNumber("slcDoors", 1, 8);

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

            this.ComboDriveTypes(false, null, true);
        }, resError => this.errorMsg = resError);
    }

    //DriveTypes
    ComboDriveTypes(withID: boolean = true, selectedID: string = null, addEmpty: boolean = false) {
        this.service.get("Site", "ComboDriveTypes", withID, selectedID, addEmpty).subscribe((resData: any) => {
            this.DriveTypes = resData;

            this.ComboGearTypes(false, null, true);
        }, resError => this.errorMsg = resError);
    }

    //GearTypes
    ComboGearTypes(withID: boolean = true, selectedID: string = null, addEmpty: boolean = false) {
        this.service.get("Site", "ComboGearTypes", withID, selectedID, addEmpty).subscribe((resData: any) => {
            this.GearTypes = resData;

            this.ComboEngineTypes(false, null, true);
        }, resError => this.errorMsg = resError);
    }

    //EngineTypes
    ComboEngineTypes(withID: boolean = true, selectedID: string = null, addEmpty: boolean = false) {
        this.service.get("Site", "ComboEngineTypes", withID, selectedID, addEmpty).subscribe((resData: any) => {
            this.EngineTypes = resData;

            this.GetDiscounts();
        }, resError => this.errorMsg = resError);
    }

    //CarModelsByMakeCode
    ComboCarModelsByMakeCode(makeCode: string = null, withID: boolean = true, selectedID: string = null, addEmpty: boolean = false) {
        this.service.get("Site", "ComboCarModelsByMakeCode", makeCode, withID, selectedID, addEmpty).subscribe((resData: any) => {
            this.CarModels = resData;
        }, resError => this.errorMsg = resError);
    }

    //ComboColors
    ComboColors(exterior: boolean = true, addEmpty: boolean = false, emptyText: string = "-", emptyValue: string = "all") {
        this.service.get("Site", "ComboColors", exterior, addEmpty, emptyText, emptyValue).subscribe((resData: any) => {
            if (exterior)
                this.ExtColors = resData;
            else
                this.IntColors = resData;
        }, resError => this.errorMsg = resError);
    }

    //GetDiscounts
    GetDiscounts() {
        this.service.get("Site", "GetNoLangContentByCode", "discount").subscribe((resData: any) => {
            this.discount = new Object();

            resData.forEach((item, i) => {
                switch (item.ShortCode) {
                    case "week": this.discount.Week = item.ShortDescription; break;
                    case "month": this.discount.Month = item.ShortDescription; break;
                    case "year": this.discount.Year = item.ShortDescription; break;
                }
            });

            this.ComboCarModelsByMakeCode("all", false, null, true);

            this.ComboColors(true, true);
            this.ComboColors(false, true);
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
            this.langs.content = new Object();
            this.langs.search = new Object();

            resData.forEach((item, i) => {
                switch (item.Code) {
                    case "car_book":
                        switch (item.ShortCode) {
                            case "step1":
                                this.langs.content.step1 = item.ShortDescription;
                                this.langs.content.title1 = item.Description;
                                this.langs.content.desc1 = item.ShortDescription2;
                                this.langs.content.longdesc1 = item.Description2;
                                break;
                            case "step2":
                                this.langs.content.step2 = item.ShortDescription;
                                this.langs.content.title2 = item.Description;
                                this.langs.content.desc2 = item.ShortDescription2;
                                this.langs.content.longdesc2 = item.Description2;
                                break;
                            case "step3":
                                this.langs.content.step3 = item.ShortDescription;
                                this.langs.content.title3 = item.Description;
                                this.langs.content.desc3 = item.ShortDescription2;
                                this.langs.content.longdesc3 = item.Description2;
                                break;
                            case "step4":
                                this.langs.content.step4 = item.ShortDescription;
                                this.langs.content.title4 = item.Description;
                                this.langs.content.desc4 = item.ShortDescription2;
                                this.langs.content.longdesc4 = item.Description2;
                                break;
                            case "nextstep":
                                this.langs.nextstep = item.ShortDescription;
                                break;
                            case "date":
                                this.langs.search.date = item.ShortDescription2;
                                break;
                            case "errordate":
                                this.langs.error = item.ShortDescription2;
                                break;
                            case "time":
                                this.langs.search.time = item.ShortDescription;
                                this.langs.search.timetype = item.ShortDescription2;
                                break;
                        }
                        break;

                    case "cmn_price_opt":
                        this.langs.DayPrice = item.ShortDescription;
                        this.langs.WeekPrice = item.Description;
                        this.langs.MonthPrice = item.ShortDescription2;
                        this.langs.YearPrice = item.Description2;
                        break;

                    case "src_start": this.langs.search.start = item.ShortDescription2; break;
                    case "src_make": this.langs.search.make = item.ShortDescription; break;
                    case "src_model": this.langs.search.model = item.ShortDescription; break;
                    case "src_prcrng": this.langs.search.price = item.ShortDescription; break;
                    case "src_status": this.langs.search.status = item.ShortDescription; break;
                    case "src_minyear": this.langs.search.minyear = item.ShortDescription; break;
                    case "src_maxyear": this.langs.search.maxyear = item.ShortDescription; break;
                    case "src_width": this.langs.search.width = item.ShortDescription2; break;
                    case "src_height": this.langs.search.height = item.ShortDescription2; break;
                    case "src_length": this.langs.search.length = item.ShortDescription2; break;
                    case "src_km": this.langs.search.mileage = item.ShortDescription2; break;
                    case "src_wheelbase": this.langs.search.wheelbase = item.ShortDescription2; break;
                    case "src_cargocapacity": this.langs.search.cargocapacity = item.ShortDescription2; break;
                    case "src_engine": this.langs.search.enginetype = item.ShortDescription2; break;
                    case "src_enginecapacity": this.langs.search.enginecapacity = item.ShortDescription2; break;
                    case "src_cylinders": this.langs.search.cylinders = item.ShortDescription2; break;
                    case "src_fueltype": this.langs.search.fueltype = item.ShortDescription; break;
                    case "src_fuelcapacity": this.langs.search.fuelcapacity = item.ShortDescription2; break;
                    case "src_cityfuel": this.langs.search.cityfuel = item.ShortDescription2; break;
                    case "src_highfuel": this.langs.search.highfuel = item.ShortDescription2; break;
                    case "src_horsepower": this.langs.search.horsepower = item.ShortDescription2; break;
                    case "src_drivetrain": this.langs.search.drivetrain = item.ShortDescription2; break;
                    case "src_gear": this.langs.search.gear = item.ShortDescription2; break;
                    case "src_gearno": this.langs.search.gearno = item.ShortDescription2; break;
                    case "src_bodytype": this.langs.search.bodytype = item.ShortDescription; break;
                    case "src_trimstyle": this.langs.search.trimstyle = item.ShortDescription2; break;
                    case "src_drivetype": this.langs.search.drivetype = item.ShortDescription2; break;
                    case "src_tires": this.langs.search.tires = item.ShortDescription2; break;
                    case "src_doors": this.langs.search.doors = item.ShortDescription2; break;
                    case "src_seats": this.langs.search.seats = item.ShortDescription2; break;
                    case "src_extcolor": this.langs.search.extcolor = item.ShortDescription2; break;
                    case "src_intcolor": this.langs.search.intcolor = item.ShortDescription2; break;
                    case "src_min": this.langs.search.min = item.ShortDescription2; break;
                    case "src_max": this.langs.search.max = item.ShortDescription2; break;
                }
            });

            this.FillCombo();
        }, resError => this.errorMsg = resError);
    }

    PushLangItems() {
        this.langItems = new Array<LangItem>();

        this.langItems.push(Lib.SetLangItem(this.langItem, "car_book"));

        this.langItems.push(Lib.SetLangItem(this.langItem, "src_start"));
        this.langItems.push(Lib.SetLangItem(this.langItem, "src_make"));
        this.langItems.push(Lib.SetLangItem(this.langItem, "src_model"));
        this.langItems.push(Lib.SetLangItem(this.langItem, "src_prcrng"));
        this.langItems.push(Lib.SetLangItem(this.langItem, "src_status"));
        this.langItems.push(Lib.SetLangItem(this.langItem, "src_minyear"));
        this.langItems.push(Lib.SetLangItem(this.langItem, "src_maxyear"));
        this.langItems.push(Lib.SetLangItem(this.langItem, "src_width"));
        this.langItems.push(Lib.SetLangItem(this.langItem, "src_height"));
        this.langItems.push(Lib.SetLangItem(this.langItem, "src_length"));
        this.langItems.push(Lib.SetLangItem(this.langItem, "src_km"));
        this.langItems.push(Lib.SetLangItem(this.langItem, "src_wheelbase"));
        this.langItems.push(Lib.SetLangItem(this.langItem, "src_cargocapacity"));

        this.langItems.push(Lib.SetLangItem(this.langItem, "src_engine"));
        this.langItems.push(Lib.SetLangItem(this.langItem, "src_enginecapacity"));
        this.langItems.push(Lib.SetLangItem(this.langItem, "src_cylinders"));
        this.langItems.push(Lib.SetLangItem(this.langItem, "src_fueltype"));
        this.langItems.push(Lib.SetLangItem(this.langItem, "src_fuelcapacity"));
        this.langItems.push(Lib.SetLangItem(this.langItem, "src_cityfuel"));
        this.langItems.push(Lib.SetLangItem(this.langItem, "src_highfuel"));
        this.langItems.push(Lib.SetLangItem(this.langItem, "src_horsepower"));
        this.langItems.push(Lib.SetLangItem(this.langItem, "src_drivetrain"));
        this.langItems.push(Lib.SetLangItem(this.langItem, "src_gear"));
        this.langItems.push(Lib.SetLangItem(this.langItem, "src_gearno"));

        this.langItems.push(Lib.SetLangItem(this.langItem, "src_bodytype"));
        this.langItems.push(Lib.SetLangItem(this.langItem, "src_trimstyle"));
        this.langItems.push(Lib.SetLangItem(this.langItem, "src_drivetype"));
        this.langItems.push(Lib.SetLangItem(this.langItem, "src_tires"));
        this.langItems.push(Lib.SetLangItem(this.langItem, "src_doors"));
        this.langItems.push(Lib.SetLangItem(this.langItem, "src_seats"));
        this.langItems.push(Lib.SetLangItem(this.langItem, "src_extcolor"));
        this.langItems.push(Lib.SetLangItem(this.langItem, "src_intcolor"));

        this.langItems.push(Lib.SetLangItem(this.langItem, "cmn_price_opt"));

        this.langItems.push(Lib.SetLangItem(this.langItem, "src_min"));
        this.langItems.push(Lib.SetLangItem(this.langItem, "src_max"));
    }
}