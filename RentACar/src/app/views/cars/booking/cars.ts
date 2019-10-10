import { Component } from "@angular/core";
import { SiteService } from '../../../services/site';
import { Lib } from '../../../lib/methods';
import { LangItem } from '../../../models/LangItem';
import { BookSearchFilters } from '../../../models/booksearchfilters';

@Component({
    templateUrl: './cars.html'
})

export class CarsBookCarsComponent {
    errorMsg: string;

    carList: any;

    bookSearchFilters: BookSearchFilters;

    constructor(private service: SiteService) {
    }

    ngOnInit() {
        this.GetSearchFilters();
        this.SetLangContents();
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
                        }
                        break;
                }
            });
        }, resError => this.errorMsg = resError);
    }

    PushLangItems() {
        this.langItems = new Array<LangItem>();

        this.langItems.push(Lib.SetLangItem(this.langItem, "car_book"));
        this.langItems.push(Lib.SetLangItem(this.langItem, "cmn_detail"));
        this.langItems.push(Lib.SetLangItem(this.langItem, "cmn_rgstryr"));
    }
}