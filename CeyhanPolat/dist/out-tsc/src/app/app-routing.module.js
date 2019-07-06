import * as tslib_1 from "tslib";
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { GirisComponent } from './giris/giris';
import { BiyografiComponent } from './biyografi/biyografi';
import { GaleriComponent } from './galeri/galeri';
import { SiirleriComponent } from './siirleri/siirleri';
import { SiirComponent } from './siir/siir';
import { LayoutComponent } from './shared/layout';
const routes = [
    {
        path: '',
        component: LayoutComponent,
        children: [
            { path: '', component: GirisComponent, pathMatch: 'full' },
            { path: 'Giris', component: GirisComponent },
            { path: 'Biyografi', component: BiyografiComponent },
            { path: 'Galeri', component: GaleriComponent },
            { path: 'Siirleri', component: SiirleriComponent },
            { path: 'Siirleri/:link', component: SiirComponent },
        ]
    },
    { path: '**', redirectTo: '' }
];
let AppRoutingModule = class AppRoutingModule {
};
AppRoutingModule = tslib_1.__decorate([
    NgModule({
        imports: [RouterModule.forRoot(routes)],
        exports: [RouterModule]
    })
], AppRoutingModule);
export { AppRoutingModule };
//# sourceMappingURL=app-routing.module.js.map