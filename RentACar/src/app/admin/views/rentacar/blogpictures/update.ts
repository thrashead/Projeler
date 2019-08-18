import { Component } from "@angular/core";
import { Subscription } from "rxjs";
import { ModelService } from "../../../services/model";
import { ActivatedRoute, Params, Router } from "@angular/router";
import { FormBuilder, FormGroup, Validators, FormControl } from "@angular/forms";

@Component({
	templateUrl: './update.html'
})

export class AdminBlogPicturesUpdateComponent {
	errorMsg: string;
	id: string;

	updateForm: FormGroup;
	data: any;

	model: any;

	callTable: boolean;

	uploadData: any;
	imagePictureUrl: any;

	private subscription: Subscription = new Subscription();

	constructor(private service: ModelService, private formBuilder: FormBuilder, private router: Router, private route: ActivatedRoute) {
	}

	ngOnInit() {
		this.data = new Object();

		this.callTable = true;
		this.FillData();

		this.updateForm = this.formBuilder.group({
			ID: new FormControl(null, [Validators.required, Validators.min(0)]),
			BlogID: new FormControl(null, [Validators.required, Validators.min(0)]),
			PictureUrl: new FormControl(null, [Validators.required, Validators.minLength(1), Validators.maxLength(255)]),
			Code: new FormControl(null),
		});
	}

	FillData() {
		if (this.callTable == true) {
			this.route.params.subscribe((params: Params) => {
				this.id = params['id'];
				this.subscription = this.service.get("BlogPictures", "Update", this.id).subscribe((answer: any) => {
					this.model = answer;
					this.callTable = false;
				}, resError => this.errorMsg = resError, () => { this.subscription.unsubscribe(); });
			});
		}
	}

	onPictureUrlFileSelect(event) {
		if (event.target.files.length > 0) {
			this.data.PictureUrl = event.target.files[0].name;
			this.data.PictureUrlHasFile = true;
			this.imagePictureUrl = event.target.files[0];
		}
	}

	ngOnDestroy(): void {
		this.subscription.unsubscribe();
	}

	onSubmit() {
		this.uploadData = new FormData();
		this.uploadData.append("file", this.imagePictureUrl);

		this.subscription = this.service.post("BlogPictures", "UpdateUpload", this.uploadData).subscribe((answerUpload: any) => {
			if (answerUpload.Mesaj == null)
			{
				this.data.ID = this.updateForm.get("ID").value;
				this.data.BlogID = this.updateForm.get("BlogID").value;

				if (this.data.PictureUrlHasFile) {
					this.data.OldPictureUrl = this.updateForm.get("PictureUrl").value;
				}
				else {
					this.data.PictureUrl = this.updateForm.get("PictureUrl").value;
				}

				this.data.Code = this.updateForm.get("Code").value;

				this.service.post("BlogPictures", "Update", this.data)
					.subscribe((answer: any) => {
						if (answer.Mesaj == null) {
							this.router.navigate(['/Admin/BlogPictures']);
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
