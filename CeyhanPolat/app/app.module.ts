import { NgModule } from '@angular/core';
import { APP_BASE_HREF } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { Ng2Bs3ModalModule } from 'ng2-bs3-modal/ng2-bs3-modal';
import { HttpModule } from '@angular/http';
import { routing } from './app.routing';
import { GirisComponent } from './giris/giris.component';
import { BiyografiComponent } from './biyografi/biyografi.component';
import { GaleriComponent } from './galeri/galeri.component';
import { SiirleriComponent } from './siirleri/siirleri.component';
import { SiirComponent } from './siir/siir.component';

@NgModule({
    imports: [BrowserModule, ReactiveFormsModule, HttpModule, routing, Ng2Bs3ModalModule],
    declarations: [AppComponent, GirisComponent, BiyografiComponent, GaleriComponent, SiirleriComponent, SiirComponent],

    //'/CeyhanPolat/' -> '/' Bu şekilde değişecek
    providers: [{ provide: APP_BASE_HREF, useValue: '/CeyhanPolat/' }],
    bootstrap: [AppComponent]
})

export class AppModule { }