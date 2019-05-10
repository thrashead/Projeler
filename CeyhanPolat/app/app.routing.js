"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var router_1 = require("@angular/router");
var giris_component_1 = require("./giris/giris.component");
var biyografi_component_1 = require("./biyografi/biyografi.component");
var galeri_component_1 = require("./galeri/galeri.component");
var siirleri_component_1 = require("./siirleri/siirleri.component");
var siir_component_1 = require("./siir/siir.component");
var appRoutes = [
    { path: '', redirectTo: 'Giris', pathMatch: 'full' },
    { path: 'Giris', component: giris_component_1.GirisComponent },
    { path: 'Biyografi', component: biyografi_component_1.BiyografiComponent },
    { path: 'Galeri', component: galeri_component_1.GaleriComponent },
    { path: 'Siirleri', component: siirleri_component_1.SiirleriComponent },
    { path: 'Siirleri/:link', component: siir_component_1.SiirComponent },
    { path: '**', component: giris_component_1.GirisComponent }
];
exports.routing = router_1.RouterModule.forRoot(appRoutes);
//# sourceMappingURL=app.routing.js.map