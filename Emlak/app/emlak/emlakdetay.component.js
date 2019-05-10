"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var emlak_service_1 = require("../emlak.service");
var re_service_1 = require("../re.service");
var router_1 = require("@angular/router");
var EmlakDetayComponent = /** @class */ (function () {
    function EmlakDetayComponent(_emlakService, _reService, route) {
        this._emlakService = _emlakService;
        this._reService = _reService;
        this.route = route;
    }
    EmlakDetayComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.route.params.subscribe(function (params) {
            _this.link = params['link'];
            _this._reService.getEmlakDetay(_this.link)
                .subscribe(function (resData) {
                _this.emlak = resData;
                $("#slider").html("");
                for (var i = 0; i < resData.Pictures.length; i++) {
                    $("#slider").append("<img src=\"Uploads\/Gallery\/" + resData.Pictures[i] + "\" data-tab=\"" + resData.Baslik + "\" />");
                }
                $("#slider").tdSlider({
                    autostart: false,
                    slideonclick: true,
                    imagestretch: true,
                    width: 340,
                    height: 255,
                    direction: "LTR",
                    duration: 1000,
                    effect: "slide",
                    showbuttons: true,
                    buttonstyle: "thumb",
                    thumbheight: 65,
                    thumbwidth: 90,
                    tabeffect: "fade",
                    border: 0
                });
            }, function (resError) { return _this.errorMsg = resError; });
            _this.KodlaGetir();
        });
    };
    EmlakDetayComponent.prototype.KodlaGetir = function () {
        var _this = this;
        this._emlakService.getKodlaGetir("dtys")
            .subscribe(function (resData) { return _this.satilikText = resData; }, function (resError) { return _this.errorMsg = resError; });
        this._emlakService.getKodlaGetir("dtyk")
            .subscribe(function (resData) { return _this.kiralikText = resData; }, function (resError) { return _this.errorMsg = resError; });
        this._emlakService.getKodlaGetir("code")
            .subscribe(function (resData) { return _this.kodText = resData; }, function (resError) { return _this.errorMsg = resError; });
        this._emlakService.getKodlaGetir("ownr")
            .subscribe(function (resData) { return _this.sahipText = resData; }, function (resError) { return _this.errorMsg = resError; });
        this._emlakService.getKodlaGetir("pric")
            .subscribe(function (resData) { return _this.fiyatText = resData; }, function (resError) { return _this.errorMsg = resError; });
        this._emlakService.getKodlaGetir("romc")
            .subscribe(function (resData) { return _this.odasayisiText = resData; }, function (resError) { return _this.errorMsg = resError; });
        this._emlakService.getKodlaGetir("drmc")
            .subscribe(function (resData) { return _this.salonSayisiText = resData; }, function (resError) { return _this.errorMsg = resError; });
        this._emlakService.getKodlaGetir("area")
            .subscribe(function (resData) { return _this.alanText = resData; }, function (resError) { return _this.errorMsg = resError; });
        this._emlakService.getKodlaGetir("flrc")
            .subscribe(function (resData) { return _this.katSayisiText = resData; }, function (resError) { return _this.errorMsg = resError; });
        this._emlakService.getKodlaGetir("flrn")
            .subscribe(function (resData) { return _this.bulunduguKatText = resData; }, function (resError) { return _this.errorMsg = resError; });
        this._emlakService.getKodlaGetir("stts")
            .subscribe(function (resData) { return _this.durumText = resData; }, function (resError) { return _this.errorMsg = resError; });
        this._emlakService.getKodlaGetir("wtyp")
            .subscribe(function (resData) { return _this.isinmaTipiText = resData; }, function (resError) { return _this.errorMsg = resError; });
        this._emlakService.getKodlaGetir("ftyp")
            .subscribe(function (resData) { return _this.yakitTipiText = resData; }, function (resError) { return _this.errorMsg = resError; });
        this._emlakService.getKodlaGetir("bage")
            .subscribe(function (resData) { return _this.binaYasiText = resData; }, function (resError) { return _this.errorMsg = resError; });
        this._emlakService.getKodlaGetir("arkc")
            .subscribe(function (resData) { return _this.arkaCepheText = resData; }, function (resError) { return _this.errorMsg = resError; });
        this._emlakService.getKodlaGetir("otoy")
            .subscribe(function (resData) { return _this.otobanText = resData; }, function (resError) { return _this.errorMsg = resError; });
        this._emlakService.getKodlaGetir("guve")
            .subscribe(function (resData) { return _this.guvenlikText = resData; }, function (resError) { return _this.errorMsg = resError; });
        this._emlakService.getKodlaGetir("deny")
            .subscribe(function (resData) { return _this.denizeYakinText = resData; }, function (resError) { return _this.errorMsg = resError; });
        this._emlakService.getKodlaGetir("dens")
            .subscribe(function (resData) { return _this.denizeSifirText = resData; }, function (resError) { return _this.errorMsg = resError; });
        this._emlakService.getKodlaGetir("kapi")
            .subscribe(function (resData) { return _this.kapiciText = resData; }, function (resError) { return _this.errorMsg = resError; });
        this._emlakService.getKodlaGetir("oyup")
            .subscribe(function (resData) { return _this.oyunParkiText = resData; }, function (resError) { return _this.errorMsg = resError; });
        this._emlakService.getKodlaGetir("yanm")
            .subscribe(function (resData) { return _this.yanginMerdiveniText = resData; }, function (resError) { return _this.errorMsg = resError; });
        this._emlakService.getKodlaGetir("balk")
            .subscribe(function (resData) { return _this.balkonText = resData; }, function (resError) { return _this.errorMsg = resError; });
        this._emlakService.getKodlaGetir("jaku")
            .subscribe(function (resData) { return _this.jakuziText = resData; }, function (resError) { return _this.errorMsg = resError; });
        this._emlakService.getKodlaGetir("once")
            .subscribe(function (resData) { return _this.onCepheText = resData; }, function (resError) { return _this.errorMsg = resError; });
        this._emlakService.getKodlaGetir("manz")
            .subscribe(function (resData) { return _this.manzaraText = resData; }, function (resError) { return _this.errorMsg = resError; });
        this._emlakService.getKodlaGetir("touy")
            .subscribe(function (resData) { return _this.topluUlasimText = resData; }, function (resError) { return _this.errorMsg = resError; });
        this._emlakService.getKodlaGetir("hidr")
            .subscribe(function (resData) { return _this.hidroforText = resData; }, function (resError) { return _this.errorMsg = resError; });
        this._emlakService.getKodlaGetir("metr")
            .subscribe(function (resData) { return _this.metroText = resData; }, function (resError) { return _this.errorMsg = resError; });
        this._emlakService.getKodlaGetir("jene")
            .subscribe(function (resData) { return _this.jeneratorText = resData; }, function (resError) { return _this.errorMsg = resError; });
        this._emlakService.getKodlaGetir("pvcd")
            .subscribe(function (resData) { return _this.pVCDogramaText = resData; }, function (resError) { return _this.errorMsg = resError; });
        this._emlakService.getKodlaGetir("yuzh")
            .subscribe(function (resData) { return _this.yuzmeHavuzuText = resData; }, function (resError) { return _this.errorMsg = resError; });
        this._emlakService.getKodlaGetir("celk")
            .subscribe(function (resData) { return _this.celikKapiText = resData; }, function (resError) { return _this.errorMsg = resError; });
        this._emlakService.getKodlaGetir("katu")
            .subscribe(function (resData) { return _this.kabloTVUyduText = resData; }, function (resError) { return _this.errorMsg = resError; });
        this._emlakService.getKodlaGetir("cady")
            .subscribe(function (resData) { return _this.caddeyeYakinText = resData; }, function (resError) { return _this.errorMsg = resError; });
        this._emlakService.getKodlaGetir("merk")
            .subscribe(function (resData) { return _this.merkezdeText = resData; }, function (resError) { return _this.errorMsg = resError; });
        this._emlakService.getKodlaGetir("asan")
            .subscribe(function (resData) { return _this.asansorText = resData; }, function (resError) { return _this.errorMsg = resError; });
        this._emlakService.getKodlaGetir("mant")
            .subscribe(function (resData) { return _this.mantolamaText = resData; }, function (resError) { return _this.errorMsg = resError; });
        this._emlakService.getKodlaGetir("bahc")
            .subscribe(function (resData) { return _this.bahceText = resData; }, function (resError) { return _this.errorMsg = resError; });
        this._emlakService.getKodlaGetir("otop")
            .subscribe(function (resData) { return _this.otoparkText = resData; }, function (resError) { return _this.errorMsg = resError; });
        this._emlakService.getKodlaGetir("siti")
            .subscribe(function (resData) { return _this.siteIciText = resData; }, function (resError) { return _this.errorMsg = resError; });
        this._emlakService.getKodlaGetir("alar")
            .subscribe(function (resData) { return _this.alarmText = resData; }, function (resError) { return _this.errorMsg = resError; });
        this._emlakService.getKodlaGetir("gord")
            .subscribe(function (resData) { return _this.goruntuluDiafon = resData; }, function (resError) { return _this.errorMsg = resError; });
        this._emlakService.getKodlaGetir("klim")
            .subscribe(function (resData) { return _this.klimaText = resData; }, function (resError) { return _this.errorMsg = resError; });
    };
    EmlakDetayComponent = __decorate([
        core_1.Component({
            templateUrl: 'app/emlak/emlakdetay.component.html',
            providers: [emlak_service_1.EmlakService, re_service_1.REService]
        }),
        __metadata("design:paramtypes", [emlak_service_1.EmlakService, re_service_1.REService, router_1.ActivatedRoute])
    ], EmlakDetayComponent);
    return EmlakDetayComponent;
}());
exports.EmlakDetayComponent = EmlakDetayComponent;
//# sourceMappingURL=emlakdetay.component.js.map