import { Component, Output } from "@angular/core";
import { Router } from '@angular/router';
import { SiteService } from '../../../services/site';
import { Lib } from '../../../lib/methods';
import { LangItem } from '../../../models/LangItem';
import { BookSearchFilters } from '../../../models/booksearchfilters';

@Component({
    templateUrl: './cars.html'
})

export class CarsBookCarsComponent {
    errorMsg: string;
    @Output() alert: string;

    carList: any;

    bookSearchFilters: BookSearchFilters;

    constructor(private service: SiteService, private router: Router) {
    }

    ngOnInit() {
        this.GetSearchFilters();
        this.SetLangContents();
    }

    onClick() {
        var car = $(".chkSelectCar[data-checked='true']");

        if (car.length > 0) {
            this.service.get("Site", "SetCarForReservation", car.attr("data-url")).subscribe((resData: any) => {
                if (resData == true) {
                    this.router.navigate(['/Cars/Book/Submit']);
                }
                else {
                    $("#modalAlert").addClass("show");
                    this.alert = this.langs.error;
                }
            }, resError => this.errorMsg = resError);
        }
        else {
            $("#modalAlert").addClass("show");
            this.alert = this.langs.error;
        }
    }

    onChange($event: any) {
        var target = $event.target || $event.srcElement || $event.currentTarget;
        var carUrl = target.attributes["data-url"].value;
        var button = $(".s-submit button.btn.m-btn");

        $(".chkSelectCar[data-url!='" + carUrl + "']").prop("checked", false);
        $(".chkSelectCar").removeAttr("data-checked");

        if (target.checked) {
            button.removeAttr("disabled");
            target.setAttribute("data-checked", "true");
        }
        else {
            button.attr("disabled", "disabled");
        }
    }

    //CarList
    GetCarList() {
        this.service.get("Site", "GetCarList", null, true).subscribe((resData: any) => {
            const length = Math.ceil(resData.length / 6);

            this.carList = Array.from({ length }).map((x, j) => ({
                Cars: resData.filter((y, i) => i >= 6 * j && i < 6 * (j + 1))
            }));

            setTimeout(() => {
                $("#spnCarCount").text(resData.length.toString());
                $("#lblCompareCount").text("0");
                $("#spnPage").text("1");

                $(".listItem").hide();
                $(".listItem").eq(0).show();
            }, 1000);

            if (length > 1) {
                $("#listControls").show();

                $(".owl-next").off("click").on("click", function () {
                    var visibleItem = $(".listItem:visible");
                    var nextItem = $(".listItem:visible").next(".listItem").length < 1 ? $(".listItem").eq(0) : $(".listItem:visible").next(".listItem");

                    $("#spnPage").text((nextItem.index() + 1).toString());

                    visibleItem.hide();
                    nextItem.fadeIn("slow");
                });

                $(".owl-prev").off("click").on("click", function () {
                    var visibleItem = $(".listItem:visible");
                    var prevItem = $(".listItem:visible").prev(".listItem").length < 1 ? $(".listItem").eq(length - 1) : $(".listItem:visible").prev(".listItem");

                    $("#spnPage").text((prevItem.index() + 1).toString());

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
        this.service.get("Site", "GetBookSearchFilters").subscribe((resData: any) => {
            this.bookSearchFilters = resData;

            this.GetCarList();
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

            resData.forEach((item, i) => {
                switch (item.Code) {
                    case "cmn_detail": this.langs.detail = item.ShortDescription; break;
                    case "cmn_rgstryr": this.langs.registered = item.ShortDescription2; break;
                    case "cmn_price_opt": this.langs.DayPrice = item.ShortDescription; break;
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
                            case "errorcars":
                                this.langs.error = item.ShortDescription;
                                break;
                        }
                        break;
                    case "car_list":
                        switch (item.ShortCode) {
                            case "null":
                                this.langs.null = item.ShortDescription;
                                break;
                        }
                        break;
                }
            });
        }, resError => this.errorMsg = resError);
    }

    PushLangItems() {
        this.langItems = new Array<LangItem>();

        this.langItems.push(Lib.SetLangItem(this.langItem, "cmn_detail"));
        this.langItems.push(Lib.SetLangItem(this.langItem, "cmn_rgstryr"));
        this.langItems.push(Lib.SetLangItem(this.langItem, "car_book"));
        this.langItems.push(Lib.SetLangItem(this.langItem, "car_list", "null"));
        this.langItems.push(Lib.SetLangItem(this.langItem, "cmn_price_opt"));
    }
}