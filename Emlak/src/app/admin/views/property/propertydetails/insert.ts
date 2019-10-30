import { Component } from "@angular/core";
import { Router } from "@angular/router";
import { FormBuilder, FormGroup, Validators, FormControl } from "@angular/forms";
import { Subscription } from "rxjs";
import { ModelService } from "../../../services/model";

@Component({
	templateUrl: './insert.html'
})

export class AdminPropertyDetailsInsertComponent {
	errorMsg: string;

	insertForm: FormGroup;
	data: any;

	model: any;

	private subscription: Subscription = new Subscription();

	constructor(private service: ModelService, private formBuilder: FormBuilder, private router: Router) {
	}

	ngOnInit() {
		this.data = new Object();

		this.subscription = this.service.get("PropertyDetails", "Insert").subscribe((answer: any) => {
			this.model = answer;
		}, resError => this.errorMsg = resError, () => { this.subscription.unsubscribe(); });

		this.insertForm = this.formBuilder.group({
			PropID: new FormControl(null, [Validators.required, Validators.min(1)]),
			StatusID: new FormControl(null, [Validators.required, Validators.min(1)]),
			Owner: new FormControl(null, [Validators.maxLength(50)]),
			CityID: new FormControl(null, [Validators.required, Validators.min(1)]),
			County: new FormControl(null, [Validators.maxLength(255)]),
			District: new FormControl(null, [Validators.maxLength(255)]),
			WarmTypeID: new FormControl(null, [Validators.required, Validators.min(1)]),
			FuelTypeID: new FormControl(null, [Validators.required, Validators.min(1)]),
			Age: new FormControl(null),
			Rooms: new FormControl(null),
			LivingRooms: new FormControl(null),
			Floors: new FormControl(null),
			FloorNumber: new FormControl(null),
			Area: new FormControl(null),
			Latitude: new FormControl(null, [Validators.maxLength(25)]),
			Longitude: new FormControl(null, [Validators.maxLength(25)]),
		});
	}

	ngOnDestroy(): void {
		this.subscription.unsubscribe();
	}

	onSubmit() {
		this.data.PropID = this.insertForm.get("PropID").value;
		this.data.StatusID = this.insertForm.get("StatusID").value;
		this.data.Owner = this.insertForm.get("Owner").value;
		this.data.CityID = this.insertForm.get("CityID").value;
		this.data.County = this.insertForm.get("County").value;
		this.data.District = this.insertForm.get("District").value;
		this.data.WarmTypeID = this.insertForm.get("WarmTypeID").value;
		this.data.FuelTypeID = this.insertForm.get("FuelTypeID").value;
		this.data.Age = this.insertForm.get("Age").value;
		this.data.Rooms = this.insertForm.get("Rooms").value;
		this.data.LivingRooms = this.insertForm.get("LivingRooms").value;
		this.data.Floors = this.insertForm.get("Floors").value;
		this.data.FloorNumber = this.insertForm.get("FloorNumber").value;
		this.data.Area = this.insertForm.get("Area").value;
		this.data.Latitude = this.insertForm.get("Latitude").value;
		this.data.Longitude = this.insertForm.get("Longitude").value;

		this.service.post("PropertyDetails", "Insert", this.data)
			.subscribe((answer: any) => {
				if (answer.Mesaj == null) {
					this.router.navigate(['/Admin/PropertyDetails']);
				}
				else {
					$(".alertMessage").text(answer.Mesaj);
					$(".alert-error").fadeIn("slow");
				}
			},
				resError => this.errorMsg = resError);
	}
}
