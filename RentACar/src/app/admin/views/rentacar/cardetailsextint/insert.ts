import { Component } from "@angular/core";
import { Subscription } from "rxjs";
import { ModelService } from "../../../services/model";
import { Router } from "@angular/router";
import { FormBuilder, FormGroup, Validators, FormControl } from "@angular/forms";

@Component({
	templateUrl: './insert.html'
})

export class AdminCarDetailsExtIntInsertComponent {
	errorMsg: string;

	insertForm: FormGroup;
	data: any;

	model: any;

	private subscription: Subscription = new Subscription();

	constructor(private service: ModelService, private formBuilder: FormBuilder, private router: Router) {
	}

	ngOnInit() {
		this.data = new Object();

		this.subscription = this.service.get("CarDetailsExtInt", "Insert").subscribe((answer: any) => {
			this.model = answer;
		}, resError => this.errorMsg = resError, () => { this.subscription.unsubscribe(); });

		this.insertForm = this.formBuilder.group({
			CarID: new FormControl(null, [Validators.required, Validators.min(0)]),
			BodyTypeID: new FormControl(null, [Validators.required, Validators.min(0)]),
			DriveTypeID: new FormControl(null, [Validators.required, Validators.min(0)]),
			Tires: new FormControl(null, [Validators.maxLength(50)]),
			Seats: new FormControl(null),
			Doors: new FormControl(null),
			ExtColor: new FormControl(null, [Validators.maxLength(25)]),
			IntColor: new FormControl(null, [Validators.maxLength(25)]),
			TrimStyle: new FormControl(null, [Validators.maxLength(25)]),
		});
	}

	ngOnDestroy(): void {
		this.subscription.unsubscribe();
	}

	onSubmit() {
		this.data.CarID = this.insertForm.get("CarID").value;
		this.data.BodyTypeID = this.insertForm.get("BodyTypeID").value;
		this.data.DriveTypeID = this.insertForm.get("DriveTypeID").value;
		this.data.Tires = this.insertForm.get("Tires").value;
		this.data.Seats = this.insertForm.get("Seats").value;
		this.data.Doors = this.insertForm.get("Doors").value;
		this.data.ExtColor = this.insertForm.get("ExtColor").value;
		this.data.IntColor = this.insertForm.get("IntColor").value;
		this.data.TrimStyle = this.insertForm.get("TrimStyle").value;

		this.service.post("CarDetailsExtInt", "Insert", this.data)
			.subscribe((answer: any) => {
				if (answer.Mesaj == null) {
					this.router.navigate(['/Admin/CarDetailsExtInt']);
				}
				else {
					$(".alertMessage").text(answer.Mesaj);
					$(".alert-error").fadeIn("slow");
				}
			},
				resError => this.errorMsg = resError);
	}
}
