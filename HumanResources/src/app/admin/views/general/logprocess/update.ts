import { Component } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { ModelService } from '../../../services/model';
import { SharedService } from '../../../services/shared';
import { AdminLib } from '../../../lib/lib';
declare var DataTable;

@Component({
	templateUrl: './update.html'
})

export class AdminLogProcessUpdateComponent {
	errorMsg: string;
	id: string;

	callTable: boolean;

	updateForm: FormGroup;

	insertShow: boolean = false;
	updateShow: boolean = false;
	deleteShow: boolean = false;
	copyShow: boolean = false;

	data: any;
	model: any;

	private subscription: Subscription = new Subscription();

	constructor(private service: ModelService, private sharedService: SharedService, private formBuilder: FormBuilder, private router: Router, private route: ActivatedRoute) {
	}

	ngOnInit() {
		this.data = new Object();

		this.callTable = true;
		this.FillData($("#hdnType").val());

		this.updateForm = this.formBuilder.group({
			ID: new FormControl(null, [Validators.required, Validators.min(1)]),
			LogTypeID: new FormControl(null, [Validators.required, Validators.min(1)]),
			Name: new FormControl(null, [Validators.required, Validators.minLength(1), Validators.maxLength(50)]),
			ShortName: new FormControl(null, [Validators.required, Validators.minLength(1), Validators.maxLength(5)]),
			Description: new FormControl(null, [Validators.maxLength(255)]),
		});
	}

	ngOnDestroy(): void {
		this.subscription.unsubscribe();
	}

	onSubmit() {
		this.data.ID = this.updateForm.get("ID").value;
		this.data.LogTypeID = this.updateForm.get("LogTypeID").value;
		this.data.Name = this.updateForm.get("Name").value;
		this.data.ShortName = this.updateForm.get("ShortName").value;
		this.data.Description = this.updateForm.get("Description").value;

		this.service.post("LogProcess", "Update", this.data).subscribe((answer: any) => {
			if (answer.Mesaj == null) {
				this.router.navigate(['/Admin/LogProcess']);
			}
			else {
				$(".alertMessage").text(answer.Mesaj);
				$(".alert-error").fadeIn("slow");
			}
		}, resError => this.errorMsg = resError);
	}

	FillData(Model: any) {
		this.sharedService.getCurrentUserRights(Model).subscribe((userRights: any) => {
			this.insertShow = AdminLib.UserRight(userRights, Model, "i");
			this.updateShow = AdminLib.UserRight(userRights, Model, "u");
			this.copyShow = AdminLib.UserRight(userRights, Model, "c");
			this.deleteShow = AdminLib.UserRight(userRights, Model, "d");

				if (this.callTable == true) {
					this.route.params.subscribe((params: Params) => {
						this.id = params['id'];
						this.subscription = this.service.get("LogProcess", "Update", this.id).subscribe((resData: any) => {
							this.model = resData;
							this.callTable = false;

							setTimeout(() => {
								DataTable();

								$(document)
									.off("click", ".fg-button")
									.on("click", ".fg-button", () => {
										setTimeout(() => {
											this.FillData($("#hdnType").val());
										}, 1);
									});
							}, 1);
						}, resError => this.errorMsg = resError, () => { this.subscription.unsubscribe(); });
					});
				}

				setTimeout(() => {
					if ($(".dropdown-menu").first().find("a").length <= 0) {
						$(".btn-group").remove();
					}
				}, 1);
		}, resError => this.errorMsg = resError);
	}
}
