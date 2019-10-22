import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LayoutComponent } from './views/shared/layout';
import { IndexComponent } from './views/home/index';
import { ContentIndexComponent } from './views/content';
import { ContentContactComponent } from './views/content/contact';
import { ContentNewsComponent } from './views/content/news';
import { PropertyIndexComponent } from './views/property';
import { PropertyDetailComponent } from './views/property/detail';

import { AdminLayoutComponent } from './admin/views/shared/layoutAdmin';
import { AdminGirisComponent } from './admin/views/giris/giris';
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
import { AdminEmlakDuzenleComponent } from './admin/views/emlak/duzenle';
import { AdminEmlakEkleComponent } from './admin/views/emlak/ekle';

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

const routes: Routes = [
    {
        path: '',
        component: LayoutComponent,
        children: [
            { path: '', component: IndexComponent, pathMatch: 'full' },

            { path: 'Emlak', component: PropertyIndexComponent },
            { path: 'Emlak/Listele', component: PropertyIndexComponent },
            { path: 'Emlak/Listele/:link', component: PropertyIndexComponent },
            { path: 'Emlak/Kategori/:link', component: PropertyIndexComponent },
            { path: 'Emlak/Detay/:link', component: PropertyDetailComponent },

            { path: 'Haberler', component: ContentNewsComponent },
            { path: 'Haberler/:link', component: ContentIndexComponent },
            { path: 'Icerik/Iletisim', component: ContentContactComponent },
            { path: 'Icerik/:link', component: ContentIndexComponent },
        ]
    },

    { path: 'Admin', component: AdminGirisComponent },
    { path: 'Admin/Index', component: AdminGirisComponent },
    { path: 'Admin/Giris', component: AdminGirisComponent },

    {
        path: '',
        component: AdminLayoutComponent,
        children: [
            { path: 'Admin/AnaSayfa', component: AdminAnaSayfaComponent },

            { path: 'Admin/Baglanti', component: AdminBaglantiIndexComponent },
            { path: 'Admin/Baglanti/Index', component: AdminBaglantiIndexComponent },
            { path: 'Admin/Baglanti/Ekle', component: AdminBaglantiEkleComponent },
            { path: 'Admin/Baglanti/Ekle/:linkID', component: AdminBaglantiEkleComponent },
            { path: 'Admin/Baglanti/Duzenle/:id', component: AdminBaglantiDuzenleComponent },

            { path: 'Admin/BagliTipler', component: AdminBagliTiplerIndexComponent },
            { path: 'Admin/BagliTipler/Index', component: AdminBagliTiplerIndexComponent },
            { path: 'Admin/BagliTipler/Ekle', component: AdminBagliTiplerEkleComponent },
            { path: 'Admin/BagliTipler/Duzenle/:id', component: AdminBagliTiplerDuzenleComponent },

            { path: 'Admin/Dil', component: AdminDilIndexComponent },
            { path: 'Admin/Dil/Index', component: AdminDilIndexComponent },
            { path: 'Admin/Dil/Ekle', component: AdminDilEkleComponent },
            { path: 'Admin/Dil/Duzenle/:id', component: AdminDilDuzenleComponent },

            { path: 'Admin/Dosya', component: AdminDosyaIndexComponent },
            { path: 'Admin/Dosya/Index', component: AdminDosyaIndexComponent },
            { path: 'Admin/Dosya/Ekle', component: AdminDosyaEkleComponent },
            { path: 'Admin/Dosya/Duzenle/:id', component: AdminDosyaDuzenleComponent },

            { path: 'Admin/Emlak', component: AdminEmlakIndexComponent },
            { path: 'Admin/Emlak/Index', component: AdminEmlakIndexComponent },
            { path: 'Admin/Emlak/Ekle', component: AdminEmlakEkleComponent },
            { path: 'Admin/Emlak/Duzenle/:id', component: AdminEmlakDuzenleComponent },

            { path: 'Admin/EmlakDil', component: AdminEmlakDilIndexComponent },
            { path: 'Admin/EmlakDil/Index', component: AdminEmlakDilIndexComponent },
            { path: 'Admin/EmlakDil/Ekle', component: AdminEmlakDilEkleComponent },
            { path: 'Admin/EmlakDil/Ekle/:linkID', component: AdminEmlakDilEkleComponent },
            { path: 'Admin/EmlakDil/Duzenle/:id', component: AdminEmlakDilDuzenleComponent },

            { path: 'Admin/Galeri', component: AdminGaleriIndexComponent },
            { path: 'Admin/Galeri/Index', component: AdminGaleriIndexComponent },
            { path: 'Admin/Galeri/Ekle', component: AdminGaleriEkleComponent },
            { path: 'Admin/Galeri/Duzenle/:id', component: AdminGaleriDuzenleComponent },

            { path: 'Admin/GaleriDil', component: AdminGaleriDilIndexComponent },
            { path: 'Admin/GaleriDil/Index', component: AdminGaleriDilIndexComponent },
            { path: 'Admin/GaleriDil/Ekle', component: AdminGaleriDilEkleComponent },
            { path: 'Admin/GaleriDil/Ekle/:linkID', component: AdminGaleriDilEkleComponent },
            { path: 'Admin/GaleriDil/Duzenle/:id', component: AdminGaleriDilDuzenleComponent },

            { path: 'Admin/Icerik', component: AdminIcerikIndexComponent },
            { path: 'Admin/Icerik/Index', component: AdminIcerikIndexComponent },
            { path: 'Admin/Icerik/Ekle', component: AdminIcerikEkleComponent },
            { path: 'Admin/Icerik/Duzenle/:id', component: AdminIcerikDuzenleComponent },

            { path: 'Admin/IcerikDil', component: AdminIcerikDilIndexComponent },
            { path: 'Admin/IcerikDil/Index', component: AdminIcerikDilIndexComponent },
            { path: 'Admin/IcerikDil/Ekle', component: AdminIcerikDilEkleComponent },
            { path: 'Admin/IcerikDil/Ekle/:linkID', component: AdminIcerikDilEkleComponent },
            { path: 'Admin/IcerikDil/Duzenle/:id', component: AdminIcerikDilDuzenleComponent },

            { path: 'Admin/Kategori', component: AdminKategoriIndexComponent },
            { path: 'Admin/Kategori/Index', component: AdminKategoriIndexComponent },
            { path: 'Admin/Kategori/Ekle', component: AdminKategoriEkleComponent },
            { path: 'Admin/Kategori/Duzenle/:id', component: AdminKategoriDuzenleComponent },

            { path: 'Admin/KategoriDil', component: AdminKategoriDilIndexComponent },
            { path: 'Admin/KategoriDil/Index', component: AdminKategoriDilIndexComponent },
            { path: 'Admin/KategoriDil/Ekle', component: AdminKategoriDilEkleComponent },
            { path: 'Admin/KategoriDil/Ekle/:linkID', component: AdminKategoriDilEkleComponent },
            { path: 'Admin/KategoriDil/Duzenle/:id', component: AdminKategoriDilDuzenleComponent },

            { path: 'Admin/Kullanicilar', component: AdminKullanicilarIndexComponent },
            { path: 'Admin/Kullanicilar/Index', component: AdminKullanicilarIndexComponent },
            { path: 'Admin/Kullanicilar/Ekle', component: AdminKullanicilarEkleComponent },
            { path: 'Admin/Kullanicilar/Duzenle/:id', component: AdminKullanicilarDuzenleComponent },
            { path: 'Admin/Kullanicilar/GrupDegistir/:id', component: AdminKullanicilarGrupDegistirComponent },

            { path: 'Admin/KullaniciGrup', component: AdminKullaniciGrupIndexComponent },
            { path: 'Admin/KullaniciGrup/Index', component: AdminKullaniciGrupIndexComponent },
            { path: 'Admin/KullaniciGrup/Ekle', component: AdminKullaniciGrupEkleComponent },
            { path: 'Admin/KullaniciGrup/Duzenle/:id', component: AdminKullaniciGrupDuzenleComponent },

            { path: 'Admin/KullaniciGrupHak', component: AdminKullaniciGrupHakIndexComponent },
            { path: 'Admin/KullaniciGrupHak/Index', component: AdminKullaniciGrupHakIndexComponent },
            { path: 'Admin/KullaniciGrupHak/Ekle', component: AdminKullaniciGrupHakEkleComponent },
            { path: 'Admin/KullaniciGrupHak/Ekle/:linkID', component: AdminKullaniciGrupHakEkleComponent },
            { path: 'Admin/KullaniciGrupHak/Duzenle/:id', component: AdminKullaniciGrupHakDuzenleComponent },

            { path: 'Admin/KullaniciGrupIslem', component: AdminKullaniciGrupIslemIndexComponent },
            { path: 'Admin/KullaniciGrupIslem/Index', component: AdminKullaniciGrupIslemIndexComponent },
            { path: 'Admin/KullaniciGrupIslem/Ekle', component: AdminKullaniciGrupIslemEkleComponent },
            { path: 'Admin/KullaniciGrupIslem/Duzenle/:id', component: AdminKullaniciGrupIslemDuzenleComponent },

            { path: 'Admin/KullaniciGrupTablo', component: AdminKullaniciGrupTabloIndexComponent },
            { path: 'Admin/KullaniciGrupTablo/Index', component: AdminKullaniciGrupTabloIndexComponent },
            { path: 'Admin/KullaniciGrupTablo/Ekle', component: AdminKullaniciGrupTabloEkleComponent },
            { path: 'Admin/KullaniciGrupTablo/Ekle/:linkID', component: AdminKullaniciGrupTabloEkleComponent },
            { path: 'Admin/KullaniciGrupTablo/Duzenle/:id', component: AdminKullaniciGrupTabloDuzenleComponent },

            { path: 'Admin/LogIslem', component: AdminLogIslemIndexComponent },
            { path: 'Admin/LogIslem/Index', component: AdminLogIslemIndexComponent },
            { path: 'Admin/LogIslem/Ekle', component: AdminLogIslemEkleComponent },
            { path: 'Admin/LogIslem/Ekle/:linkID', component: AdminLogIslemEkleComponent },
            { path: 'Admin/LogIslem/Duzenle/:id', component: AdminLogIslemDuzenleComponent },

            { path: 'Admin/Loglar', component: AdminLoglarIndexComponent },
            { path: 'Admin/Loglar/Index', component: AdminLoglarIndexComponent },

            { path: 'Admin/LogTipler', component: AdminLogTiplerIndexComponent },
            { path: 'Admin/LogTipler/Index', component: AdminLogTiplerIndexComponent },
            { path: 'Admin/LogTipler/Ekle', component: AdminLogTiplerEkleComponent },
            { path: 'Admin/LogTipler/Duzenle/:id', component: AdminLogTiplerDuzenleComponent },

            { path: 'Admin/Meta', component: AdminMetaIndexComponent },
            { path: 'Admin/Meta/Index', component: AdminMetaIndexComponent },
            { path: 'Admin/Meta/Ekle', component: AdminMetaEkleComponent },
            { path: 'Admin/Meta/Duzenle/:id', component: AdminMetaDuzenleComponent },

            { path: 'Admin/MetaDil', component: AdminMetaDilIndexComponent },
            { path: 'Admin/MetaDil/Index', component: AdminMetaDilIndexComponent },
            { path: 'Admin/MetaDil/Ekle', component: AdminMetaDilEkleComponent },
            { path: 'Admin/MetaDil/Ekle/:linkID', component: AdminMetaDilEkleComponent },
            { path: 'Admin/MetaDil/Duzenle/:id', component: AdminMetaDilDuzenleComponent },

            { path: 'Admin/Resim', component: AdminResimIndexComponent },
            { path: 'Admin/Resim/Index', component: AdminResimIndexComponent },
            { path: 'Admin/Resim/Ekle', component: AdminResimEkleComponent },
            { path: 'Admin/Resim/Duzenle/:id', component: AdminResimDuzenleComponent },

            { path: 'Admin/Tipler', component: AdminTiplerIndexComponent },
            { path: 'Admin/Tipler/Index', component: AdminTiplerIndexComponent },
            { path: 'Admin/Tipler/Ekle', component: AdminTiplerEkleComponent },
            { path: 'Admin/Tipler/Duzenle/:id', component: AdminTiplerDuzenleComponent },

            { path: 'Admin/Ziyaretci', component: AdminZiyaretciIndexComponent },
            { path: 'Admin/Ziyaretci/Index', component: AdminZiyaretciIndexComponent },
        ]
    },

    { path: '**', redirectTo: '' }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }
