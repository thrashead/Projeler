import { Component } from "@angular/core";
import { Subscription } from "rxjs";
import { ModelService } from "../../../services/model";
import { ActivatedRoute, Params, Router } from "@angular/router";
import { FormBuilder, FormGroup, Validators, FormControl } from "@angular/forms";

@Component({
	templateUrl: './update.html'
})

export class AdminCarDetailsMechanicalUpdateComponent {
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

	FillData() {
		if (this.callTable == true) {
			this.route.params.subscribe((params: Params) => {
				this.id = params['id'];
				this.subscription = this.service.get("CarDetailsMechanical", "Update", this.id).subscribe((answer: any) => {
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
		this.data.EngineTypeID = this.updateForm.get("EngineTypeID").value;
		this.data.EngineCapacity = this.updateForm.get("EngineCapacity").value;
		this.data.Cylinders = this.updateForm.get("Cylinders").value;
		this.data.Horsepower = this.updateForm.get("Horsepower").value;
		this.data.FuelTypeID = this.updateForm.get("FuelTypeID").value;
		this.data.FuelCapacity = this.updateForm.get("FuelCapacity").value;
		this.data.CityFuelEconomy = this.updateForm.get("CityFuelEconomy").value;
		this.data.HighwayFuelEconomy = this.updateForm.get("HighwayFuelEconomy").value;
		this.data.GearsTypeID = this.updateForm.get("GearsTypeID").value;
		this.data.GearsNumber = this.updateForm.get("GearsNumber").value;
		this.data.Drivetrain = this.updateForm.get("Drivetrain").value;

		this.service.post("CarDetailsMechanical", "Update", this.data)
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
