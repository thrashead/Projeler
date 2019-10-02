import { Component, Output } from "@angular/core";
import { SiteService } from '../../../services/site';
import { SearchFilters } from '../../../models/searchfilters';

@Component({
    templateUrl: './index.html'
})

export class CarsListComponent {
    errorMsg: string;

    carList: any;
    callTable: boolean = true;

    @Output() carCount: string;

    constructor(private service: SiteService) {
    }

    ngOnInit() {
        this.GetCarList();
    }

    //CarList
    GetCarList(searchFilters: SearchFilters = null) {
        this.service.post("Site", "GetCarList", searchFilters).subscribe((resData: any) => {
            const length = Math.ceil(resData.length / 6);
            this.carList = Array.from({ length }).map((x, j) => ({
                Cars: resData.filter((y, i) => i >= 6 * j && i < 6 * (j + 1))
            }));

            this.carCount = resData.length.toString();

            if (!this.callTable) {
                setTimeout(() => {
                    var style = $(".owl-item").attr("style");

                    $(".owl-wrapper .owl-item").remove();

                    for (var i = 0; i < length; i++) {
                        $(".owl-wrapper").append("<div class='owl-item' style='" + style + "'></div>");
                    }

                    $(".owlCars").each(function (i) {
                        $(".owl-item").eq(i).append($(this));
                    });
                }, 1);
            }

            this.callTable = false;
        }, resError => this.errorMsg = resError);
    }
}