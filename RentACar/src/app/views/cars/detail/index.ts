import { Component } from "@angular/core";
import { SiteService } from '../../../services/site';
import { LangItem } from '../../../models/LangItem';
import { Lib } from '../../../lib/methods';

@Component({
    templateUrl: './index.html'
})

export class CarsDetailComponent {
    errorMsg: string;

    title: string;
    url: string;

    constructor(private service: SiteService) {
    }

    ngOnInit() {
        this.SetLangContents();
    }

    //LangContents
    langItems: Array<LangItem>;
    langItem: LangItem;

    headerLangs: any;
    breadcumbsLangs: any;
    relatedLangs: any;
    brandsLangs: any;
    itemLangs: any;

    countformLangs: any;
    testformLangs: any;

    //LangContent
    SetLangContents() {
        this.PushLangItems();

        this.service.post("Site", "SetLangContents", this.langItems).subscribe((resData: any) => {
            this.headerLangs = new Object();
            this.breadcumbsLangs = new Object();
            this.breadcumbsLangs.menu = new Object();
            this.relatedLangs = new Object();
            this.brandsLangs = new Object();
            this.itemLangs = new Object();
            this.countformLangs = new Object();
            this.testformLangs = new Object();
            this.testformLangs.test = new Object();

            resData.forEach((item, i) => {
                switch (item.Code) {
                    //Header
                    case "car_dtl_head": this.headerLangs.header = item; break;

                    //BreadCumbs
                    case "menu":
                        switch (item.ShortCode) {
                            case "home": this.breadcumbsLangs.menu.home = item.ShortDescription2; break;
                            case "list": this.breadcumbsLangs.menu.list = item.ShortDescription2; break;
                        }
                        break;

                    //Related
                    case "cmn_rgstryr": this.relatedLangs.registered = item.ShortDescription2; break;
                    case "cmn_more":
                        this.relatedLangs.more = item.ShortDescription;
                        this.brandsLangs.more = item.ShortDescription;
                        break;
                    case "car_list_similar": this.relatedLangs.similar = item.ShortDescription; break;
                    case "cmn_price_opt":
                        this.relatedLangs.DayPrice = item.ShortDescription;
                        this.itemLangs.DayPrice = item.ShortDescription;
                        this.countformLangs.DayPrice = item.ShortDescription;
                        this.countformLangs.WeekPrice = item.Description;
                        this.countformLangs.MonthPrice = item.ShortDescription2;
                        this.countformLangs.YearPrice = item.Description2;
                        break;

                    //Brands
                    case "car_makes_brands": this.brandsLangs.brands = item.ShortDescription; break;

                    //Item
                    case "car_list_kdv": this.itemLangs.kdv = item.ShortDescription2; break;
                    case "car_dtl_info": this.itemLangs.infos = item.ShortDescription; break;
                    case "car_dtl_otherfeats": this.itemLangs.otherfeats = item.ShortDescription; break;
                    case "src_status": this.itemLangs.status = item.ShortDescription; break;
                    case "src_km": this.itemLangs.mileage = item.ShortDescription2; break;
                    case "src_gear": this.itemLangs.gear = item.ShortDescription2; break;
                    case "src_drivetype": this.itemLangs.drivetype = item.ShortDescription2; break;
                    case "src_seats": this.itemLangs.seats = item.ShortDescription2; break;
                    case "src_cityfuel": this.itemLangs.cityfuel = item.ShortDescription2; break;
                    case "src_highfuel": this.itemLangs.highfuel = item.ShortDescription2; break;
                    case "src_make": this.itemLangs.make = item.ShortDescription; break;
                    case "src_model": this.itemLangs.model = item.ShortDescription; break;
                    case "src_bodytype": this.itemLangs.bodytype = item.ShortDescription; break;
                    case "src_fueltype": this.itemLangs.fueltype = item.ShortDescription; break;
                    case "src_year": this.itemLangs.year = item.ShortDescription2; break;
                    case "src_drivetrain": this.itemLangs.drivetrain = item.ShortDescription2; break;
                    case "src_engine": this.itemLangs.engine = item.ShortDescription2; break;
                    case "src_enginecapacity": this.itemLangs.enginecapacity = item.ShortDescription2; break;
                    case "src_horsepower": this.itemLangs.horsepower = item.ShortDescription2; break;
                    case "src_cylinders": this.itemLangs.cylinders = item.ShortDescription2; break;
                    case "src_wheelbase": this.itemLangs.wheelbase = item.ShortDescription2; break;
                    case "src_tires": this.itemLangs.tires = item.ShortDescription2; break;
                    case "src_fuelcapacity": this.itemLangs.fuelcapacity = item.ShortDescription2; break;
                    case "src_trimstyle": this.itemLangs.trimstyle = item.ShortDescription2; break;
                    case "src_doors": this.itemLangs.doors = item.ShortDescription2; break;
                    case "src_cargocapacity": this.itemLangs.cargocapacity = item.ShortDescription2; break;
                    case "src_extcolor": this.itemLangs.extcolor = item.ShortDescription2; break;
                    case "src_intcolor": this.itemLangs.intcolor = item.ShortDescription2; break;

                    //CountForm
                    case "count_form":
                        this.countformLangs.Title = item.ShortDescription;
                        this.countformLangs.Submit = item.ShortDescription2;
                        break;
                    case "car_book":
                        switch (item.ShortCode) {
                            case "time": this.countformLangs.Time = item.ShortDescription; break;
                        }
                        break;

                    //TestForm
                    case "cntct_form":
                        switch (item.ShortCode) {
                            case "name": this.testformLangs.test.Sender = item.ShortDescription; break;
                            case "mail": this.testformLangs.test.Mail = item.ShortDescription; break;
                            case "phone":
                                this.testformLangs.test.Phone = item.ShortDescription;
                                this.testformLangs.test.Phone2 = item.Description;
                                break;
                            case "msg": this.testformLangs.test.Message = item.ShortDescription; break;
                            case "sbmt": this.testformLangs.test.Submit = item.ShortDescription; break;
                            case "alert": this.testformLangs.test.Alert = item.ShortDescription; break;
                        }
                        break;
                    case "test_form":
                        switch (item.ShortCode) {
                            case "text": this.testformLangs.test.Text = item.ShortDescription; break;
                            case "copymail": this.testformLangs.test.CopyMail = item.ShortDescription; break;
                        }
                        break;
                    case "home_wlcm_support": this.testformLangs.test.CallUs = item.Description2; break;
                    case "cmn_error_onemsg": this.testformLangs.test.Error = item.ShortDescription; break;
                }
            });

        }, resError => this.errorMsg = resError);
    }

    PushLangItems() {
        this.langItems = new Array<LangItem>();

        //Header
        this.langItems.push(Lib.SetLangItem(this.langItem, "car_dtl_head"));

        //BreadCumbs
        this.langItems.push(Lib.SetLangItem(this.langItem, "menu", "home"));
        this.langItems.push(Lib.SetLangItem(this.langItem, "menu", "list"));

        //Related
        this.langItems.push(Lib.SetLangItem(this.langItem, "cmn_rgstryr"));
        this.langItems.push(Lib.SetLangItem(this.langItem, "cmn_more"));
        this.langItems.push(Lib.SetLangItem(this.langItem, "car_list_similar"));
        this.langItems.push(Lib.SetLangItem(this.langItem, "cmn_price_opt"));

        //Brands
        this.langItems.push(Lib.SetLangItem(this.langItem, "car_makes_brands"));

        //Item
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

        //CountForm
        this.langItems.push(Lib.SetLangItem(this.langItem, "count_form"));
        this.langItems.push(Lib.SetLangItem(this.langItem, "car_book", "time"));

        //TestForm
        this.langItems.push(Lib.SetLangItem(this.langItem, "cntct_form"));
        this.langItems.push(Lib.SetLangItem(this.langItem, "test_form"));
        this.langItems.push(Lib.SetLangItem(this.langItem, "home_wlcm_support"));
        this.langItems.push(Lib.SetLangItem(this.langItem, "cmn_error_onemsg"));
    }
}