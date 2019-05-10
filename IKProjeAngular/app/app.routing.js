"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var router_1 = require("@angular/router");
var giris_1 = require("./giris/giris");
var arama_1 = require("./is/arama");
var arama_sehir_1 = require("./is/arama.sehir");
var arama_isturu_1 = require("./is/arama.isturu");
var detay_1 = require("./is/detay");
var giris_2 = require("./aday/islem/giris");
var kayit_1 = require("./aday/islem/kayit");
var giris_3 = require("./sirket/islem/giris");
var kayit_2 = require("./sirket/islem/kayit");
var sifre_1 = require("./aday/islem/sifre");
var sifre_2 = require("./sirket/islem/sifre");
var appRoutes = [
    { path: '', redirectTo: 'Giris', pathMatch: 'full' },
    { path: 'Giris', component: giris_1.GirisComponent },
    //İş
    { path: 'Is/Ilan/IsTuru/:tip', component: arama_isturu_1.IsIsTuruComponent },
    { path: 'Is/Ilan/Sehir/:sehir', component: arama_sehir_1.IsSehirComponent },
    { path: 'Is/Ilan/Detay/:id', component: detay_1.IsDetayComponent },
    { path: 'Is/Ilan/Ara', component: arama_1.IsAramaComponent },
    { path: 'Is/Ilan', component: arama_1.IsAramaComponent },
    { path: 'Is', component: arama_1.IsAramaComponent },
    //Aday
    { path: 'Aday/Islem/Giris', component: giris_2.AdayIslemGirisComponent },
    { path: 'Aday/Islem/Kayit', component: kayit_1.AdayIslemKayitComponent },
    { path: 'Aday/Islem/Sifre', component: sifre_1.AdayIslemSifreComponent },
    //Sirket
    { path: 'Sirket/Islem/Giris', component: giris_3.SirketIslemGirisComponent },
    { path: 'Sirket/Islem/Kayit', component: kayit_2.SirketIslemKayitComponent },
    { path: 'Sirket/Islem/Sifre', component: sifre_2.SirketIslemSifreComponent },
    { path: '**', component: giris_1.GirisComponent }
];
exports.routing = router_1.RouterModule.forRoot(appRoutes);
//# sourceMappingURL=app.routing.js.map