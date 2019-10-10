import { Component } from "@angular/core";
import { SiteService } from '../../../services/site';
import { LangItem } from '../../../models/LangItem';
import { Lib } from '../../../lib/methods';

@Component({
    templateUrl: './index.html'
})

export class CarsBookComponent {
    errorMsg: string;

    constructor(private service: SiteService) {
    }

    ngOnInit() {
        this.SetLangContents();
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
            this.langs.search = new Object();

            resData.forEach((item, i) => {
                switch (item.Code) {
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

                    case "src_make": this.langs.search.make = item.ShortDescription; break;
                    case "src_model": this.langs.search.model = item.ShortDescription; break;
                    case "src_prcrng": this.langs.search.price = item.ShortDescription; break;
                    case "src_status": this.langs.search.status = item.ShortDescription; break;
                    case "src_minyear": this.langs.search.minyear = item.ShortDescription; break;
                    case "src_maxyear": this.langs.search.maxyear = item.ShortDescription; break;
                    case "src_width": this.langs.search.width = item.ShortDescription2; break;
                    case "src_height": this.langs.search.height = item.ShortDescription2; break;
                    case "src_length": this.langs.search.length = item.ShortDescription2; break;
                    case "src_km": this.langs.search.mileage = item.ShortDescription2; break;
                    case "src_wheelbase": this.langs.search.wheelbase = item.ShortDescription2; break;
                    case "src_cargocapacity": this.langs.search.cargocapacity = item.ShortDescription2; break;
                    case "src_engine": this.langs.search.enginetype = item.ShortDescription2; break;
                    case "src_enginecapacity": this.langs.search.enginecapacity = item.ShortDescription2; break;
                    case "src_cylinders": this.langs.search.cylinders = item.ShortDescription2; break;
                    case "src_fueltype": this.langs.search.fueltype = item.ShortDescription; break;
                    case "src_fuelcapacity": this.langs.search.fuelcapacity = item.ShortDescription2; break;
                    case "src_cityfuel": this.langs.search.cityfuel = item.ShortDescription2; break;
                    case "src_highfuel": this.langs.search.highfuel = item.ShortDescription2; break;
                    case "src_horsepower": this.langs.search.horsepower = item.ShortDescription2; break;
                    case "src_drivetrain": this.langs.search.drivetrain = item.ShortDescription2; break;
                    case "src_gear": this.langs.search.gear = item.ShortDescription2; break;
                    case "src_gearno": this.langs.search.gearno = item.ShortDescription2; break;
                    case "src_bodytype": this.langs.search.bodytype = item.ShortDescription; break;
                    case "src_trimstyle": this.langs.search.trimstyle = item.ShortDescription2; break;
                    case "src_drivetype": this.langs.search.drivetype = item.ShortDescription2; break;
                    case "src_tires": this.langs.search.tires = item.ShortDescription2; break;
                    case "src_doors": this.langs.search.doors = item.ShortDescription2; break;
                    case "src_seats": this.langs.search.seats = item.ShortDescription2; break;
                    case "src_extcolor": this.langs.search.extcolor = item.ShortDescription2; break;
                    case "src_intcolor": this.langs.search.intcolor = item.ShortDescription2; break;
                    case "src_min": this.langs.search.min = item.ShortDescription2; break;
                    case "src_max": this.langs.search.max = item.ShortDescription2; break;
                }
            });
        }, resError => this.errorMsg = resError);
    }

    PushLangItems() {
        this.langItems = new Array<LangItem>();

        this.langItems.push(Lib.SetLangItem(this.langItem, "car_book"));

        this.langItems.push(Lib.SetLangItem(this.langItem, "src_make"));
        this.langItems.push(Lib.SetLangItem(this.langItem, "src_model"));
        this.langItems.push(Lib.SetLangItem(this.langItem, "src_prcrng"));
        this.langItems.push(Lib.SetLangItem(this.langItem, "src_status"));
        this.langItems.push(Lib.SetLangItem(this.langItem, "src_minyear"));
        this.langItems.push(Lib.SetLangItem(this.langItem, "src_maxyear"));
        this.langItems.push(Lib.SetLangItem(this.langItem, "src_width"));
        this.langItems.push(Lib.SetLangItem(this.langItem, "src_height"));
        this.langItems.push(Lib.SetLangItem(this.langItem, "src_length"));
        this.langItems.push(Lib.SetLangItem(this.langItem, "src_km"));
        this.langItems.push(Lib.SetLangItem(this.langItem, "src_wheelbase"));
        this.langItems.push(Lib.SetLangItem(this.langItem, "src_cargocapacity"));

        this.langItems.push(Lib.SetLangItem(this.langItem, "src_engine"));
        this.langItems.push(Lib.SetLangItem(this.langItem, "src_enginecapacity"));
        this.langItems.push(Lib.SetLangItem(this.langItem, "src_cylinders"));
        this.langItems.push(Lib.SetLangItem(this.langItem, "src_fueltype"));
        this.langItems.push(Lib.SetLangItem(this.langItem, "src_fuelcapacity"));
        this.langItems.push(Lib.SetLangItem(this.langItem, "src_cityfuel"));
        this.langItems.push(Lib.SetLangItem(this.langItem, "src_highfuel"));
        this.langItems.push(Lib.SetLangItem(this.langItem, "src_horsepower"));
        this.langItems.push(Lib.SetLangItem(this.langItem, "src_drivetrain"));
        this.langItems.push(Lib.SetLangItem(this.langItem, "src_gear"));
        this.langItems.push(Lib.SetLangItem(this.langItem, "src_gearno"));

        this.langItems.push(Lib.SetLangItem(this.langItem, "src_bodytype"));
        this.langItems.push(Lib.SetLangItem(this.langItem, "src_trimstyle"));
        this.langItems.push(Lib.SetLangItem(this.langItem, "src_drivetype"));
        this.langItems.push(Lib.SetLangItem(this.langItem, "src_tires"));
        this.langItems.push(Lib.SetLangItem(this.langItem, "src_doors"));
        this.langItems.push(Lib.SetLangItem(this.langItem, "src_seats"));
        this.langItems.push(Lib.SetLangItem(this.langItem, "src_extcolor"));
        this.langItems.push(Lib.SetLangItem(this.langItem, "src_intcolor"));

        this.langItems.push(Lib.SetLangItem(this.langItem, "src_min"));
        this.langItems.push(Lib.SetLangItem(this.langItem, "src_max"));
    }
}