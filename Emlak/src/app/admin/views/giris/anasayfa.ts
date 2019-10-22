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

    hasRightGaleri: boolean;
    showTypeGaleri: boolean;

    hasRightResim: boolean;
    showTypeResim: boolean;

    hasRightDosya: boolean;
    showTypeDosya: boolean;

    hasRightMeta: boolean;
    showTypeMeta: boolean;

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
        this.sharedService.getHasRight("Emlak", "s").subscribe((resData: any) => {
            this.hasRightEmlak = resData;
        }, resError => this.errorMsg = resError);

        this.sharedService.getHasRight("Kategori", "s").subscribe((resData: any) => {
            this.hasRightKategori = resData;
        }, resError => this.errorMsg = resError);

        this.sharedService.getHasRight("Icerik", "s").subscribe((resData: any) => {
            this.hasRightIcerik = resData;
        }, resError => this.errorMsg = resError);

        this.sharedService.getHasRight("Galeri", "s").subscribe((resData: any) => {
            this.hasRightGaleri = resData;
        }, resError => this.errorMsg = resError);

        this.sharedService.getHasRight("Resim", "s").subscribe((resData: any) => {
            this.hasRightResim = resData;
        }, resError => this.errorMsg = resError);

        this.sharedService.getHasRight("Dosya", "s").subscribe((resData: any) => {
            this.hasRightDosya = resData;
        }, resError => this.errorMsg = resError);

        this.sharedService.getHasRight("Meta", "s").subscribe((resData: any) => {
            this.hasRightMeta = resData;
        }, resError => this.errorMsg = resError);

        this.sharedService.getHasRight("BagliTipler", "s").subscribe((resData: any) => {
            this.hasRightBagliTipler = resData;
        }, resError => this.errorMsg = resError);

        this.sharedService.getHasRight("Dil", "s").subscribe((resData: any) => {
            this.hasRightDil = resData;
        }, resError => this.errorMsg = resError);

        this.sharedService.getHasRight("Loglar", "s").subscribe((resData: any) => {
            this.hasRightLoglar = resData;
        }, resError => this.errorMsg = resError);

        this.sharedService.getHasRight("Ziyaretci", "s").subscribe((resData: any) => {
            this.hasRightZiyaretci = resData;
        }, resError => this.errorMsg = resError);

        this.sharedService.getHasRight("Kullanicilar", "s").subscribe((resData: any) => {
            this.hasRightKullanicilar = resData;
        }, resError => this.errorMsg = resError);

        this.sharedService.getHasRight("Tipler", "s").subscribe((resData: any) => {
            this.hasRightTipler = resData;
        }, resError => this.errorMsg = resError);
    }

    showTypeControl() {
        this.sharedService.getShowType("Emlak").subscribe((resData: any) => {
            this.showTypeEmlak = resData;
        }, resError => this.errorMsg = resError);

        this.sharedService.getShowType("Kategori").subscribe((resData: any) => {
            this.showTypeKategori = resData;
        }, resError => this.errorMsg = resError);

        this.sharedService.getShowType("Icerik").subscribe((resData: any) => {
            this.showTypeIcerik = resData;
        }, resError => this.errorMsg = resError);

        this.sharedService.getShowType("Galeri").subscribe((resData: any) => {
            this.showTypeGaleri = resData;
        }, resError => this.errorMsg = resError);

        this.sharedService.getShowType("Resim").subscribe((resData: any) => {
            this.showTypeResim = resData;
        }, resError => this.errorMsg = resError);

        this.sharedService.getShowType("Dosya").subscribe((resData: any) => {
            this.showTypeDosya = resData;
        }, resError => this.errorMsg = resError);

        this.sharedService.getShowType("Meta").subscribe((resData: any) => {
            this.showTypeMeta = resData;
        }, resError => this.errorMsg = resError);

        this.sharedService.getShowType("BagliTipler").subscribe((resData: any) => {
            this.showTypeBagliTipler = resData;
        }, resError => this.errorMsg = resError);

        this.sharedService.getShowType("Dil").subscribe((resData: any) => {
            this.showTypeDil = resData;
        }, resError => this.errorMsg = resError);

        this.sharedService.getShowType("Loglar").subscribe((resData: any) => {
            this.showTypeLoglar = resData;
        }, resError => this.errorMsg = resError);

        this.sharedService.getShowType("Ziyaretci").subscribe((resData: any) => {
            this.showTypeZiyaretci = resData;
        }, resError => this.errorMsg = resError);

        this.sharedService.getShowType("Kullanicilar").subscribe((resData: any) => {
            this.showTypeKullanicilar = resData;
        }, resError => this.errorMsg = resError);

        this.sharedService.getShowType("Tipler").subscribe((resData: any) => {
            this.showTypeTipler = resData;
        }, resError => this.errorMsg = resError);
    }
}