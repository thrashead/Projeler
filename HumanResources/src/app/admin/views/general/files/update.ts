import { Component, AfterViewChecked } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { ModelService } from '../../../services/model';
import { AdminLib } from '../../../lib/lib';

@Component({
	templateUrl: './update.html'
})

export class AdminFilesUpdateComponent implements AfterViewChecked {
	errorMsg: string;
	id: string;

	callTable: boolean;

	updateForm: FormGroup;

	data: any;
	model: any;

	uploadData: any;
	fileFileUrl: any;
	nameFileUrl: string;

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
			FileUrl: new FormControl(null),
			Code: new FormControl(null, [Validators.maxLength(10)]),
			Active: new FormControl(null),
		});
	}

	ngAfterViewChecked() {
		$("#Description").next("div.ck").find(".ck-content").attr("data-id", "Description");
	}

	onFileUrlFileSelect(event) {
		if (event.target.files.length > 0) {
			this.nameFileUrl = AdminLib.UploadFileName(event.target.files[0].name);
			this.data.FileUrl = this.nameFileUrl;
			this.data.FileUrlHasFile = true;
			this.fileFileUrl = event.target.files[0];
		}
	}

	ngOnDestroy(): void {
		this.subscription.unsubscribe();
	}

	onSubmit() {
		this.uploadData = new FormData();

		if (this.data.FileUrlHasFile)
			this.uploadData.append("file", this.fileFileUrl, this.nameFileUrl);

		this.subscription = this.service.post("Files", "UpdateUpload", this.uploadData).subscribe((answerUpload: any) => {
			if (answerUpload.Mesaj == null)
			{
				this.data.ID = this.updateForm.get("ID").value;
				this.data.Title = this.updateForm.get("Title").value;
				this.data.Description = AdminLib.CKValue("Description");

				if (this.data.FileUrlHasFile) {
					this.data.OldFileUrl = this.updateForm.get("FileUrl").value;
				}
				else {
					this.data.FileUrl = this.updateForm.get("FileUrl").value;
				}

				this.data.Code = this.updateForm.get("Code").value;
				this.data.Active = this.updateForm.get("Active").value;

				this.service.post("Files", "Update", this.data).subscribe((answer: any) => {
					if (answer.Mesaj == null) {
						this.router.navigate(['/Admin/Files']);
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
				this.subscription = this.service.get("Files", "Update", this.id).subscribe((resData: any) => {
					this.model = resData;
					this.callTable = false;
				}, resError => this.errorMsg = resError, () => { this.subscription.unsubscribe(); });
			});
		}
	}
}
