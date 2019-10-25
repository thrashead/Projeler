import { Component } from '@angular/core';
import { SharedService } from '../../../services/shared';
import { Router } from '@angular/router';

@Component({
    selector: 'admin-header',
    templateUrl: './header.html'
})

export class AdminHeaderComponent {
    errorMsg: string;
    website: string = "http://localhost/Emlak/";

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
                'Dil İçerik',
                'Dil İçerik (Dil)',
                'Kullanıcılar'
            ],
            items: 4
        });
    }

    onClick() {
        var txtValue = $("#txtMainSearch").val();

        switch (txtValue) {
            case "Kategoriler":
                this.router.navigate(['/Admin/Kategori']);
                break;
            case "Kategoriler (Dil)":
                this.router.navigate(['/Admin/KategoriDil']);
                break;
            case "İçerikler":
                this.router.navigate(['/Admin/Icerik']);
                break;
            case "İçerikler (Dil)":
                this.router.navigate(['/Admin/IcerikDil']);
                break;
            case "Galeri":
                this.router.navigate(['/Admin/Galeri']);
                break;
            case "Galeri (Dil)":
                this.router.navigate(['/Admin/GaleriDil']);
                break;
            case "Resimler":
                this.router.navigate(['/Admin/Resim']);
                break;
            case "Dosyalar":
                this.router.navigate(['/Admin/Dosya']);
                break;
            case "Meta":
                this.router.navigate(['/Admin/Meta']);
                break;
            case "Meta (Dil)":
                this.router.navigate(['/Admin/MetaDil']);
                break;
            case "Bağlı Tipler":
                this.router.navigate(['/Admin/BagliTipler']);
                break;
            case "Bağlantılar":
                this.router.navigate(['/Admin/Baglanti']);
                break;
            case "Diller":
                this.router.navigate(['/Admin/Dil']);
                break;
            case "Dil İçerik":
                this.router.navigate(['/Admin/DilIcerik']);
                break;
            case "Dil İçerik (Dil)":
                this.router.navigate(['/Admin/DilIcerikDil']);
                break;
            case "Kullanıcılar":
                this.router.navigate(['/Admin/Kullanicilar']);
                break;
            default:
                alert("Aradığınız kelimeye uygun sonuç bulunamadı...");
                break;
        }
    }

    onLogout() {
        this.service.getLogout().subscribe((resData: any) => {
            if (resData == true) {
                window.location.href = '/Emlak/';
            }
        }, resError => this.errorMsg = resError);
    }

    onKeyPress(event: any) {
        if (event.keyCode == "13") {
            this.onClick();
        }
    }
}
