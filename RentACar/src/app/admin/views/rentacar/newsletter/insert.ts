import { Component } from "@angular/core";
import { Subscription } from "rxjs";
import { ModelService } from "../../../services/model";
import { Router } from "@angular/router";
import { FormBuilder, FormGroup, Validators, FormControl } from "@angular/forms";

@Component({
	templateUrl: './insert.html'
})

export class AdminNewsletterInsertComponent {
	errorMsg: string;

	insertForm: FormGroup;
	data: any;

	model: any;

	private subscription: Subscription = new Subscription();

	constructor(private service: ModelService, private formBuilder: FormBuilder, private router: Router) {
	}

	ngOnInit() {
		this.data = new Object();

		this.insertForm = this.formBuilder.group({
			Name: new FormControl(null, [Validators.required, Validators.minLength(1), Validators.maxLength(255)]),
			Mail: new FormControl(null, [Validators.required, Validators.minLength(1), Validators.maxLength(255)]),
			Active: new FormControl(null),
		});
	}

	ngOnDestroy(): void {
		this.subscription.unsubscribe();
	}

	onSubmit() {
		this.data.Name = this.insertForm.get("Name").value;
		this.data.Mail = this.insertForm.get("Mail").value;
		this.data.Active = this.insertForm.get("Active").value;

		this.service.post("Newsletter", "Insert", this.data)
			.subscribe((answer: any) => {
				if (answer.Mesaj == null) {
					this.router.navigate(['/Admin/Newsletter']);
				}
				else {
					$(".alertMessage").text(answer.Mesaj);
					$(".alert-error").fadeIn("slow");
				}
			},
				resError => this.errorMsg = resError);
	}
}
