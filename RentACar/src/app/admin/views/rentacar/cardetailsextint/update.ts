﻿import { Component } from "@angular/core";
import { Subscription } from "rxjs";
import { ModelService } from "../../../services/model";
import { ActivatedRoute, Params, Router } from "@angular/router";
import { FormBuilder, FormGroup, Validators, FormControl } from "@angular/forms";

@Component({
	templateUrl: './update.html'
})

export class AdminCarDetailsExtIntUpdateComponent {
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

	FillData() {
		if (this.callTable == true) {
			this.route.params.subscribe((params: Params) => {
				this.id = params['id'];
				this.subscription = this.service.get("CarDetailsExtInt", "Update", this.id).subscribe((answer: any) => {
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
		this.data.BodyTypeID = this.updateForm.get("BodyTypeID").value;
		this.data.DriveTypeID = this.updateForm.get("DriveTypeID").value;
		this.data.Tires = this.updateForm.get("Tires").value;
		this.data.Seats = this.updateForm.get("Seats").value;
		this.data.Doors = this.updateForm.get("Doors").value;
		this.data.ExtColor = this.updateForm.get("ExtColor").value;
		this.data.IntColor = this.updateForm.get("IntColor").value;
		this.data.TrimStyle = this.updateForm.get("TrimStyle").value;

		this.service.post("CarDetailsExtInt", "Update", this.data)
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