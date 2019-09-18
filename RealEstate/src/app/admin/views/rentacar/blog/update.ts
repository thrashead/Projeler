import { Component } from "@angular/core";
import { Subscription } from "rxjs";
import { ModelService } from "../../../services/model";
import { ActivatedRoute, Params, Router } from "@angular/router";
import { FormBuilder, FormGroup, Validators, FormControl } from "@angular/forms";
declare var DataTable;

@Component({
	templateUrl: './update.html'
})

export class AdminBlogUpdateComponent {
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
			BlogCatID: new FormControl(null, [Validators.required, Validators.min(0)]),
			Title: new FormControl(null, [Validators.required, Validators.minLength(1), Validators.maxLength(255)]),
            Code: new FormControl(null),
            Sender: new FormControl(null, [Validators.required, Validators.min(0)]),
			PictureUrl: new FormControl(null),
			Tags: new FormControl(null),
        });
	}

	FillData() {
		if (this.callTable == true) {
			this.route.params.subscribe((params: Params) => {
				this.id = params['id'];
				this.subscription = this.service.get("Blog", "Update", this.id).subscribe((answer: any) => {
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

		this.subscription = this.service.post("Blog", "UpdateUpload", this.uploadData).subscribe((answerUpload: any) => {
			if (answerUpload.Mesaj == null)
			{
				this.data.ID = this.updateForm.get("ID").value;
				this.data.BlogCatID = this.updateForm.get("BlogCatID").value;
				this.data.Title = this.updateForm.get("Title").value;
				this.data.Code = this.updateForm.get("Code").value;
				this.data.Sender = this.updateForm.get("Sender").value;
                this.data.OldPictureUrl = this.updateForm.get("PictureUrl").value;
                this.data.HasFile = answerUpload.HasFile;

                if (answerUpload.HasFile) {
                    this.data.PictureUrl = answerUpload.PictureUrl;
				}
				else {
					this.data.PictureUrl = this.updateForm.get("PictureUrl").value;
                }

                this.data.Tags = this.updateForm.get("Tags").value;

				this.service.post("Blog", "Update", this.data)
					.subscribe((answer: any) => {
						if (answer.Mesaj == null) {
							this.router.navigate(['/Admin/Blog']);
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
