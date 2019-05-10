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
var app_component_1 = require("./app.component");
var ng2_bs3_modal_1 = require("ng2-bs3-modal/ng2-bs3-modal");
var http_1 = require("@angular/http");
var app_routing_1 = require("./app.routing");
//controls/
var banner_component_1 = require("./controls/banner.component");
var footer_component_1 = require("./controls/footer.component");
var header_component_1 = require("./controls/header.component");
//controls///left
var aramasol_component_1 = require("./controls/left/aramasol.component");
var gununemlagi_component_1 = require("./controls/left/gununemlagi.component");
var haberlersol_component_1 = require("./controls/left/haberlersol.component");
var kategorimenu_component_1 = require("./controls/left/kategorimenu.component");
var sayfagetir_component_1 = require("./controls/left/sayfagetir.component");
var yeniilansol_component_1 = require("./controls/left/yeniilansol.component");
//giris
var giris_component_1 = require("./giris/giris.component");
//giris//controls
var mpabout_component_1 = require("./giris/controls/mpabout.component");
var mpnewprops_component_1 = require("./giris/controls/mpnewprops.component");
var mpnews_component_1 = require("./giris/controls/mpnews.component");
var mpshowroom_component_1 = require("./giris/controls/mpshowroom.component");
var slider_component_1 = require("./giris/controls/slider.component");
//emlak
var emlakdetay_component_1 = require("./emlak/emlakdetay.component");
var emlaklistele_component_1 = require("./emlak/emlaklistele.component");
var emlakdetayliara_component_1 = require("./emlak/emlakdetayliara.component");
//icerik
var icerik_component_1 = require("./icerik/icerik.component");
var haberler_component_1 = require("./icerik/haberler.component");
var iletisim_component_1 = require("./icerik/iletisim.component");
var AppModule = /** @class */ (function () {
    function AppModule() {
    }
    AppModule = __decorate([
        core_1.NgModule({
            imports: [platform_browser_1.BrowserModule, forms_1.ReactiveFormsModule, http_1.HttpModule, app_routing_1.routing, ng2_bs3_modal_1.Ng2Bs3ModalModule],
            declarations: [app_component_1.AppComponent,
                giris_component_1.GirisComponent,
                banner_component_1.BannerComponent,
                footer_component_1.FooterComponent,
                header_component_1.HeaderComponent,
                aramasol_component_1.AramaSolComponent,
                gununemlagi_component_1.GununEmlagiComponent,
                haberlersol_component_1.HaberlerSolComponent,
                kategorimenu_component_1.KategoriMenuComponent,
                sayfagetir_component_1.SayfaGetirComponent,
                yeniilansol_component_1.YeniIlanSolComponent,
                mpabout_component_1.MPAboutComponent,
                mpnewprops_component_1.MPNewPropsComponent,
                mpnews_component_1.MPNewsComponent,
                mpshowroom_component_1.MPShowroomComponent,
                slider_component_1.SliderComponent,
                emlakdetay_component_1.EmlakDetayComponent,
                emlaklistele_component_1.EmlakListeleComponent,
                emlakdetayliara_component_1.EmlakDetayliAraComponent,
                icerik_component_1.IcerikComponent,
                haberler_component_1.HaberlerComponent,
                iletisim_component_1.IletisimComponent
            ],
            //'/Emlak/' -> '/' Bu şekilde değişecek
            providers: [{ provide: common_1.APP_BASE_HREF, useValue: '/Emlak/' }],
            bootstrap: [app_component_1.AppComponent]
        })
    ], AppModule);
    return AppModule;
}());
exports.AppModule = AppModule;
//# sourceMappingURL=app.module.js.map