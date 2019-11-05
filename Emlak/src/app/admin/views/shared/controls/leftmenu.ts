import { Component, AfterContentInit } from '@angular/core';
import { SharedService } from '../../../services/shared';
import { Router, RouterEvent, ActivationEnd } from '@angular/router';
import { AdminLib } from '../../../lib/methods';

@Component({
    selector: 'admin-leftmenu',
    templateUrl: './leftmenu.html'
})

export class AdminLeftMenuComponent implements AfterContentInit {
    errorMsg: string;

    constructor(private sharedService: SharedService, private router: Router) {
    }

    ngAfterContentInit() {
        this.HasRightShowTypeControl();

        this.router.events.subscribe((event: RouterEvent) => {
            if (event instanceof ActivationEnd) {
                AdminLib.LinkActivation();
            }
        });
    }

    hasRightCategory: boolean = false;
    hasRightContent: boolean = false;
    hasRightGallery: boolean = false;
    hasRightPicture: boolean = false;
    hasRightFile: boolean = false;
    hasRightMeta: boolean = false;
    hasRightLinkTypes: boolean = false;
    hasRightTranslation: boolean = false;
    hasRightLogs: boolean = false;
    hasRightWebsite: boolean = false;
    hasRightUsers: boolean = false;
    hasRightTypes: boolean = false;

    showTypeCategory: boolean = false;
    showTypeContent: boolean = false;
    showTypeGallery: boolean = false;
    showTypePicture: boolean = false;
    showTypeFile: boolean = false;
    showTypeMeta: boolean = false;
    showTypeLinkTypes: boolean = false;
    showTypeTranslation: boolean = false;
    showTypeLogs: boolean = false;
    showTypeWebsite: boolean = false;
    showTypeUsers: boolean = false;
    showTypeTypes: boolean = false;

    HasRightShowTypeControl() {
        this.sharedService.getCurrentUserRights().subscribe((userRights: any) => {
            userRights.forEach((item, i) => {
                this.hasRightCategory = AdminLib.UserRight(userRights, "Category");
                this.hasRightContent = AdminLib.UserRight(userRights, "Content");
                this.hasRightGallery = AdminLib.UserRight(userRights, "Gallery");
                this.hasRightPicture = AdminLib.UserRight(userRights, "Picture");
                this.hasRightFile = AdminLib.UserRight(userRights, "File");
                this.hasRightMeta = AdminLib.UserRight(userRights, "Meta");
                this.hasRightLinkTypes = AdminLib.UserRight(userRights, "LinkTypes");
                this.hasRightTranslation = AdminLib.UserRight(userRights, "Translation");
                this.hasRightLogs = AdminLib.UserRight(userRights, "Logs");
                this.hasRightUsers = AdminLib.UserRight(userRights, "Users");
                this.hasRightTypes = AdminLib.UserRight(userRights, "Types");
                this.hasRightWebsite = AdminLib.UserRight(userRights, "Website");
            });

            this.sharedService.getShowTypes().subscribe((showTypes: any) => {
                this.showTypeCategory = AdminLib.ShowType(showTypes, "Category");
                this.showTypeContent = AdminLib.ShowType(showTypes, "Content");
                this.showTypeGallery = AdminLib.ShowType(showTypes, "Gallery");
                this.showTypePicture = AdminLib.ShowType(showTypes, "Picture");
                this.showTypeFile = AdminLib.ShowType(showTypes, "File");
                this.showTypeMeta = AdminLib.ShowType(showTypes, "Meta");
                this.showTypeLinkTypes = AdminLib.ShowType(showTypes, "LinkTypes");
                this.showTypeTranslation = AdminLib.ShowType(showTypes, "Translation");
                this.showTypeLogs = AdminLib.ShowType(showTypes, "Logs");
                this.showTypeUsers = AdminLib.ShowType(showTypes, "Users");
                this.showTypeTypes = AdminLib.ShowType(showTypes, "Types");
                this.showTypeWebsite = AdminLib.ShowType(showTypes, "Website");

                AdminLib.LinkActivation();
            }, resError => this.errorMsg = resError);
        }, resError => this.errorMsg = resError);
    }
}
