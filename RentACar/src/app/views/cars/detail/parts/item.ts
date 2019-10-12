import { Component, AfterViewInit, Output, EventEmitter } from '@angular/core';
import { SiteService } from '../../../../services/site';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LangItem } from '../../../../models/LangItem';
import { Lib } from '../../../../lib/methods';

@Component({
    selector: 'rac-cardetailitem',
    templateUrl: './item.html'
})

export class CarsDetailItemComponent implements AfterViewInit {
    errorMsg: string;

    infoForm: FormGroup;
    testForm: FormGroup;
    calcForm: FormGroup;

    car: any;
    features: any;
    gallery: any;
    descriptions: any;

    @Output() titleEvnt = new EventEmitter<string>();
    @Output() urlEvnt = new EventEmitter<string>();

    constructor(private service: SiteService, private formBuilder: FormBuilder, private router: Router) {
        this.router.routeReuseStrategy.shouldReuseRoute = function () {
            return false;
        };
    }

    ngOnInit() {
        this.SetLangContents();
        this.RemoveBXSlider();
        this.FillDetails();

        this.infoForm = this.formBuilder.group({
            Name: new FormControl(null, [Validators.required, Validators.minLength(5), Validators.maxLength(50)]),
            Mail: new FormControl(null, Validators.compose([Validators.required, Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')])),
            Phone: new FormControl(null, [Validators.required, Validators.minLength(5), Validators.maxLength(50)]),
            Message: new FormControl(null, [Validators.required, Validators.minLength(25), Validators.maxLength(500)]),
            CopyMail: new FormControl(null)
        });

        this.testForm = this.formBuilder.group({
            Name: new FormControl(null, [Validators.required, Validators.minLength(5), Validators.maxLength(50)]),
            Message: new FormControl(null, [Validators.required, Validators.minLength(25), Validators.maxLength(500)]),
            CopyMail: new FormControl(null)
        });

        this.calcForm = this.formBuilder.group({
            TotalValue: new FormControl(null, [Validators.required, Validators.min(0)]),
            Payment: new FormControl(null, [Validators.required, Validators.min(0)]),
            LoanTerm: new FormControl(null, Validators.required),
            Rate: new FormControl(null, [Validators.required, Validators.min(0), Validators.max(100)])
        });
    }

    ngAfterViewInit() {
        $("a.b-detail__main-info-images-small-one").eq(0).click();
    }

    RemoveBXSlider() {
        $(".bx-viewport").removeClass("bx-viewport");
        $(".bx-wrapper").removeClass("bx-wrapper");

        $(".bx-clone").remove();
        $(".bx-controls").remove();
    }

    FillDetails() {
        let carUrl = this.router.url.split('/')[this.router.url.split('/').length - 1];

        this.GetCarDetail(carUrl);
        this.GetCarGallery(carUrl);
        this.GetCarDescriptions(carUrl);
        this.GetCarDetailsFeatures(carUrl);
    }

    //CarDetail
    GetCarDetail(carUrl: string) {
        this.service.get("Site", "GetCarDetailByUrl", carUrl).subscribe((resData: any) => {
            this.car = resData;

            this.titleEvnt.emit(this.car.Title);
            this.urlEvnt.emit(this.car.Url);
        }, resError => this.errorMsg = resError);
    }

    //CarGallery
    GetCarGallery(carUrl: string) {
        this.service.get("Site", "GetCarGalleryByUrl", carUrl).subscribe((resData: any) => {
            this.gallery = resData;

        }, resError => this.errorMsg = resError);
    }

    //CarDescriptions
    GetCarDescriptions(carUrl: string) {
        this.service.get("Site", "GetCarDescriptionsByUrl", carUrl).subscribe((resData: any) => {
            this.descriptions = resData;
        }, resError => this.errorMsg = resError);
    }

    //CarDetailsFeatures
    GetCarDetailsFeatures(carUrl: string) {
        this.service.get("Site", "GetCarDetailsFeaturesByUrl", carUrl).subscribe((resData: any) => {
            this.features = resData;

            var divFeats = $(".b-detail__main-info-extra .row");
            var i = 0;
            var j = 1;

            divFeats.children("div.col-xs-4").remove();

            Object.entries(this.features).forEach(([key, value]) => {
                if (divFeats.find("ul[data-id='" + j.toString() + "']").length < 1) {
                    divFeats.append("<div class=\"col-xs-4\"><ul data-id='" + j.toString() + "'></ul></div>");
                }

                if (value == true) {
                    divFeats.find("ul[data-id='" + j.toString() + "']").append("<li><span class=\"fa fa-check\"></span>" + key + "</li>");

                    i++;

                    if (i >= 5 && i % 5 == 0) {
                        j++;
                    }
                }
            });

            if (i == 0) {
                $(".b-detail__main-info-extra").remove();
            }
        }, resError => this.errorMsg = resError);
    }

    //LangContents
    langItems: Array<LangItem>;
    langItem: LangItem;
    langs: any;

    SetLangContents() {
        this.PushLangItems();

        this.service.post("Site", "SetLangContents", this.langItems).subscribe((resData: any) => {
            this.langs = new Object();

            resData.forEach((item, i) => {
                switch (item.Code) {
                    case "car_list_kdv": this.langs.kdv = item.ShortDescription2; break;
                    case "car_dtl_info": this.langs.infos = item.ShortDescription; break;
                    case "car_dtl_otherfeats": this.langs.otherfeats = item.ShortDescription; break;
                    case "src_status": this.langs.status = item.ShortDescription; break;
                    case "src_km": this.langs.mileage = item.ShortDescription2; break;
                    case "src_gear": this.langs.gear = item.ShortDescription2; break;
                    case "src_drivetype": this.langs.drivetype = item.ShortDescription2; break;
                    case "src_seats": this.langs.seats = item.ShortDescription2; break;
                    case "src_cityfuel": this.langs.cityfuel = item.ShortDescription2; break;
                    case "src_highfuel": this.langs.highfuel = item.ShortDescription2; break;
                    case "src_make": this.langs.make = item.ShortDescription; break;
                    case "src_model": this.langs.model = item.ShortDescription; break;
                    case "src_bodytype": this.langs.bodytype = item.ShortDescription; break;
                    case "src_fueltype": this.langs.fueltype = item.ShortDescription; break;
                    case "src_year": this.langs.year = item.ShortDescription2; break;
                    case "src_drivetrain": this.langs.drivetrain = item.ShortDescription2; break;
                    case "src_engine": this.langs.engine = item.ShortDescription2; break;
                    case "src_enginecapacity": this.langs.enginecapacity = item.ShortDescription2; break;
                    case "src_horsepower": this.langs.horsepower = item.ShortDescription2; break;
                    case "src_cylinders": this.langs.cylinders = item.ShortDescription2; break;
                    case "src_wheelbase": this.langs.wheelbase = item.ShortDescription2; break;
                    case "src_tires": this.langs.tires = item.ShortDescription2; break;
                    case "src_fuelcapacity": this.langs.fuelcapacity = item.ShortDescription2; break;
                    case "src_trimstyle": this.langs.trimstyle = item.ShortDescription2; break;
                    case "src_doors": this.langs.doors = item.ShortDescription2; break;
                    case "src_cargocapacity": this.langs.cargocapacity = item.ShortDescription2; break;
                    case "src_extcolor": this.langs.extcolor = item.ShortDescription2; break;
                    case "src_intcolor": this.langs.intcolor = item.ShortDescription2; break;
                }
            });
        }, resError => this.errorMsg = resError);
    }

    PushLangItems() {
        this.langItems = new Array<LangItem>();

        this.langItems.push(Lib.SetLangItem(this.langItem, "car_list_kdv"));
        this.langItems.push(Lib.SetLangItem(this.langItem, "car_dtl_info"));
        this.langItems.push(Lib.SetLangItem(this.langItem, "car_dtl_otherfeats"));
        this.langItems.push(Lib.SetLangItem(this.langItem, "src_status"));
        this.langItems.push(Lib.SetLangItem(this.langItem, "src_km"));
        this.langItems.push(Lib.SetLangItem(this.langItem, "src_gear"));
        this.langItems.push(Lib.SetLangItem(this.langItem, "src_drivetype"));
        this.langItems.push(Lib.SetLangItem(this.langItem, "src_seats"));
        this.langItems.push(Lib.SetLangItem(this.langItem, "src_cityfuel"));
        this.langItems.push(Lib.SetLangItem(this.langItem, "src_highfuel"));
        this.langItems.push(Lib.SetLangItem(this.langItem, "src_make"));
        this.langItems.push(Lib.SetLangItem(this.langItem, "src_model"));
        this.langItems.push(Lib.SetLangItem(this.langItem, "src_bodytype"));
        this.langItems.push(Lib.SetLangItem(this.langItem, "src_fueltype"));
        this.langItems.push(Lib.SetLangItem(this.langItem, "src_year"));
        this.langItems.push(Lib.SetLangItem(this.langItem, "src_drivetrain"));
        this.langItems.push(Lib.SetLangItem(this.langItem, "src_engine"));
        this.langItems.push(Lib.SetLangItem(this.langItem, "src_enginecapacity"));
        this.langItems.push(Lib.SetLangItem(this.langItem, "src_horsepower"));
        this.langItems.push(Lib.SetLangItem(this.langItem, "src_cylinders"));
        this.langItems.push(Lib.SetLangItem(this.langItem, "src_wheelbase"));
        this.langItems.push(Lib.SetLangItem(this.langItem, "src_tires"));
        this.langItems.push(Lib.SetLangItem(this.langItem, "src_fuelcapacity"));
        this.langItems.push(Lib.SetLangItem(this.langItem, "src_trimstyle"));
        this.langItems.push(Lib.SetLangItem(this.langItem, "src_doors"));
        this.langItems.push(Lib.SetLangItem(this.langItem, "src_cargocapacity"));
        this.langItems.push(Lib.SetLangItem(this.langItem, "src_extcolor"));
        this.langItems.push(Lib.SetLangItem(this.langItem, "src_intcolor"));
    }
}
