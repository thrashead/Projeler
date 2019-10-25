import { Component } from "@angular/core";
import { Subscription } from "rxjs";
import { ModelService } from "../../services/model";
import { ActivatedRoute, Params, Router } from "@angular/router";
import { FormBuilder, FormGroup, Validators, FormControl } from "@angular/forms";

@Component({
	templateUrl: './duzenle.html'
})

export class AdminDilIcerikDilDuzenleComponent {
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
			LangContID: new FormControl(null, [Validators.required, Validators.min(1)]),
			TransID: new FormControl(null, [Validators.required, Validators.min(1)]),
			Text: new FormControl(null, [Validators.required, Validators.minLength(1), Validators.maxLength(50)]),
		});
	}

	FillData() {
		if (this.callTable == true) {
			this.route.params.subscribe((params: Params) => {
				this.id = params['id'];
				this.subscription = this.service.get("DilIcerikDil", "Duzenle", this.id).subscribe((answer: any) => {
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
		this.data.LangContID = this.updateForm.get("LangContID").value;
		this.data.TransID = this.updateForm.get("TransID").value;
		this.data.Text = this.updateForm.get("Text").value;

        this.service.post("DilIcerikDil", "Duzenle", this.data)
			.subscribe((answer: any) => {
				if (answer.Mesaj == null) {
                    this.router.navigate(['/Admin/DilIcerikDil']);
				}
				else {
					$(".alertMessage").text(answer.Mesaj);
					$(".alert-error").fadeIn("slow");
				}
			},
				resError => this.errorMsg = resError);
	}
}
