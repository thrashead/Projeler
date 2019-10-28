import { Component } from "@angular/core";
import { SharedService } from '../../services/shared';

@Component({
    templateUrl: './index.html'
})

export class AdminIndexComponent {
    errorMsg: string;

    hasRightWebsite: boolean;
    showTypeWebsite: boolean;

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
        this.sharedService.getHasRight("Website", "s").subscribe((resData: any) => {
            this.hasRightWebsite = resData;
        }, resError => this.errorMsg = resError);

        this.sharedService.getHasRight("Category", "s").subscribe((resData: any) => {
            this.hasRightKategori = resData;
        }, resError => this.errorMsg = resError);

        this.sharedService.getHasRight("Content", "s").subscribe((resData: any) => {
            this.hasRightIcerik = resData;
        }, resError => this.errorMsg = resError);

        this.sharedService.getHasRight("Gallery", "s").subscribe((resData: any) => {
            this.hasRightGaleri = resData;
        }, resError => this.errorMsg = resError);

        this.sharedService.getHasRight("Picture", "s").subscribe((resData: any) => {
            this.hasRightResim = resData;
        }, resError => this.errorMsg = resError);

        this.sharedService.getHasRight("File", "s").subscribe((resData: any) => {
            this.hasRightDosya = resData;
        }, resError => this.errorMsg = resError);

        this.sharedService.getHasRight("Meta", "s").subscribe((resData: any) => {
            this.hasRightMeta = resData;
        }, resError => this.errorMsg = resError);

        this.sharedService.getHasRight("LinkTypes", "s").subscribe((resData: any) => {
            this.hasRightBagliTipler = resData;
        }, resError => this.errorMsg = resError);

        this.sharedService.getHasRight("Translation", "s").subscribe((resData: any) => {
            this.hasRightDil = resData;
        }, resError => this.errorMsg = resError);

        this.sharedService.getHasRight("Logs", "s").subscribe((resData: any) => {
            this.hasRightLoglar = resData;
        }, resError => this.errorMsg = resError);

        this.sharedService.getHasRight("VisitorCounter", "s").subscribe((resData: any) => {
            this.hasRightZiyaretci = resData;
        }, resError => this.errorMsg = resError);

        this.sharedService.getHasRight("Users", "s").subscribe((resData: any) => {
            this.hasRightKullanicilar = resData;
        }, resError => this.errorMsg = resError);

        this.sharedService.getHasRight("Types", "s").subscribe((resData: any) => {
            this.hasRightTipler = resData;
        }, resError => this.errorMsg = resError);
    }

    showTypeControl() {
        this.sharedService.getShowType("RealEstates").subscribe((resData: any) => {
            this.showTypeWebsite = resData;
        }, resError => this.errorMsg = resError);

        this.sharedService.getShowType("Category").subscribe((resData: any) => {
            this.showTypeKategori = resData;
        }, resError => this.errorMsg = resError);

        this.sharedService.getShowType("Content").subscribe((resData: any) => {
            this.showTypeIcerik = resData;
        }, resError => this.errorMsg = resError);

        this.sharedService.getShowType("Gallery").subscribe((resData: any) => {
            this.showTypeGaleri = resData;
        }, resError => this.errorMsg = resError);

        this.sharedService.getShowType("Picture").subscribe((resData: any) => {
            this.showTypeResim = resData;
        }, resError => this.errorMsg = resError);

        this.sharedService.getShowType("File").subscribe((resData: any) => {
            this.showTypeDosya = resData;
        }, resError => this.errorMsg = resError);

        this.sharedService.getShowType("Meta").subscribe((resData: any) => {
            this.showTypeMeta = resData;
        }, resError => this.errorMsg = resError);

        this.sharedService.getShowType("LinkTypes").subscribe((resData: any) => {
            this.showTypeBagliTipler = resData;
        }, resError => this.errorMsg = resError);

        this.sharedService.getShowType("Translation").subscribe((resData: any) => {
            this.showTypeDil = resData;
        }, resError => this.errorMsg = resError);

        this.sharedService.getShowType("Logs").subscribe((resData: any) => {
            this.showTypeLoglar = resData;
        }, resError => this.errorMsg = resError);

        this.sharedService.getShowType("VisitorCounter").subscribe((resData: any) => {
            this.showTypeZiyaretci = resData;
        }, resError => this.errorMsg = resError);

        this.sharedService.getShowType("Users").subscribe((resData: any) => {
            this.showTypeKullanicilar = resData;
        }, resError => this.errorMsg = resError);

        this.sharedService.getShowType("Types").subscribe((resData: any) => {
            this.showTypeTipler = resData;
        }, resError => this.errorMsg = resError);
    }
}