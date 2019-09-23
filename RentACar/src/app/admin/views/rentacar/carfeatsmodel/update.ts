import { Component } from "@angular/core";
import { Subscription } from "rxjs";
import { ModelService } from "../../../services/model";
import { ActivatedRoute, Params, Router } from "@angular/router";
import { FormBuilder, FormGroup, Validators, FormControl } from "@angular/forms";
declare var DataTable;

@Component({
	templateUrl: './update.html'
})

export class AdminCarFeatsModelUpdateComponent {
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
			ID: new FormControl(null, [Validators.required, Validators.min(0)]),
			MakeID: new FormControl(null, [Validators.required, Validators.min(0)]),
			ModelName: new FormControl(null, [Validators.required, Validators.minLength(1), Validators.maxLength(255)]),
		});
	}

	FillData() {
		if (this.callTable == true) {
			this.route.params.subscribe((params: Params) => {
				this.id = params['id'];
				this.subscription = this.service.get("CarFeatsModel", "Update", this.id).subscribe((answer: any) => {
					this.model = answer;
					this.callTable = false;

					setTimeout(() => {
						DataTable();

						$(document)
							.off("click", ".fg-button")
							.on("click", ".fg-button", () => {
								setTimeout(() => {
									this.FillData();
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
	}

	ngOnDestroy(): void {
		this.subscription.unsubscribe();
	}

	onSubmit() {
		this.data.ID = this.updateForm.get("ID").value;
		this.data.MakeID = this.updateForm.get("MakeID").value;
		this.data.ModelName = this.updateForm.get("ModelName").value;

		this.service.post("CarFeatsModel", "Update", this.data)
			.subscribe((answer: any) => {
				if (answer.Mesaj == null) {
					this.router.navigate(['/Admin/CarFeatsModel']);
				}
				else {
					$(".alertMessage").text(answer.Mesaj);
					$(".alert-error").fadeIn("slow");
				}
			},
				resError => this.errorMsg = resError);
	}
}
