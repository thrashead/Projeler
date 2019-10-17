import { Component } from '@angular/core';
import { SiteService } from '../../../../services/site';
import { CarCompare } from '../../../../models/CarCompare';
import { LangItem } from '../../../../models/LangItem';
import { Lib } from '../../../../lib/methods';

@Component({
    selector: 'rac-carcompareitems',
    templateUrl: './items.html'
})

export class CarsCompareItemsComponent {
    errorMsg: string;

    carCompare: Array<CarCompare>;

    constructor(private service: SiteService) {
    }

    ngOnInit() {
        this.SetLangContents();
        this.GetCarCompareList();
    }

    //CarCompareList
    GetCarCompareList() {
        this.service.get("Site", "GetCarCompareList").subscribe((resData: any) => {
            this.carCompare = new Array<CarCompare>();

            this.carCompare = resData;
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
            this.langs.Basic = new Object();
            this.langs.Mech = new Object();
            this.langs.ExtInt = new Object();
            this.langs.Feats = new Object();

            resData.forEach((item, i) => {
                switch (item.Code) {
                    case "cmn_detail": this.langs.detail = item.ShortDescription; break;
                    case "car_comp_basic": this.langs.Basic.title = item.ShortDescription; break;
                    case "car_comp_mech": this.langs.Mech.title = item.ShortDescription; break;
                    case "car_comp_extint": this.langs.ExtInt.title = item.ShortDescription; break;
                    case "car_comp_feats": this.langs.Feats.title = item.ShortDescription; break;
                    case "car_comp_null": this.langs.null = item.ShortDescription; break;

                    case "cmn_price_opt": this.langs.DayPrice = item.ShortDescription; break;

                    case "src_make": this.langs.Basic.make = item.ShortDescription; break;
                    case "src_model": this.langs.Basic.model = item.ShortDescription; break;
                    case "src_status": this.langs.Basic.status = item.ShortDescription; break;
                    case "src_year": this.langs.Basic.year = item.ShortDescription2; break;
                    case "src_width": this.langs.Basic.width = item.ShortDescription2; break;
                    case "src_height": this.langs.Basic.height = item.ShortDescription2; break;
                    case "src_length": this.langs.Basic.length = item.ShortDescription2; break;
                    case "src_km": this.langs.Basic.mileage = item.ShortDescription2; break;
                    case "src_wheelbase": this.langs.Basic.wheelbase = item.ShortDescription2; break;
                    case "src_cargocapacity": this.langs.Basic.cargocapacity = item.ShortDescription2; break;

                    case "src_engine": this.langs.Mech.enginetype = item.ShortDescription2; break;
                    case "src_enginecapacity": this.langs.Mech.enginecapacity = item.ShortDescription2; break;
                    case "src_cylinders": this.langs.Mech.cylinders = item.ShortDescription2; break;
                    case "src_fueltype": this.langs.Mech.fueltype = item.ShortDescription; break;
                    case "src_fuelcapacity": this.langs.Mech.fuelcapacity = item.ShortDescription2; break;
                    case "src_cityfuel": this.langs.Mech.cityfuel = item.ShortDescription2; break;
                    case "src_highfuel": this.langs.Mech.highfuel = item.ShortDescription2; break;
                    case "src_horsepower": this.langs.Mech.horsepower = item.ShortDescription2; break;
                    case "src_drivetrain": this.langs.Mech.drivetrain = item.ShortDescription2; break;
                    case "src_gear": this.langs.Mech.gear = item.ShortDescription2; break;

                    case "src_bodytype": this.langs.ExtInt.bodytype = item.ShortDescription; break;
                    case "src_trimstyle": this.langs.ExtInt.trimstyle = item.ShortDescription2; break;
                    case "src_drivetype": this.langs.ExtInt.drivetype = item.ShortDescription2; break;
                    case "src_tires": this.langs.ExtInt.tires = item.ShortDescription2; break;
                    case "src_doors": this.langs.ExtInt.doors = item.ShortDescription2; break;
                    case "src_seats": this.langs.ExtInt.seats = item.ShortDescription2; break;
                    case "src_extcolor": this.langs.ExtInt.extcolor = item.ShortDescription2; break;
                    case "src_intcolor": this.langs.ExtInt.intcolor = item.ShortDescription2; break;

                    case "src_feats":
                        switch (item.ShortCode) {
                            case null: this.langs.Feats.feats = item.ShortDescription2; break;
                            case "abs": this.langs.Feats.ABS = item.ShortDescription2; break;
                            case "airbag": this.langs.Feats.Airbag = item.ShortDescription2; break;
                            case "aircon": this.langs.Feats.AirConditioning = item.ShortDescription2; break;
                            case "alloytire": this.langs.Feats.AlloyTires = item.ShortDescription2; break;
                            case "antitheft": this.langs.Feats.AntiTheft = item.ShortDescription2; break;
                            case "cdplayer": this.langs.Feats.CDPlayer = item.ShortDescription2; break;
                            case "centrlock": this.langs.Feats.CentralLocking = item.ShortDescription2; break;
                            case "coolseat": this.langs.Feats.CooledSeats = item.ShortDescription2; break;
                            case "foglamp": this.langs.Feats.FogLamps = item.ShortDescription2; break;
                            case "foldseat": this.langs.Feats.FoldingSeats = item.ShortDescription2; break;
                            case "gps": this.langs.Feats.GPS = item.ShortDescription2; break;
                            case "heatseat": this.langs.Feats.HeatedSeats = item.ShortDescription2; break;
                            case "headlghtcvr": this.langs.Feats.HeadlightCovers = item.ShortDescription2; break;
                            case "keylsentry": this.langs.Feats.KeylessEntry = item.ShortDescription2; break;
                            case "leathseat": this.langs.Feats.LeatherSeats = item.ShortDescription2; break;
                            case "leathtrim": this.langs.Feats.LeatherTrim = item.ShortDescription2; break;
                            case "lpg": this.langs.Feats.LPG = item.ShortDescription2; break;
                            case "passairbag": this.langs.Feats.PassengerAirbag = item.ShortDescription2; break;
                            case "powerglass": this.langs.Feats.PowerGlass = item.ShortDescription2; break;
                            case "powermirr": this.langs.Feats.PowerMirrors = item.ShortDescription2; break;
                            case "powerseat": this.langs.Feats.PowerSeats = item.ShortDescription2; break;
                            case "powersteer": this.langs.Feats.PowerSteering = item.ShortDescription2; break;
                            case "powerwin": this.langs.Feats.PowerWindows = item.ShortDescription2; break;
                            case "remotestrt": this.langs.Feats.RemoteStart = item.ShortDescription2; break;
                            case "security": this.langs.Feats.SecuritySystem = item.ShortDescription2; break;
                            case "sideair": this.langs.Feats.SideAirbag = item.ShortDescription2; break;
                            case "spoiler": this.langs.Feats.Spoiler = item.ShortDescription2; break;
                            case "tintwind": this.langs.Feats.TintedWindows = item.ShortDescription2; break;
                            case "towbar": this.langs.Feats.TowBar = item.ShortDescription2; break;
                            case "tripcomputer": this.langs.Feats.TripComputer = item.ShortDescription2; break;
                            case "warrenty": this.langs.Feats.Warrenty = item.ShortDescription2; break;
                            case "audioremote": this.langs.Feats.AudioRemoteControl = item.ShortDescription2; break;
                            case "engineimm": this.langs.Feats.EngineImmobiliser = item.ShortDescription2; break;
                            case "heatdoormir": this.langs.Feats.HeatedDoorMirrors = item.ShortDescription2; break;
                        }
                }
            });
        }, resError => this.errorMsg = resError);
    }

    PushLangItems() {
        this.langItems = new Array<LangItem>();

        this.langItems.push(Lib.SetLangItem(this.langItem, "cmn_detail"));
        this.langItems.push(Lib.SetLangItem(this.langItem, "car_comp_basic"));
        this.langItems.push(Lib.SetLangItem(this.langItem, "car_comp_mech"));
        this.langItems.push(Lib.SetLangItem(this.langItem, "car_comp_extint"));
        this.langItems.push(Lib.SetLangItem(this.langItem, "car_comp_feats"));
        this.langItems.push(Lib.SetLangItem(this.langItem, "car_comp_null"));

        this.langItems.push(Lib.SetLangItem(this.langItem, "cmn_price_opt"));

        this.langItems.push(Lib.SetLangItem(this.langItem, "src_make"));
        this.langItems.push(Lib.SetLangItem(this.langItem, "src_model"));
        this.langItems.push(Lib.SetLangItem(this.langItem, "src_status"));
        this.langItems.push(Lib.SetLangItem(this.langItem, "src_year"));
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

        this.langItems.push(Lib.SetLangItem(this.langItem, "src_bodytype"));
        this.langItems.push(Lib.SetLangItem(this.langItem, "src_trimstyle"));
        this.langItems.push(Lib.SetLangItem(this.langItem, "src_drivetype"));
        this.langItems.push(Lib.SetLangItem(this.langItem, "src_tires"));
        this.langItems.push(Lib.SetLangItem(this.langItem, "src_doors"));
        this.langItems.push(Lib.SetLangItem(this.langItem, "src_seats"));
        this.langItems.push(Lib.SetLangItem(this.langItem, "src_extcolor"));
        this.langItems.push(Lib.SetLangItem(this.langItem, "src_intcolor"));

        this.langItems.push(Lib.SetLangItem(this.langItem, "src_feats"));
        this.langItems.push(Lib.SetLangItem(this.langItem, "src_feats", "abs"));
        this.langItems.push(Lib.SetLangItem(this.langItem, "src_feats", "airbag"));
        this.langItems.push(Lib.SetLangItem(this.langItem, "src_feats", "aircon"));
        this.langItems.push(Lib.SetLangItem(this.langItem, "src_feats", "alloytire"));
        this.langItems.push(Lib.SetLangItem(this.langItem, "src_feats", "antitheft"));
        this.langItems.push(Lib.SetLangItem(this.langItem, "src_feats", "cdplayer"));
        this.langItems.push(Lib.SetLangItem(this.langItem, "src_feats", "centrlock"));
        this.langItems.push(Lib.SetLangItem(this.langItem, "src_feats", "coolseat"));
        this.langItems.push(Lib.SetLangItem(this.langItem, "src_feats", "foglamp"));
        this.langItems.push(Lib.SetLangItem(this.langItem, "src_feats", "foldseat"));
        this.langItems.push(Lib.SetLangItem(this.langItem, "src_feats", "gps"));
        this.langItems.push(Lib.SetLangItem(this.langItem, "src_feats", "heatseat"));
        this.langItems.push(Lib.SetLangItem(this.langItem, "src_feats", "headlghtcvr"));
        this.langItems.push(Lib.SetLangItem(this.langItem, "src_feats", "keylsentry"));
        this.langItems.push(Lib.SetLangItem(this.langItem, "src_feats", "leathseat"));
        this.langItems.push(Lib.SetLangItem(this.langItem, "src_feats", "leathtrim"));
        this.langItems.push(Lib.SetLangItem(this.langItem, "src_feats", "lpg"));
        this.langItems.push(Lib.SetLangItem(this.langItem, "src_feats", "passairbag"));
        this.langItems.push(Lib.SetLangItem(this.langItem, "src_feats", "powerglass"));
        this.langItems.push(Lib.SetLangItem(this.langItem, "src_feats", "powermirr"));
        this.langItems.push(Lib.SetLangItem(this.langItem, "src_feats", "powerseat"));
        this.langItems.push(Lib.SetLangItem(this.langItem, "src_feats", "powersteer"));
        this.langItems.push(Lib.SetLangItem(this.langItem, "src_feats", "powerwin"));
        this.langItems.push(Lib.SetLangItem(this.langItem, "src_feats", "remotestrt"));
        this.langItems.push(Lib.SetLangItem(this.langItem, "src_feats", "security"));
        this.langItems.push(Lib.SetLangItem(this.langItem, "src_feats", "sideair"));
        this.langItems.push(Lib.SetLangItem(this.langItem, "src_feats", "spoiler"));
        this.langItems.push(Lib.SetLangItem(this.langItem, "src_feats", "tintwind"));
        this.langItems.push(Lib.SetLangItem(this.langItem, "src_feats", "towbar"));
        this.langItems.push(Lib.SetLangItem(this.langItem, "src_feats", "tripcomputer"));
        this.langItems.push(Lib.SetLangItem(this.langItem, "src_feats", "warrenty"));
        this.langItems.push(Lib.SetLangItem(this.langItem, "src_feats", "audioremote"));
        this.langItems.push(Lib.SetLangItem(this.langItem, "src_feats", "engineimm"));
        this.langItems.push(Lib.SetLangItem(this.langItem, "src_feats", "heatdoormir"));
    }
}
