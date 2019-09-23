import { Component } from "@angular/core";
import { Subscription } from "rxjs";
import { ModelService } from "../../../services/model";
import { ActivatedRoute, Params, Router } from "@angular/router";
import { FormBuilder, FormGroup, Validators, FormControl } from "@angular/forms";

@Component({
	templateUrl: './update.html'
})

export class AdminCarDetailsFeaturesUpdateComponent {
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

	FillData() {
		if (this.callTable == true) {
			this.route.params.subscribe((params: Params) => {
				this.id = params['id'];
				this.subscription = this.service.get("CarDetailsFeatures", "Update", this.id).subscribe((answer: any) => {
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
		this.data.ABS = this.updateForm.get("ABS").value;
		this.data.Airbag = this.updateForm.get("Airbag").value;
		this.data.AirConditioning = this.updateForm.get("AirConditioning").value;
		this.data.AlloyTires = this.updateForm.get("AlloyTires").value;
		this.data.AntiTheft = this.updateForm.get("AntiTheft").value;
		this.data.AudioRemoteControl = this.updateForm.get("AudioRemoteControl").value;
		this.data.CDPlayer = this.updateForm.get("CDPlayer").value;
		this.data.CentralLocking = this.updateForm.get("CentralLocking").value;
		this.data.CooledSeats = this.updateForm.get("CooledSeats").value;
		this.data.EngineImmobiliser = this.updateForm.get("EngineImmobiliser").value;
		this.data.FogLamps = this.updateForm.get("FogLamps").value;
		this.data.FoldingSeats = this.updateForm.get("FoldingSeats").value;
		this.data.GPS = this.updateForm.get("GPS").value;
		this.data.HeatedDoorMirrors = this.updateForm.get("HeatedDoorMirrors").value;
		this.data.HeatedSeats = this.updateForm.get("HeatedSeats").value;
		this.data.HeadlightCovers = this.updateForm.get("HeadlightCovers").value;
		this.data.KeylessEntry = this.updateForm.get("KeylessEntry").value;
		this.data.LeatherSeats = this.updateForm.get("LeatherSeats").value;
		this.data.LeatherTrim = this.updateForm.get("LeatherTrim").value;
		this.data.LPG = this.updateForm.get("LPG").value;
		this.data.PassengerAirbag = this.updateForm.get("PassengerAirbag").value;
		this.data.PowerGlass = this.updateForm.get("PowerGlass").value;
		this.data.PowerMirrors = this.updateForm.get("PowerMirrors").value;
		this.data.PowerSeats = this.updateForm.get("PowerSeats").value;
		this.data.PowerSteering = this.updateForm.get("PowerSteering").value;
		this.data.PowerWindows = this.updateForm.get("PowerWindows").value;
		this.data.RemoteStart = this.updateForm.get("RemoteStart").value;
		this.data.SecuritySystem = this.updateForm.get("SecuritySystem").value;
		this.data.SideAirbag = this.updateForm.get("SideAirbag").value;
		this.data.Spoiler = this.updateForm.get("Spoiler").value;
		this.data.TintedWindows = this.updateForm.get("TintedWindows").value;
		this.data.TowBar = this.updateForm.get("TowBar").value;
		this.data.TripComputer = this.updateForm.get("TripComputer").value;
		this.data.Warrenty = this.updateForm.get("Warrenty").value;

		this.service.post("CarDetailsFeatures", "Update", this.data)
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
