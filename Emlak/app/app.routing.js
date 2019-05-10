"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var router_1 = require("@angular/router");
var giris_component_1 = require("./giris/giris.component");
var emlaklistele_component_1 = require("./emlak/emlaklistele.component");
var emlakdetay_component_1 = require("./emlak/emlakdetay.component");
var emlakdetayliara_component_1 = require("./emlak/emlakdetayliara.component");
var icerik_component_1 = require("./icerik/icerik.component");
var haberler_component_1 = require("./icerik/haberler.component");
var iletisim_component_1 = require("./icerik/iletisim.component");
var appRoutes = [
    { path: '', redirectTo: 'Giris', pathMatch: 'full' },
    { path: 'Giris', component: giris_component_1.GirisComponent },
    { path: 'Emlak', component: emlaklistele_component_1.EmlakListeleComponent },
    { path: 'Emlak/Listele', component: emlaklistele_component_1.EmlakListeleComponent },
    { path: 'Emlak/Listele/:link', component: emlaklistele_component_1.EmlakListeleComponent },
    { path: 'Emlak/Detay/:link', component: emlakdetay_component_1.EmlakDetayComponent },
    { path: 'Emlak/DetayliAra', component: emlakdetayliara_component_1.EmlakDetayliAraComponent },
    { path: 'Icerik/Haberler', component: haberler_component_1.HaberlerComponent },
    { path: 'Icerik/Haberler/:link', component: icerik_component_1.IcerikComponent },
    { path: 'Icerik/Iletisim', component: iletisim_component_1.IletisimComponent },
    { path: 'Icerik/:link', component: icerik_component_1.IcerikComponent },
    { path: '**', component: giris_component_1.GirisComponent }
];
exports.routing = router_1.RouterModule.forRoot(appRoutes);
//# sourceMappingURL=app.routing.js.map