import { Component } from "@angular/core";
import { ModelService } from "../../../services/model";
import { SharedService } from '../../../services/shared';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators, FormControl } from "@angular/forms";
declare var DataTable;

@Component({
    templateUrl: './update.html'
})

export class AdminLinkTypesUpdateComponent {
    errorMsg: string;
    id: string;

    duzenleForm: FormGroup;
    data: any;

    linkTypeTitle: string;
    model: any;

    insertShow: boolean;
    updateShow: boolean;
    deleteShow: boolean;

    callTable: boolean;

    constructor(private service: ModelService, private sharedService: SharedService, private route: ActivatedRoute, private router: Router, private formBuilder: FormBuilder) {
    }

    ngOnInit() {
        this.callTable = true;
        this.UserRightsControl($("#hdnType").val());

        this.duzenleForm = this.formBuilder.group({
            ID: new FormControl(null, [Validators.required, Validators.min(1)]),
            Title: new FormControl(null, [Validators.maxLength(50)]),
            MainTypeID: new FormControl(null, [Validators.required, Validators.min(1)]),
            MainID: new FormControl(null, [Validators.required, Validators.min(1)]),
            LinkedTypeID: new FormControl(null, [Validators.required, Validators.min(1)]),
        });
    }

    onChange(event) {
        var target = event.target || event.srcElement || event.currentTarget;

        this.service.get("LinkTypes", null, null, null, target.value)
            .subscribe((answer: any) => {
                if (answer != null) {
                    $("select.selectMain").html("");

                    for (var i = 0; i < answer.length; i++) {
                        $("select.selectMain").append("<option value='" + answer[i].Value + "'>" + answer[i].Text + "</option>");
                    }
                }
                else {
                    $(".alertMessage").text("Ana Nesne getirilemedi yada ilgili Ana Tip'e ait nesne henüz tanımlanmamış.");
                    $(".alert-error").fadeIn("slow");
                }
            },
                resError => this.errorMsg = resError);
    }

    onSubmit() {
        this.data = new Object();
        this.data.ID = this.duzenleForm.get("ID").value;
        this.data.Title = this.duzenleForm.get("Title").value;
        this.data.MainTypeID = this.duzenleForm.get("MainTypeID").value;
        this.data.MainID = this.duzenleForm.get("MainID").value;
        this.data.LinkedTypeID = this.duzenleForm.get("LinkedTypeID").value;

        this.service.post("LinkTypes", "Update", this.data)
            .subscribe((answer: any) => {
                if (answer.Mesaj == null) {
                    this.router.navigate(['/Admin/LinkTypes']);
                }
                else {
                    $(".alertMessage").text(answer.Mesaj);
                    $(".alert-error").fadeIn("slow");
                }
            },
                resError => this.errorMsg = resError);
    }

    UserRightsControl(Model: any) {
        this.sharedService.getHasRight(Model, "i").subscribe((iRight: boolean) => {
            this.insertShow = iRight;
            this.sharedService.getHasRight(Model, "u").subscribe((uRight: boolean) => {
                this.updateShow = uRight;
                this.sharedService.getHasRight(Model, "d").subscribe((dRight: boolean) => {
                    this.deleteShow = dRight;

                    if (this.callTable == true) {
                        this.route.params.subscribe((params: Params) => {
                            this.id = params['id'];
                            this.service.get("LinkTypes", "Update", this.id).subscribe((resData: any) => {
                                for (var i = 0; i < resData.LinkList.length; i++) {
                                    switch (resData.LinkedTypeID) {
                                        case 1: resData.LinkList[i].LinkedAdi = resData.LinkList[i].LinkedCategoryAdi; break;
                                        case 2: resData.LinkList[i].LinkedAdi = resData.LinkList[i].LinkedContentAdi; break;
                                        case 4: resData.LinkList[i].LinkedAdi = resData.LinkList[i].LinkedGalleryAdi; break;
                                        case 5: resData.LinkList[i].LinkedAdi = resData.LinkList[i].LinkedPicturesAdi; break;
                                        case 6: resData.LinkList[i].LinkedAdi = resData.LinkList[i].LinkedFilesAdi; break;
                                        case 7: resData.LinkList[i].LinkedAdi = resData.LinkList[i].LinkedMetaAdi; break;
                                    }
                                }

                                this.model = resData;
                                this.callTable = false;

                                DataTable();

                                $(document).off("click", ".fg-button").on("click", ".fg-button", () => {
                                    setTimeout(() => {
                                        this.UserRightsControl($("#hdnType").val());
                                    }, 1);
                                });
                            }, resError => this.errorMsg = resError);
                        });
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