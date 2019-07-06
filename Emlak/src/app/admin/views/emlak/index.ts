import { Component } from "@angular/core";
import { EmlakService } from "../../services/emlak";
import { SharedService } from '../../services/shared';
import { Router } from '@angular/router';
import * as $ from "jquery";

@Component({
    templateUrl: './index.html',
    providers: [EmlakService, SharedService]
})

export class AdminEmlakIndexComponent {
    errorMsg: string;
    EmlakList: any;

    insertShow: boolean;
    updateShow: boolean;
    deleteShow: boolean;
    copyShow: boolean;
    realDeleteShow: boolean;

    callTable: boolean;

    constructor(private service: EmlakService, private sharedService: SharedService, private router: Router) {
    }

    ngOnInit() {
        this.callTable = true;
        this.UserRightsControl($("#hdnModel").val());
    }

    onDelete(id) {
        this.service.getSil(id).subscribe((resData) => {
            if (resData == true) {
                this.ShowAlert("Delete");

                $("a.dltLink.active-dlt").parent("li").parent("ul").parent("div").parent("td").parent("tr").fadeOut("slow", function () {
                    $(this).remove();
                });
            }
            else {
                this.ShowAlert("DeleteNot");
            }
        }, resError => this.errorMsg = resError);
    }

    onRealDelete(id) {
        this.service.getKaldir(id).subscribe((resData) => {
            if (resData == true) {
                this.ShowAlert("RealDelete");

                $("a.rdltLink.active-rdlt").parent("li").parent("ul").parent("div").parent("td").parent("tr").fadeOut("slow", function () {
                    $(this).remove();
                });
            }
            else {
                this.ShowAlert("RealDeleteNot");
            }
        }, resError => this.errorMsg = resError);
    }

    onCopy(id) {
        this.service.getKopyala(id).subscribe((resData) => {
            if (resData == true) {
                this.ShowAlert("Copy");

                let currentUrl = this.router.url;
                this.router.navigate(['/Admin/AnaSayfa'], { skipLocationChange: true }).then(() => { this.router.navigate([currentUrl]) });
            }
            else {
                this.ShowAlert("CopyNot");
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
        this.sharedService.getHasRight(Model, "i").subscribe((iRight) => {
            this.insertShow = iRight;
            this.sharedService.getHasRight(Model, "u").subscribe((uRight) => {
                this.updateShow = uRight;
                this.sharedService.getHasRight(Model, "d").subscribe((dRight) => {
                    this.deleteShow = dRight;
                    this.sharedService.getHasRight(Model, "c").subscribe((cRight) => {
                        this.copyShow = cRight;
                        this.sharedService.getHasRight(Model, "rd").subscribe((rdRight) => {
                            this.realDeleteShow = rdRight;

                            if (this.callTable == true) {
                                this.service.getIndex().subscribe((resData) => {
                                    this.EmlakList = resData;
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

                                        $(document).on("click", ".fg-button", () => {
                                            setTimeout(() => {
                                                this.UserRightsControl($("#hdnModel").val());
                                            }, 1);
                                        });

                                        $(document).on("click", "a.dltLink", function () {
                                            $(this).addClass("active-dlt");
                                            $("a.dlt-yes").attr("data-id", $(this).attr("data-id"));
                                        });

                                        $(document).on("click", "a.dlt-yes", () => {
                                            let id: string = $("a.dlt-yes").attr("data-id");
                                            this.onDelete(id);
                                        });

                                        $(document).on("click", "a.rdltLink", function () {
                                            $(this).addClass("active-rdlt");
                                            $("a.rdlt-yes").attr("data-id", $(this).attr("data-id"));
                                        });

                                        $(document).on("click", "a.rdlt-yes", () => {
                                            let id: string = $("a.rdlt-yes").attr("data-id");
                                            this.onRealDelete(id);
                                        });

                                        $(document).on("click", "a.cpyLink", function () {
                                            $(this).addClass("active-cpy");
                                            $("a.cpy-yes").attr("data-id", $(this).attr("data-id"));
                                        });

                                        $(document).on("click", "a.cpy-yes", () => {
                                            let id: string = $("a.cpy-yes").attr("data-id");
                                            this.onCopy(id);
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
                    }, resError => this.errorMsg = resError);
                }, resError => this.errorMsg = resError);
            }, resError => this.errorMsg = resError);
        }, resError => this.errorMsg = resError);
    }
}