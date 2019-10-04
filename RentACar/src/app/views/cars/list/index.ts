import { Component } from "@angular/core";
import { SiteService } from '../../../services/site';
import { SearchFilters } from '../../../models/searchfilters';

@Component({
    templateUrl: './index.html'
})

export class CarsListComponent {
    errorMsg: string;

    carList: any;

    searchFilters: SearchFilters;

    constructor(private service: SiteService) {
    }

    ngOnInit() {
        this.GetSearchFilters();
    }

    //CarList
    GetCarList() {
        this.service.get("Site", "GetCarList").subscribe((resData: any) => {
            const length = Math.ceil(resData.length / 6);

            this.carList = Array.from({ length }).map((x, j) => ({
                Cars: resData.filter((y, i) => i >= 6 * j && i < 6 * (j + 1))
            }));

            setTimeout(() => {
                $("#spnCarCount").text(resData.length.toString());
                $("#lblCompareCount").text("0");
                $(".listItem").hide();
                $(".listItem").eq(0).show();
            }, 1000);

            if (length > 1) {
                $("#listControls").show();

                $(".owl-next").off("click").on("click", function () {
                    var visibleItem = $(".listItem:visible");
                    var nextItem = $(".listItem:visible").next(".listItem").length < 1 ? $(".listItem").eq(0) : $(".listItem:visible").next(".listItem");

                    visibleItem.hide();
                    nextItem.fadeIn("slow");
                });

                $(".owl-prev").off("click").on("click", function () {
                    var visibleItem = $(".listItem:visible");
                    var prevItem = $(".listItem:visible").prev(".listItem").length < 1 ? $(".listItem").eq(length - 1) : $(".listItem:visible").prev(".listItem");

                    visibleItem.hide();
                    prevItem.fadeIn("slow");
                });
            }
            else {
                $("#listControls").hide();
            }

        }, resError => this.errorMsg = resError);
    }

    //GetSearchFilters
    GetSearchFilters() {
        this.service.get("Site", "GetSearchFilters").subscribe((resData: any) => {
            this.searchFilters = resData;

            this.GetCarList();
        }, resError => this.errorMsg = resError);
    }
}