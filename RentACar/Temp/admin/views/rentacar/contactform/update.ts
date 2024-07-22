import { Component } from "@angular/core";
import { Subscription } from "rxjs";
import { ModelService } from "../../../services/model";
import { ActivatedRoute, Params, Router } from "@angular/router";
import { FormBuilder, FormGroup, Validators, FormControl } from "@angular/forms";

@Component({
	templateUrl: './update.html'
})

export class AdminContactFormUpdateComponent {
	errorMsg: string;
	id: string;

	updateForm: FormGroup;
	data: any;

	model: any;

	callTable: boolean;

	private subscription: Subscription = new Subscription();

	constructor(private service: ModelService, private formBuilder: FormBuilder, private router: Router, private route: ActivatedRoute) {
	}

	ngOnInit() {
		this.data = new Object();

		this.callTable = true;
		this.FillData();

		this.updateForm = this.formBuilder.group({
			ID: new FormControl(null, [Validators.required, Validators.min(0)]),
			Sender: new FormControl(null, [Validators.required, Validators.minLength(1), Validators.maxLength(255)]),
			Mail: new FormControl(null, [Validators.required, Validators.minLength(1), Validators.maxLength(255)]),
			Phone: new FormControl(null, [Validators.required, Validators.minLength(1), Validators.maxLength(255)]),
			Message: new FormControl(null, [Validators.required, Validators.minLength(1), Validators.maxLength(255)]),
			SendDate: new FormControl(null),
		});
	}

	FillData() {
		if (this.callTable == true) {
			this.route.params.subscribe((params: Params) => {
				this.id = params['id'];
				this.subscription = this.service.get("ContactForm", "Update", this.id).subscribe((answer: any) => {
					this.model = answer;
					this.callTable = false;
				}, resError => this.errorMsg = resError, () => { this.subscription.unsubscribe(); });
			});
		}
	}

	ngOnDestroy(): void {
		this.subscription.unsubscribe();
	}

	onSubmit() {
		this.data.ID = this.updateForm.get("ID").value;
		this.data.Sender = this.updateForm.get("Sender").value;
		this.data.Mail = this.updateForm.get("Mail").value;
		this.data.Phone = this.updateForm.get("Phone").value;
		this.data.Message = this.updateForm.get("Message").value;
		this.data.SendDate = this.updateForm.get("SendDate").value;

		this.service.post("ContactForm", "Update", this.data)
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
