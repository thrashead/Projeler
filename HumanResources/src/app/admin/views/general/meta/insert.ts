import { Component, AfterViewChecked } from "@angular/core";
import { Router } from "@angular/router";
import { FormBuilder, FormGroup, Validators, FormControl } from "@angular/forms";
import { Subscription } from "rxjs";
import { ModelService } from "../../../services/model";
import { AdminLib } from '../../../lib/methods';

@Component({
	templateUrl: './insert.html'
})

export class AdminMetaInsertComponent implements AfterViewChecked {
	errorMsg: string;

	insertForm: FormGroup;
	data: any;

	model: any;

	private subscription: Subscription = new Subscription();

	constructor(private service: ModelService, private formBuilder: FormBuilder, private router: Router) {
	}

	ngOnInit() {
		this.data = new Object();

		AdminLib.ConvertToCKEditor("Content");

		this.insertForm = this.formBuilder.group({
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
		this.data.Name = this.insertForm.get("Name").value;
		this.data.Content = AdminLib.CKValue("Content");
		this.data.Code = this.insertForm.get("Code").value;

		this.service.post("Meta", "Insert", this.data)
			.subscribe((answer: any) => {
				if (answer.Mesaj == null) {
					this.router.navigate(['/Admin/Meta']);
				}
				else {
					$(".alertMessage").text(answer.Mesaj);
					$(".alert-error").fadeIn("slow");
				}
			},
				resError => this.errorMsg = resError);
	}
}
