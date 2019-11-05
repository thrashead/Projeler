import { Component } from "@angular/core";
import { ModelService } from "../../../services/model";
import { SharedService } from '../../../services/shared';
import { AdminLib } from '../../../lib/methods';
declare var DataTable;

@Component({
    templateUrl: './index.html'
})

export class AdminVisitorCounterIndexComponent {
    errorMsg: string;
    ZiyaretciList: any;

	deleteShow: boolean = false;

    callTable: boolean;

    constructor(private service: ModelService, private sharedService: SharedService) {
    }

    ngOnInit() {
        this.callTable = true;
        this.FillData($("#hdnModel").val());
    }

    FillData(Model: any) {
		this.sharedService.getCurrentUserRights(Model).subscribe((userRights: any) => {
			this.deleteShow = AdminLib.UserRight(userRights, Model, "d");

            if (this.callTable == true) {
                this.service.get("VisitorCounter", "Index").subscribe((resData: any) => {
                    this.ZiyaretciList = resData;
                    this.callTable = false;

                    DataTable();

                    $(document).off("click", ".fg-button").on("click", ".fg-button", () => {
                        setTimeout(() => {
                            this.FillData($("#hdnModel").val());
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