import { Component } from "@angular/core";
import { Subscription } from "rxjs";
import { ModelService } from "../../../services/model";
import { Router } from "@angular/router";
import { FormBuilder, FormGroup, Validators, FormControl } from "@angular/forms";

@Component({
	templateUrl: './insert.html'
})

export class AdminBlogVideosInsertComponent {
	errorMsg: string;

	insertForm: FormGroup;
	data: any;

	model: any;

	private subscription: Subscription = new Subscription();

	constructor(private service: ModelService, private formBuilder: FormBuilder, private router: Router) {
	}

	ngOnInit() {
		this.data = new Object();

		this.subscription = this.service.get("BlogVideos", "Insert").subscribe((answer: any) => {
			this.model = answer;
		}, resError => this.errorMsg = resError, () => { this.subscription.unsubscribe(); });

		this.insertForm = this.formBuilder.group({
			BlogID: new FormControl(null, [Validators.required, Validators.min(0)]),
			VideoUrl: new FormControl(null, [Validators.required, Validators.minLength(1), Validators.maxLength(255)]),
			Code: new FormControl(null),
		});
	}

	ngOnDestroy(): void {
		this.subscription.unsubscribe();
	}

	onSubmit() {
		this.data.BlogID = this.insertForm.get("BlogID").value;
		this.data.VideoUrl = this.insertForm.get("VideoUrl").value;
		this.data.Code = this.insertForm.get("Code").value;

		this.service.post("BlogVideos", "Insert", this.data)
			.subscribe((answer: any) => {
				if (answer.Mesaj == null) {
					this.router.navigate(['/Admin/BlogVideos']);
				}
				else {
					$(".alertMessage").text(answer.Mesaj);
					$(".alert-error").fadeIn("slow");
				}
			},
				resError => this.errorMsg = resError);
	}
}
