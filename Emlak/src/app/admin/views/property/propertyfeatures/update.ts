import { Component } from "@angular/core";
import { ActivatedRoute, Params, Router } from "@angular/router";
import { FormBuilder, FormGroup, Validators, FormControl } from "@angular/forms";
import { Subscription } from "rxjs";
import { ModelService } from "../../../services/model";

@Component({
	templateUrl: './update.html'
})

export class AdminPropertyFeaturesUpdateComponent {
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

	FillData() {
		if (this.callTable == true) {
			this.route.params.subscribe((params: Params) => {
				this.id = params['id'];
				this.subscription = this.service.get("PropertyFeatures", "Update", this.id).subscribe((answer: any) => {
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
		this.data.BackSide = this.updateForm.get("BackSide").value;
		this.data.Frontage = this.updateForm.get("Frontage").value;
		this.data.NearStreet = this.updateForm.get("NearStreet").value;
		this.data.NextSeashore = this.updateForm.get("NextSeashore").value;
		this.data.NearSea = this.updateForm.get("NearSea").value;
		this.data.Scenic = this.updateForm.get("Scenic").value;
		this.data.Central = this.updateForm.get("Central").value;
		this.data.Metro = this.updateForm.get("Metro").value;
		this.data.NearHighway = this.updateForm.get("NearHighway").value;
		this.data.NearTransport = this.updateForm.get("NearTransport").value;
		this.data.Elevator = this.updateForm.get("Elevator").value;
		this.data.Garden = this.updateForm.get("Garden").value;
		this.data.Security = this.updateForm.get("Security").value;
		this.data.Booster = this.updateForm.get("Booster").value;
		this.data.Sheathing = this.updateForm.get("Sheathing").value;
		this.data.Generator = this.updateForm.get("Generator").value;
		this.data.Doorman = this.updateForm.get("Doorman").value;
		this.data.Carpark = this.updateForm.get("Carpark").value;
		this.data.Playground = this.updateForm.get("Playground").value;
		this.data.PVC = this.updateForm.get("PVC").value;
		this.data.Insite = this.updateForm.get("Insite").value;
		this.data.FireEscape = this.updateForm.get("FireEscape").value;
		this.data.SwimmingPool = this.updateForm.get("SwimmingPool").value;
		this.data.Alarm = this.updateForm.get("Alarm").value;
		this.data.Balcony = this.updateForm.get("Balcony").value;
		this.data.SteelDoor = this.updateForm.get("SteelDoor").value;
		this.data.VideoIntercom = this.updateForm.get("VideoIntercom").value;
		this.data.Jacuzzi = this.updateForm.get("Jacuzzi").value;
		this.data.CableTVSatellite = this.updateForm.get("CableTVSatellite").value;
		this.data.AirCondition = this.updateForm.get("AirCondition").value;

		this.service.post("PropertyFeatures", "Update", this.data)
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
