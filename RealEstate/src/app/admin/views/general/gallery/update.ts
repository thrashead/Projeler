﻿import { Component } from "@angular/core";
import { ModelService } from "../../../services/model";
import { SharedService } from '../../../services/shared';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators, FormControl } from "@angular/forms";
declare var DataTable;

@Component({
    templateUrl: './update.html'
})

export class AdminGalleryUpdateComponent {
    errorMsg: string;
    id: string;

    duzenleForm: FormGroup;
    data: any;

    model: any;

    insertShow: boolean;
    updateShow: boolean;
    deleteShow: boolean;
    removeShow: boolean;

    callTable: boolean;

    constructor(private service: ModelService, private sharedService: SharedService, private route: ActivatedRoute, private router: Router, private formBuilder: FormBuilder) {
    }

    ngOnInit() {
        this.callTable = true;
        this.UserRightsControl($("#hdnType").val());

        this.duzenleForm = this.formBuilder.group({
            ID: new FormControl(null, [Validators.required, Validators.min(1)]),
            Title: new FormControl(null, [Validators.required, Validators.minLength(1), Validators.maxLength(255)]),
            Code: new FormControl(null),
            Active: new FormControl(null),
        });
    }

    onSubmit() {
        this.data = new Object();
        this.data.ID = this.duzenleForm.get("ID").value;
        this.data.Title = this.duzenleForm.get("Title").value;
        this.data.Code = this.duzenleForm.get("Code").value;
        this.data.Active = this.duzenleForm.get("Active").value;

        this.service.post("Gallery", "Update", this.data)
            .subscribe((answer: any) => {
                if (answer.Mesaj == null) {
                    this.router.navigate(['/Admin/Gallery']);
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
                    this.sharedService.getHasRight(Model, "r").subscribe((rRight: boolean) => {
                        this.removeShow = rRight;

                        if (this.callTable == true) {
                            this.route.params.subscribe((params: Params) => {
                                this.id = params['id'];
                                this.service.get("Gallery", "Update", this.id).subscribe((resData: any) => {
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
        }, resError => this.errorMsg = resError);
    }
}