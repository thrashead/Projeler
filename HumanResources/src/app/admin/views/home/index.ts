import { Component } from "@angular/core";
import { SharedService } from '../../services/shared';

@Component({
    templateUrl: './index.html'
})

export class AdminIndexComponent {
    errorMsg: string;

    hasRightCategory: boolean;
    showTypeCategory: boolean;

    hasRightContent: boolean;
    showTypeContent: boolean;

    hasRightPictures: boolean;
    showTypePictures: boolean;

    hasRightFiles: boolean;
    showTypeFiles: boolean;

    hasRightMeta: boolean;
    showTypeMeta: boolean;

    hasRightLinkTypes: boolean;
    showTypeLinkTypes: boolean;

    hasRightLogs: boolean;
    showTypeLogs: boolean;

    hasRightUsers: boolean;
    showTypeUsers: boolean;

    hasRightTypes: boolean;
    showTypeTypes: boolean;

    hasRightWebsite: boolean;
    showTypeWebsite: boolean;

    constructor(private sharedService: SharedService) {
    }

    ngOnInit() {
        this.hasRightControl();
        this.showTypeControl();
    }

    hasRightControl() {
        this.sharedService.getHasRight("Category", "s").subscribe((resData: any) => {
            this.hasRightCategory = resData;
        }, resError => this.errorMsg = resError);

        this.sharedService.getHasRight("Content", "s").subscribe((resData: any) => {
            this.hasRightContent = resData;
        }, resError => this.errorMsg = resError);

        this.sharedService.getHasRight("Pictures", "s").subscribe((resData: any) => {
            this.hasRightPictures = resData;
        }, resError => this.errorMsg = resError);

        this.sharedService.getHasRight("Files", "s").subscribe((resData: any) => {
            this.hasRightFiles = resData;
        }, resError => this.errorMsg = resError);

        this.sharedService.getHasRight("Meta", "s").subscribe((resData: any) => {
            this.hasRightMeta = resData;
        }, resError => this.errorMsg = resError);

        this.sharedService.getHasRight("LinkTypes", "s").subscribe((resData: any) => {
            this.hasRightLinkTypes = resData;
        }, resError => this.errorMsg = resError);

        this.sharedService.getHasRight("Logs", "s").subscribe((resData: any) => {
            this.hasRightLogs = resData;
        }, resError => this.errorMsg = resError);

        this.sharedService.getHasRight("Users", "s").subscribe((resData: any) => {
            this.hasRightUsers = resData;
        }, resError => this.errorMsg = resError);

        this.sharedService.getHasRight("Types", "s").subscribe((resData: any) => {
            this.hasRightTypes = resData;
        }, resError => this.errorMsg = resError);

        this.sharedService.getHasRight("Website", "s").subscribe((resData: any) => {
            this.hasRightWebsite = resData;
        }, resError => this.errorMsg = resError);
    }

    showTypeControl() {
        this.sharedService.getShowType("Category").subscribe((resData: any) => {
            this.showTypeCategory = resData;
        }, resError => this.errorMsg = resError);

        this.sharedService.getShowType("Content").subscribe((resData: any) => {
            this.showTypeContent = resData;
        }, resError => this.errorMsg = resError);

        this.sharedService.getShowType("Pictures").subscribe((resData: any) => {
            this.showTypePictures = resData;
        }, resError => this.errorMsg = resError);

        this.sharedService.getShowType("Files").subscribe((resData: any) => {
            this.showTypeFiles = resData;
        }, resError => this.errorMsg = resError);

        this.sharedService.getShowType("Meta").subscribe((resData: any) => {
            this.showTypeMeta = resData;
        }, resError => this.errorMsg = resError);

        this.sharedService.getShowType("LinkTypes").subscribe((resData: any) => {
            this.showTypeLinkTypes = resData;
        }, resError => this.errorMsg = resError);

        this.sharedService.getShowType("Logs").subscribe((resData: any) => {
            this.showTypeLogs = resData;
        }, resError => this.errorMsg = resError);

        this.sharedService.getShowType("Users").subscribe((resData: any) => {
            this.showTypeUsers = resData;
        }, resError => this.errorMsg = resError);

        this.sharedService.getShowType("Types").subscribe((resData: any) => {
            this.showTypeTypes = resData;
        }, resError => this.errorMsg = resError);

        this.sharedService.getShowType("Website").subscribe((resData: any) => {
            this.showTypeWebsite = resData;
        }, resError => this.errorMsg = resError);
    }
}