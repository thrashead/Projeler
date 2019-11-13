import { Component, Output, EventEmitter, Input } from '@angular/core';
import { Router } from '@angular/router';
import { SiteService } from '../../../../services/site';
import { ScriptsComponent } from '../../../shared/controls/scripts';

@Component({
    selector: 'rac-cardetailitem',
    templateUrl: './item.html'
})

export class CarsDetailItemComponent {
    errorMsg: string;
    carID: number;
    carPrice: number;

    car: any;
    features: any;
    gallery: any;
    descriptions: any;

    @Output() titleEvnt = new EventEmitter<string>();
    @Output() urlEvnt = new EventEmitter<string>();

    @Input() langs: any;
    @Input() countformLangs: any;
    @Input() testformLangs: any;

    constructor(private service: SiteService, private router: Router) {
        this.router.routeReuseStrategy.shouldReuseRoute = function () {
            return false;
        };
    }

    ngOnInit() {
        this.FillDetails();
    }

    FillDetails() {
        let carUrl = this.router.url.split('/')[this.router.url.split('/').length - 1];
        this.GetCarDetail(carUrl);
    }

    //CarDetail
    GetCarDetail(carUrl: string) {
        this.service.get("Site", "GetCarDetailByUrl", carUrl).subscribe((resData: any) => {
            this.car = resData;

            this.carID = resData.ID;
            this.carPrice = resData.Price;

            this.titleEvnt.emit(this.car.Title);
            this.urlEvnt.emit(this.car.Url);

            this.GetCarGallery(carUrl);
        }, resError => this.errorMsg = resError);
    }

    //CarGallery
    GetCarGallery(carUrl: string) {
        this.service.get("Site", "GetCarGalleryByUrl", carUrl).subscribe((resData: any) => {
            this.gallery = resData;

            ScriptsComponent.BXSlider();

            this.GetCarDescriptions(carUrl);
        }, resError => this.errorMsg = resError);
    }

    //CarDescriptions
    GetCarDescriptions(carUrl: string) {
        this.service.get("Site", "GetCarDescriptionsByUrl", carUrl).subscribe((resData: any) => {
            this.descriptions = resData;

            this.GetCarDetailsFeatures(carUrl);
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
}
