import { Component } from "@angular/core";
import { ActivatedRoute, Params, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators, FormControl } from "@angular/forms";
import { ModelService } from "../../../services/model";
import { SharedService } from '../../../services/shared';
import { AdminLib } from '../../../lib/methods';
declare var DataTable;

@Component({
    templateUrl: './update.html'
})

export class AdminContentUpdateComponent {
    errorMsg: string;
    id: string;

    duzenleForm: FormGroup;
    data: any;

    model: any;

    insertShow: boolean = false;
    updateShow: boolean = false;
    deleteShow: boolean = false;
    removeShow: boolean = false;

    callTable: boolean;

    constructor(private service: ModelService, private sharedService: SharedService, private route: ActivatedRoute, private router: Router, private formBuilder: FormBuilder) {
    }

    ngOnInit() {
        this.callTable = true;
        this.FillData($("#hdnType").val());

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

        this.service.post("Content", "Update", this.data)
            .subscribe((answer: any) => {
                if (answer.Mesaj == null) {
                    this.router.navigate(['/Admin/Content']);
                }
                else {
                    $(".alertMessage").text(answer.Mesaj);
                    $(".alert-error").fadeIn("slow");
                }
            },
                resError => this.errorMsg = resError);
    }

    FillData(Model: any) {
        this.sharedService.getCurrentUserRights(Model).subscribe((userRights: any) => {
            this.insertShow = AdminLib.UserRight(userRights, Model, "i");
            this.updateShow = AdminLib.UserRight(userRights, Model, "u");
            this.deleteShow = AdminLib.UserRight(userRights, Model, "d");
            this.removeShow = AdminLib.UserRight(userRights, Model, "r");

            if (this.callTable == true) {
                this.route.params.subscribe((params: Params) => {
                    this.id = params['id'];
                    this.service.get("Content", "Update", this.id).subscribe((resData: any) => {
                        this.model = resData;
                        this.callTable = false;

                        DataTable();

                        $(document).off("click", ".fg-button").on("click", ".fg-button", () => {
                            setTimeout(() => {
                                this.FillData($("#hdnType").val());
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
    }
}