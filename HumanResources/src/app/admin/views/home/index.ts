import { Component } from "@angular/core";
import { SharedService } from '../../services/shared';

@Component({
    templateUrl: './index.html'
})

export class AdminIndexComponent {
    errorMsg: string;

    hasRightGeneral: boolean = false;
    hasRightLinkTypes: boolean = false;
    hasRightLogs: boolean = false;
    hasRightUsers: boolean = false;
    hasRightTypes: boolean = false;
    hasRightWebsite: boolean = false;

    showTypeGeneral: boolean = false;
    showTypeLinkTypes: boolean = false;
    showTypeLogs: boolean = false;
    showTypeUsers: boolean = false;
    showTypeTypes: boolean = false;
    showTypeWebsite: boolean = false;

    constructor(private sharedService: SharedService) {
    }

    ngOnInit() {
        this.HasRightShowTypeControl();
    }

    HasRightShowTypeControl() {
        this.sharedService.getCurrentUserRights().subscribe((userRights: any) => {
            userRights.forEach((item, i) => {
                switch (item.Url) {
                    case "General":
                        switch (item.ShortName) {
                            case "s": this.hasRightGeneral = true; break;
                        }
                        break;
                    case "LinkTypes":
                        switch (item.ShortName) {
                            case "s": this.hasRightLinkTypes = true; break;
                        }
                        break;
                    case "Logs":
                        switch (item.ShortName) {
                            case "s": this.hasRightLogs = true; break;
                        }
                        break;
                    case "Users":
                        switch (item.ShortName) {
                            case "s": this.hasRightUsers = true; break;
                        }
                        break;
                    case "Types":
                        switch (item.ShortName) {
                            case "s": this.hasRightTypes = true; break;
                        }
                        break;
                    case "Website":
                        switch (item.ShortName) {
                            case "s": this.hasRightWebsite = true; break;
                        }
                        break;
                }
            });

            this.sharedService.getShowTypes().subscribe((typeShow: any) => {
                typeShow.forEach((item, i) => {
                    switch (item.Url) {
                        case "General": this.showTypeGeneral = true; break;
                        case "LinkTypes": this.showTypeLinkTypes = true; break;
                        case "Logs": this.showTypeLogs = true; break;
                        case "Users": this.showTypeUsers = true; break;
                        case "Types": this.showTypeTypes = true; break;
                        case "Website": this.showTypeWebsite = true; break;
                    }
                });
            }, resError => this.errorMsg = resError);
        }, resError => this.errorMsg = resError);
    }
}