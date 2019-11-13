import { Component } from "@angular/core";
import { SiteService } from '../../../services/site';
import { LangItem } from '../../../models/LangItem';
import { Lib } from '../../../lib/methods';

@Component({
    templateUrl: './index.html'
})

export class CarsCompareComponent {
    errorMsg: string;

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
    itemsLangs: any;

    //LangContent
    SetLangContents() {
        this.PushLangItems();

        this.service.post("Site", "SetLangContents", this.langItems).subscribe((resData: any) => {
            this.headerLangs = new Object();
            this.breadcumbsLangs = new Object();
            this.breadcumbsLangs.menu = new Object();
            this.itemsLangs = new Object();
            this.itemsLangs.Basic = new Object();
            this.itemsLangs.Mech = new Object();
            this.itemsLangs.ExtInt = new Object();
            this.itemsLangs.Feats = new Object();

            resData.forEach((item, i) => {
                switch (item.Code) {
                    //Header
                    case "car_comp_head": this.headerLangs.header = item; break;

                    //BreadCumbs
                    case "menu":
                        switch (item.ShortCode) {
                            case "home": this.breadcumbsLangs.menu.home = item.ShortDescription2; break;
                            case "compr": this.breadcumbsLangs.menu.compare = item.ShortDescription2; break;
                        }
                        break;

                    //Item
                    case "cmn_detail": this.itemsLangs.detail = item.ShortDescription; break;
                    case "car_comp_basic": this.itemsLangs.Basic.title = item.ShortDescription; break;
                    case "car_comp_mech": this.itemsLangs.Mech.title = item.ShortDescription; break;
                    case "car_comp_extint": this.itemsLangs.ExtInt.title = item.ShortDescription; break;
                    case "car_comp_feats": this.itemsLangs.Feats.title = item.ShortDescription; break;
                    case "car_comp_null": this.itemsLangs.null = item.ShortDescription; break;

                    case "cmn_price_opt": this.itemsLangs.DayPrice = item.ShortDescription; break;

                    case "src_make": this.itemsLangs.Basic.make = item.ShortDescription; break;
                    case "src_model": this.itemsLangs.Basic.model = item.ShortDescription; break;
                    case "src_status": this.itemsLangs.Basic.status = item.ShortDescription; break;
                    case "src_year": this.itemsLangs.Basic.year = item.ShortDescription2; break;
                    case "src_width": this.itemsLangs.Basic.width = item.ShortDescription2; break;
                    case "src_height": this.itemsLangs.Basic.height = item.ShortDescription2; break;
                    case "src_length": this.itemsLangs.Basic.length = item.ShortDescription2; break;
                    case "src_km": this.itemsLangs.Basic.mileage = item.ShortDescription2; break;
                    case "src_wheelbase": this.itemsLangs.Basic.wheelbase = item.ShortDescription2; break;
                    case "src_cargocapacity": this.itemsLangs.Basic.cargocapacity = item.ShortDescription2; break;

                    case "src_engine": this.itemsLangs.Mech.enginetype = item.ShortDescription2; break;
                    case "src_enginecapacity": this.itemsLangs.Mech.enginecapacity = item.ShortDescription2; break;
                    case "src_cylinders": this.itemsLangs.Mech.cylinders = item.ShortDescription2; break;
                    case "src_fueltype": this.itemsLangs.Mech.fueltype = item.ShortDescription; break;
                    case "src_fuelcapacity": this.itemsLangs.Mech.fuelcapacity = item.ShortDescription2; break;
                    case "src_cityfuel": this.itemsLangs.Mech.cityfuel = item.ShortDescription2; break;
                    case "src_highfuel": this.itemsLangs.Mech.highfuel = item.ShortDescription2; break;
                    case "src_horsepower": this.itemsLangs.Mech.horsepower = item.ShortDescription2; break;
                    case "src_drivetrain": this.itemsLangs.Mech.drivetrain = item.ShortDescription2; break;
                    case "src_gear": this.itemsLangs.Mech.gear = item.ShortDescription2; break;

                    case "src_bodytype": this.itemsLangs.ExtInt.bodytype = item.ShortDescription; break;
                    case "src_trimstyle": this.itemsLangs.ExtInt.trimstyle = item.ShortDescription2; break;
                    case "src_drivetype": this.itemsLangs.ExtInt.drivetype = item.ShortDescription2; break;
                    case "src_tires": this.itemsLangs.ExtInt.tires = item.ShortDescription2; break;
                    case "src_doors": this.itemsLangs.ExtInt.doors = item.ShortDescription2; break;
                    case "src_seats": this.itemsLangs.ExtInt.seats = item.ShortDescription2; break;
                    case "src_extcolor": this.itemsLangs.ExtInt.extcolor = item.ShortDescription2; break;
                    case "src_intcolor": this.itemsLangs.ExtInt.intcolor = item.ShortDescription2; break;

                    case "src_feats":
                        switch (item.ShortCode) {
                            case null: this.itemsLangs.Feats.feats = item.ShortDescription2; break;
                            case "abs": this.itemsLangs.Feats.ABS = item.ShortDescription2; break;
                            case "airbag": this.itemsLangs.Feats.Airbag = item.ShortDescription2; break;
                            case "aircon": this.itemsLangs.Feats.AirConditioning = item.ShortDescription2; break;
                            case "alloytire": this.itemsLangs.Feats.AlloyTires = item.ShortDescription2; break;
                            case "antitheft": this.itemsLangs.Feats.AntiTheft = item.ShortDescription2; break;
                            case "cdplayer": this.itemsLangs.Feats.CDPlayer = item.ShortDescription2; break;
                            case "centrlock": this.itemsLangs.Feats.CentralLocking = item.ShortDescription2; break;
                            case "coolseat": this.itemsLangs.Feats.CooledSeats = item.ShortDescription2; break;
                            case "foglamp": this.itemsLangs.Feats.FogLamps = item.ShortDescription2; break;
                            case "foldseat": this.itemsLangs.Feats.FoldingSeats = item.ShortDescription2; break;
                            case "gps": this.itemsLangs.Feats.GPS = item.ShortDescription2; break;
                            case "heatseat": this.itemsLangs.Feats.HeatedSeats = item.ShortDescription2; break;
                            case "headlghtcvr": this.itemsLangs.Feats.HeadlightCovers = item.ShortDescription2; break;
                            case "keylsentry": this.itemsLangs.Feats.KeylessEntry = item.ShortDescription2; break;
                            case "leathseat": this.itemsLangs.Feats.LeatherSeats = item.ShortDescription2; break;
                            case "leathtrim": this.itemsLangs.Feats.LeatherTrim = item.ShortDescription2; break;
                            case "lpg": this.itemsLangs.Feats.LPG = item.ShortDescription2; break;
                            case "passairbag": this.itemsLangs.Feats.PassengerAirbag = item.ShortDescription2; break;
                            case "powerglass": this.itemsLangs.Feats.PowerGlass = item.ShortDescription2; break;
                            case "powermirr": this.itemsLangs.Feats.PowerMirrors = item.ShortDescription2; break;
                            case "powerseat": this.itemsLangs.Feats.PowerSeats = item.ShortDescription2; break;
                            case "powersteer": this.itemsLangs.Feats.PowerSteering = item.ShortDescription2; break;
                            case "powerwin": this.itemsLangs.Feats.PowerWindows = item.ShortDescription2; break;
                            case "remotestrt": this.itemsLangs.Feats.RemoteStart = item.ShortDescription2; break;
                            case "security": this.itemsLangs.Feats.SecuritySystem = item.ShortDescription2; break;
                            case "sideair": this.itemsLangs.Feats.SideAirbag = item.ShortDescription2; break;
                            case "spoiler": this.itemsLangs.Feats.Spoiler = item.ShortDescription2; break;
                            case "tintwind": this.itemsLangs.Feats.TintedWindows = item.ShortDescription2; break;
                            case "towbar": this.itemsLangs.Feats.TowBar = item.ShortDescription2; break;
                            case "tripcomputer": this.itemsLangs.Feats.TripComputer = item.ShortDescription2; break;
                            case "warrenty": this.itemsLangs.Feats.Warrenty = item.ShortDescription2; break;
                            case "audioremote": this.itemsLangs.Feats.AudioRemoteControl = item.ShortDescription2; break;
                            case "engineimm": this.itemsLangs.Feats.EngineImmobiliser = item.ShortDescription2; break;
                            case "heatdoormir": this.itemsLangs.Feats.HeatedDoorMirrors = item.ShortDescription2; break;
                        }
                }
            });

        }, resError => this.errorMsg = resError);
    }

    PushLangItems() {
        this.langItems = new Array<LangItem>();

        //Header
        this.langItems.push(Lib.SetLangItem(this.langItem, "car_comp_head"));

        //BreadCumbs
        this.langItems.push(Lib.SetLangItem(this.langItem, "menu", "home"));
        this.langItems.push(Lib.SetLangItem(this.langItem, "menu", "compr"));

        //Item
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