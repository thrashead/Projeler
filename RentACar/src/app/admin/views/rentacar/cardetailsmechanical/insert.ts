import { Component } from "@angular/core";
import { Subscription } from "rxjs";
import { ModelService } from "../../../services/model";
import { Router } from "@angular/router";
import { FormBuilder, FormGroup, Validators, FormControl } from "@angular/forms";

@Component({
	templateUrl: './insert.html'
})

export class AdminCarDetailsMechanicalInsertComponent {
	errorMsg: string;

	insertForm: FormGroup;
	data: any;

	model: any;

	private subscription: Subscription = new Subscription();

	constructor(private service: ModelService, private formBuilder: FormBuilder, private router: Router) {
	}

	ngOnInit() {
		this.data = new Object();

		this.subscription = this.service.get("CarDetailsMechanical", "Insert").subscribe((answer: any) => {
			this.model = answer;
		}, resError => this.errorMsg = resError, () => { this.subscription.unsubscribe(); });

		this.insertForm = this.formBuilder.group({
			CarID: new FormControl(null, [Validators.required, Validators.min(0)]),
			EngineTypeID: new FormControl(null, [Validators.required, Validators.min(0)]),
			EngineCapacity: new FormControl(null),
			Cylinders: new FormControl(null),
			Horsepower: new FormControl(null),
			FuelTypeID: new FormControl(null, [Validators.required, Validators.min(0)]),
			FuelCapacity: new FormControl(null),
			CityFuelEconomy: new FormControl(null, [Validators.maxLength(25)]),
			HighwayFuelEconomy: new FormControl(null, [Validators.maxLength(25)]),
			GearsTypeID: new FormControl(null, [Validators.required, Validators.min(0)]),
			GearsNumber: new FormControl(null),
			Drivetrain: new FormControl(null, [Validators.required, Validators.min(0)]),
		});
	}

	ngOnDestroy(): void {
		this.subscription.unsubscribe();
	}

	onSubmit() {
		this.data.CarID = this.insertForm.get("CarID").value;
		this.data.EngineTypeID = this.insertForm.get("EngineTypeID").value;
		this.data.EngineCapacity = this.insertForm.get("EngineCapacity").value;
		this.data.Cylinders = this.insertForm.get("Cylinders").value;
		this.data.Horsepower = this.insertForm.get("Horsepower").value;
		this.data.FuelTypeID = this.insertForm.get("FuelTypeID").value;
		this.data.FuelCapacity = this.insertForm.get("FuelCapacity").value;
		this.data.CityFuelEconomy = this.insertForm.get("CityFuelEconomy").value;
		this.data.HighwayFuelEconomy = this.insertForm.get("HighwayFuelEconomy").value;
		this.data.GearsTypeID = this.insertForm.get("GearsTypeID").value;
		this.data.GearsNumber = this.insertForm.get("GearsNumber").value;
		this.data.Drivetrain = this.insertForm.get("Drivetrain").value;

		this.service.post("CarDetailsMechanical", "Insert", this.data)
			.subscribe((answer: any) => {
				if (answer.Mesaj == null) {
					this.router.navigate(['/Admin/CarDetailsMechanical']);
				}
				else {
					$(".alertMessage").text(answer.Mesaj);
					$(".alert-error").fadeIn("slow");
				}
			},
				resError => this.errorMsg = resError);
	}
}
