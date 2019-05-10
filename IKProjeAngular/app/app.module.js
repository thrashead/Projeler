"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var common_1 = require("@angular/common");
var platform_browser_1 = require("@angular/platform-browser");
var forms_1 = require("@angular/forms");
var app_1 = require("./app");
var ng2_bs3_modal_1 = require("ng2-bs3-modal/ng2-bs3-modal");
var http_1 = require("@angular/http");
var app_routing_1 = require("./app.routing");
var ust_1 = require("./kontroller/ust");
var menu_1 = require("./kontroller/menu");
var ara_1 = require("./kontroller/ara");
var slogan_1 = require("./kontroller/slogan");
var alt_1 = require("./kontroller/alt");
var giris_1 = require("./giris/giris");
var sirketlogo_1 = require("./giris/kontroller/sirketlogo");
var sonbesis_1 = require("./giris/kontroller/sonbesis");
var basari_1 = require("./giris/kontroller/basari");
var acilisler_1 = require("./giris/kontroller/acilisler");
var anket_1 = require("./giris/kontroller/anket");
var isdurum_1 = require("./giris/kontroller/isdurum");
var sehirler_1 = require("./giris/kontroller/sehirler");
var arama_1 = require("./is/arama");
var arama_isturu_1 = require("./is/arama.isturu");
var arama_sehir_1 = require("./is/arama.sehir");
var detay_1 = require("./is/detay");
var giris_2 = require("./aday/islem/giris");
var kayit_1 = require("./aday/islem/kayit");
var sifre_1 = require("./aday/islem/sifre");
var giris_3 = require("./sirket/islem/giris");
var kayit_2 = require("./sirket/islem/kayit");
var sifre_2 = require("./sirket/islem/sifre");
var AppModule = /** @class */ (function () {
    function AppModule() {
    }
    AppModule = __decorate([
        core_1.NgModule({
            imports: [platform_browser_1.BrowserModule, forms_1.ReactiveFormsModule, http_1.HttpModule, app_routing_1.routing, ng2_bs3_modal_1.Ng2Bs3ModalModule],
            declarations: [
                app_1.AppComponent,
                ust_1.UstComponent,
                menu_1.MenuComponent,
                ara_1.AraComponent,
                slogan_1.SloganComponent,
                alt_1.AltComponent,
                giris_1.GirisComponent,
                sirketlogo_1.GirisSirketLogoComponent,
                sonbesis_1.GirisSonBesIsComponent,
                basari_1.GirisBasariComponent,
                acilisler_1.GirisAcilIslerComponent,
                anket_1.GirisAnketComponent,
                isdurum_1.GirisIsDurumComponent,
                sehirler_1.GirisSehirlerComponent,
                arama_1.IsAramaComponent,
                arama_isturu_1.IsIsTuruComponent,
                arama_sehir_1.IsSehirComponent,
                detay_1.IsDetayComponent,
                giris_2.AdayIslemGirisComponent,
                kayit_1.AdayIslemKayitComponent,
                sifre_1.AdayIslemSifreComponent,
                giris_3.SirketIslemGirisComponent,
                kayit_2.SirketIslemKayitComponent,
                sifre_2.SirketIslemSifreComponent
            ],
            //'/IKProjeAngular/' -> '/' Bu şekilde değişecek
            providers: [{ provide: common_1.APP_BASE_HREF, useValue: '/IKProjeAngular/' }],
            bootstrap: [app_1.AppComponent]
        })
    ], AppModule);
    return AppModule;
}());
exports.AppModule = AppModule;
//# sourceMappingURL=app.module.js.map