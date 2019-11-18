import { Component, AfterViewChecked } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { ModelService } from '../../../services/model';
import { AdminLib } from '../../../lib/lib';

@Component({
	templateUrl: './update.html'
})

export class AdminMetaUpdateComponent implements AfterViewChecked {
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

		this.updateForm = this.formBuilder.group({
			ID: new FormControl(null, [Validators.required, Validators.min(1)]),
			Name: new FormControl(null, [Validators.required, Validators.minLength(1), Validators.maxLength(50)]),
			Content: new FormControl(null, [Validators.required, Validators.minLength(1)]),
			Code: new FormControl(null, [Validators.maxLength(15)]),
		});
	}

	ngAfterViewChecked() {
		$("#Content").next("div.ck").find(".ck-content").attr("data-id", "Content");
	}

	ngOnDestroy(): void {
		this.subscription.unsubscribe();
	}

	onSubmit() {
		this.data.ID = this.updateForm.get("ID").value;
		this.data.Name = this.updateForm.get("Name").value;
		this.data.Content = AdminLib.CKValue("Content");
		this.data.Code = this.updateForm.get("Code").value;

		this.service.post("Meta", "Update", this.data).subscribe((answer: any) => {
			if (answer.Mesaj == null) {
				this.router.navigate(['/Admin/Meta']);
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
				this.subscription = this.service.get("Meta", "Update", this.id).subscribe((resData: any) => {
					this.model = resData;
					this.callTable = false;
				}, resError => this.errorMsg = resError, () => { this.subscription.unsubscribe(); });
			});
		}
	}
}
