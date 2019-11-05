import { Component, AfterViewChecked } from "@angular/core";
import { Router } from "@angular/router";
import { FormBuilder, FormGroup, Validators, FormControl } from "@angular/forms";
import { Subscription } from "rxjs";
import { ModelService } from "../../../services/model";
import { AdminLib } from '../../../lib/methods';

@Component({
	templateUrl: './insert.html'
})

export class AdminContentInsertComponent implements AfterViewChecked {
	errorMsg: string;

	insertForm: FormGroup;
	data: any;

	model: any;

	private subscription: Subscription = new Subscription();

	constructor(private service: ModelService, private formBuilder: FormBuilder, private router: Router) {
	}

	ngOnInit() {
		this.data = new Object();

		AdminLib.ConvertToCKEditor("Description1");
		AdminLib.ConvertToCKEditor("Description2");

		this.insertForm = this.formBuilder.group({
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

	ngOnDestroy(): void {
		this.subscription.unsubscribe();
	}

	onSubmit() {
		this.data.ContentName = this.insertForm.get("ContentName").value;
		this.data.Code = this.insertForm.get("Code").value;
		this.data.ShortDesc1 = this.insertForm.get("ShortDesc1").value;
		this.data.Description1 = AdminLib.CKValue("Description1");
		this.data.ShortDesc2 = this.insertForm.get("ShortDesc2").value;
		this.data.Description2 = AdminLib.CKValue("Description2");

		this.service.post("Content", "Insert", this.data)
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
