import { Component } from "@angular/core";
import { Subscription } from "rxjs";
import { ModelService } from "../../../services/model";
import { Router } from "@angular/router";
import { FormBuilder, FormGroup, Validators, FormControl } from "@angular/forms";

@Component({
	templateUrl: './insert.html'
})

export class AdminContactFormInsertComponent {
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
			Sender: new FormControl(null, [Validators.required, Validators.minLength(1), Validators.maxLength(255)]),
			Mail: new FormControl(null, [Validators.required, Validators.minLength(1), Validators.maxLength(255)]),
			Phone: new FormControl(null, [Validators.required, Validators.minLength(1), Validators.maxLength(255)]),
			Message: new FormControl(null, [Validators.required, Validators.minLength(1), Validators.maxLength(255)]),
			SendDate: new FormControl(null),
		});
	}

	ngOnDestroy(): void {
		this.subscription.unsubscribe();
	}

	onSubmit() {
		this.data.Sender = this.insertForm.get("Sender").value;
		this.data.Mail = this.insertForm.get("Mail").value;
		this.data.Phone = this.insertForm.get("Phone").value;
		this.data.Message = this.insertForm.get("Message").value;
		this.data.SendDate = this.insertForm.get("SendDate").value;

		this.service.post("ContactForm", "Insert", this.data)
			.subscribe((answer: any) => {
				if (answer.Mesaj == null) {
					this.router.navigate(['/Admin/ContactForm']);
				}
				else {
					$(".alertMessage").text(answer.Mesaj);
					$(".alert-error").fadeIn("slow");
				}
			},
				resError => this.errorMsg = resError);
	}
}
