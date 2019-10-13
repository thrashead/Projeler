import { Component } from "@angular/core";
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { SiteService } from '../../../services/site';
import { Lib } from '../../../lib/methods';
import { LangItem } from '../../../models/LangItem';
import { BookSearchFilters } from '../../../models/booksearchfilters';

@Component({
    templateUrl: './features.html'
})

export class CarsBookFeaturesComponent {
    errorMsg: string;

    bookForm: FormGroup;
    searchFilters: BookSearchFilters;

    constructor(private service: SiteService, private formBuilder: FormBuilder, private router: Router) {
    }

    ngOnInit() {
        this.SetLangContents();

        this.bookForm = this.formBuilder.group({
            ABS: new FormControl(null),
            Airbag: new FormControl(null),
            AirConditioning: new FormControl(null),
            AlloyTires: new FormControl(null),
            AntiTheft: new FormControl(null),
            CDPlayer: new FormControl(null),
            CentralLocking: new FormControl(null),
            CooledSeats: new FormControl(null),
            FogLamps: new FormControl(null),
            FoldingSeats: new FormControl(null),
            GPS: new FormControl(null),
            HeatedSeats: new FormControl(null),
            HeadlightCovers: new FormControl(null),
            KeylessEntry: new FormControl(null),
            LeatherSeats: new FormControl(null),
            LeatherTrim: new FormControl(null),
            LPG: new FormControl(null),
            PassengerAirbag: new FormControl(null),
            PowerGlass: new FormControl(null),
            PowerMirrors: new FormControl(null),
            PowerSeats: new FormControl(null),
            PowerSteering: new FormControl(null),
            PowerWindows: new FormControl(null),
            RemoteStart: new FormControl(null),
            SecuritySystem: new FormControl(null),
            SideAirbag: new FormControl(null),
            Spoiler: new FormControl(null),
            TintedWindows: new FormControl(null),
            TowBar: new FormControl(null),
            TripComputer: new FormControl(null),
            Warrenty: new FormControl(null),
            AudioRemoteControl: new FormControl(null),
            EngineImmobiliser: new FormControl(null),
            HeatedDoorMirrors: new FormControl(null),
        });
    }

    onClick() {
        this.searchFilters = {} as BookSearchFilters;

        this.searchFilters.ABS = this.bookForm.get("ABS").value;
        this.searchFilters.Airbag = this.bookForm.get("Airbag").value;
        this.searchFilters.AirConditioning = this.bookForm.get("AirConditioning").value;
        this.searchFilters.AlloyTires = this.bookForm.get("AlloyTires").value;
        this.searchFilters.AntiTheft = this.bookForm.get("AntiTheft").value;
        this.searchFilters.CDPlayer = this.bookForm.get("CDPlayer").value;
        this.searchFilters.CentralLocking = this.bookForm.get("CentralLocking").value;
        this.searchFilters.CooledSeats = this.bookForm.get("CooledSeats").value;
        this.searchFilters.FogLamps = this.bookForm.get("FogLamps").value;
        this.searchFilters.FoldingSeats = this.bookForm.get("FoldingSeats").value;
        this.searchFilters.GPS = this.bookForm.get("GPS").value;
        this.searchFilters.HeatedSeats = this.bookForm.get("HeatedSeats").value;
        this.searchFilters.HeadlightCovers = this.bookForm.get("HeadlightCovers").value;
        this.searchFilters.KeylessEntry = this.bookForm.get("KeylessEntry").value;
        this.searchFilters.LeatherSeats = this.bookForm.get("LeatherSeats").value;
        this.searchFilters.LeatherTrim = this.bookForm.get("LeatherTrim").value;
        this.searchFilters.LPG = this.bookForm.get("LPG").value;
        this.searchFilters.PassengerAirbag = this.bookForm.get("PassengerAirbag").value;
        this.searchFilters.PowerGlass = this.bookForm.get("PowerGlass").value;
        this.searchFilters.PowerMirrors = this.bookForm.get("PowerMirrors").value;
        this.searchFilters.PowerSeats = this.bookForm.get("PowerSeats").value;
        this.searchFilters.PowerSteering = this.bookForm.get("PowerSteering").value;
        this.searchFilters.PowerWindows = this.bookForm.get("PowerWindows").value;
        this.searchFilters.RemoteStart = this.bookForm.get("RemoteStart").value;
        this.searchFilters.SecuritySystem = this.bookForm.get("SecuritySystem").value;
        this.searchFilters.SideAirbag = this.bookForm.get("SideAirbag").value;
        this.searchFilters.Spoiler = this.bookForm.get("Spoiler").value;
        this.searchFilters.TintedWindows = this.bookForm.get("TintedWindows").value;
        this.searchFilters.TowBar = this.bookForm.get("TowBar").value;
        this.searchFilters.TripComputer = this.bookForm.get("TripComputer").value;
        this.searchFilters.Warrenty = this.bookForm.get("Warrenty").value;
        this.searchFilters.AudioRemoteControl = this.bookForm.get("AudioRemoteControl").value;
        this.searchFilters.EngineImmobiliser = this.bookForm.get("EngineImmobiliser").value;
        this.searchFilters.HeatedDoorMirrors = this.bookForm.get("HeatedDoorMirrors").value;

        this.SetSearchFilters();
    }

    //SetSearchFilters
    SetSearchFilters() {
        this.service.get("Site", "GetBookSearchFilters", this.searchFilters).subscribe((resData: any) => {
            if (resData != null) {
                this.searchFilters.StartDate = resData.StartDate;
                this.searchFilters.EndDate = resData.EndDate;
                this.searchFilters.MakeCode = resData.MakeCode;
                this.searchFilters.ModelCode = resData.ModelCode;
                this.searchFilters.CarStatusCode = resData.CarStatusCode;
                this.searchFilters.FuelTypeCode = resData.FuelTypeCode;
                this.searchFilters.PriceMin = resData.PriceMin;
                this.searchFilters.PriceMax = resData.PriceMax;
                this.searchFilters.YearMin = resData.YearMin;
                this.searchFilters.YearMax = resData.YearMax;
                this.searchFilters.BodyTypeCode = resData.BodyTypeCode;
                this.searchFilters.DriveTypeCode = resData.DriveTypeCode;
                this.searchFilters.GearTypeCode = resData.GearTypeCode;
                this.searchFilters.EngineTypeCode = resData.EngineTypeCode;
                this.searchFilters.EngineCapacity = resData.EngineCapacity;
                this.searchFilters.GearCount = resData.GearCount;
                this.searchFilters.Cylinders = resData.Cylinders;
                this.searchFilters.Mileage = resData.Mileage;
                this.searchFilters.Seats = resData.Seats;
                this.searchFilters.Doors = resData.Doors;
                this.searchFilters.ExteriorColor = resData.ExteriorColor;
                this.searchFilters.InteriorColor = resData.InteriorColor;
            }

            this.service.post("Site", "SetBookSearchFilters", this.searchFilters).subscribe((resData: any) => {
                this.searchFilters = resData;

                this.router.navigate(['/Cars/Book/Cars']);
            }, resError => this.errorMsg = resError);
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
            this.langs.feats = new Object();

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

                    case "src_feats":
                        switch (item.ShortCode) {
                            case null: this.langs.feats.feats = item.ShortDescription2; break;
                            case "abs": this.langs.feats.ABS = item.ShortDescription2; break;
                            case "airbag": this.langs.feats.Airbag = item.ShortDescription2; break;
                            case "aircon": this.langs.feats.AirConditioning = item.ShortDescription2; break;
                            case "alloytire": this.langs.feats.AlloyTires = item.ShortDescription2; break;
                            case "antitheft": this.langs.feats.AntiTheft = item.ShortDescription2; break;
                            case "cdplayer": this.langs.feats.CDPlayer = item.ShortDescription2; break;
                            case "centrlock": this.langs.feats.CentralLocking = item.ShortDescription2; break;
                            case "coolseat": this.langs.feats.CooledSeats = item.ShortDescription2; break;
                            case "foglamp": this.langs.feats.FogLamps = item.ShortDescription2; break;
                            case "foldseat": this.langs.feats.FoldingSeats = item.ShortDescription2; break;
                            case "gps": this.langs.feats.GPS = item.ShortDescription2; break;
                            case "heatseat": this.langs.feats.HeatedSeats = item.ShortDescription2; break;
                            case "headlghtcvr": this.langs.feats.HeadlightCovers = item.ShortDescription2; break;
                            case "keylsentry": this.langs.feats.KeylessEntry = item.ShortDescription2; break;
                            case "leathseat": this.langs.feats.LeatherSeats = item.ShortDescription2; break;
                            case "leathtrim": this.langs.feats.LeatherTrim = item.ShortDescription2; break;
                            case "lpg": this.langs.feats.LPG = item.ShortDescription2; break;
                            case "passairbag": this.langs.feats.PassengerAirbag = item.ShortDescription2; break;
                            case "powerglass": this.langs.feats.PowerGlass = item.ShortDescription2; break;
                            case "powermirr": this.langs.feats.PowerMirrors = item.ShortDescription2; break;
                            case "powerseat": this.langs.feats.PowerSeats = item.ShortDescription2; break;
                            case "powersteer": this.langs.feats.PowerSteering = item.ShortDescription2; break;
                            case "powerwin": this.langs.feats.PowerWindows = item.ShortDescription2; break;
                            case "remotestrt": this.langs.feats.RemoteStart = item.ShortDescription2; break;
                            case "security": this.langs.feats.SecuritySystem = item.ShortDescription2; break;
                            case "sideair": this.langs.feats.SideAirbag = item.ShortDescription2; break;
                            case "spoiler": this.langs.feats.Spoiler = item.ShortDescription2; break;
                            case "tintwind": this.langs.feats.TintedWindows = item.ShortDescription2; break;
                            case "towbar": this.langs.feats.TowBar = item.ShortDescription2; break;
                            case "tripcomputer": this.langs.feats.TripComputer = item.ShortDescription2; break;
                            case "warrenty": this.langs.feats.Warrenty = item.ShortDescription2; break;
                            case "audioremote": this.langs.feats.AudioRemoteControl = item.ShortDescription2; break;
                            case "engineimm": this.langs.feats.EngineImmobiliser = item.ShortDescription2; break;
                            case "heatdoormir": this.langs.feats.HeatedDoorMirrors = item.ShortDescription2; break;
                        }
                }
            });
        }, resError => this.errorMsg = resError);
    }

    PushLangItems() {
        this.langItems = new Array<LangItem>();

        this.langItems.push(Lib.SetLangItem(this.langItem, "car_book"));
        this.langItems.push(Lib.SetLangItem(this.langItem, "src_feats"));
    }
}