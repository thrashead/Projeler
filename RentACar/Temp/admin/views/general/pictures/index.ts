﻿import { Component } from "@angular/core";
import { ModelService } from "../../../services/model";
import { SharedService } from '../../../services/shared';
import { AdminLib } from '../../../lib/methods';
declare var DataTable;

@Component({
    templateUrl: './index.html'
})

export class AdminPicturesIndexComponent {
    errorMsg: string;
    ResimList: any;

    insertShow: boolean = false;
    updateShow: boolean = false;
    deleteShow: boolean = false;
    removeShow: boolean = false;

    callTable: boolean;

    constructor(private service: ModelService, private sharedService: SharedService) {
    }

    ngOnInit() {
        this.callTable = true;
        this.FillData($("#hdnType").val());
    }

    FillData(Model: any) {
        this.sharedService.getCurrentUserRights(Model).subscribe((userRights: any) => {
            this.insertShow = AdminLib.UserRight(userRights, Model, "i");
            this.updateShow = AdminLib.UserRight(userRights, Model, "u");
            this.deleteShow = AdminLib.UserRight(userRights, Model, "d");
            this.removeShow = AdminLib.UserRight(userRights, Model, "r");

            if (this.callTable == true) {
                this.service.get("Pictures", "Index").subscribe((resData: any) => {
                    this.ResimList = resData;
                    this.callTable = false;

                    DataTable();

                    $(document).off("click", ".fg-button").on("click", ".fg-button", () => {
                        setTimeout(() => {
                            this.FillData($("#hdnType").val());
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
    }
}