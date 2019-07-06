import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { GirisComponent } from './giris/giris';
import { BiyografiComponent } from './biyografi/biyografi';
import { GaleriComponent } from './galeri/galeri';
import { SiirleriComponent } from './siirleri/siirleri';
import { SiirComponent } from './siir/siir';
import { LayoutComponent } from './shared/layout';

const routes: Routes = [
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

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})

export class AppRoutingModule { }
