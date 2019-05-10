import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { empty } from 'rxjs/Observer';
import { GirisComponent } from './giris/giris.component';
import { EmlakListeleComponent } from './emlak/emlaklistele.component';
import { EmlakDetayComponent } from './emlak/emlakdetay.component';
import { EmlakDetayliAraComponent } from './emlak/emlakdetayliara.component';
import { IcerikComponent } from './icerik/icerik.component';
import { HaberlerComponent } from './icerik/haberler.component';
import { IletisimComponent } from './icerik/iletisim.component';

const appRoutes: Routes = [
    { path: '', redirectTo: 'Giris', pathMatch: 'full' },
    { path: 'Giris', component: GirisComponent },
    { path: 'Emlak', component: EmlakListeleComponent },

    { path: 'Emlak/Listele', component: EmlakListeleComponent },
    { path: 'Emlak/Listele/:link', component: EmlakListeleComponent },
    { path: 'Emlak/Detay/:link', component: EmlakDetayComponent },
    { path: 'Emlak/DetayliAra', component: EmlakDetayliAraComponent },

    { path: 'Icerik/Haberler', component: HaberlerComponent },
    { path: 'Icerik/Haberler/:link', component: IcerikComponent },
    { path: 'Icerik/Iletisim', component: IletisimComponent },
    { path: 'Icerik/:link', component: IcerikComponent },

    { path: '**', component: GirisComponent }
];

export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes);