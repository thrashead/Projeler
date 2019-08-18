import { Component } from "@angular/core";
import { Subscription } from "rxjs";
import { ModelService } from "../../../services/model";
import { Router } from "@angular/router";
import { FormBuilder, FormGroup, Validators, FormControl } from "@angular/forms";

@Component({
	templateUrl: './insert.html'
})

export class AdminBlogPicturesInsertComponent {
	errorMsg: string;

	insertForm: FormGroup;
	data: any;

	model: any;

	uploadData: any;
	imagePictureUrl: any;

	private subscription: Subscription = new Subscription();

	constructor(private service: ModelService, private formBuilder: FormBuilder, private router: Router) {
	}

	ngOnInit() {
		this.data = new Object();

		this.subscription = this.service.get("BlogPictures", "Insert").subscribe((answer: any) => {
			this.model = answer;
		}, resError => this.errorMsg = resError, () => { this.subscription.unsubscribe(); });

		this.insertForm = this.formBuilder.group({
			BlogID: new FormControl(null, [Validators.required, Validators.min(0)]),
			PictureUrl: new FormControl(null, [Validators.required, Validators.minLength(1), Validators.maxLength(255)]),
			Code: new FormControl(null),
		});
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

		this.subscription = this.service.post("BlogPictures", "InsertUpload", this.uploadData).subscribe((answerUpload: any) => {
			if (answerUpload.Mesaj == null)
			{
				this.data.BlogID = this.insertForm.get("BlogID").value;
				this.data.Code = this.insertForm.get("Code").value;

				this.service.post("BlogPictures", "Insert", this.data)
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
