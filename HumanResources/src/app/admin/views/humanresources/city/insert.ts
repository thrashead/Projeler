import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { ModelService } from '../../../services/model';

@Component({
	templateUrl: './insert.html'
})

export class AdminCityInsertComponent {
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
			Name: new FormControl(null, [Validators.required, Validators.minLength(1), Validators.maxLength(30)]),
			Code: new FormControl(null, [Validators.required, Validators.min(1)]),
			Active: new FormControl(null),
			Show: new FormControl(null),
			Order: new FormControl(null),
		});
	}

	ngOnDestroy(): void {
		this.subscription.unsubscribe();
	}

	onSubmit() {
		this.data.Name = this.insertForm.get("Name").value;
		this.data.Code = this.insertForm.get("Code").value;
		this.data.Active = this.insertForm.get("Active").value;
		this.data.Show = this.insertForm.get("Show").value;
		this.data.Order = this.insertForm.get("Order").value;

		this.service.post("City", "Insert", this.data).subscribe((answer: any) => {
			if (answer.Mesaj == null) {
				this.router.navigate(['/Admin/City']);
			}
			else {
				$(".alertMessage").text(answer.Mesaj);
				$(".alert-error").fadeIn("slow");
			}
		}, resError => this.errorMsg = resError);
	}
}
