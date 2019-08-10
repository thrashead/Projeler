import { Component } from "@angular/core";
import { ModelService } from "../../services/model";
import { SharedService } from '../../services/shared';
declare var DataTable;

@Component({
    templateUrl: './index.html'
})

export class AdminBaglantiIndexComponent {
    errorMsg: string;
    linkTypeTitle: string;
    BaglantiList: any;

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
                        this.service.get("Baglanti", "Index").subscribe((resData: any) => {
                            for (var i = 0; i < resData.length; i++) {
                                switch (resData[i].LinkedTypeID) {
                                    case 1: resData[i].LinkedAdi = resData[i].LinkedCategoryAdi; break;
                                    case 2: resData[i].LinkedAdi = resData[i].LinkedContentAdi; break;
                                    case 3: resData[i].LinkedAdi = resData[i].LinkedProductAdi; break;
                                    case 4: resData[i].LinkedAdi = resData[i].LinkedGalleryAdi; break;
                                    case 5: resData[i].LinkedAdi = resData[i].LinkedPictureAdi; break;
                                    case 6: resData[i].LinkedAdi = resData[i].LinkedFileAdi; break;
                                    case 7: resData[i].LinkedAdi = resData[i].LinkedMetaAdi; break;
                                    case 8: resData[i].LinkedAdi = resData[i].LinkedPropertyGroupAdi; break;
                                    case 17: resData[i].LinkedAdi = resData[i].LinkedRealEstatesAdi; break;
                                }
                            }

                            this.BaglantiList = resData;
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