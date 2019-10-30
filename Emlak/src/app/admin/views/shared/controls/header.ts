﻿import { Component } from '@angular/core';
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
                'Ana Sayfa',
                'Emlaklar',
                'Emlaklar (Dil)',
                'Emlak Kategorileri',
                'Emlak Kategorileri (Dil)',
                'Emlak Detay',
                'Emlak Özellikleri',
                'Emlak Resimleri',
                'Şehirler',
                'Durumlar',
                'Durumlar (Dil)',
                'Yakıt Tipleri',
                'Yakıt Tipleri (Dil)',
                'Isınma Tipleri',
                'Isınma Tipleri (Dil)',
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
            case "Emlaklar":
                this.router.navigate(['/Admin/Property']);
                break;
            case "Emlaklar (Dil)":
                this.router.navigate(['/Admin/PropertyT']);
                break;
            case "Emlak Kategorileri":
                this.router.navigate(['/Admin/PropertyCategories']);
                break;
            case "Emlak Kategorileri (Dil)":
                this.router.navigate(['/Admin/PropertyCategoriesT']);
                break;
            case "Emlak Detay":
                this.router.navigate(['/Admin/PropertyDetails']);
                break;
            case "Emlak Özellikleri":
                this.router.navigate(['/Admin/PropertyFeatures']);
                break;
            case "Emlak Resimleri":
                this.router.navigate(['/Admin/PropertyPictures']);
                break;
            case "Şehirler":
                this.router.navigate(['/Admin/City']);
                break;
            case "Durumlar":
                this.router.navigate(['/Admin/PropertyStatus']);
                break;
            case "Durumlar (Dil)":
                this.router.navigate(['/Admin/PropertyStatusT']);
                break;
            case "Yakıt Tipleri":
                this.router.navigate(['/Admin/FuelType']);
                break;
            case "Yakıt Tipleri (Dil)":
                this.router.navigate(['/Admin/FuelTypeT']);
                break;
            case "Isınma Tipleri":
                this.router.navigate(['/Admin/WarmType']);
                break;
            case "Isınma Tipleri (Dil)":
                this.router.navigate(['/Admin/WarmTypeT']);
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
                this.router.navigate(['/Admin/Picture']);
                break;
            case "Dosyalar":
                this.router.navigate(['/Admin/File']);
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
            case "Dil İçerik":
                this.router.navigate(['/Admin/LangContent']);
                break;
            case "Dil İçerik (Dil)":
                this.router.navigate(['/Admin/LangContentT']);
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
                this.router.navigate(['/Admin/VisitorCounter']);
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
