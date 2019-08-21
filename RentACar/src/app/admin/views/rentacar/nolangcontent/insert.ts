import { Component } from "@angular/core";
import { Subscription } from "rxjs";
import { ModelService } from "../../../services/model";
import { Router } from "@angular/router";
import { FormBuilder, FormGroup, Validators, FormControl } from "@angular/forms";
import ClassicEditor from '../../../../../../Content/admin/js/ckeditor/ckeditor.js';

@Component({
	templateUrl: './insert.html'
})

export class AdminNoLangContentInsertComponent {
	errorMsg: string;

	insertForm: FormGroup;
	data: any;

	model: any;

	private subscription: Subscription = new Subscription();

	constructor(private service: ModelService, private formBuilder: FormBuilder, private router: Router) {
	}

	ngOnInit() {
		this.data = new Object();

		setTimeout(function () {
			ClassicEditor
				.create(document.querySelector('#Description'), {
				})
				.then(editor => {
					console.log(editor);
				});
		}, 1000);

		this.insertForm = this.formBuilder.group({
			Title: new FormControl(null, [Validators.required, Validators.minLength(1), Validators.maxLength(255)]),
			Code: new FormControl(null),
			ShortCode: new FormControl(null),
			ShortDescription: new FormControl(null),
			Description: new FormControl(null),
		});
	}

	ngOnDestroy(): void {
		this.subscription.unsubscribe();
	}

	onSubmit() {
		this.data.Title = this.insertForm.get("Title").value;
		this.data.Code = this.insertForm.get("Code").value;
		this.data.ShortCode = this.insertForm.get("ShortCode").value;
		this.data.ShortDescription = this.insertForm.get("ShortDescription").value;
		this.data.Description = $(".ck-content").html().replace("<p>", "").replace("</p>", "");

		this.service.post("NoLangContent", "Insert", this.data)
			.subscribe((answer: any) => {
				if (answer.Mesaj == null) {
					this.router.navigate(['/Admin/NoLangContent']);
				}
				else {
					$(".alertMessage").text(answer.Mesaj);
					$(".alert-error").fadeIn("slow");
				}
			},
				resError => this.errorMsg = resError);
	}
}
