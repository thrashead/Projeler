﻿import { Component } from "@angular/core";
import { Subscription } from "rxjs";
import { ModelService } from "../../../services/model";
import { ActivatedRoute, Params, Router } from "@angular/router";
import { FormBuilder, FormGroup, Validators, FormControl } from "@angular/forms";
declare var DataTable;

@Component({
	templateUrl: './update.html'
})

export class AdminWorkersUpdateComponent {
	errorMsg: string;
    newFile: string;
    id: string;

	updateForm: FormGroup;
	data: any;
    uploadData: any;

	model: any;

	callTable: boolean;

	private subscription: Subscription = new Subscription();

	constructor(private service: ModelService, private formBuilder: FormBuilder, private router: Router, private route: ActivatedRoute) {
	}

	ngOnInit() {
		this.data = new Object();

		this.callTable = true;
		this.FillData();

		this.updateForm = this.formBuilder.group({
			ID: new FormControl(null, [Validators.required, Validators.min(0)]),
			NameSurname: new FormControl(null, [Validators.required, Validators.minLength(1), Validators.maxLength(255)]),
            PictureUrl: new FormControl(null),
            Facebook: new FormControl(null, [Validators.maxLength(255)]),
            Twitter: new FormControl(null, [Validators.maxLength(255)]),
            Pinterest: new FormControl(null, [Validators.maxLength(255)]),
		});
	}

	FillData() {
		if (this.callTable == true) {
			this.route.params.subscribe((params: Params) => {
				this.id = params['id'];
				this.subscription = this.service.get("Workers", "Update", this.id).subscribe((answer: any) => {
					this.model = answer;
                    this.callTable = false;

                    setTimeout(() => {
                        DataTable();

                        $(document)
                            .off("click", ".fg-button")
                            .on("click", ".fg-button", () => {
                                setTimeout(() => {
                                    this.FillData();
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
    }

    onFileSelect(event) {
        if (event.target.files.length > 0) {
            this.newFile = event.target.files[0];
        }
    }

	ngOnDestroy(): void {
		this.subscription.unsubscribe();
	}

	onSubmit() {
		this.uploadData = new FormData();
        this.uploadData.append("file", this.newFile);

		this.subscription = this.service.post("Workers", "UpdateUpload", this.uploadData).subscribe((answerUpload: any) => {
			if (answerUpload.Mesaj == null)
			{
				this.data.ID = this.updateForm.get("ID").value;
				this.data.NameSurname = this.updateForm.get("NameSurname").value;
                this.data.OldPictureUrl = this.updateForm.get("PictureUrl").value;
                this.data.HasFile = answerUpload.HasFile;

                if (answerUpload.HasFile) {
                    this.data.PictureUrl = answerUpload.PictureUrl;
                }
                else {
                    this.data.PictureUrl = this.updateForm.get("PictureUrl").value;
                }

                this.data.Facebook = this.updateForm.get("Facebook").value;
                this.data.Twitter = this.updateForm.get("Twitter").value;
                this.data.Pinterest = this.updateForm.get("Pinterest").value;

				this.service.post("Workers", "Update", this.data)
					.subscribe((answer: any) => {
						if (answer.Mesaj == null) {
							this.router.navigate(['/Admin/Workers']);
						}
						else {
							$(".alertMessage").text(answer.Mesaj);
							$(".alert-error").fadeIn("slow");
						}
					},
						resError => this.errorMsg = resError);
			}
			else
			{
				$(".alertMessage").text(answerUpload.Mesaj);
				$(".alert-error").fadeIn("slow");
			}
		}, resError => this.errorMsg = resError, () => { this.subscription.unsubscribe(); });
	}
}
