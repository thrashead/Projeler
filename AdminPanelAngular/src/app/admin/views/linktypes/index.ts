﻿import { Component } from "@angular/core";
import { ModelService } from "../../services/model";
import { SharedService } from '../../services/shared';
import { Router } from '@angular/router';
declare var DataTable;

@Component({
    templateUrl: './index.html'
})

export class AdminLinkTypesIndexComponent {
    errorMsg: string;
    mainTypeTitle: string;
    BagliTiplerList: {};

    insertShow: boolean;
    updateShow: boolean;
    deleteShow: boolean;
    copyShow: boolean;

    callTable: boolean;

    constructor(private service: ModelService, private sharedService: SharedService, private router: Router) {
    }

    ngOnInit() {
        this.callTable = true;
        this.UserRightsControl($("#hdnType").val());
    }

    UserRightsControl(Model: any) {
        this.sharedService.getHasRight(Model, "i").subscribe((iRight: boolean) => {
            this.insertShow = iRight;
            this.sharedService.getHasRight(Model, "u").subscribe((uRight: boolean) => {
                this.updateShow = uRight;
                this.sharedService.getHasRight(Model, "d").subscribe((dRight: boolean) => {
                    this.deleteShow = dRight;
                    this.sharedService.getHasRight(Model, "c").subscribe((cRight: boolean) => {
                        this.copyShow = cRight;

                        if (this.callTable == true) {
                            this.service.get("LinkTypes", "Index").subscribe((resData: any) => {
                                for (var i = 0; i < resData.length; i++) {
                                    switch (resData[i].MainTypeID) {
                                        case 1: resData[i].MainAdi = resData[i].MainCategoryAdi; break;
                                        case 2: resData[i].MainAdi = resData[i].MainContentAdi; break;
                                        case 3: resData[i].MainAdi = resData[i].MainProductAdi; break;
                                        case 4: resData[i].MainAdi = resData[i].MainGalleryAdi; break;
                                        case 5: resData[i].MainAdi = resData[i].MainPicturesAdi; break;
                                        case 6: resData[i].MainAdi = resData[i].MainFilesAdi; break;
                                        case 7: resData[i].MainAdi = resData[i].MainMetaAdi; break;
                                    }
                                }

                                this.BagliTiplerList = resData;
                                this.callTable = false;

                                DataTable();

                                $(document).off("click", ".fg-button").on("click", ".fg-button", () => {
                                    setTimeout(() => {
                                        this.UserRightsControl($("#hdnType").val());
                                    }, 1);
                                });
                            }, resError => this.errorMsg = resError);
                        }

                        setTimeout(() => {
                            if ($(".dropdown-menu").first().find("a").length <= 0) {
                                $(".btn-group").remove();
                            }
                        }, 1);

                    }, resError => this.errorMsg = resError);
                }, resError => this.errorMsg = resError);
            }, resError => this.errorMsg = resError);
        }, resError => this.errorMsg = resError);
    }
}