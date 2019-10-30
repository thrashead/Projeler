import { Component } from "@angular/core";
import { Router } from "@angular/router";
import { FormBuilder, FormGroup, Validators, FormControl } from "@angular/forms";
import { Subscription } from "rxjs";
import { ModelService } from "../../../services/model";

@Component({
	templateUrl: './insert.html'
})

export class AdminPropertyFeaturesInsertComponent {
	errorMsg: string;

	insertForm: FormGroup;
	data: any;

	model: any;

	private subscription: Subscription = new Subscription();

	constructor(private service: ModelService, private formBuilder: FormBuilder, private router: Router) {
	}

	ngOnInit() {
		this.data = new Object();

		this.subscription = this.service.get("PropertyFeatures", "Insert").subscribe((answer: any) => {
			this.model = answer;
		}, resError => this.errorMsg = resError, () => { this.subscription.unsubscribe(); });

		this.insertForm = this.formBuilder.group({
			PropID: new FormControl(null, [Validators.required, Validators.min(1)]),
			BackSide: new FormControl(null),
			Frontage: new FormControl(null),
			NearStreet: new FormControl(null),
			NextSeashore: new FormControl(null),
			NearSea: new FormControl(null),
			Scenic: new FormControl(null),
			Central: new FormControl(null),
			Metro: new FormControl(null),
			NearHighway: new FormControl(null),
			NearTransport: new FormControl(null),
			Elevator: new FormControl(null),
			Garden: new FormControl(null),
			Security: new FormControl(null),
			Booster: new FormControl(null),
			Sheathing: new FormControl(null),
			Generator: new FormControl(null),
			Doorman: new FormControl(null),
			Carpark: new FormControl(null),
			Playground: new FormControl(null),
			PVC: new FormControl(null),
			Insite: new FormControl(null),
			FireEscape: new FormControl(null),
			SwimmingPool: new FormControl(null),
			Alarm: new FormControl(null),
			Balcony: new FormControl(null),
			SteelDoor: new FormControl(null),
			VideoIntercom: new FormControl(null),
			Jacuzzi: new FormControl(null),
			CableTVSatellite: new FormControl(null),
			AirCondition: new FormControl(null),
		});
	}

	ngOnDestroy(): void {
		this.subscription.unsubscribe();
	}

	onSubmit() {
		this.data.PropID = this.insertForm.get("PropID").value;
		this.data.BackSide = this.insertForm.get("BackSide").value;
		this.data.Frontage = this.insertForm.get("Frontage").value;
		this.data.NearStreet = this.insertForm.get("NearStreet").value;
		this.data.NextSeashore = this.insertForm.get("NextSeashore").value;
		this.data.NearSea = this.insertForm.get("NearSea").value;
		this.data.Scenic = this.insertForm.get("Scenic").value;
		this.data.Central = this.insertForm.get("Central").value;
		this.data.Metro = this.insertForm.get("Metro").value;
		this.data.NearHighway = this.insertForm.get("NearHighway").value;
		this.data.NearTransport = this.insertForm.get("NearTransport").value;
		this.data.Elevator = this.insertForm.get("Elevator").value;
		this.data.Garden = this.insertForm.get("Garden").value;
		this.data.Security = this.insertForm.get("Security").value;
		this.data.Booster = this.insertForm.get("Booster").value;
		this.data.Sheathing = this.insertForm.get("Sheathing").value;
		this.data.Generator = this.insertForm.get("Generator").value;
		this.data.Doorman = this.insertForm.get("Doorman").value;
		this.data.Carpark = this.insertForm.get("Carpark").value;
		this.data.Playground = this.insertForm.get("Playground").value;
		this.data.PVC = this.insertForm.get("PVC").value;
		this.data.Insite = this.insertForm.get("Insite").value;
		this.data.FireEscape = this.insertForm.get("FireEscape").value;
		this.data.SwimmingPool = this.insertForm.get("SwimmingPool").value;
		this.data.Alarm = this.insertForm.get("Alarm").value;
		this.data.Balcony = this.insertForm.get("Balcony").value;
		this.data.SteelDoor = this.insertForm.get("SteelDoor").value;
		this.data.VideoIntercom = this.insertForm.get("VideoIntercom").value;
		this.data.Jacuzzi = this.insertForm.get("Jacuzzi").value;
		this.data.CableTVSatellite = this.insertForm.get("CableTVSatellite").value;
		this.data.AirCondition = this.insertForm.get("AirCondition").value;

		this.service.post("PropertyFeatures", "Insert", this.data)
			.subscribe((answer: any) => {
				if (answer.Mesaj == null) {
					this.router.navigate(['/Admin/PropertyFeatures']);
				}
				else {
					$(".alertMessage").text(answer.Mesaj);
					$(".alert-error").fadeIn("slow");
				}
			},
				resError => this.errorMsg = resError);
	}
}
