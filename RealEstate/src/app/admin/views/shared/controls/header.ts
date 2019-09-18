import { Component } from '@angular/core';
import { SharedService } from '../../../services/shared';
import { Router } from '@angular/router';

@Component({
    selector: 'admin-header',
    templateUrl: './header.html'
})

export class AdminHeaderComponent {
    errorMsg: string;
    website: string = "http://localhost/RealEstate/";

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
                'Kullanıcılar'
            ],
            items: 4
        });
    }

    onClick() {
        var txtValue = $("#txtMainSearch").val();

        switch (txtValue) {
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
