import { Component } from "@angular/core";
import { Subscription } from "rxjs";
import { ActivatedRoute, Params, Router } from "@angular/router";
import { FormBuilder, FormGroup, Validators, FormControl } from "@angular/forms";
import { ModelService } from "../../../services/model";
import { SharedService } from '../../../services/shared';
import { AdminLib } from '../../../lib/methods';
declare var DataTable;

@Component({
    templateUrl: './update.html'
})

export class AdminCarFeatsGearsTypeUpdateComponent {
    errorMsg: string;
    id: string;

    updateForm: FormGroup;

    data: any;
    model: any;

    callTable: boolean;

    insertShow: boolean = false;
    updateShow: boolean = false;
    deleteShow: boolean = false;
    copyShow: boolean = false;

    private subscription: Subscription = new Subscription();

    constructor(private service: ModelService, private sharedService: SharedService, private formBuilder: FormBuilder, private router: Router, private route: ActivatedRoute) {
    }

    ngOnInit() {
        this.data = new Object();

        this.callTable = true;
        this.FillData($("#hdnType").val());

        this.updateForm = this.formBuilder.group({
            ID: new FormControl(null, [Validators.required, Validators.min(0)]),
            Title: new FormControl(null, [Validators.required, Validators.minLength(1), Validators.maxLength(255)]),
            Code: new FormControl(null, [Validators.maxLength(25)]),
        });
    }

    FillData(Model: any) {
        this.sharedService.getCurrentUserRights(Model).subscribe((userRights: any) => {
            this.insertShow = AdminLib.UserRight(userRights, Model, "i");
            this.updateShow = AdminLib.UserRight(userRights, Model, "u");
            this.copyShow = AdminLib.UserRight(userRights, Model, "c");
            this.deleteShow = AdminLib.UserRight(userRights, Model, "d");

            if (this.callTable == true) {
                this.route.params.subscribe((params: Params) => {
                    this.id = params['id'];
                    this.subscription = this.service.get("CarFeatsGearsType", "Update", this.id).subscribe((answer: any) => {
                        this.model = answer;
                        this.callTable = false;

                        setTimeout(() => {
                            DataTable();

                            $(document)
                                .off("click", ".fg-button")
                                .on("click", ".fg-button", () => {
                                    setTimeout(() => {
                                        this.FillData($("#hdnType").val());
                                    }, 1);
                                });
                        }, 1);
                    }, resError => this.errorMsg = resError, () => { this.subscription.unsubscribe(); });
                });
            }

            setTimeout(() => {
                if ($(".dropdown-menu").first().find("a").length <= 0) {
                    $(".btn-group").remove();
                }
            }, 1);
        }, resError => this.errorMsg = resError);
    }

    ngOnDestroy(): void {
        this.subscription.unsubscribe();
    }

    onSubmit() {
        this.data.ID = this.updateForm.get("ID").value;
        this.data.Title = this.updateForm.get("Title").value;
        this.data.Code = this.updateForm.get("Code").value;

        this.service.post("CarFeatsGearsType", "Update", this.data)
            .subscribe((answer: any) => {
                if (answer.Mesaj == null) {
                    this.router.navigate(['/Admin/CarFeatsGearsType']);
                }
                else {
                    $(".alertMessage").text(answer.Mesaj);
                    $(".alert-error").fadeIn("slow");
                }
            },
                resError => this.errorMsg = resError);
    }
}
