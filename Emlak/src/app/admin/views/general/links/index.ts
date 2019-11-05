import { Component } from "@angular/core";
import { ModelService } from "../../../services/model";
import { SharedService } from '../../../services/shared';
import { AdminLib } from '../../../lib/methods';
declare var DataTable;

@Component({
    templateUrl: './index.html'
})

export class AdminLinksIndexComponent {
    errorMsg: string;
    linkTypeTitle: string;
    BaglantiList: any;

	insertShow: boolean = false;
	updateShow: boolean = false;
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
			this.insertShow = AdminLib.UserRight(userRights, Model, "i");
			this.updateShow = AdminLib.UserRight(userRights, Model, "u");
			this.deleteShow = AdminLib.UserRight(userRights, Model, "d");

            if (this.callTable == true) {
                this.service.get("Links", "Index").subscribe((resData: any) => {
                    for (var i = 0; i < resData.length; i++) {
                        switch (resData[i].LinkedTypeID) {
                            case 1: resData[i].LinkedAdi = resData[i].LinkedCategoryAdi; break;
                            case 2: resData[i].LinkedAdi = resData[i].LinkedContentAdi; break;
                            case 4: resData[i].LinkedAdi = resData[i].LinkedGalleryAdi; break;
                            case 5: resData[i].LinkedAdi = resData[i].LinkedPictureAdi; break;
                            case 6: resData[i].LinkedAdi = resData[i].LinkedFileAdi; break;
                            case 7: resData[i].LinkedAdi = resData[i].LinkedMetaAdi; break;
                            case 18: resData[i].LinkedAdi = resData[i].LinkedPropertyAdi; break;
                        }
                    }

                    this.BaglantiList = resData;
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