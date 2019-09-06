import { Component, AfterViewChecked } from "@angular/core";
import { Subscription } from "rxjs";
import { ModelService } from "../../../services/model";
import { Router } from "@angular/router";
import { FormBuilder, FormGroup, Validators, FormControl } from "@angular/forms";
import ClassicEditor from '../../../../../../Content/admin/js/ckeditor/ckeditor.js';

@Component({
	templateUrl: './insert.html'
})

export class AdminBlogTInsertComponent implements AfterViewChecked {
	errorMsg: string;

	insertForm: FormGroup;
	data: any;

	model: any;

	private subscription: Subscription = new Subscription();

	constructor(private service: ModelService, private formBuilder: FormBuilder, private router: Router) {
	}

	ngOnInit() {
		this.data = new Object();

		this.subscription = this.service.get("BlogT", "Insert").subscribe((answer: any) => {
			this.model = answer;
		}, resError => this.errorMsg = resError, () => { this.subscription.unsubscribe(); });

		setTimeout(function () {
			ClassicEditor
				.create(document.querySelector('#Description'), {
				})
				.then(editor => {
					console.log(editor);
				});
			ClassicEditor
				.create(document.querySelector('#Description2'), {
				})
				.then(editor => {
					console.log(editor);
				});
        }, 1500);

		this.insertForm = this.formBuilder.group({
			BlogID: new FormControl(null, [Validators.required, Validators.min(0)]),
			TransID: new FormControl(null, [Validators.required, Validators.min(0)]),
			Title: new FormControl(null, [Validators.required, Validators.minLength(1), Validators.maxLength(255)]),
			ShortDescription: new FormControl(null),
			Description: new FormControl(null),
			ShortDescription2: new FormControl(null),
			Description2: new FormControl(null),
			Tags: new FormControl(null),
		});
    }

    ngAfterViewChecked() {
        $('#Description').next("div.ck").find(".ck-content").attr("data-id", "Description");
        $('#Description2').next("div.ck").find(".ck-content").attr("data-id", "Description2");
    }

	ngOnDestroy(): void {
		this.subscription.unsubscribe();
	}

	onSubmit() {
		this.data.BlogID = this.insertForm.get("BlogID").value;
		this.data.TransID = this.insertForm.get("TransID").value;
		this.data.Title = this.insertForm.get("Title").value;
		this.data.ShortDescription = this.insertForm.get("ShortDescription").value;
        this.data.Description = $(".ck-content[data-id='Description']").html().replace("<p>", "").replace("</p>", "");
		this.data.ShortDescription2 = this.insertForm.get("ShortDescription2").value;
        this.data.Description2 = $(".ck-content[data-id='Description2']").html().replace("<p>", "").replace("</p>", "");
		this.data.Tags = this.insertForm.get("Tags").value;

		this.service.post("BlogT", "Insert", this.data)
			.subscribe((answer: any) => {
				if (answer.Mesaj == null) {
					this.router.navigate(['/Admin/BlogT']);
				}
				else {
					$(".alertMessage").text(answer.Mesaj);
					$(".alert-error").fadeIn("slow");
				}
			},
				resError => this.errorMsg = resError);
	}
}
