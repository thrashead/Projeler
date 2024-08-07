﻿import { Component, AfterViewChecked } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { ModelService } from '../../../services/model';
import { AdminLib } from '../../../lib/lib';

@Component({
	templateUrl: './insert.html'
})

export class AdminFilesInsertComponent implements AfterViewChecked {
	errorMsg: string;

	insertForm: FormGroup;

	data: any;
	model: any;

	uploadData: any;
	fileFileUrl : any;
	nameFileUrl: string;

	private subscription: Subscription = new Subscription();

	constructor(private service: ModelService, private formBuilder: FormBuilder, private router: Router) {
	}

	ngOnInit() {
		this.data = new Object();

		AdminLib.ConvertToCKEditor("Description");

		this.insertForm = this.formBuilder.group({
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

		this.subscription = this.service.post("Files", "InsertUpload", this.uploadData).subscribe((answerUpload: any) => {
			if (answerUpload.Mesaj == null)
			{
				this.data.Title = this.insertForm.get("Title").value;
				this.data.Description = AdminLib.CKValue("Description");
				this.data.Code = this.insertForm.get("Code").value;
				this.data.Active = this.insertForm.get("Active").value;

				this.service.post("Files", "Insert", this.data).subscribe((answer: any) => {
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
}
