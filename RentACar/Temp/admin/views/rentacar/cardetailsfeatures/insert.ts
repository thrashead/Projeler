import { Component } from "@angular/core";
import { Subscription } from "rxjs";
import { ModelService } from "../../../services/model";
import { Router } from "@angular/router";
import { FormBuilder, FormGroup, Validators, FormControl } from "@angular/forms";

@Component({
	templateUrl: './insert.html'
})

export class AdminCarDetailsFeaturesInsertComponent {
	errorMsg: string;

	insertForm: FormGroup;
	data: any;

	model: any;

	private subscription: Subscription = new Subscription();

	constructor(private service: ModelService, private formBuilder: FormBuilder, private router: Router) {
	}

	ngOnInit() {
		this.data = new Object();

		this.subscription = this.service.get("CarDetailsFeatures", "Insert").subscribe((answer: any) => {
			this.model = answer;
		}, resError => this.errorMsg = resError, () => { this.subscription.unsubscribe(); });

		this.insertForm = this.formBuilder.group({
			CarID: new FormControl(null, [Validators.required, Validators.min(0)]),
			ABS: new FormControl(null),
			Airbag: new FormControl(null),
			AirConditioning: new FormControl(null),
			AlloyTires: new FormControl(null),
			AntiTheft: new FormControl(null),
			AudioRemoteControl: new FormControl(null),
			CDPlayer: new FormControl(null),
			CentralLocking: new FormControl(null),
			CooledSeats: new FormControl(null),
			EngineImmobiliser: new FormControl(null),
			FogLamps: new FormControl(null),
			FoldingSeats: new FormControl(null),
			GPS: new FormControl(null),
			HeatedDoorMirrors: new FormControl(null),
			HeatedSeats: new FormControl(null),
			HeadlightCovers: new FormControl(null),
			KeylessEntry: new FormControl(null),
			LeatherSeats: new FormControl(null),
			LeatherTrim: new FormControl(null),
			LPG: new FormControl(null),
			PassengerAirbag: new FormControl(null),
			PowerGlass: new FormControl(null),
			PowerMirrors: new FormControl(null),
			PowerSeats: new FormControl(null),
			PowerSteering: new FormControl(null),
			PowerWindows: new FormControl(null),
			RemoteStart: new FormControl(null),
			SecuritySystem: new FormControl(null),
			SideAirbag: new FormControl(null),
			Spoiler: new FormControl(null),
			TintedWindows: new FormControl(null),
			TowBar: new FormControl(null),
			TripComputer: new FormControl(null),
			Warrenty: new FormControl(null),
		});
	}

	ngOnDestroy(): void {
		this.subscription.unsubscribe();
	}

	onSubmit() {
		this.data.CarID = this.insertForm.get("CarID").value;
		this.data.ABS = this.insertForm.get("ABS").value;
		this.data.Airbag = this.insertForm.get("Airbag").value;
		this.data.AirConditioning = this.insertForm.get("AirConditioning").value;
		this.data.AlloyTires = this.insertForm.get("AlloyTires").value;
		this.data.AntiTheft = this.insertForm.get("AntiTheft").value;
		this.data.AudioRemoteControl = this.insertForm.get("AudioRemoteControl").value;
		this.data.CDPlayer = this.insertForm.get("CDPlayer").value;
		this.data.CentralLocking = this.insertForm.get("CentralLocking").value;
		this.data.CooledSeats = this.insertForm.get("CooledSeats").value;
		this.data.EngineImmobiliser = this.insertForm.get("EngineImmobiliser").value;
		this.data.FogLamps = this.insertForm.get("FogLamps").value;
		this.data.FoldingSeats = this.insertForm.get("FoldingSeats").value;
		this.data.GPS = this.insertForm.get("GPS").value;
		this.data.HeatedDoorMirrors = this.insertForm.get("HeatedDoorMirrors").value;
		this.data.HeatedSeats = this.insertForm.get("HeatedSeats").value;
		this.data.HeadlightCovers = this.insertForm.get("HeadlightCovers").value;
		this.data.KeylessEntry = this.insertForm.get("KeylessEntry").value;
		this.data.LeatherSeats = this.insertForm.get("LeatherSeats").value;
		this.data.LeatherTrim = this.insertForm.get("LeatherTrim").value;
		this.data.LPG = this.insertForm.get("LPG").value;
		this.data.PassengerAirbag = this.insertForm.get("PassengerAirbag").value;
		this.data.PowerGlass = this.insertForm.get("PowerGlass").value;
		this.data.PowerMirrors = this.insertForm.get("PowerMirrors").value;
		this.data.PowerSeats = this.insertForm.get("PowerSeats").value;
		this.data.PowerSteering = this.insertForm.get("PowerSteering").value;
		this.data.PowerWindows = this.insertForm.get("PowerWindows").value;
		this.data.RemoteStart = this.insertForm.get("RemoteStart").value;
		this.data.SecuritySystem = this.insertForm.get("SecuritySystem").value;
		this.data.SideAirbag = this.insertForm.get("SideAirbag").value;
		this.data.Spoiler = this.insertForm.get("Spoiler").value;
		this.data.TintedWindows = this.insertForm.get("TintedWindows").value;
		this.data.TowBar = this.insertForm.get("TowBar").value;
		this.data.TripComputer = this.insertForm.get("TripComputer").value;
		this.data.Warrenty = this.insertForm.get("Warrenty").value;

		this.service.post("CarDetailsFeatures", "Insert", this.data)
			.subscribe((answer: any) => {
				if (answer.Mesaj == null) {
					this.router.navigate(['/Admin/CarDetailsFeatures']);
				}
				else {
					$(".alertMessage").text(answer.Mesaj);
					$(".alert-error").fadeIn("slow");
				}
			},
				resError => this.errorMsg = resError);
	}
}
