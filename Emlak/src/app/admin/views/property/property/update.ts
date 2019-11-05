import { Component } from "@angular/core";
import { ActivatedRoute, Params, Router } from "@angular/router";
import { FormBuilder, FormGroup, Validators, FormControl } from "@angular/forms";
import { Subscription } from "rxjs";
import { ModelService } from "../../../services/model";
import { SharedService } from '../../../services/shared';
import { AdminLib } from '../../../lib/methods';
declare var DataTable;

@Component({
	templateUrl: './update.html'
})

export class AdminPropertyUpdateComponent {
	errorMsg: string;
	id: string;

	updateForm: FormGroup;
	data: any;

	model: any;

	callTable: boolean;

	insertShow: boolean = false;
	updateShow: boolean = false;
	deleteShow: boolean = false;
	copyShow: boolean = false;

	private subscription: Subscription = new Subscription();

	constructor(private service: ModelService, private sharedService: SharedService, private formBuilder: FormBuilder, private router: Router, private route: ActivatedRoute) {
	}

	ngOnInit() {
		this.data = new Object();

		this.callTable = true;
		this.FillData($("#hdnType").val());

		this.updateForm = this.formBuilder.group({
            ID: new FormControl(null, [Validators.required, Validators.min(1)]),
            CatID: new FormControl(null, [Validators.required, Validators.min(1)]),
			Title: new FormControl(null, [Validators.required, Validators.minLength(1), Validators.maxLength(255)]),
			Code: new FormControl(null, [Validators.maxLength(15)]),
			Price: new FormControl(null, [Validators.required, Validators.min(1)]),
			Forsale: new FormControl(null),
			NewBrand: new FormControl(null),
			PropOfDay: new FormControl(null),
			Active: new FormControl(null),
		});
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
				    this.subscription = this.service.get("Property", "Update", this.id).subscribe((answer: any) => {
					    this.model = answer;
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

	ngOnDestroy(): void {
		this.subscription.unsubscribe();
	}

	onSubmit() {
        this.data.ID = this.updateForm.get("ID").value;
        this.data.CatID = this.updateForm.get("CatID").value;
		this.data.Title = this.updateForm.get("Title").value;
		this.data.Code = this.updateForm.get("Code").value;
		this.data.Price = this.updateForm.get("Price").value;
		this.data.Forsale = this.updateForm.get("Forsale").value;
		this.data.NewBrand = this.updateForm.get("NewBrand").value;
		this.data.PropOfDay = this.updateForm.get("PropOfDay").value;
		this.data.Active = this.updateForm.get("Active").value;

		this.service.post("Property", "Update", this.data)
			.subscribe((answer: any) => {
				if (answer.Mesaj == null) {
					this.router.navigate(['/Admin/Property']);
				}
				else {
					$(".alertMessage").text(answer.Mesaj);
					$(".alert-error").fadeIn("slow");
				}
			},
				resError => this.errorMsg = resError);
	}
}
