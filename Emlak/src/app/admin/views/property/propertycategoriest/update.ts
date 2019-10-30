﻿import { Component } from "@angular/core";
import { ActivatedRoute, Params, Router } from "@angular/router";
import { FormBuilder, FormGroup, Validators, FormControl } from "@angular/forms";
import { Subscription } from "rxjs";
import { ModelService } from "../../../services/model";

@Component({
	templateUrl: './update.html'
})

export class AdminPropertyCategoriesTUpdateComponent {
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
			PropCatID: new FormControl(null, [Validators.required, Validators.min(1)]),
			TransID: new FormControl(null, [Validators.required, Validators.min(1)]),
			CategoryName: new FormControl(null, [Validators.required, Validators.minLength(1), Validators.maxLength(255)]),
			ShortText: new FormControl(null, [Validators.maxLength(50)]),
			Description: new FormControl(null, [Validators.maxLength(255)]),
		});
	}

	FillData() {
		if (this.callTable == true) {
			this.route.params.subscribe((params: Params) => {
				this.id = params['id'];
				this.subscription = this.service.get("PropertyCategoriesT", "Update", this.id).subscribe((answer: any) => {
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
		this.data.PropCatID = this.updateForm.get("PropCatID").value;
		this.data.TransID = this.updateForm.get("TransID").value;
		this.data.CategoryName = this.updateForm.get("CategoryName").value;
		this.data.ShortText = this.updateForm.get("ShortText").value;
		this.data.Description = this.updateForm.get("Description").value;

		this.service.post("PropertyCategoriesT", "Update", this.data)
			.subscribe((answer: any) => {
				if (answer.Mesaj == null) {
					this.router.navigate(['/Admin/PropertyCategoriesT']);
				}
				else {
					$(".alertMessage").text(answer.Mesaj);
					$(".alert-error").fadeIn("slow");
				}
			},
				resError => this.errorMsg = resError);
	}
}
