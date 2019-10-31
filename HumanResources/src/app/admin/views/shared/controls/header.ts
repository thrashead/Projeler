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
                'Ana Sayfa',
                'Kategoriler',
                'İçerikler',
                'Galeri',
                'Resimler',
                'Dosyalar',
                'Meta',
                'Bağlı Tipler',
                'Bağlantılar',
                'Loglar',
                'Log Tipleri',
                'Log İşlemleri',
                'Ziyaretçiler',
                'Kullanıcılar',
                'Kullanıcı Grupları',
                'Kullanıcı Grup Tabloları',
                'Kullanıcı Grup Hakları',
                'Kullanıcı Grup İşlemleri',
                'Tipler'
            ],
            items: 4
        });
    }

    onClick() {
        var txtValue = $("#txtMainSearch").val();

        switch (txtValue) {
            case "Ana Sayfa":
                this.router.navigate(['/Admin/Index']);
                break;
            case "Kategoriler":
                this.router.navigate(['/Admin/Category']);
                break;
            case "İçerikler":
                this.router.navigate(['/Admin/Content']);
                break;
            case "Galeri":
                this.router.navigate(['/Admin/Gallery']);
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
            case "Bağlı Tipler":
                this.router.navigate(['/Admin/LinkTypes']);
                break;
            case "Bağlantılar":
                this.router.navigate(['/Admin/Links']);
                break;
            case "Loglar":
                this.router.navigate(['/Admin/Logs']);
                break;
            case "Log Tipleri":
                this.router.navigate(['/Admin/LogTypes']);
                break;
            case "Log İşlemleri":
                this.router.navigate(['/Admin/LogProcess']);
                break;
            case "Ziyaretçiler":
                this.router.navigate(['/Admin/Visitors']);
                break;
            case "Kullanıcılar":
                this.router.navigate(['/Admin/Users']);
                break;
            case "Kullanıcı Grupları":
                this.router.navigate(['/Admin/UserGroups']);
                break;
            case "Kullanıcı Grup Tabloları":
                this.router.navigate(['/Admin/UserGroupTables']);
                break;
            case "Kullanıcı Grup Hakları":
                this.router.navigate(['/Admin/UserGroupRights']);
                break;
            case "Kullanıcı Grup İşlemleri":
                this.router.navigate(['/Admin/UserGroupProcess']);
                break;
            case "Tipler":
                this.router.navigate(['/Admin/Types']);
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
