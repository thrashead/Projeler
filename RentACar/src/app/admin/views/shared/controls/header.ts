import { Component } from '@angular/core';
import { SharedService } from '../../../services/shared';
import { Router } from '@angular/router';

@Component({
    selector: 'admin-header',
    templateUrl: './header.html'
})

export class AdminHeaderComponent {
    errorMsg: string;
    website: string = "http://localhost/RentACar/";

    kullanici: any;

    constructor(private service: SharedService, private router: Router) {
    }

    ngOnInit() {
        this.service.getCurrentUser().subscribe((resData: any) => {
            if (resData != null) {
                this.kullanici = resData;
            }
        }, resError => this.errorMsg = resError);

        $('#txtMainSearch').typeahead({
            source: [
                'Araçlar',
                'Araçlar (Dil)',
                'Araç Detay (Temel)',
                'Araç Detay (Mekanik)',
                'Araç Detay (İç-Dış)',
                'Araç Detay (Özellik)',
                'Marka',
                'Model',
                'Araç Durumu',
                'Araç Durumu (Dil)',
                'Kasa Tipi',
                'Kasa Tipi (Dil)',
                'Sürüş Tipi',
                'Sürüş Tipi (Dil)',
                'Motor Tipi',
                'Motor Tipi (Dil)',
                'Vites Tipi',
                'Vites Tipi (Dil)',
                'Yakıt Tipi',
                'Yakıt Tipi (Dil)',
                'Blog Kategorileri',
                'Blog Kategorileri (Dil)',
                'Blog Yazıları',
                'Blog Yazıları (Dil)',
                'Blog Resimleri',
                'Blog Videoları',
                'Blog Yorumları',
                'Dil İçerikleri',
                'Dil İçerikleri (Dil)',
                'Dilsiz İçerikler',
                'Çalışanlar',
                'Çalışanlar (Dil)',
                'İletişim Formu',
                'Mail Grubu',
                'Kategoriler',
                'Kategoriler (Dil)',
                'İçerikler',
                'İçerikler (Dil)',
                'Galeri',
                'Galeri (Dil)',
                'Resimler',
                'Dosyalar',
                'Meta',
                'Meta (Dil)',
                'Bağlı Tipler',
                'Bağlantılar',
                'Diller',
                'Kullanıcılar'
            ],
            items: 4
        });
    }

    onClick() {
        var txtValue = $("#txtMainSearch").val();

        switch (txtValue) {
            case "Araçlar":
                this.router.navigate(['/Admin/Cars']);
                break;
            case "Araçlar (Dil)":
                this.router.navigate(['/Admin/CarsT']);
                break;
            case "Araç Detay (Temel)":
                this.router.navigate(['/Admin/CarDetailsBasic']);
                break;
            case "Araç Detay (Mekanik)":
                this.router.navigate(['/Admin/CarDetailsMechanical']);
                break;
            case "Araç Detay (İç-Dış)":
                this.router.navigate(['/Admin/CarDetailsExtInt']);
                break;
            case "Araç Detay (Özellik)":
                this.router.navigate(['/Admin/CarDetailsFeatures']);
                break;
            case "Marka":
                this.router.navigate(['/Admin/CarFeatsMake']);
                break;
            case "Model":
                this.router.navigate(['/Admin/CarFeatsModel']);
                break;
            case "Araç Durumu":
                this.router.navigate(['/Admin/CarStatus']);
                break;
            case "Araç Durumu (Dil)":
                this.router.navigate(['/Admin/CarStatusT']);
                break;
            case "Kasa Tipi":
                this.router.navigate(['/Admin/CarFeatsBodyType']);
                break;
            case "Kasa Tipi (Dil)":
                this.router.navigate(['/Admin/CarFeatsBodyTypeT']);
                break;
            case "Sürüş Tipi":
                this.router.navigate(['/Admin/CarFeatsDriveType']);
                break;
            case "Sürüş Tipi (Dil)":
                this.router.navigate(['/Admin/CarFeatsDriveTypeT']);
                break;
            case "Motor Tipi":
                this.router.navigate(['/Admin/CarFeatsEngineType']);
                break;
            case "Motor Tipi (Dil)":
                this.router.navigate(['/Admin/CarFeatsEngineTypeT']);
                break;
            case "Vites Tipi":
                this.router.navigate(['/Admin/CarFeatsGearsType']);
                break;
            case "Vites Tipi (Dil)":
                this.router.navigate(['/Admin/CarFeatsGearsTypeT']);
                break;
            case "Yakıt Tipi":
                this.router.navigate(['/Admin/CarFeatsFuelType']);
                break;
            case "Yakıt Tipi (Dil)":
                this.router.navigate(['/Admin/CarFeatsFuelTypeT']);
                break;
            case "Blog Kategorileri":
                this.router.navigate(['/Admin/BlogCategory']);
                break;
            case "Blog Kategorileri (Dil)":
                this.router.navigate(['/Admin/BlogCategoryT']);
                break;
            case "Blog Yazıları":
                this.router.navigate(['/Admin/Blog']);
                break;
            case "Blog Yazıları (Dil)":
                this.router.navigate(['/Admin/BlogT']);
                break;
            case "Blog Resimleri":
                this.router.navigate(['/Admin/BlogPictures']);
                break;
            case "Blog Videoları":
                this.router.navigate(['/Admin/BlogVideos']);
                break;
            case "Blog Yorumları":
                this.router.navigate(['/Admin/BlogComments']);
                break;
            case "Dil İçerikleri":
                this.router.navigate(['/Admin/LangContent']);
                break;
            case "Dil İçerikleri (Dil)":
                this.router.navigate(['/Admin/LangContentT']);
                break;
            case "Dilsiz İçerikler":
                this.router.navigate(['/Admin/NoLangContent']);
                break;
            case "Çalışanlar":
                this.router.navigate(['/Admin/Workers']);
                break;
            case "Çalışanlar (Dil)":
                this.router.navigate(['/Admin/WorkersT']);
                break;
            case "İletişim Formu":
                this.router.navigate(['/Admin/ContactForm']);
                break;
            case "Mail Grubu":
                this.router.navigate(['/Admin/Newsletter']);
                break;
            case "Kategoriler":
                this.router.navigate(['/Admin/Category']);
                break;
            case "Kategoriler (Dil)":
                this.router.navigate(['/Admin/CategoryT']);
                break;
            case "İçerikler":
                this.router.navigate(['/Admin/Content']);
                break;
            case "İçerikler (Dil)":
                this.router.navigate(['/Admin/ContentT']);
                break;
            case "Galeri":
                this.router.navigate(['/Admin/Gallery']);
                break;
            case "Galeri (Dil)":
                this.router.navigate(['/Admin/GalleryT']);
                break;
            case "Resimler":
                this.router.navigate(['/Admin/Pictures']);
                break;
            case "Dosyalar":
                this.router.navigate(['/Admin/Files']);
                break;
            case "Meta":
                this.router.navigate(['/Admin/Meta']);
                break;
            case "Meta (Dil)":
                this.router.navigate(['/Admin/MetaT']);
                break;
            case "Bağlı Tipler":
                this.router.navigate(['/Admin/LinkTypes']);
                break;
            case "Bağlantılar":
                this.router.navigate(['/Admin/Links']);
                break;
            case "Diller":
                this.router.navigate(['/Admin/Translation']);
                break;
            case "Kullanıcılar":
                this.router.navigate(['/Admin/Users']);
                break;
            default:
                alert("Aradığınız kelimeye uygun sonuç bulunamadı...");
                break;
        }
    }

    onLogout() {
        this.service.getLogout().subscribe((resData: any) => {
            if (resData == true) {
                this.router.navigate(['/Admin/Login']);
            }
        }, resError => this.errorMsg = resError);
    }

    onKeyPress(event: any) {
        if (event.keyCode == "13") {
            this.onClick();
        }
    }
}
