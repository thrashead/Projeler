import { Component } from "@angular/core";
import { ZiyaretciService } from "../../services/ziyaretci";
import { SharedService } from '../../services/shared';
import { Router } from '@angular/router';
import * as $ from "jquery";

@Component({
    templateUrl: './index.html'
})

export class AdminZiyaretciIndexComponent {
    errorMsg: string;
    ZiyaretciList: any;

    deleteShow: boolean;

    callTable: boolean;

    constructor(private service: ZiyaretciService, private sharedService: SharedService, private router: Router) {
    }

    ngOnInit() {
        this.callTable = true;
        this.UserRightsControl($("#hdnModel").val());
    }

    onClear() {
        this.service.getSil().subscribe((resData) => {
            if (resData == true) {
                this.ShowAlert("Clear");

                let currentUrl = this.router.url;
                this.router.navigate(['/Admin'], { skipLocationChange: true }).then(() => this.router.navigate([currentUrl]));
            }
            else {
                this.ShowAlert("ClearNot");
            }
        }, resError => this.errorMsg = resError);
    }

    ShowAlert(type: string) {
        $("#tdAlertMessage li.tdAlert" + type).fadeIn("slow");

        setInterval(function () {
            $("#tdAlertMessage li.tdAlert" + type).fadeOut("slow");
        }, 2000);
    }

    UserRightsControl(Model: any) {
        this.sharedService.getHasRight(Model, "d").subscribe((dRight) => {
            this.deleteShow = dRight;

            if (this.callTable == true) {
                this.service.getIndex().subscribe((resData) => {
                    this.ZiyaretciList = resData;
                    this.callTable = false;

                    setTimeout(() => {
                        $(".data-table").dataTable({
                            "bJQueryUI": true,
                            "sPaginationType": "full_numbers",
                            "sDom": '<""l>t<"F"fp>'
                        });

                        if ($(".dropdown-menu").first().find("a").length <= 0) {
                            $(".btn-group").remove();
                        }

                        $(document).off("click", ".fg-button").on("click", ".fg-button", () => {
                            setTimeout(() => {
                                this.UserRightsControl($("#hdnModel").val());
                            }, 1);
                        });
                    }, 1);

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