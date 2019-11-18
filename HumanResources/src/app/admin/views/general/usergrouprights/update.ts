import { Component } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { ModelService } from '../../../services/model';

@Component({
	templateUrl: './update.html'
})

export class AdminUserGroupRightsUpdateComponent {
	errorMsg: string;
	id: string;

	callTable: boolean;

	updateForm: FormGroup;

	data: any;
	model: any;

	private subscription: Subscription = new Subscription();

	constructor(private service: ModelService, private formBuilder: FormBuilder, private router: Router, private route: ActivatedRoute) {
	}

	ngOnInit() {
		this.data = new Object();

		this.callTable = true;
		this.FillData();

		this.updateForm = this.formBuilder.group({
			ID: new FormControl(null, [Validators.required, Validators.min(1)]),
			UserGroupTableID: new FormControl(null, [Validators.required, Validators.min(1)]),
			UserGroupProcessID: new FormControl(null, [Validators.required, Validators.min(1)]),
			Allow: new FormControl(null),
		});
	}

	ngOnDestroy(): void {
		this.subscription.unsubscribe();
	}

	onSubmit() {
		this.data.ID = this.updateForm.get("ID").value;
		this.data.UserGroupTableID = this.updateForm.get("UserGroupTableID").value;
		this.data.UserGroupProcessID = this.updateForm.get("UserGroupProcessID").value;
		this.data.Allow = this.updateForm.get("Allow").value;

		this.service.post("UserGroupRights", "Update", this.data).subscribe((answer: any) => {
			if (answer.Mesaj == null) {
				this.router.navigate(['/Admin/UserGroupRights']);
			}
			else {
				$(".alertMessage").text(answer.Mesaj);
				$(".alert-error").fadeIn("slow");
			}
		}, resError => this.errorMsg = resError);
	}

	FillData() {
		if (this.callTable == true) {
			this.route.params.subscribe((params: Params) => {
				this.id = params['id'];
				this.subscription = this.service.get("UserGroupRights", "Update", this.id).subscribe((resData: any) => {
					this.model = resData;
					this.callTable = false;
				}, resError => this.errorMsg = resError, () => { this.subscription.unsubscribe(); });
			});
		}
	}
}
