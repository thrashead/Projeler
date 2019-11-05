import { Component, AfterViewChecked } from "@angular/core";
import { ActivatedRoute, Params, Router } from "@angular/router";
import { FormBuilder, FormGroup, Validators, FormControl } from "@angular/forms";
import { Subscription } from "rxjs";
import { ModelService } from "../../../services/model";
import { AdminLib } from '../../../lib/methods';

@Component({
	templateUrl: './update.html'
})

export class AdminContentUpdateComponent implements AfterViewChecked {
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

		AdminLib.ConvertToCKEditor("Description");
		AdminLib.ConvertToCKEditor("Description");

		this.updateForm = this.formBuilder.group({
			ID: new FormControl(null, [Validators.required, Validators.min(1)]),
			ContentName: new FormControl(null, [Validators.required, Validators.minLength(1), Validators.maxLength(255)]),
			Code: new FormControl(null, [Validators.maxLength(15)]),
			ShortDesc1: new FormControl(null, [Validators.maxLength(255)]),
			Description1: new FormControl(null),
			ShortDesc2: new FormControl(null, [Validators.maxLength(255)]),
			Description2: new FormControl(null),
		});
	}

	ngAfterViewChecked() {
		$("#Description1").next("div.ck").find(".ck-content").attr("data-id", "Description1");
		$("#Description2").next("div.ck").find(".ck-content").attr("data-id", "Description2");
	}

	FillData() {
		if (this.callTable == true) {
			this.route.params.subscribe((params: Params) => {
				this.id = params['id'];
				this.subscription = this.service.get("Content", "Update", this.id).subscribe((answer: any) => {
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
		this.data.ContentName = this.updateForm.get("ContentName").value;
		this.data.Code = this.updateForm.get("Code").value;
		this.data.ShortDesc1 = this.updateForm.get("ShortDesc1").value;
		this.data.Description1 = AdminLib.CKValue("Description1");
		this.data.ShortDesc2 = this.updateForm.get("ShortDesc2").value;
		this.data.Description2 = AdminLib.CKValue("Description2");

		this.service.post("Content", "Update", this.data)
			.subscribe((answer: any) => {
				if (answer.Mesaj == null) {
					this.router.navigate(['/Admin/Content']);
				}
				else {
					$(".alertMessage").text(answer.Mesaj);
					$(".alert-error").fadeIn("slow");
				}
			},
				resError => this.errorMsg = resError);
	}
}
