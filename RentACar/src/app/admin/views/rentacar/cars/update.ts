import { Component } from "@angular/core";
import { Subscription } from "rxjs";
import { ModelService } from "../../../services/model";
import { ActivatedRoute, Params, Router } from "@angular/router";
import { FormBuilder, FormGroup, Validators, FormControl } from "@angular/forms";
import { AdminLib } from '../../../lib/methods';
declare var DataTable;

@Component({
	templateUrl: './update.html'
})

export class AdminCarsUpdateComponent {
	errorMsg: string;
	id: string;

	updateForm: FormGroup;
	data: any;

	model: any;

	callTable: boolean;

	uploadData: any;
	imagePictureUrl: any;
	namePictureUrl: string;

	private subscription: Subscription = new Subscription();

	constructor(private service: ModelService, private formBuilder: FormBuilder, private router: Router, private route: ActivatedRoute) {
	}

	ngOnInit() {
		this.data = new Object();

		this.callTable = true;
		this.FillData();

		this.updateForm = this.formBuilder.group({
			ID: new FormControl(null, [Validators.required, Validators.min(1)]),
			Title: new FormControl(null, [Validators.required, Validators.minLength(1), Validators.maxLength(255)]),
			Code: new FormControl(null, [Validators.maxLength(25)]),
			PictureUrl: new FormControl(null, [Validators.maxLength(255)]),
            Show: new FormControl(null),
        });
	}

	FillData() {
		if (this.callTable == true) {
			this.route.params.subscribe((params: Params) => {
				this.id = params['id'];
				this.subscription = this.service.get("Cars", "Update", this.id).subscribe((answer: any) => {
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

	onPictureUrlFileSelect(event) {
		if (event.target.files.length > 0) {
			this.namePictureUrl = AdminLib.UploadFileName(event.target.files[0].name);
			this.data.PictureUrl = this.namePictureUrl;
			this.data.HasFile = true;
			this.imagePictureUrl = event.target.files[0];
		}
	}

	ngOnDestroy(): void {
		this.subscription.unsubscribe();
	}

	onSubmit() {
		this.uploadData = new FormData();

		if (this.data.HasFile)
			this.uploadData.append("file", this.imagePictureUrl, this.namePictureUrl);

		this.subscription = this.service.post("Cars", "UpdateUpload", this.uploadData).subscribe((answerUpload: any) => {
			if (answerUpload.Mesaj == null)
			{
				this.data.ID = this.updateForm.get("ID").value;
				this.data.Title = this.updateForm.get("Title").value;
				this.data.Code = this.updateForm.get("Code").value;
                this.data.Show = this.updateForm.get("Show").value;

				if (this.data.HasFile) {
					this.data.OldPictureUrl = this.updateForm.get("PictureUrl").value;
				}
				else {
					this.data.PictureUrl = this.updateForm.get("PictureUrl").value;
				}


				this.service.post("Cars", "Update", this.data)
					.subscribe((answer: any) => {
						if (answer.Mesaj == null) {
							this.router.navigate(['/Admin/Cars']);
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
