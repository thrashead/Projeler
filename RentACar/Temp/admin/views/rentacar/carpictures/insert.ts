import { Component } from "@angular/core";
import { Subscription } from "rxjs";
import { ModelService } from "../../../services/model";
import { Router } from "@angular/router";
import { FormBuilder, FormGroup, Validators, FormControl } from "@angular/forms";
import { AdminLib } from '../../../lib/methods';

@Component({
	templateUrl: './insert.html'
})

export class AdminCarPicturesInsertComponent {
	errorMsg: string;

	insertForm: FormGroup;
	data: any;

	model: any;

	uploadData: any;
	imagePictureUrl: any;
	namePictureUrl: string;

	private subscription: Subscription = new Subscription();

	constructor(private service: ModelService, private formBuilder: FormBuilder, private router: Router) {
	}

	ngOnInit() {
		this.data = new Object();

		this.subscription = this.service.get("CarPictures", "Insert").subscribe((answer: any) => {
			this.model = answer;
		}, resError => this.errorMsg = resError, () => { this.subscription.unsubscribe(); });

		this.insertForm = this.formBuilder.group({
			CarID: new FormControl(null, [Validators.required, Validators.min(1)]),
			Title: new FormControl(null, [Validators.maxLength(50)]),
			Description: new FormControl(null, [Validators.maxLength(255)]),
            PictureUrl: new FormControl(null, [Validators.required, Validators.minLength(1), Validators.maxLength(255)]),
            Code: new FormControl(null, [Validators.maxLength(25)]),
			ShortCode: new FormControl(null, [Validators.maxLength(10)]),
			IsMainPicture: new FormControl(null),
		});
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

		this.subscription = this.service.post("CarPictures", "InsertUpload", this.uploadData).subscribe((answerUpload: any) => {
			if (answerUpload.Mesaj == null)
			{
				this.data.CarID = this.insertForm.get("CarID").value;
				this.data.Title = this.insertForm.get("Title").value;
				this.data.Description = this.insertForm.get("Description").value;
				this.data.Code = this.insertForm.get("Code").value;
				this.data.ShortCode = this.insertForm.get("ShortCode").value;
				this.data.IsMainPicture = this.insertForm.get("IsMainPicture").value;

				this.service.post("CarPictures", "Insert", this.data)
					.subscribe((answer: any) => {
						if (answer.Mesaj == null) {
							this.router.navigate(['/Admin/CarPictures']);
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
