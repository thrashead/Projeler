import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { ModelService } from '../../../services/model';

@Component({
	templateUrl: './insert.html'
})

export class AdminUsersInsertComponent {
	errorMsg: string;

	insertForm: FormGroup;

	data: any;
	model: any;

	private subscription: Subscription = new Subscription();

	constructor(private service: ModelService, private formBuilder: FormBuilder, private router: Router) {
	}

	ngOnInit() {
		this.data = new Object();

		this.subscription = this.service.get("Users", "Insert").subscribe((answer: any) => {
			this.model = answer;
		}, resError => this.errorMsg = resError, () => { this.subscription.unsubscribe(); });

		this.insertForm = this.formBuilder.group({
			GroupID: new FormControl(null, [Validators.required, Validators.min(1)]),
			Username: new FormControl(null, [Validators.required, Validators.minLength(1), Validators.maxLength(25)]),
			Password: new FormControl(null, [Validators.required, Validators.minLength(1), Validators.maxLength(50)]),
			Active: new FormControl(null),
		});
	}

	ngOnDestroy(): void {
		this.subscription.unsubscribe();
	}

	onSubmit() {
		this.data.GroupID = this.insertForm.get("GroupID").value;
		this.data.Username = this.insertForm.get("Username").value;
		this.data.Password = this.insertForm.get("Password").value;
		this.data.Active = this.insertForm.get("Active").value;

		this.service.post("Users", "Insert", this.data).subscribe((answer: any) => {
			if (answer.Mesaj == null) {
				this.router.navigate(['/Admin/Users']);
			}
			else {
				$(".alertMessage").text(answer.Mesaj);
				$(".alert-error").fadeIn("slow");
			}
		}, resError => this.errorMsg = resError);
	}
}
