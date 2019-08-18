import { Component } from "@angular/core";
import { ModelService } from "../../services/model";
import { SharedService } from '../../services/shared';
declare var DataTable;

@Component({
    templateUrl: './index.html'
})

export class AdminUsersIndexComponent {
    errorMsg: string;
    KullanicilarList: {};
    CurrentUserID: number;

    insertShow: boolean;
    updateShow: boolean;
    deleteShow: boolean;
    changeGroupShow: boolean;
    removeShow: boolean;

    callTable: boolean;

    constructor(private service: ModelService, private sharedService: SharedService) {
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
                    this.sharedService.getHasRight(Model, "cg").subscribe((cgRight: boolean) => {
                        this.changeGroupShow = cgRight;
                        this.sharedService.getHasRight(Model, "r").subscribe((rRight: boolean) => {
                            this.removeShow = rRight;

                            if (this.callTable == true) {
                                this.sharedService.getCurrentUser().subscribe((resData: any) => {
                                    this.CurrentUserID = resData.ID;

                                    this.service.get("Users", "Index").subscribe((resData: any) => {
                                        this.KullanicilarList = resData;
                                        this.callTable = false;

                                        DataTable();

                                        $(document).off("click", ".fg-button").on("click", ".fg-button", () => {
                                            setTimeout(() => {
                                                this.UserRightsControl($("#hdnType").val());
                                            }, 1);
                                        });
                                    }, resError => this.errorMsg = resError);
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