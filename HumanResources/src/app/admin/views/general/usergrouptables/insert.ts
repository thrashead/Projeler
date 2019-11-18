import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { ModelService } from '../../../services/model';

@Component({
	templateUrl: './insert.html'
})

export class AdminUserGroupTablesInsertComponent {
	errorMsg: string;

	insertForm: FormGroup;

	data: any;
	model: any;

	private subscription: Subscription = new Subscription();

	constructor(private service: ModelService, private formBuilder: FormBuilder, private router: Router) {
	}

	ngOnInit() {
		this.data = new Object();

		this.subscription = this.service.get("UserGroupTables", "Insert").subscribe((answer: any) => {
			this.model = answer;
		}, resError => this.errorMsg = resError, () => { this.subscription.unsubscribe(); });

		this.insertForm = this.formBuilder.group({
			TypeID: new FormControl(null, [Validators.required, Validators.min(1)]),
			UserGroupID: new FormControl(null, [Validators.required, Validators.min(1)]),
		});
	}

	ngOnDestroy(): void {
		this.subscription.unsubscribe();
	}

	onSubmit() {
		this.data.TypeID = this.insertForm.get("TypeID").value;
		this.data.UserGroupID = this.insertForm.get("UserGroupID").value;

		this.service.post("UserGroupTables", "Insert", this.data).subscribe((answer: any) => {
			if (answer.Mesaj == null) {
				this.router.navigate(['/Admin/UserGroupTables']);
			}
			else {
				$(".alertMessage").text(answer.Mesaj);
				$(".alert-error").fadeIn("slow");
			}
		}, resError => this.errorMsg = resError);
	}
}
