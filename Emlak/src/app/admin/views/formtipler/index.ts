import { Component } from "@angular/core";
import { ModelService } from "../../services/model";
import { SharedService } from '../../services/shared';
declare var DataTable;

@Component({
    templateUrl: './index.html'
})

export class AdminFormTiplerIndexComponent {
    errorMsg: string;
    FormTiplerList: any;

    insertShow: boolean;
    updateShow: boolean;
    deleteShow: boolean;

    callTable: boolean;

    constructor(private service: ModelService, private sharedService: SharedService) {
    }

    ngOnInit() {
        this.callTable = true;
        this.UserRightsControl($("#hdnModel").val());
    }

    UserRightsControl(Model: any) {
        this.sharedService.getHasRight(Model, "i").subscribe((iRight: boolean) => {
            this.insertShow = iRight;
            this.sharedService.getHasRight(Model, "u").subscribe((uRight: boolean) => {
                this.updateShow = uRight;
                this.sharedService.getHasRight(Model, "d").subscribe((dRight: boolean) => {
                    this.deleteShow = dRight;

                    if (this.callTable == true) {
                        this.service.get("FormTipler", "Index").subscribe((resData: any) => {
                            this.FormTiplerList = resData;
                            this.callTable = false;

                            DataTable();

                            $(document).off("click", ".fg-button").on("click", ".fg-button", () => {
                                setTimeout(() => {
                                    this.UserRightsControl($("#hdnModel").val());
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
    }
}