import { Component, AfterViewChecked } from "@angular/core";
import { Router } from "@angular/router";
import { FormBuilder, FormGroup, Validators, FormControl } from "@angular/forms";
import { Subscription } from "rxjs";
import { AdminLib } from '../../../lib/methods';
import { ModelService } from "../../../services/model";

@Component({
	templateUrl: './insert.html'
})

export class AdminLangContentTInsertComponent implements AfterViewChecked {
	errorMsg: string;

	insertForm: FormGroup;
	data: any;

	model: any;

	private subscription: Subscription = new Subscription();

	constructor(private service: ModelService, private formBuilder: FormBuilder, private router: Router) {
	}

	ngOnInit() {
		this.data = new Object();

		this.subscription = this.service.get("LangContentT", "Insert").subscribe((answer: any) => {
			this.model = answer;
		}, resError => this.errorMsg = resError, () => { this.subscription.unsubscribe(); });

        AdminLib.ConvertToCKEditor("Description", 1500);
        AdminLib.ConvertToCKEditor("Description2", 1500);

		this.insertForm = this.formBuilder.group({
			LangContentID: new FormControl(null, [Validators.required, Validators.min(0)]),
			TransID: new FormControl(null, [Validators.required, Validators.min(0)]),
			ShortDescription: new FormControl(null),
			Description: new FormControl(null),
			ShortDescription2: new FormControl(null),
			Description2: new FormControl(null),
		});
    }

    ngAfterViewChecked() {
        $('#Description').next("div.ck").find(".ck-content").attr("data-id", "Description");
        $('#Description2').next("div.ck").find(".ck-content").attr("data-id", "Description2");
    }

	ngOnDestroy(): void {
		this.subscription.unsubscribe();
	}

	onSubmit() {
		this.data.LangContentID = this.insertForm.get("LangContentID").value;
		this.data.TransID = this.insertForm.get("TransID").value;
		this.data.ShortDescription = this.insertForm.get("ShortDescription").value;
        this.data.Description = AdminLib.CKValue("Description");
		this.data.ShortDescription2 = this.insertForm.get("ShortDescription2").value;
        this.data.Description2 = AdminLib.CKValue("Description2");

		this.service.post("LangContentT", "Insert", this.data)
			.subscribe((answer: any) => {
				if (answer.Mesaj == null) {
					this.router.navigate(['/Admin/LangContentT']);
				}
				else {
					$(".alertMessage").text(answer.Mesaj);
					$(".alert-error").fadeIn("slow");
				}
			}, resError => this.errorMsg = resError);
	}
}
