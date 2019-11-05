import { Component } from "@angular/core";
import { ModelService } from "../../../services/model";
import { SharedService } from '../../../services/shared';
declare var DataTable;

@Component({
    templateUrl: './index.html'
})

export class AdminFilesIndexComponent {
    errorMsg: string;
    DosyaList: any;

    insertShow: boolean = false;
    updateShow: boolean = false;
    deleteShow: boolean = false;
    removeShow: boolean = false;

    callTable: boolean;

    constructor(private service: ModelService, private sharedService: SharedService) {
    }

    ngOnInit() {
        this.callTable = true;
        this.UserRightsControl($("#hdnType").val());
    }

    UserRightsControl(Model: any) {
        this.sharedService.getCurrentUserRights(Model).subscribe((userRights: any) => {
            userRights.forEach((item, i) => {
                switch (item.ShortName) {
                    case "i": this.insertShow = true; break;
                    case "u": this.updateShow = true; break;
                    case "d": this.deleteShow = true; break;
                    case "r": this.removeShow = true; break;
                }
            });

            if (this.callTable == true) {
                this.service.get("Files", "Index").subscribe((resData: any) => {
                    this.DosyaList = resData;
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