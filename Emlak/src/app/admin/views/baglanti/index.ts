import { Component } from "@angular/core";
import { BaglantiService } from "../../services/baglanti";
import { SharedService } from '../../services/shared';
import * as $ from "jquery";

@Component({
    templateUrl: './index.html',
    providers: [BaglantiService, SharedService]
})

export class AdminBaglantiIndexComponent {
    errorMsg: string;
    linkTypeTitle: string;
    BaglantiList: {};

    insertShow: boolean;
    updateShow: boolean;
    deleteShow: boolean;

    callTable: boolean;

    constructor(private service: BaglantiService, private sharedService: SharedService) {
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

                    if (this.callTable == true) {
                        this.service.getIndex().subscribe((resData) => {
                            for (var i = 0; i < resData.length; i++) {
                                switch (resData[i].LinkedTypeID) {
                                    case 1: resData[i].LinkedAdi = resData[i].LinkedCategoryAdi; break;
                                    case 2: resData[i].LinkedAdi = resData[i].LinkedContentAdi; break;
                                    case 3: resData[i].LinkedAdi = resData[i].LinkedProductAdi; break;
                                    case 4: resData[i].LinkedAdi = resData[i].LinkedGalleryAdi; break;
                                    case 5: resData[i].LinkedAdi = resData[i].LinkedPictureAdi; break;
                                    case 6: resData[i].LinkedAdi = resData[i].LinkedFileAdi; break;
                                    case 7: resData[i].LinkedAdi = resData[i].LinkedMetaAdi; break;
                                }
                            }

                            this.BaglantiList = resData;
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
    }
}