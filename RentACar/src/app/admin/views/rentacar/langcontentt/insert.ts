import { Component } from "@angular/core";
import { Subscription } from "rxjs";
import { ModelService } from "../../../services/model";
import { Router } from "@angular/router";
import { FormBuilder, FormGroup, Validators, FormControl } from "@angular/forms";
import ClassicEditor from '../../../../../../Content/admin/js/ckeditor/ckeditor.js';

@Component({
	templateUrl: './insert.html'
})

export class AdminLangContentTInsertComponent {
	errorMsg: string;

	insertForm: FormGroup;
	data: any;

	model: any;

	private subscription: Subscription = new Subscription();

	constructor(private service: ModelService, private formBuilder: FormBuilder, private router: Router) {
	}

	ngOnInit() {
		this.data = new Object();

		this.subscription = this.service.get("LangContentT", "Insert").subscribe((answer: any) => {
			this.model = answer;
		}, resError => this.errorMsg = resError, () => { this.subscription.unsubscribe(); });

		setTimeout(function () {
			ClassicEditor
				.create(document.querySelector('#Description'), {
				})
				.then(editor => {
					console.log(editor);
				});
		}, 1000);

		this.insertForm = this.formBuilder.group({
			LangContentID: new FormControl(null, [Validators.required, Validators.min(0)]),
			TransID: new FormControl(null, [Validators.required, Validators.min(0)]),
			ShortDescription: new FormControl(null),
			Description: new FormControl(null),
		});
	}

	ngOnDestroy(): void {
		this.subscription.unsubscribe();
	}

	onSubmit() {
		this.data.LangContentID = this.insertForm.get("LangContentID").value;
		this.data.TransID = this.insertForm.get("TransID").value;
		this.data.ShortDescription = this.insertForm.get("ShortDescription").value;
		this.data.Description = $(".ck-content").html().replace("<p>", "").replace("</p>", "");

		this.service.post("LangContentT", "Insert", this.data)
			.subscribe((answer: any) => {
				if (answer.Mesaj == null) {
					this.router.navigate(['/Admin/LangContentT']);
				}
				else {
					$(".alertMessage").text(answer.Mesaj);
					$(".alert-error").fadeIn("slow");
				}
			},
				resError => this.errorMsg = resError);
	}
}
