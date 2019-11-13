import { Component } from "@angular/core";
import { SiteService } from '../../../services/site';
import { Lib } from '../../../lib/methods';
import { LangItem } from '../../../models/LangItem';
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
        this.SetLangContents();
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
        this.service.get("Site", "GetSearchFilters").subscribe((resData: any) => {
            this.searchFilters = resData;

            this.GetCarList();
        }, resError => this.errorMsg = resError);
    }

    //LangContents
    langItems: Array<LangItem>;
    langItem: LangItem;

    searchLangs: any;
    booknowLangs: any;
    headerLangs: any;
    breadcumbsLangs: any;
    infoLangs: any;
    itemsLangs: any;

    //LangContent
    SetLangContents() {
        this.PushLangItems();

        this.service.post("Site", "SetLangContents", this.langItems).subscribe((resData: any) => {
            this.searchLangs = new Object();
            this.booknowLangs = new Object();
            this.headerLangs = new Object();
            this.breadcumbsLangs = new Object();
            this.breadcumbsLangs.menu = new Object();
            this.infoLangs = new Object();
            this.infoLangs.orderList = new Array<any>();
            this.itemsLangs = new Object();

            resData.forEach((item, i) => {
                switch (item.Code) {
                    //Search
                    case "src_fltr_ttl": this.searchLangs.searchTitle = item.ShortDescription; break;
                    case "src_make": this.searchLangs.makeText = item.ShortDescription2; break;
                    case "src_model": this.searchLangs.modelText = item.ShortDescription2; break;
                    case "src_status": this.searchLangs.carStatusText = item.ShortDescription2; break;
                    case "src_bodytype": this.searchLangs.bodyTypeText = item.ShortDescription2; break;
                    case "src_fueltype": this.searchLangs.fuelTypeText = item.ShortDescription2; break;
                    case "src_prcrng": this.searchLangs.priceRangeText = item.ShortDescription2; break;
                    case "src_src": this.searchLangs.search = item.ShortDescription2; break;
                    case "src_fltr_rmv": this.searchLangs.clearFilter = item.ShortDescription; break;

                    //BookNow
                    case "cmn_booknow": this.booknowLangs.booknow = item; break;

                    //Header
                    case "car_list_head": this.headerLangs.header = item; break;

                    //BreadCumbs
                    case "menu":
                        switch (item.ShortCode) {
                            case "home": this.breadcumbsLangs.menu.home = item.ShortDescription2; break;
                            case "about": this.breadcumbsLangs.menu.about = item.ShortDescription2; break;
                        }
                        break;

                    //Info
                    case "car_list_sort": this.infoLangs.sortorder = item.ShortDescription; break;
                    case "car_list_recview": this.infoLangs.recentview = item.ShortDescription; break;
                    case "car_comp_head": this.infoLangs.compare = item.ShortDescription; break;
                    case "order": this.infoLangs.orderList.push(item); break;

                    //Items
                    case "cmn_detail": this.itemsLangs.detail = item.ShortDescription; break;
                    case "cmn_rgstryr": this.itemsLangs.registered = item.ShortDescription2; break;
                    case "car_comp_three": this.itemsLangs.threecar = item.ShortDescription; break;
                    case "cmn_price_opt": this.itemsLangs.DayPrice = item.ShortDescription; break;
                    case "car_list":
                        switch (item.ShortCode) {
                            case "null":
                                this.itemsLangs.null = item.ShortDescription;
                                break;
                        }
                        break;
                }
            });

            this.GetSearchFilters();
        }, resError => this.errorMsg = resError);
    }

    PushLangItems() {
        this.langItems = new Array<LangItem>();

        //Search
        this.langItems.push(Lib.SetLangItem(this.langItem, "src_fltr_ttl"));
        this.langItems.push(Lib.SetLangItem(this.langItem, "src_make"));
        this.langItems.push(Lib.SetLangItem(this.langItem, "src_model"));
        this.langItems.push(Lib.SetLangItem(this.langItem, "src_status"));
        this.langItems.push(Lib.SetLangItem(this.langItem, "src_bodytype"));
        this.langItems.push(Lib.SetLangItem(this.langItem, "src_fueltype"));
        this.langItems.push(Lib.SetLangItem(this.langItem, "src_prcrng"));
        this.langItems.push(Lib.SetLangItem(this.langItem, "src_src"));
        this.langItems.push(Lib.SetLangItem(this.langItem, "src_fltr_rmv"));

        //BookNow
        this.langItems.push(Lib.SetLangItem(this.langItem, "cmn_booknow"));

        //Header
        this.langItems.push(Lib.SetLangItem(this.langItem, "car_list_head"));

        //BreadCumbs
        this.langItems.push(Lib.SetLangItem(this.langItem, "menu", "home"));
        this.langItems.push(Lib.SetLangItem(this.langItem, "menu", "list"));

        //Info
        this.langItems.push(Lib.SetLangItem(this.langItem, "car_list_sort"));
        this.langItems.push(Lib.SetLangItem(this.langItem, "car_list_recview"));
        this.langItems.push(Lib.SetLangItem(this.langItem, "car_comp_head"));
        this.langItems.push(Lib.SetLangItem(this.langItem, "order"));

        //Items
        this.langItems.push(Lib.SetLangItem(this.langItem, "cmn_detail"));
        this.langItems.push(Lib.SetLangItem(this.langItem, "cmn_rgstryr"));
        this.langItems.push(Lib.SetLangItem(this.langItem, "car_comp_three"));
        this.langItems.push(Lib.SetLangItem(this.langItem, "car_list", "null"));
        this.langItems.push(Lib.SetLangItem(this.langItem, "cmn_price_opt"));
    }
}