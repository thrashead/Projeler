import { Component } from "@angular/core";
import { FormBuilder, FormGroup, Validators, FormControl } from "@angular/forms";
import { Subscription } from "rxjs";
import { ModelService } from "../../../services/model";
import { ActivatedRoute, Params, Router } from "@angular/router"; 

@Component({
	templateUrl: './update.html'
})

export class AdminTestFormUpdateComponent {
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
			ID: new FormControl(null, [Validators.required, Validators.min(1)]),
			CarID: new FormControl(null, [Validators.required, Validators.min(1)]),
			Name: new FormControl(null, [Validators.required, Validators.minLength(1), Validators.maxLength(100)]),
			Mail: new FormControl(null, [Validators.required, Validators.minLength(1), Validators.maxLength(255)]),
			Phone: new FormControl(null, [Validators.required, Validators.minLength(1), Validators.maxLength(15)]),
			Message: new FormControl(null, [Validators.required, Validators.minLength(1), Validators.maxLength(255)]),
			Accepted: new FormControl(null),
		});
	}

	FillData() {
		if (this.callTable == true) {
			this.route.params.subscribe((params: Params) => {
				this.id = params['id'];
				this.subscription = this.service.get("TestForm", "Update", this.id).subscribe((answer: any) => {
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
		this.data.CarID = this.updateForm.get("CarID").value;
		this.data.Name = this.updateForm.get("Name").value;
		this.data.Mail = this.updateForm.get("Mail").value;
		this.data.Phone = this.updateForm.get("Phone").value;
		this.data.Message = this.updateForm.get("Message").value;
		this.data.Accepted = this.updateForm.get("Accepted").value;

		this.service.post("TestForm", "Update", this.data)
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
