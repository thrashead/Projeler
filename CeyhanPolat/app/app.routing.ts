import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { empty } from 'rxjs/Observer';
import { GirisComponent } from './giris/giris.component';
import { BiyografiComponent } from './biyografi/biyografi.component';
import { GaleriComponent } from './galeri/galeri.component';
import { SiirleriComponent } from './siirleri/siirleri.component';
import { SiirComponent } from './siir/siir.component';

const appRoutes: Routes = [
    { path: '', redirectTo: 'Giris', pathMatch: 'full' },
    { path: 'Giris', component: GirisComponent },
    { path: 'Biyografi', component: BiyografiComponent },
    { path: 'Galeri', component: GaleriComponent },
    { path: 'Siirleri', component: SiirleriComponent },
    { path: 'Siirleri/:link', component: SiirComponent },
    { path: '**', component: GirisComponent }
];

export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes);