import { APP_BASE_HREF } from '@angular/common';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app';

//Site
import { LayoutComponent } from './views/shared/layout';
import { ScriptsComponent } from './views/shared/controls/scripts';
import { HeaderComponent } from './views/shared/controls/header';
import { HeaderMenuComponent } from './views/shared/controls/menu';
import { FooterComponent } from './views/shared/controls/footer';

import { IndexComponent } from './views/home/index';
import { SliderComponent } from './views/home/controls/slider';
import { SearchComponent } from './views/home/controls/search';
import { ReOfDayComponent } from './views/home/controls/reofday';
import { ShowroomComponent } from './views/home/controls/showroom';
import { NewReComponent } from './views/home/controls/newre';
import { NewsComponent } from './views/home/controls/news';
import { AboutComponent } from './views/home/controls/about';

import { ContentIndexComponent } from './views/content';
import { ContentHeaderComponent } from './views/content/controls/header';
import { ContentReListComponent } from './views/content/controls/relist';
import { ContentSearchComponent } from './views/content/controls/search';
import { ContentContactComponent } from './views/content/contact';
import { ContentNewsComponent } from './views/content/news';

import { PropertyIndexComponent } from './views/property';
import { PropertySearchComponent } from './views/property/controls/search';
import { PropertyDetailComponent } from './views/property/detail';

//Admin
import { AdminGirisComponent } from './admin/views/giris/giris';
import { AdminLayoutComponent } from './admin/views/shared/layoutAdmin';
import { AdminHeaderComponent } from './admin/views/shared/controls/header';
import { AdminLeftMenuComponent } from './admin/views/shared/controls/leftmenu';
import { AdminFooterComponent } from './admin/views/shared/controls/footer';
import { AdminScriptsComponent } from './admin/views/shared/controls/scripts';
import { AdminCopyDeleteComponent } from './admin/views/shared/controls/copydelete';
import { AdminAnaSayfaComponent } from './admin/views/giris/anasayfa';

import { AdminBaglantiIndexComponent } from './admin/views/baglanti';
import { AdminBaglantiEkleComponent } from './admin/views/baglanti/ekle';
import { AdminBaglantiDuzenleComponent } from './admin/views/baglanti/duzenle';

import { AdminBagliTiplerIndexComponent } from './admin/views/baglitipler';
import { AdminBagliTiplerEkleComponent } from './admin/views/baglitipler/ekle';
import { AdminBagliTiplerDuzenleComponent } from './admin/views/baglitipler/duzenle';

import { AdminDilIndexComponent } from './admin/views/dil';
import { AdminDilEkleComponent } from './admin/views/dil/ekle';
import { AdminDilDuzenleComponent } from './admin/views/dil/duzenle';

import { AdminDilIcerikIndexComponent } from './admin/views/dilicerik';
import { AdminDilIcerikEkleComponent } from './admin/views/dilicerik/ekle';
import { AdminDilIcerikDuzenleComponent } from './admin/views/dilicerik/duzenle';

import { AdminDilIcerikDilIndexComponent } from './admin/views/dilicerikdil';
import { AdminDilIcerikDilEkleComponent } from './admin/views/dilicerikdil/ekle';
import { AdminDilIcerikDilDuzenleComponent } from './admin/views/dilicerikdil/duzenle';

import { AdminDosyaIndexComponent } from './admin/views/dosya';
import { AdminDosyaEkleComponent } from './admin/views/dosya/ekle';
import { AdminDosyaDuzenleComponent } from './admin/views/dosya/duzenle';

import { AdminEmlakIndexComponent } from './admin/views/emlak';
import { AdminEmlakEkleComponent } from './admin/views/emlak/ekle';
import { AdminEmlakDuzenleComponent } from './admin/views/emlak/duzenle';

import { AdminEmlakDilIndexComponent } from './admin/views/emlakdil';
import { AdminEmlakDilEkleComponent } from './admin/views/emlakdil/ekle';
import { AdminEmlakDilDuzenleComponent } from './admin/views/emlakdil/duzenle';

import { AdminGaleriIndexComponent } from './admin/views/galeri';
import { AdminGaleriEkleComponent } from './admin/views/galeri/ekle';
import { AdminGaleriDuzenleComponent } from './admin/views/galeri/duzenle';

import { AdminGaleriDilIndexComponent } from './admin/views/galeridil';
import { AdminGaleriDilEkleComponent } from './admin/views/galeridil/ekle';
import { AdminGaleriDilDuzenleComponent } from './admin/views/galeridil/duzenle';

import { AdminIcerikIndexComponent } from './admin/views/icerik';
import { AdminIcerikEkleComponent } from './admin/views/icerik/ekle';
import { AdminIcerikDuzenleComponent } from './admin/views/icerik/duzenle';

import { AdminIcerikDilIndexComponent } from './admin/views/icerikdil';
import { AdminIcerikDilEkleComponent } from './admin/views/icerikdil/ekle';
import { AdminIcerikDilDuzenleComponent } from './admin/views/icerikdil/duzenle';

import { AdminKategoriIndexComponent } from './admin/views/kategori';
import { AdminKategoriEkleComponent } from './admin/views/kategori/ekle';
import { AdminKategoriDuzenleComponent } from './admin/views/kategori/duzenle';

import { AdminKategoriDilIndexComponent } from './admin/views/kategoridil';
import { AdminKategoriDilEkleComponent } from './admin/views/kategoridil/ekle';
import { AdminKategoriDilDuzenleComponent } from './admin/views/kategoridil/duzenle';

import { AdminKullaniciGrupIndexComponent } from './admin/views/kullanicigrup';
import { AdminKullaniciGrupEkleComponent } from './admin/views/kullanicigrup/ekle';
import { AdminKullaniciGrupDuzenleComponent } from './admin/views/kullanicigrup/duzenle';

import { AdminKullaniciGrupHakIndexComponent } from './admin/views/kullanicigruphak';
import { AdminKullaniciGrupHakEkleComponent } from './admin/views/kullanicigruphak/ekle';
import { AdminKullaniciGrupHakDuzenleComponent } from './admin/views/kullanicigruphak/duzenle';

import { AdminKullaniciGrupIslemIndexComponent } from './admin/views/kullanicigrupislem';
import { AdminKullaniciGrupIslemEkleComponent } from './admin/views/kullanicigrupislem/ekle';
import { AdminKullaniciGrupIslemDuzenleComponent } from './admin/views/kullanicigrupislem/duzenle';

import { AdminKullaniciGrupTabloIndexComponent } from './admin/views/kullanicigruptablo';
import { AdminKullaniciGrupTabloEkleComponent } from './admin/views/kullanicigruptablo/ekle';
import { AdminKullaniciGrupTabloDuzenleComponent } from './admin/views/kullanicigruptablo/duzenle';

import { AdminKullanicilarIndexComponent } from './admin/views/kullanicilar';
import { AdminKullanicilarEkleComponent } from './admin/views/kullanicilar/ekle';
import { AdminKullanicilarDuzenleComponent } from './admin/views/kullanicilar/duzenle';
import { AdminKullanicilarGrupDegistirComponent } from './admin/views/kullanicilar/grupdegistir';

import { AdminLogIslemIndexComponent } from './admin/views/logislem';
import { AdminLogIslemEkleComponent } from './admin/views/logislem/ekle';
import { AdminLogIslemDuzenleComponent } from './admin/views/logislem/duzenle';

import { AdminLoglarIndexComponent } from './admin/views/loglar';

import { AdminLogTiplerIndexComponent } from './admin/views/logtipler';
import { AdminLogTiplerEkleComponent } from './admin/views/logtipler/ekle';
import { AdminLogTiplerDuzenleComponent } from './admin/views/logtipler/duzenle';

import { AdminMetaIndexComponent } from './admin/views/meta';
import { AdminMetaEkleComponent } from './admin/views/meta/ekle';
import { AdminMetaDuzenleComponent } from './admin/views/meta/duzenle';

import { AdminMetaDilIndexComponent } from './admin/views/metadil';
import { AdminMetaDilEkleComponent } from './admin/views/metadil/ekle';
import { AdminMetaDilDuzenleComponent } from './admin/views/metadil/duzenle';

import { AdminResimIndexComponent } from './admin/views/resim';
import { AdminResimEkleComponent } from './admin/views/resim/ekle';
import { AdminResimDuzenleComponent } from './admin/views/resim/duzenle';

import { AdminTiplerIndexComponent } from './admin/views/tipler';
import { AdminTiplerEkleComponent } from './admin/views/tipler/ekle';
import { AdminTiplerDuzenleComponent } from './admin/views/tipler/duzenle';

import { AdminZiyaretciIndexComponent } from './admin/views/ziyaretci';

//Services
import { SiteService } from './services/site';

import { Lib } from './lib/methods';

//Admin Services
import { SharedService } from './admin/services/shared';
import { ModelService } from './admin/services/model';


@NgModule({
    declarations: [
        AppComponent,

        //Site
        LayoutComponent,
        ScriptsComponent,
        HeaderComponent,
        HeaderMenuComponent,
        FooterComponent,

        IndexComponent,
        SliderComponent,
        SearchComponent,
        ReOfDayComponent,
        ShowroomComponent,
        NewReComponent,
        NewsComponent,
        AboutComponent,

        ContentIndexComponent,
        ContentHeaderComponent,
        ContentReListComponent,
        ContentSearchComponent,
        ContentContactComponent,
        ContentNewsComponent,

        PropertyIndexComponent,
        PropertyDetailComponent,
        PropertySearchComponent,

        //Admin
        AdminGirisComponent,
        AdminLayoutComponent,
        AdminFooterComponent,
        AdminHeaderComponent,
        AdminLeftMenuComponent,
        AdminScriptsComponent,
        AdminCopyDeleteComponent,
        AdminAnaSayfaComponent,

        AdminBaglantiIndexComponent,
        AdminBaglantiEkleComponent,
        AdminBaglantiDuzenleComponent,

        AdminBagliTiplerIndexComponent,
        AdminBagliTiplerEkleComponent,
        AdminBagliTiplerDuzenleComponent,

        AdminDilIndexComponent,
        AdminDilEkleComponent,
        AdminDilDuzenleComponent,

        AdminDosyaIndexComponent,
        AdminDosyaEkleComponent,
        AdminDosyaDuzenleComponent,

        AdminEmlakIndexComponent,
        AdminEmlakEkleComponent,
        AdminEmlakDuzenleComponent,

        AdminEmlakDilIndexComponent,
        AdminEmlakDilEkleComponent,
        AdminEmlakDilDuzenleComponent,

        AdminGaleriIndexComponent,
        AdminGaleriEkleComponent,
        AdminGaleriDuzenleComponent,

        AdminGaleriDilIndexComponent,
        AdminGaleriDilEkleComponent,
        AdminGaleriDilDuzenleComponent,

        AdminIcerikIndexComponent,
        AdminIcerikEkleComponent,
        AdminIcerikDuzenleComponent,

        AdminIcerikDilIndexComponent,
        AdminIcerikDilEkleComponent,
        AdminIcerikDilDuzenleComponent,

        AdminKategoriIndexComponent,
        AdminKategoriEkleComponent,
        AdminKategoriDuzenleComponent,

        AdminKategoriDilIndexComponent,
        AdminKategoriDilEkleComponent,
        AdminKategoriDilDuzenleComponent,

        AdminKullaniciGrupIndexComponent,
        AdminKullaniciGrupEkleComponent,
        AdminKullaniciGrupDuzenleComponent,

        AdminKullaniciGrupHakIndexComponent,
        AdminKullaniciGrupHakEkleComponent,
        AdminKullaniciGrupHakDuzenleComponent,

        AdminKullaniciGrupIslemIndexComponent,
        AdminKullaniciGrupIslemEkleComponent,
        AdminKullaniciGrupIslemDuzenleComponent,

        AdminKullaniciGrupTabloIndexComponent,
        AdminKullaniciGrupTabloEkleComponent,
        AdminKullaniciGrupTabloDuzenleComponent,

        AdminKullanicilarIndexComponent,
        AdminKullanicilarEkleComponent,
        AdminKullanicilarDuzenleComponent,
        AdminKullanicilarGrupDegistirComponent,

        AdminDilIcerikIndexComponent,
        AdminDilIcerikEkleComponent,
        AdminDilIcerikDuzenleComponent,

        AdminDilIcerikDilIndexComponent,
        AdminDilIcerikDilEkleComponent,
        AdminDilIcerikDilDuzenleComponent,

        AdminLogIslemIndexComponent,
        AdminLogIslemEkleComponent,
        AdminLogIslemDuzenleComponent,

        AdminLoglarIndexComponent,

        AdminLogTiplerIndexComponent,
        AdminLogTiplerEkleComponent,
        AdminLogTiplerDuzenleComponent,

        AdminMetaIndexComponent,
        AdminMetaEkleComponent,
        AdminMetaDuzenleComponent,

        AdminMetaDilIndexComponent,
        AdminMetaDilEkleComponent,
        AdminMetaDilDuzenleComponent,

        AdminResimIndexComponent,
        AdminResimEkleComponent,
        AdminResimDuzenleComponent,

        AdminTiplerIndexComponent,
        AdminTiplerEkleComponent,
        AdminTiplerDuzenleComponent,

        AdminZiyaretciIndexComponent
    ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        ReactiveFormsModule.withConfig({ warnOnNgModelWithFormControl: 'never' }),
        HttpClientModule
    ],
    //'/Emlak/' -> '/' Bu þekilde deðiþecek
    providers: [{ provide: APP_BASE_HREF, useValue: '/Emlak/' },
        SiteService,

        Lib,

        SharedService,
        ModelService
],
    bootstrap: [AppComponent]
})
export class AppModule { }
