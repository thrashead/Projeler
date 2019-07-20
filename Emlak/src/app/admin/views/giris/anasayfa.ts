import { Component } from "@angular/core";
import { SharedService } from '../../services/shared';

@Component({
    templateUrl: './anasayfa.html'
})

export class AdminAnaSayfaComponent {
    errorMsg: string;

    hasRightEmlak: boolean;
    showTypeEmlak: boolean;

    hasRightKategori: boolean;
    showTypeKategori: boolean;

    hasRightIcerik: boolean;
    showTypeIcerik: boolean;

    hasRightUrun: boolean;
    showTypeUrun: boolean;

    hasRightGaleri: boolean;
    showTypeGaleri: boolean;

    hasRightResim: boolean;
    showTypeResim: boolean;

    hasRightDosya: boolean;
    showTypeDosya: boolean;

    hasRightMeta: boolean;
    showTypeMeta: boolean;

    hasRightFormEleman: boolean;
    showTypeFormEleman: boolean;

    hasRightBagliTipler: boolean;
    showTypeBagliTipler: boolean;

    hasRightDil: boolean;
    showTypeDil: boolean;

    hasRightLoglar: boolean;
    showTypeLoglar: boolean;

    hasRightZiyaretci: boolean;
    showTypeZiyaretci: boolean;

    hasRightKullanicilar: boolean;
    showTypeKullanicilar: boolean;

    hasRightTipler: boolean;
    showTypeTipler: boolean;

    constructor(private sharedService: SharedService) {
    }

    ngOnInit() {
        this.hasRightControl();
        this.showTypeControl();
    }

    hasRightControl() {
        this.sharedService.getHasRight("Emlak", "s").subscribe((resData) => {
            this.hasRightEmlak = resData;
        }, resError => this.errorMsg = resError);

        this.sharedService.getHasRight("Kategori", "s").subscribe((resData) => {
            this.hasRightKategori = resData;
        }, resError => this.errorMsg = resError);

        this.sharedService.getHasRight("Icerik", "s").subscribe((resData) => {
            this.hasRightIcerik = resData;
        }, resError => this.errorMsg = resError);

        this.sharedService.getHasRight("Urun", "s").subscribe((resData) => {
            this.hasRightUrun = resData;
        }, resError => this.errorMsg = resError);

        this.sharedService.getHasRight("Galeri", "s").subscribe((resData) => {
            this.hasRightGaleri = resData;
        }, resError => this.errorMsg = resError);

        this.sharedService.getHasRight("Resim", "s").subscribe((resData) => {
            this.hasRightResim = resData;
        }, resError => this.errorMsg = resError);

        this.sharedService.getHasRight("Dosya", "s").subscribe((resData) => {
            this.hasRightDosya = resData;
        }, resError => this.errorMsg = resError);

        this.sharedService.getHasRight("Meta", "s").subscribe((resData) => {
            this.hasRightMeta = resData;
        }, resError => this.errorMsg = resError);

        this.sharedService.getHasRight("FormEleman", "s").subscribe((resData) => {
            this.hasRightFormEleman = resData;
        }, resError => this.errorMsg = resError);

        this.sharedService.getHasRight("BagliTipler", "s").subscribe((resData) => {
            this.hasRightBagliTipler = resData;
        }, resError => this.errorMsg = resError);

        this.sharedService.getHasRight("Dil", "s").subscribe((resData) => {
            this.hasRightDil = resData;
        }, resError => this.errorMsg = resError);

        this.sharedService.getHasRight("Loglar", "s").subscribe((resData) => {
            this.hasRightLoglar = resData;
        }, resError => this.errorMsg = resError);

        this.sharedService.getHasRight("Ziyaretci", "s").subscribe((resData) => {
            this.hasRightZiyaretci = resData;
        }, resError => this.errorMsg = resError);

        this.sharedService.getHasRight("Kullanicilar", "s").subscribe((resData) => {
            this.hasRightKullanicilar = resData;
        }, resError => this.errorMsg = resError);

        this.sharedService.getHasRight("Tipler", "s").subscribe((resData) => {
            this.hasRightTipler = resData;
        }, resError => this.errorMsg = resError);
    }

    showTypeControl() {
        this.sharedService.getShowType("Emlak").subscribe((resData) => {
            this.showTypeEmlak = resData;
        }, resError => this.errorMsg = resError);

        this.sharedService.getShowType("Kategori").subscribe((resData) => {
            this.showTypeKategori = resData;
        }, resError => this.errorMsg = resError);

        this.sharedService.getShowType("Icerik").subscribe((resData) => {
            this.showTypeIcerik = resData;
        }, resError => this.errorMsg = resError);

        this.sharedService.getShowType("Urun").subscribe((resData) => {
            this.showTypeUrun = resData;
        }, resError => this.errorMsg = resError);

        this.sharedService.getShowType("Galeri").subscribe((resData) => {
            this.showTypeGaleri = resData;
        }, resError => this.errorMsg = resError);

        this.sharedService.getShowType("Resim").subscribe((resData) => {
            this.showTypeResim = resData;
        }, resError => this.errorMsg = resError);

        this.sharedService.getShowType("Dosya").subscribe((resData) => {
            this.showTypeDosya = resData;
        }, resError => this.errorMsg = resError);

        this.sharedService.getShowType("Meta").subscribe((resData) => {
            this.showTypeMeta = resData;
        }, resError => this.errorMsg = resError);

        this.sharedService.getShowType("FormEleman").subscribe((resData) => {
            this.showTypeFormEleman = resData;
        }, resError => this.errorMsg = resError);

        this.sharedService.getShowType("BagliTipler").subscribe((resData) => {
            this.showTypeBagliTipler = resData;
        }, resError => this.errorMsg = resError);

        this.sharedService.getShowType("Dil").subscribe((resData) => {
            this.showTypeDil = resData;
        }, resError => this.errorMsg = resError);

        this.sharedService.getShowType("Loglar").subscribe((resData) => {
            this.showTypeLoglar = resData;
        }, resError => this.errorMsg = resError);

        this.sharedService.getShowType("Ziyaretci").subscribe((resData) => {
            this.showTypeZiyaretci = resData;
        }, resError => this.errorMsg = resError);

        this.sharedService.getShowType("Kullanicilar").subscribe((resData) => {
            this.showTypeKullanicilar = resData;
        }, resError => this.errorMsg = resError);

        this.sharedService.getShowType("Tipler").subscribe((resData) => {
            this.showTypeTipler = resData;
        }, resError => this.errorMsg = resError);
    }
}