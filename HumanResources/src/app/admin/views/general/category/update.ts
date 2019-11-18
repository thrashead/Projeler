import { Component, AfterViewChecked } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { ModelService } from '../../../services/model';
import { AdminLib } from '../../../lib/lib';

@Component({
	templateUrl: './update.html'
})

export class AdminCategoryUpdateComponent implements AfterViewChecked {
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

		AdminLib.ConvertToCKEditor("Description");
		AdminLib.ConvertToCKEditor("Description");

		this.updateForm = this.formBuilder.group({
			ID: new FormControl(null, [Validators.required, Validators.min(1)]),
			ParentID: new FormControl(null, [Validators.required, Validators.min(0)]),
			CategoryName: new FormControl(null, [Validators.required, Validators.minLength(1), Validators.maxLength(255)]),
			Code: new FormControl(null, [Validators.maxLength(15)]),
			ShortDesc1: new FormControl(null, [Validators.maxLength(255)]),
			Description1: new FormControl(null),
			ShortDesc2: new FormControl(null, [Validators.maxLength(255)]),
			Description2: new FormControl(null),
			Show: new FormControl(null),
		});
	}

	ngAfterViewChecked() {
		$("#Description1").next("div.ck").find(".ck-content").attr("data-id", "Description1");
		$("#Description2").next("div.ck").find(".ck-content").attr("data-id", "Description2");
	}

	ngOnDestroy(): void {
		this.subscription.unsubscribe();
	}

	onSubmit() {
		this.data.ID = this.updateForm.get("ID").value;
		this.data.ParentID = this.updateForm.get("ParentID").value;
		this.data.CategoryName = this.updateForm.get("CategoryName").value;
		this.data.Code = this.updateForm.get("Code").value;
		this.data.ShortDesc1 = this.updateForm.get("ShortDesc1").value;
		this.data.Description1 = AdminLib.CKValue("Description1");
		this.data.ShortDesc2 = this.updateForm.get("ShortDesc2").value;
		this.data.Description2 = AdminLib.CKValue("Description2");
		this.data.Show = this.updateForm.get("Show").value;

		this.service.post("Category", "Update", this.data).subscribe((answer: any) => {
			if (answer.Mesaj == null) {
				this.router.navigate(['/Admin/Category']);
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
				this.subscription = this.service.get("Category", "Update", this.id).subscribe((resData: any) => {
					this.model = resData;
					this.callTable = false;
				}, resError => this.errorMsg = resError, () => { this.subscription.unsubscribe(); });
			});
		}
	}
}
