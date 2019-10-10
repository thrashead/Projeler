import { Component } from "@angular/core";
import { SiteService } from '../../../services/site';
import { LangItem } from '../../../models/LangItem';
import { Lib } from '../../../lib/methods';

@Component({
    templateUrl: './features.html'
})

export class CarsBookFeaturesComponent {
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