import { Component } from "@angular/core";
import { ActivatedRoute, Params, Router } from "@angular/router";
import { FormBuilder, FormGroup, Validators, FormControl } from "@angular/forms";
import { Subscription } from "rxjs";
import { ModelService } from "../../../services/model";

@Component({
	templateUrl: './update.html'
})

export class AdminPropertyDetailsUpdateComponent {
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

	FillData() {
		if (this.callTable == true) {
			this.route.params.subscribe((params: Params) => {
				this.id = params['id'];
				this.subscription = this.service.get("PropertyDetails", "Update", this.id).subscribe((answer: any) => {
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
		this.data.PropID = this.updateForm.get("PropID").value;
		this.data.StatusID = this.updateForm.get("StatusID").value;
		this.data.Owner = this.updateForm.get("Owner").value;
		this.data.CityID = this.updateForm.get("CityID").value;
		this.data.County = this.updateForm.get("County").value;
		this.data.District = this.updateForm.get("District").value;
		this.data.WarmTypeID = this.updateForm.get("WarmTypeID").value;
		this.data.FuelTypeID = this.updateForm.get("FuelTypeID").value;
		this.data.Age = this.updateForm.get("Age").value;
		this.data.Rooms = this.updateForm.get("Rooms").value;
		this.data.LivingRooms = this.updateForm.get("LivingRooms").value;
		this.data.Floors = this.updateForm.get("Floors").value;
		this.data.FloorNumber = this.updateForm.get("FloorNumber").value;
		this.data.Area = this.updateForm.get("Area").value;
		this.data.Latitude = this.updateForm.get("Latitude").value;
		this.data.Longitude = this.updateForm.get("Longitude").value;

		this.service.post("PropertyDetails", "Update", this.data)
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
