import { Component } from "@angular/core";
import { ModelService } from "../../../services/model";
import { SharedService } from '../../../services/shared';
import { Router } from '@angular/router';
declare var DataTable;

@Component({
    templateUrl: './index.html'
})

export class AdminLogsIndexComponent {
    errorMsg: string;
    LoglarList: {};

    deleteShow: boolean;

    callTable: boolean;

    constructor(private service: ModelService, private sharedService: SharedService, private router: Router) {
    }

    ngOnInit() {
        this.callTable = true;
        this.UserRightsControl($("#hdnType").val());
    }

    UserRightsControl(Model: any) {
        this.sharedService.getHasRight(Model, "d").subscribe((dRight: boolean) => {
            this.deleteShow = dRight;

            if (this.callTable == true) {
                this.service.get("Logs", "Index").subscribe((resData: any) => {
                    this.LoglarList = resData;
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
    }
}