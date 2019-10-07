import { Component } from '@angular/core';
import { SiteService } from '../../../../services/site';
import { Router } from '@angular/router';

@Component({
    selector: 'rac-cardetailitem',
    templateUrl: './item.html'
})

export class CarsDetailItemComponent {
    errorMsg: string;

    kdv: string;
    status: string;
    mileage: string;
    gear: string;
    drive: string;
    seats: string;
    cityfuel: string;
    highfuel: string;

    car: any;
    features: any;
    gallery: any;
    videos: any;
    descriptions: any;

    constructor(private service: SiteService, private router: Router) {
    }

    ngOnInit() {
        this.GetLangContent();

        let carUrl = this.router.url.split('/')[this.router.url.split('/').length - 1];

        this.GetCarDetail(carUrl);
        this.GetCarGallery(carUrl);
        this.GetCarVideo(carUrl);
        this.GetCarDescriptions(carUrl);
        this.GetCarDetailsFeatures(carUrl);
    }

    modalVideo() {
        if (this.videos != null) {
            $(".modal-body > iframe").attr("src", this.videos.VideoUrl);
        }
    }

    //LangContent
    GetLangContent() {
        this.service.get("Site", "GetLangContentByCode", "car_list_kdv", 1).subscribe((resData: any) => {
            this.kdv = resData.ShortDescription2;
        }, resError => this.errorMsg = resError);

        this.service.get("Site", "GetLangContentByCode", "src_vhclsts", 1).subscribe((resData: any) => {
            this.status = resData.ShortDescription;
        }, resError => this.errorMsg = resError);

        this.service.get("Site", "GetLangContentByCode", "src_km", 1).subscribe((resData: any) => {
            this.mileage = resData.ShortDescription2;
        }, resError => this.errorMsg = resError);

        this.service.get("Site", "GetLangContentByCode", "src_gear", 1).subscribe((resData: any) => {
            this.gear = resData.ShortDescription2;
        }, resError => this.errorMsg = resError);

        this.service.get("Site", "GetLangContentByCode", "src_drive", 1).subscribe((resData: any) => {
            this.drive = resData.ShortDescription2;
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
    }

    //CarDetail
    GetCarDetail(currentUrl: string) {
        this.service.get("Site", "GetCarDetailByUrl", currentUrl).subscribe((resData: any) => {
            this.car = resData;
        }, resError => this.errorMsg = resError);
    }

    //CarGallery
    GetCarGallery(currentUrl: string) {
        this.service.get("Site", "GetCarGalleryByUrl", currentUrl).subscribe((resData: any) => {
            this.gallery = resData;
        }, resError => this.errorMsg = resError);
    }

    //CarVideo
    GetCarVideo(currentUrl: string) {
        this.service.get("Site", "GetCarVideosByUrl", currentUrl, 1).subscribe((resData: any) => {
            this.videos = resData;
        }, resError => this.errorMsg = resError);
    }

    //CarDescriptions
    GetCarDescriptions(currentUrl: string) {
        this.service.get("Site", "GetCarDescriptionsByUrl", currentUrl).subscribe((resData: any) => {
            this.descriptions = resData;
        }, resError => this.errorMsg = resError);
    }

    //CarDetailsFeatures
    GetCarDetailsFeatures(currentUrl: string) {
        this.service.get("Site", "GetCarDetailsFeaturesByUrl", currentUrl).subscribe((resData: any) => {
            this.features = resData;

            var div = $(".b-detail__main-info-extra .row .col-xs-4");
            var i = 0;
            var j = 1;

            Object.entries(this.features).forEach(([key, value]) => {
                if (div.find("ul[data-id='" + j.toString() + "']").length < 1) {
                    div.append("<ul data-id='" + j.toString() + "'></ul>");
                }

                if (value != null) {
                    div.find("ul[data-id='" + j.toString() + "']").append("<li><span class=\"fa fa-check\"></span>" + value + "</li>");

                    i++;

                    if (i % 5 == 4) {
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
