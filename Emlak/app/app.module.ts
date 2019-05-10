import { NgModule } from '@angular/core';
import { APP_BASE_HREF } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { Ng2Bs3ModalModule } from 'ng2-bs3-modal/ng2-bs3-modal';
import { HttpModule } from '@angular/http';
import { routing } from './app.routing';

//controls/
import { BannerComponent } from './controls/banner.component';
import { FooterComponent } from './controls/footer.component';
import { HeaderComponent } from './controls/header.component';
//controls///left
import { AramaSolComponent } from './controls/left/aramasol.component';
import { GununEmlagiComponent } from './controls/left/gununemlagi.component';
import { HaberlerSolComponent } from './controls/left/haberlersol.component';
import { KategoriMenuComponent } from './controls/left/kategorimenu.component';
import { SayfaGetirComponent } from './controls/left/sayfagetir.component';
import { YeniIlanSolComponent } from './controls/left/yeniilansol.component';

//giris
import { GirisComponent } from './giris/giris.component';
//giris//controls
import { MPAboutComponent } from './giris/controls/mpabout.component';
import { MPNewPropsComponent } from './giris/controls/mpnewprops.component';
import { MPNewsComponent } from './giris/controls/mpnews.component';
import { MPShowroomComponent } from './giris/controls/mpshowroom.component';
import { SliderComponent } from './giris/controls/slider.component';

//emlak
import { EmlakDetayComponent } from './emlak/emlakdetay.component';
import { EmlakListeleComponent } from './emlak/emlaklistele.component';
import { EmlakDetayliAraComponent } from './emlak/emlakdetayliara.component';

//icerik
import { IcerikComponent } from './icerik/icerik.component';
import { HaberlerComponent } from './icerik/haberler.component';
import { IletisimComponent } from './icerik/iletisim.component';



@NgModule({
    imports: [BrowserModule, ReactiveFormsModule, HttpModule, routing, Ng2Bs3ModalModule],
    declarations: [AppComponent,
        GirisComponent,
        BannerComponent,
        FooterComponent,
        HeaderComponent,
        AramaSolComponent,
        GununEmlagiComponent,
        HaberlerSolComponent,
        KategoriMenuComponent,
        SayfaGetirComponent,
        YeniIlanSolComponent,
        MPAboutComponent,
        MPNewPropsComponent,
        MPNewsComponent,
        MPShowroomComponent,
        SliderComponent,
        EmlakDetayComponent,
        EmlakListeleComponent,
        EmlakDetayliAraComponent,
        IcerikComponent,
        HaberlerComponent,
        IletisimComponent
    ],

    //'/Emlak/' -> '/' Bu şekilde değişecek
    providers: [{ provide: APP_BASE_HREF, useValue: '/Emlak/' }],
    bootstrap: [AppComponent]
})

export class AppModule { }