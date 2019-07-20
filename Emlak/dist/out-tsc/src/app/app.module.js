import * as tslib_1 from "tslib";
import { APP_BASE_HREF } from '@angular/common';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app';
import { LayoutComponent } from './shared/layout';
//giris
import { GirisComponent } from './giris/giris';
//giris//controls
import { MPAboutComponent } from './giris/controls/mpabout';
import { MPNewPropsComponent } from './giris/controls/mpnewprops';
import { MPNewsComponent } from './giris/controls/mpnews';
import { MPShowroomComponent } from './giris/controls/mpshowroom';
import { SliderComponent } from './giris/controls/slider';
//controls/
import { BannerComponent } from './controls/banner';
import { FooterComponent } from './controls/footer';
import { HeaderComponent } from './controls/header';
import { ScriptsComponent } from './controls/scripts';
//controls///left
import { AramaSolComponent } from './controls/left/aramasol';
import { GununEmlagiComponent } from './controls/left/gununemlagi';
import { HaberlerSolComponent } from './controls/left/haberlersol';
import { KategoriMenuComponent } from './controls/left/kategorimenu';
import { SayfaGetirComponent } from './controls/left/sayfagetir';
import { YeniIlanSolComponent } from './controls/left/yeniilansol';
//emlak
import { EmlakDetayComponent } from './emlak/emlakdetay';
import { EmlakListeleComponent } from './emlak/emlaklistele';
import { EmlakDetayliAraComponent } from './emlak/emlakdetayliara';
//icerik
import { IcerikComponent } from './icerik/icerik';
import { HaberlerComponent } from './icerik/haberler';
import { IletisimComponent } from './icerik/iletisim';
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
import { AdminDosyaIndexComponent } from './admin/views/dosya';
import { AdminDosyaEkleComponent } from './admin/views/dosya/ekle';
import { AdminDosyaDuzenleComponent } from './admin/views/dosya/duzenle';
import { AdminEmlakIndexComponent } from './admin/views/emlak';
import { AdminEmlakEkleComponent } from './admin/views/emlak/ekle';
import { AdminEmlakDuzenleComponent } from './admin/views/emlak/duzenle';
import { AdminEmlakDilIndexComponent } from './admin/views/emlakdil';
import { AdminEmlakDilEkleComponent } from './admin/views/emlakdil/ekle';
import { AdminEmlakDilDuzenleComponent } from './admin/views/emlakdil/duzenle';
import { AdminFormElemanIndexComponent } from './admin/views/formeleman';
import { AdminFormElemanEkleComponent } from './admin/views/formeleman/ekle';
import { AdminFormElemanDuzenleComponent } from './admin/views/formeleman/duzenle';
import { AdminFormElemanDegerIndexComponent } from './admin/views/formelemandeger';
import { AdminFormElemanDegerEkleComponent } from './admin/views/formelemandeger/ekle';
import { AdminFormElemanDegerDuzenleComponent } from './admin/views/formelemandeger/duzenle';
import { AdminFormElemanGrupIndexComponent } from './admin/views/formelemangrup';
import { AdminFormElemanGrupEkleComponent } from './admin/views/formelemangrup/ekle';
import { AdminFormElemanGrupDuzenleComponent } from './admin/views/formelemangrup/duzenle';
import { AdminFormElemanOzellikIndexComponent } from './admin/views/formelemanozellik';
import { AdminFormElemanOzellikEkleComponent } from './admin/views/formelemanozellik/ekle';
import { AdminFormElemanOzellikDuzenleComponent } from './admin/views/formelemanozellik/duzenle';
import { AdminFormTiplerIndexComponent } from './admin/views/formtipler';
import { AdminFormTiplerEkleComponent } from './admin/views/formtipler/ekle';
import { AdminFormTiplerDuzenleComponent } from './admin/views/formtipler/duzenle';
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
import { AdminUrunIndexComponent } from './admin/views/urun';
import { AdminUrunEkleComponent } from './admin/views/urun/ekle';
import { AdminUrunDuzenleComponent } from './admin/views/urun/duzenle';
import { AdminUrunDilIndexComponent } from './admin/views/urundil';
import { AdminUrunDilEkleComponent } from './admin/views/urundil/ekle';
import { AdminUrunDilDuzenleComponent } from './admin/views/urundil/duzenle';
import { AdminZiyaretciIndexComponent } from './admin/views/ziyaretci';
//Services
import { EmlakAjaxService } from './services/emlakajax';
import { SolAjaxService } from './services/solajax';
import { REAjaxService } from './services/reajax';
import { HomeAjaxService } from './services/homeajax';
//Admin Services
import { SharedService } from './admin/services/shared';
import { KategoriService } from './admin/services/kategori';
import { KategoriDilService } from './admin/services/kategoridil';
import { IcerikService } from './admin/services/icerik';
import { IcerikDilService } from './admin/services/icerikdil';
import { DosyaService } from './admin/services/dosya';
import { GaleriService } from './admin/services/galeri';
import { GaleriDilService } from './admin/services/galeridil';
import { BaglantiService } from './admin/services/baglanti';
import { BagliTiplerService } from './admin/services/baglitipler';
import { LogIslemService } from './admin/services/logislem';
import { LoglarService } from './admin/services/loglar';
import { LogTiplerService } from './admin/services/logtipler';
import { MetaService } from './admin/services/meta';
import { MetaDilService } from './admin/services/metadil';
import { ResimService } from './admin/services/resim';
import { UrunService } from './admin/services/urun';
import { UrunDilService } from './admin/services/urundil';
import { FormElemanService } from './admin/services/formeleman';
import { FormElemanOzellikService } from './admin/services/formelemanozellik';
import { FormElemanGrupService } from './admin/services/formelemangrup';
import { FormTiplerService } from './admin/services/formtipler';
import { FormElemanDegerService } from './admin/services/formelemandeger';
import { EmlakService } from './admin/services/emlak';
import { EmlakDilService } from './admin/services/emlakdil';
import { DilService } from './admin/services/dil';
import { TiplerService } from './admin/services/tipler';
import { KullaniciGrupIslemService } from './admin/services/kullanicigrupislem';
import { KullaniciGrupHakService } from './admin/services/kullanicigruphak';
import { KullaniciGrupService } from './admin/services/kullanicigrup';
import { KullaniciGrupTabloService } from './admin/services/kullanicigruptablo';
import { KullanicilarService } from './admin/services/kullanicilar';
import { ZiyaretciService } from './admin/services/ziyaretci';
var AppModule = /** @class */ (function () {
    function AppModule() {
    }
    AppModule = tslib_1.__decorate([
        NgModule({
            declarations: [
                AppComponent,
                LayoutComponent,
                GirisComponent,
                BannerComponent,
                FooterComponent,
                HeaderComponent,
                ScriptsComponent,
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
                IletisimComponent,
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
                AdminFormElemanIndexComponent,
                AdminFormElemanEkleComponent,
                AdminFormElemanDuzenleComponent,
                AdminFormElemanDegerIndexComponent,
                AdminFormElemanDegerEkleComponent,
                AdminFormElemanDegerDuzenleComponent,
                AdminFormElemanGrupIndexComponent,
                AdminFormElemanGrupEkleComponent,
                AdminFormElemanGrupDuzenleComponent,
                AdminFormElemanOzellikIndexComponent,
                AdminFormElemanOzellikEkleComponent,
                AdminFormElemanOzellikDuzenleComponent,
                AdminFormTiplerIndexComponent,
                AdminFormTiplerEkleComponent,
                AdminFormTiplerDuzenleComponent,
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
                AdminUrunIndexComponent,
                AdminUrunEkleComponent,
                AdminUrunDuzenleComponent,
                AdminUrunDilIndexComponent,
                AdminUrunDilEkleComponent,
                AdminUrunDilDuzenleComponent,
                AdminZiyaretciIndexComponent
            ],
            imports: [
                BrowserModule,
                AppRoutingModule,
                ReactiveFormsModule.withConfig({ warnOnNgModelWithFormControl: 'never' }),
                HttpClientModule
            ],
            //'/' -> '/Emlak/' Bu �ekilde de�i�ecek
            providers: [{ provide: APP_BASE_HREF, useValue: '/Emlak/' },
                EmlakAjaxService,
                HomeAjaxService,
                REAjaxService,
                SolAjaxService,
                SharedService,
                KategoriService,
                KategoriDilService,
                IcerikService,
                IcerikDilService,
                DosyaService,
                GaleriService,
                GaleriDilService,
                BaglantiService,
                BagliTiplerService,
                LogIslemService,
                LoglarService,
                LogTiplerService,
                MetaService,
                MetaDilService,
                ResimService,
                UrunService,
                UrunDilService,
                FormElemanService,
                FormElemanOzellikService,
                FormElemanGrupService,
                FormTiplerService,
                FormElemanDegerService,
                EmlakService,
                EmlakDilService,
                DilService,
                TiplerService,
                KullaniciGrupHakService,
                KullaniciGrupIslemService,
                KullaniciGrupService,
                KullaniciGrupTabloService,
                KullanicilarService,
                ZiyaretciService
            ],
            bootstrap: [AppComponent]
        })
    ], AppModule);
    return AppModule;
}());
export { AppModule };
//# sourceMappingURL=app.module.js.map