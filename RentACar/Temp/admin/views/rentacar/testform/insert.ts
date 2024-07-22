import { Component } from "@angular/core";
import { Subscription } from "rxjs";
import { ModelService } from "../../../services/model";
import { Router } from "@angular/router";
import { FormBuilder, FormGroup, Validators, FormControl } from "@angular/forms";

@Component({
	templateUrl: './insert.html'
})

export class AdminTestFormInsertComponent {
	errorMsg: string;

	insertForm: FormGroup;
	data: any;

	model: any;

	private subscription: Subscription = new Subscription();

	constructor(private service: ModelService, private formBuilder: FormBuilder, private router: Router) {
	}

	ngOnInit() {
		this.data = new Object();

		this.subscription = this.service.get("TestForm", "Insert").subscribe((answer: any) => {
			this.model = answer;
		}, resError => this.errorMsg = resError, () => { this.subscription.unsubscribe(); });

		this.insertForm = this.formBuilder.group({
			CarID: new FormControl(null, [Validators.required, Validators.min(1)]),
			Name: new FormControl(null, [Validators.required, Validators.minLength(1), Validators.maxLength(100)]),
			Mail: new FormControl(null, [Validators.required, Validators.minLength(1), Validators.maxLength(255)]),
			Phone: new FormControl(null, [Validators.required, Validators.minLength(1), Validators.maxLength(15)]),
			Message: new FormControl(null, [Validators.required, Validators.minLength(1), Validators.maxLength(255)]),
			Accepted: new FormControl(null),
		});
	}

	ngOnDestroy(): void {
		this.subscription.unsubscribe();
	}

	onSubmit() {
		this.data.CarID = this.insertForm.get("CarID").value;
		this.data.Name = this.insertForm.get("Name").value;
		this.data.Mail = this.insertForm.get("Mail").value;
		this.data.Phone = this.insertForm.get("Phone").value;
		this.data.Message = this.insertForm.get("Message").value;
		this.data.Accepted = this.insertForm.get("Accepted").value;

		this.service.post("TestForm", "Insert", this.data)
			.subscribe((answer: any) => {
				if (answer.Mesaj == null) {
					this.router.navigate(['/Admin/TestForm']);
				}
				else {
					$(".alertMessage").text(answer.Mesaj);
					$(".alert-error").fadeIn("slow");
				}
			},
				resError => this.errorMsg = resError);
	}
}
