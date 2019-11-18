import { Component, AfterViewChecked } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { ModelService } from '../../../services/model';
import { AdminLib } from '../../../lib/lib';

@Component({
	templateUrl: './insert.html'
})

export class AdminPicturesInsertComponent implements AfterViewChecked {
	errorMsg: string;

	insertForm: FormGroup;

	data: any;
	model: any;

	uploadData: any;
	imagePictureUrl: any;
	imageThumbUrl: any;
	namePictureUrl: string;
	nameThumbUrl: string;

	private subscription: Subscription = new Subscription();

	constructor(private service: ModelService, private formBuilder: FormBuilder, private router: Router) {
	}

	ngOnInit() {
		this.data = new Object();

		AdminLib.ConvertToCKEditor("Description");

		this.insertForm = this.formBuilder.group({
			Title: new FormControl(null, [Validators.required, Validators.minLength(1), Validators.maxLength(50)]),
			Description: new FormControl(null),
			PictureUrl: new FormControl(null),
			ThumbUrl: new FormControl(null),
			Code: new FormControl(null, [Validators.maxLength(10)]),
			Active: new FormControl(null),
		});
	}

	ngAfterViewChecked() {
		$("#Description").next("div.ck").find(".ck-content").attr("data-id", "Description");
	}

	onPictureUrlFileSelect(event) {
		if (event.target.files.length > 0) {
			this.namePictureUrl = AdminLib.UploadFileName(event.target.files[0].name);
			this.data.PictureUrl = this.namePictureUrl;
			this.data.PictureUrlHasFile = true;
			this.imagePictureUrl = event.target.files[0];
		}
	}

	onThumbUrlFileSelect(event) {
		if (event.target.files.length > 0) {
			this.nameThumbUrl = AdminLib.UploadFileName(event.target.files[0].name);
			this.data.ThumbUrl = this.nameThumbUrl;
			this.data.ThumbUrlHasFile = true;
			this.imageThumbUrl = event.target.files[0];
		}
	}

	ngOnDestroy(): void {
		this.subscription.unsubscribe();
	}

	onSubmit() {
		this.uploadData = new FormData();

		if (this.data.PictureUrlHasFile)
			this.uploadData.append("file", this.imagePictureUrl, this.namePictureUrl);

		if (this.data.ThumbUrlHasFile)
			this.uploadData.append("file", this.imageThumbUrl, this.nameThumbUrl);

		this.subscription = this.service.post("Pictures", "InsertUpload", this.uploadData).subscribe((answerUpload: any) => {
			if (answerUpload.Mesaj == null)
			{
				this.data.Title = this.insertForm.get("Title").value;
				this.data.Description = AdminLib.CKValue("Description");
				this.data.Code = this.insertForm.get("Code").value;
				this.data.Active = this.insertForm.get("Active").value;

				this.service.post("Pictures", "Insert", this.data).subscribe((answer: any) => {
					if (answer.Mesaj == null) {
						this.router.navigate(['/Admin/Pictures']);
					}
					else {
						$(".alertMessage").text(answer.Mesaj);
						$(".alert-error").fadeIn("slow");
					}
				}, resError => this.errorMsg = resError);
			}
			else
			{
				$(".alertMessage").text(answerUpload.Mesaj);
				$(".alert-error").fadeIn("slow");
			}
		}, resError => this.errorMsg = resError, () => { this.subscription.unsubscribe(); });
	}
}
