import { Component } from '@angular/core';
import { ModelService } from '../../../services/model';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';

@Component({
	templateUrl: './changegroup.html'
})

export class AdminUsersChangeGroupComponent {
	errorMsg: string;
	id: string;

	changeGroupForm: FormGroup;

	data: any;
	model: any;

	constructor(private service: ModelService, private router: Router, private route: ActivatedRoute, private formBuilder: FormBuilder) {
	}

	ngOnInit() {
		this.data = new Object();

		this.route.params.subscribe((params: Params) => {
			this.id = params['id'];
			this.service.get("Users", "ChangeGroup", this.id).subscribe((resData: any) => {
				this.model = resData;
			}, resError => this.errorMsg = resError);
		});

		this.changeGroupForm = this.formBuilder.group({
			ID: new FormControl(null, [Validators.required, Validators.min(1)]),
			GroupID: new FormControl(null, [Validators.required, Validators.min(1)]),
		});
	}

	onSubmit() {
		this.data.ID = this.changeGroupForm.get("ID").value;
		this.data.GroupID = this.changeGroupForm.get("GroupID").value;

		this.service.post("Users", "ChangeGroup", this.data).subscribe((answer: any) => {
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
