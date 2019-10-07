import { Component, AfterViewInit } from '@angular/core';
import { SiteService } from '../../../../services/site';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';

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
    videos: any;
    descriptions: any;

    constructor(private service: SiteService, private formBuilder: FormBuilder, private router: Router, private activatedRoute: ActivatedRoute) {
        this.router.routeReuseStrategy.shouldReuseRoute = function () {
            return false;
        };
    }

    ngOnInit() {
        this.GetLangContent();
        this.RemoveBXSlider();
        this.FillDetails();

        this.activatedRoute.url.subscribe(url => {
        });

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

    modalVideo() {
        if (this.videos != null) {
            $(".modal-body > iframe").attr("src", this.videos.VideoUrl);
        }
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
        this.GetCarVideo(carUrl);
        this.GetCarDescriptions(carUrl);
        this.GetCarDetailsFeatures(carUrl);
    }

    //CarDetail
    GetCarDetail(carUrl: string) {
        this.service.get("Site", "GetCarDetailByUrl", carUrl).subscribe((resData: any) => {
            this.car = resData;
        }, resError => this.errorMsg = resError);
    }

    //CarGallery
    GetCarGallery(carUrl: string) {
        this.service.get("Site", "GetCarGalleryByUrl", carUrl).subscribe((resData: any) => {
            this.gallery = resData;

        }, resError => this.errorMsg = resError);
    }

    //CarVideo
    GetCarVideo(carUrl: string) {
        this.service.get("Site", "GetCarVideosByUrl", carUrl, 1).subscribe((resData: any) => {
            this.videos = resData;
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

    kdv: string;
    infos: string;
    otherfeats: string;
    status: string;
    mileage: string;
    gear: string;
    drivetype: string;
    seats: string;
    cityfuel: string;
    highfuel: string;
    make: string;
    model: string;
    bodytype: string;
    fueltype: string;
    year: string;
    drivetrain: string;
    engine: string;
    enginecapacity: string;
    horsepower: string;
    cylinders: string;
    wheelbase: string;
    tires: string;
    fuelcapacity: string;
    trimstyle: string;
    doors: string;
    cargocapacity: string;
    extcolor: string;
    intcolor: string;

    //LangContent
    GetLangContent() {
        this.service.get("Site", "GetLangContentByCode", "car_list_kdv", 1).subscribe((resData: any) => {
            this.kdv = resData.ShortDescription2;
        }, resError => this.errorMsg = resError);

        this.service.get("Site", "GetLangContentByCode", "car_dtl_info", 1).subscribe((resData: any) => {
            this.infos = resData.ShortDescription;
        }, resError => this.errorMsg = resError);

        this.service.get("Site", "GetLangContentByCode", "car_dtl_otherfeats", 1).subscribe((resData: any) => {
            this.otherfeats = resData.ShortDescription;
        }, resError => this.errorMsg = resError);

        this.service.get("Site", "GetLangContentByCode", "src_status", 1).subscribe((resData: any) => {
            this.status = resData.ShortDescription;
        }, resError => this.errorMsg = resError);

        this.service.get("Site", "GetLangContentByCode", "src_km", 1).subscribe((resData: any) => {
            this.mileage = resData.ShortDescription2;
        }, resError => this.errorMsg = resError);

        this.service.get("Site", "GetLangContentByCode", "src_gear", 1).subscribe((resData: any) => {
            this.gear = resData.ShortDescription2;
        }, resError => this.errorMsg = resError);

        this.service.get("Site", "GetLangContentByCode", "src_drivetype", 1).subscribe((resData: any) => {
            this.drivetype = resData.ShortDescription2;
        }, resError => this.errorMsg = resError);

        this.service.get("Site", "GetLangContentByCode", "src_seats", 1).subscribe((resData: any) => {
            this.seats = resData.ShortDescription2;
        }, resError => this.errorMsg = resError);

        this.service.get("Site", "GetLangContentByCode", "src_cityfuel", 1).subscribe((resData: any) => {
            this.cityfuel = resData.ShortDescription2;
        }, resError => this.errorMsg = resError);

        this.service.get("Site", "GetLangContentByCode", "src_highfuel", 1).subscribe((resData: any) => {
            this.highfuel = resData.ShortDescription2;
        }, resError => this.errorMsg = resError);

        this.service.get("Site", "GetLangContentByCode", "src_make", 1).subscribe((resData: any) => {
            this.make = resData.ShortDescription;
        }, resError => this.errorMsg = resError);

        this.service.get("Site", "GetLangContentByCode", "src_model", 1).subscribe((resData: any) => {
            this.model = resData.ShortDescription;
        }, resError => this.errorMsg = resError);

        this.service.get("Site", "GetLangContentByCode", "src_bodytype", 1).subscribe((resData: any) => {
            this.bodytype = resData.ShortDescription;
        }, resError => this.errorMsg = resError);

        this.service.get("Site", "GetLangContentByCode", "src_fueltype", 1).subscribe((resData: any) => {
            this.fueltype = resData.ShortDescription;
        }, resError => this.errorMsg = resError);

        this.service.get("Site", "GetLangContentByCode", "src_year", 1).subscribe((resData: any) => {
            this.year = resData.ShortDescription2;
        }, resError => this.errorMsg = resError);

        this.service.get("Site", "GetLangContentByCode", "src_drivetrain", 1).subscribe((resData: any) => {
            this.drivetrain = resData.ShortDescription2;
        }, resError => this.errorMsg = resError);

        this.service.get("Site", "GetLangContentByCode", "src_engine", 1).subscribe((resData: any) => {
            this.engine = resData.ShortDescription2;
        }, resError => this.errorMsg = resError);

        this.service.get("Site", "GetLangContentByCode", "src_enginecapacity", 1).subscribe((resData: any) => {
            this.enginecapacity = resData.ShortDescription2;
        }, resError => this.errorMsg = resError);

        this.service.get("Site", "GetLangContentByCode", "src_horsepower", 1).subscribe((resData: any) => {
            this.horsepower = resData.ShortDescription2;
        }, resError => this.errorMsg = resError);

        this.service.get("Site", "GetLangContentByCode", "src_cylinders", 1).subscribe((resData: any) => {
            this.cylinders = resData.ShortDescription2;
        }, resError => this.errorMsg = resError);

        this.service.get("Site", "GetLangContentByCode", "src_wheelbase", 1).subscribe((resData: any) => {
            this.wheelbase = resData.ShortDescription2;
        }, resError => this.errorMsg = resError);

        this.service.get("Site", "GetLangContentByCode", "src_tires", 1).subscribe((resData: any) => {
            this.tires = resData.ShortDescription2;
        }, resError => this.errorMsg = resError);

        this.service.get("Site", "GetLangContentByCode", "src_fuelcapacity", 1).subscribe((resData: any) => {
            this.fuelcapacity = resData.ShortDescription2;
        }, resError => this.errorMsg = resError);

        this.service.get("Site", "GetLangContentByCode", "src_trimstyle", 1).subscribe((resData: any) => {
            this.trimstyle = resData.ShortDescription2;
        }, resError => this.errorMsg = resError);

        this.service.get("Site", "GetLangContentByCode", "src_doors", 1).subscribe((resData: any) => {
            this.doors = resData.ShortDescription2;
        }, resError => this.errorMsg = resError);

        this.service.get("Site", "GetLangContentByCode", "src_cargocapacity", 1).subscribe((resData: any) => {
            this.cargocapacity = resData.ShortDescription2;
        }, resError => this.errorMsg = resError);

        this.service.get("Site", "GetLangContentByCode", "src_extcolor", 1).subscribe((resData: any) => {
            this.extcolor = resData.ShortDescription2;
        }, resError => this.errorMsg = resError);

        this.service.get("Site", "GetLangContentByCode", "src_intcolor", 1).subscribe((resData: any) => {
            this.intcolor = resData.ShortDescription2;
        }, resError => this.errorMsg = resError);
    }
}
