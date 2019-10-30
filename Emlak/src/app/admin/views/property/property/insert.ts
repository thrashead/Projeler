import { Component } from "@angular/core";
import { Router } from "@angular/router";
import { FormBuilder, FormGroup, Validators, FormControl } from "@angular/forms";
import { Subscription } from "rxjs";
import { ModelService } from "../../../services/model";

@Component({
	templateUrl: './insert.html'
})

export class AdminPropertyInsertComponent {
	errorMsg: string;

	insertForm: FormGroup;
	data: any;

	model: any;

	private subscription: Subscription = new Subscription();

	constructor(private service: ModelService, private formBuilder: FormBuilder, private router: Router) {
	}

	ngOnInit() {
		this.data = new Object();

        this.insertForm = this.formBuilder.group({
            CatID: new FormControl(null, [Validators.required, Validators.min(1)]),
			Title: new FormControl(null, [Validators.required, Validators.minLength(1), Validators.maxLength(255)]),
			Code: new FormControl(null, [Validators.maxLength(15)]),
			Price: new FormControl(null, [Validators.required, Validators.min(1)]),
			Forsale: new FormControl(null),
			NewBrand: new FormControl(null),
			PropOfDay: new FormControl(null),
			Active: new FormControl(null),
		});
	}

	ngOnDestroy(): void {
		this.subscription.unsubscribe();
	}

    onSubmit() {
        this.data.CatID = this.insertForm.get("CatID").value;
		this.data.Title = this.insertForm.get("Title").value;
		this.data.Code = this.insertForm.get("Code").value;
		this.data.Price = this.insertForm.get("Price").value;
		this.data.Forsale = this.insertForm.get("Forsale").value;
		this.data.NewBrand = this.insertForm.get("NewBrand").value;
		this.data.PropOfDay = this.insertForm.get("PropOfDay").value;
		this.data.Active = this.insertForm.get("Active").value;

		this.service.post("Property", "Insert", this.data)
			.subscribe((answer: any) => {
				if (answer.Mesaj == null) {
					this.router.navigate(['/Admin/Property']);
				}
				else {
					$(".alertMessage").text(answer.Mesaj);
					$(".alert-error").fadeIn("slow");
				}
			},
				resError => this.errorMsg = resError);
	}
}
