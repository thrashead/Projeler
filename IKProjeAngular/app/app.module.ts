import { NgModule } from '@angular/core';
import { APP_BASE_HREF } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';
import { AppComponent } from './app';
import { Ng2Bs3ModalModule } from 'ng2-bs3-modal/ng2-bs3-modal';
import { HttpModule } from '@angular/http';
import { routing } from './app.routing';

import { UstComponent } from './kontroller/ust';
import { MenuComponent } from './kontroller/menu';
import { AraComponent } from './kontroller/ara';
import { SloganComponent } from './kontroller/slogan';
import { AltComponent } from './kontroller/alt';

import { GirisComponent } from './giris/giris';
import { GirisSirketLogoComponent } from './giris/kontroller/sirketlogo';
import { GirisSonBesIsComponent } from './giris/kontroller/sonbesis';
import { GirisBasariComponent } from './giris/kontroller/basari';
import { GirisAcilIslerComponent } from './giris/kontroller/acilisler';
import { GirisAnketComponent } from './giris/kontroller/anket';
import { GirisIsDurumComponent } from './giris/kontroller/isdurum';
import { GirisSehirlerComponent } from './giris/kontroller/sehirler';

import { IsAramaComponent } from './is/arama';
import { IsIsTuruComponent } from './is/arama.isturu';
import { IsSehirComponent } from './is/arama.sehir';
import { IsDetayComponent } from './is/detay';

import { AdayIslemGirisComponent } from './aday/islem/giris';
import { AdayIslemKayitComponent } from './aday/islem/kayit';
import { AdayIslemSifreComponent } from './aday/islem/sifre';

import { SirketIslemGirisComponent } from './sirket/islem/giris';
import { SirketIslemKayitComponent } from './sirket/islem/kayit';
import { SirketIslemSifreComponent } from './sirket/islem/sifre';


@NgModule({
    imports: [BrowserModule, ReactiveFormsModule, HttpModule, routing, Ng2Bs3ModalModule],
    declarations: [
        AppComponent,
        UstComponent,
        MenuComponent,
        AraComponent,
        SloganComponent,
        AltComponent,

        GirisComponent,
        GirisSirketLogoComponent,
        GirisSonBesIsComponent,
        GirisBasariComponent,
        GirisAcilIslerComponent,
        GirisAnketComponent,
        GirisIsDurumComponent,
        GirisSehirlerComponent,

        IsAramaComponent,
        IsIsTuruComponent,
        IsSehirComponent,
        IsDetayComponent,

        AdayIslemGirisComponent,
        AdayIslemKayitComponent,
        AdayIslemSifreComponent,

        SirketIslemGirisComponent,
        SirketIslemKayitComponent,
        SirketIslemSifreComponent
    ],

    //'/IKProjeAngular/' -> '/' Bu şekilde değişecek
    providers: [{ provide: APP_BASE_HREF, useValue: '/IKProjeAngular/' }],
    bootstrap: [AppComponent]
})

export class AppModule { }