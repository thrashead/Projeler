import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { empty } from 'rxjs/Observer';
import { GirisComponent } from './giris/giris';
import { IsAramaComponent } from './is/arama';
import { IsSehirComponent } from './is/arama.sehir';
import { IsIsTuruComponent } from './is/arama.isturu';
import { IsDetayComponent } from './is/detay';
import { AdayIslemGirisComponent } from './aday/islem/giris';
import { AdayIslemKayitComponent } from './aday/islem/kayit';
import { SirketIslemGirisComponent } from './sirket/islem/giris';
import { SirketIslemKayitComponent } from './sirket/islem/kayit';
import { AdayIslemSifreComponent } from './aday/islem/sifre';
import { SirketIslemSifreComponent } from './sirket/islem/sifre';

const appRoutes: Routes = [
    { path: '', redirectTo: 'Giris', pathMatch: 'full' },
    { path: 'Giris', component: GirisComponent },
    //İş
    { path: 'Is/Ilan/IsTuru/:tip', component: IsIsTuruComponent },
    { path: 'Is/Ilan/Sehir/:sehir', component: IsSehirComponent },
    { path: 'Is/Ilan/Detay/:id', component: IsDetayComponent },
    { path: 'Is/Ilan/Ara', component: IsAramaComponent },
    { path: 'Is/Ilan', component: IsAramaComponent },
    { path: 'Is', component: IsAramaComponent },
    //Aday
    { path: 'Aday/Islem/Giris', component: AdayIslemGirisComponent },
    { path: 'Aday/Islem/Kayit', component: AdayIslemKayitComponent },
    { path: 'Aday/Islem/Sifre', component: AdayIslemSifreComponent },
    //Sirket
    { path: 'Sirket/Islem/Giris', component: SirketIslemGirisComponent },
    { path: 'Sirket/Islem/Kayit', component: SirketIslemKayitComponent },
    { path: 'Sirket/Islem/Sifre', component: SirketIslemSifreComponent },

    { path: '**', component: GirisComponent }
];

export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes);