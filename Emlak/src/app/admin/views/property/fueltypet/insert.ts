﻿import { Component } from "@angular/core";
import { Router } from "@angular/router";
import { FormBuilder, FormGroup, Validators, FormControl } from "@angular/forms";
import { Subscription } from "rxjs";
import { ModelService } from "../../../services/model";

@Component({
	templateUrl: './insert.html'
})

export class AdminFuelTypeTInsertComponent {
	errorMsg: string;

	insertForm: FormGroup;
	data: any;

	model: any;

	private subscription: Subscription = new Subscription();

	constructor(private service: ModelService, private formBuilder: FormBuilder, private router: Router) {
	}

	ngOnInit() {
		this.data = new Object();

		this.subscription = this.service.get("FuelTypeT", "Insert").subscribe((answer: any) => {
			this.model = answer;
		}, resError => this.errorMsg = resError, () => { this.subscription.unsubscribe(); });

		this.insertForm = this.formBuilder.group({
			FuelTypeID: new FormControl(null, [Validators.required, Validators.min(1)]),
			TransID: new FormControl(null, [Validators.required, Validators.min(1)]),
			Name: new FormControl(null, [Validators.required, Validators.minLength(1), Validators.maxLength(255)]),
		});
	}

	ngOnDestroy(): void {
		this.subscription.unsubscribe();
	}

	onSubmit() {
		this.data.FuelTypeID = this.insertForm.get("FuelTypeID").value;
		this.data.TransID = this.insertForm.get("TransID").value;
		this.data.Name = this.insertForm.get("Name").value;

		this.service.post("FuelTypeT", "Insert", this.data)
			.subscribe((answer: any) => {
				if (answer.Mesaj == null) {
					this.router.navigate(['/Admin/FuelTypeT']);
				}
				else {
					$(".alertMessage").text(answer.Mesaj);
					$(".alert-error").fadeIn("slow");
				}
			},
				resError => this.errorMsg = resError);
	}
}
