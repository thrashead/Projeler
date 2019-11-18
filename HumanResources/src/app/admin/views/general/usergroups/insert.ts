import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { ModelService } from '../../../services/model';

@Component({
	templateUrl: './insert.html'
})

export class AdminUserGroupsInsertComponent {
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
			Name: new FormControl(null, [Validators.required, Validators.minLength(1), Validators.maxLength(50)]),
			ShortName: new FormControl(null, [Validators.required, Validators.minLength(1), Validators.maxLength(5)]),
			Description: new FormControl(null, [Validators.maxLength(255)]),
		});
	}

	ngOnDestroy(): void {
		this.subscription.unsubscribe();
	}

	onSubmit() {
		this.data.Name = this.insertForm.get("Name").value;
		this.data.ShortName = this.insertForm.get("ShortName").value;
		this.data.Description = this.insertForm.get("Description").value;

		this.service.post("UserGroups", "Insert", this.data).subscribe((answer: any) => {
			if (answer.Mesaj == null) {
				this.router.navigate(['/Admin/UserGroups']);
			}
			else {
				$(".alertMessage").text(answer.Mesaj);
				$(".alert-error").fadeIn("slow");
			}
		}, resError => this.errorMsg = resError);
	}
}
