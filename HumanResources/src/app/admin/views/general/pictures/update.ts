import { Component, AfterViewChecked } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { ModelService } from '../../../services/model';
import { AdminLib } from '../../../lib/lib';

@Component({
	templateUrl: './update.html'
})

export class AdminPicturesUpdateComponent implements AfterViewChecked {
	errorMsg: string;
	id: string;

	callTable: boolean;

	updateForm: FormGroup;

	data: any;
	model: any;

	uploadData: any;
	imagePictureUrl: any;
	imageThumbUrl: any;
	namePictureUrl: string;
	nameThumbUrl: string;

	private subscription: Subscription = new Subscription();

	constructor(private service: ModelService, private formBuilder: FormBuilder, private router: Router, private route: ActivatedRoute) {
	}

	ngOnInit() {
		this.data = new Object();

		this.callTable = true;
		this.FillData();

		AdminLib.ConvertToCKEditor("Description");

		this.updateForm = this.formBuilder.group({
			ID: new FormControl(null, [Validators.required, Validators.min(1)]),
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

		this.subscription = this.service.post("Pictures", "UpdateUpload", this.uploadData).subscribe((answerUpload: any) => {
			if (answerUpload.Mesaj == null)
			{
				this.data.ID = this.updateForm.get("ID").value;
				this.data.Title = this.updateForm.get("Title").value;
				this.data.Description = AdminLib.CKValue("Description");

				if (this.data.PictureUrlHasFile) {
					this.data.OldPictureUrl = this.updateForm.get("PictureUrl").value;
				}
				else {
					this.data.PictureUrl = this.updateForm.get("PictureUrl").value;
				}


				if (this.data.ThumbUrlHasFile) {
					this.data.OldThumbUrl = this.updateForm.get("ThumbUrl").value;
				}
				else {
					this.data.ThumbUrl = this.updateForm.get("ThumbUrl").value;
				}

				this.data.Code = this.updateForm.get("Code").value;
				this.data.Active = this.updateForm.get("Active").value;

				this.service.post("Pictures", "Update", this.data).subscribe((answer: any) => {
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

	FillData() {
		if (this.callTable == true) {
			this.route.params.subscribe((params: Params) => {
				this.id = params['id'];
				this.subscription = this.service.get("Pictures", "Update", this.id).subscribe((resData: any) => {
					this.model = resData;
					this.callTable = false;
				}, resError => this.errorMsg = resError, () => { this.subscription.unsubscribe(); });
			});
		}
	}
}
