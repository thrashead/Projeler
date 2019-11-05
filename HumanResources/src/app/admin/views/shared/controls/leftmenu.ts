import { Component, AfterViewInit } from '@angular/core';
import { SharedService } from '../../../services/shared';
import { Router, RouterEvent, ActivationEnd } from '@angular/router';

@Component({
    selector: 'admin-leftmenu',
    templateUrl: './leftmenu.html'
})

export class AdminLeftMenuComponent implements AfterViewInit {
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

    constructor(private sharedService: SharedService, private router: Router) {
    }

    ngAfterViewInit() {
        this.HasRightShowTypeControl();

        this.router.events.subscribe((event: RouterEvent) => {
            if (event instanceof ActivationEnd) {
                this.LinkActivation();
            }
        });
    }

    LinkActivation() {
        $("#hdnUrl").val(location.href);

        var AdminPath = "http://localhost/HumanResources/Admin";
        var Url = location.href;
        var Urling = Object();

        if (Url != undefined) {
            var tempurl = Url.replace(AdminPath + "/", "");
            var extParams = tempurl.split('?')[1];

            tempurl = tempurl.replace("?" + extParams, "");

            Urling.path = tempurl;
            Urling.controller = tempurl.split('/')[0];
            Urling.action = tempurl.split('/')[1];
            Urling.parameter = tempurl.split('/')[2];

            if (extParams != undefined)
                Urling.parameters = extParams.split('&');
        }

        if (Urling.controller != undefined) {
            var activeLi = $("#sidebar li[data-url='" + Urling.controller + "']");
            var passiveSubmenuLi = $("#sidebar li.submenu");
            var submenuLi = activeLi.parent("ul").parent("li");

            $("#sidebar li").removeClass("active");
            $("#sidebar li").removeClass("open");

            activeLi.addClass("active");

            if (submenuLi.hasClass("submenu")) {
                if ($("body").width() > 970 || $("body").width() <= 480) {
                    submenuLi.addClass("open");
                }
                submenuLi.addClass("active");
            }

            setTimeout(function () {
                passiveSubmenuLi.each(function () {
                    if (!$(this).hasClass("open")) {
                        $(this).children("ul").slideUp();
                    }
                    else {
                        $(this).children("ul").slideDown();
                    }
                });
            }, 1);
        }
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
                    this.LinkActivation();
                });
            }, resError => this.errorMsg = resError);
        }, resError => this.errorMsg = resError);
    }
}
