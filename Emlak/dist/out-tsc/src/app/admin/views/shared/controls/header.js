import * as tslib_1 from "tslib";
import { Component } from '@angular/core';
import { SharedService } from '../../../services/shared';
import { Router } from '@angular/router';
var AdminHeaderComponent = /** @class */ (function () {
    function AdminHeaderComponent(service, router) {
        this.service = service;
        this.router = router;
    }
    AdminHeaderComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.service.getCurrentUser().subscribe(function (resData) {
            if (resData != null) {
                _this.kullanici = resData;
            }
        }, function (resError) { return _this.errorMsg = resError; });
        $('#txtMainSearch').typeahead({
            source: [
                'Kategoriler',
                'Kategoriler (Dil)',
                'İçerikler',
                'İçerikler (Dil)',
                'Ürünler',
                'Ürünler (Dil)',
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
    };
    AdminHeaderComponent.prototype.onClick = function () {
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
            case "Ürünler":
                this.router.navigate(['/Admin/Urun']);
                break;
            case "Ürünler (Dil)":
                this.router.navigate(['/Admin/UrunDil']);
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
            case "Kullanıcılar":
                this.router.navigate(['/Admin/Kullanicilar']);
                break;
            default:
                alert("Aradığınız kelimeye uygun sonuç bulunamadı...");
                break;
        }
    };
    AdminHeaderComponent.prototype.onLogout = function () {
        var _this = this;
        this.service.getLogout().subscribe(function (resData) {
            if (resData == true) {
                window.location.href = '/Emlak/';
            }
        }, function (resError) { return _this.errorMsg = resError; });
    };
    AdminHeaderComponent.prototype.onKeyPress = function (event) {
        if (event.keyCode == "13") {
            this.onClick();
        }
    };
    AdminHeaderComponent = tslib_1.__decorate([
        Component({
            selector: 'admin-header',
            templateUrl: './header.html'
        }),
        tslib_1.__metadata("design:paramtypes", [SharedService, Router])
    ], AdminHeaderComponent);
    return AdminHeaderComponent;
}());
export { AdminHeaderComponent };
//# sourceMappingURL=header.js.map