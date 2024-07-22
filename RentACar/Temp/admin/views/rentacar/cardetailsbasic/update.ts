﻿import { Component } from "@angular/core";
import { Subscription } from "rxjs";
import { ModelService } from "../../../services/model";
import { SiteService } from "src/app/services/site";
import { ActivatedRoute, Params, Router } from "@angular/router";
import { FormBuilder, FormGroup, Validators, FormControl } from "@angular/forms";
import { AdminLib } from '../../../lib/methods';

@Component({
	templateUrl: './update.html'
})

export class AdminCarDetailsBasicUpdateComponent {
	errorMsg: string;
	id: string;

	updateForm: FormGroup;
	data: any;

	model: any;
    CarModelList: any;

	callTable: boolean;

	private subscription: Subscription = new Subscription();

    constructor(private service: ModelService, private siteService: SiteService, private formBuilder: FormBuilder, private router: Router, private route: ActivatedRoute) {
	}

	ngOnInit() {
		this.data = new Object();

		this.callTable = true;
		this.FillData();

		this.updateForm = this.formBuilder.group({
			ID: new FormControl(null, [Validators.required, Validators.min(1)]),
			CarID: new FormControl(null, [Validators.required, Validators.min(1)]),
			MakeID: new FormControl(null, [Validators.required, Validators.min(1)]),
			ModelID: new FormControl(null, [Validators.required, Validators.min(1)]),
			StatusID: new FormControl(null, [Validators.required, Validators.min(1)]),
			Year: new FormControl(null),
			Price: new FormControl(null),
			Width: new FormControl(null),
			Height: new FormControl(null),
			Length: new FormControl(null),
			WheelBase: new FormControl(null),
			CargoCapacity: new FormControl(null),
			Mileage: new FormControl(null),
		});
    }

    onChange(event) {
        var target = event.target || event.srcElement || event.currentTarget;
        this.ComboCarModelsByMakeID(target.value);
    }

	FillData() {
		if (this.callTable == true) {
			this.route.params.subscribe((params: Params) => {
				this.id = params['id'];
				this.subscription = this.service.get("CarDetailsBasic", "Update", this.id).subscribe((answer: any) => {
                    this.model = answer;

                    this.ComboCarModelsByMakeID(this.model.MakeID.toString());

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
		this.data.CarID = this.updateForm.get("CarID").value;
		this.data.MakeID = this.updateForm.get("MakeID").value;
		this.data.ModelID = this.updateForm.get("ModelID").value;
		this.data.StatusID = this.updateForm.get("StatusID").value;
		this.data.Year = this.updateForm.get("Year").value;
		this.data.Price = this.updateForm.get("Price").value;
		this.data.Width = AdminLib.ParseFloat(this.updateForm.get("Width").value);
		this.data.Height = AdminLib.ParseFloat(this.updateForm.get("Height").value);
		this.data.Length = AdminLib.ParseFloat(this.updateForm.get("Length").value);
		this.data.WheelBase = AdminLib.ParseFloat(this.updateForm.get("WheelBase").value);
		this.data.CargoCapacity = AdminLib.ParseFloat(this.updateForm.get("CargoCapacity").value);
		this.data.Mileage = this.updateForm.get("Mileage").value;

		this.service.post("CarDetailsBasic", "Update", this.data)
			.subscribe((answer: any) => {
				if (answer.Mesaj == null) {
					this.router.navigate(['/Admin/CarDetailsBasic']);
				}
				else {
					$(".alertMessage").text(answer.Mesaj);
					$(".alert-error").fadeIn("slow");
				}
			},
				resError => this.errorMsg = resError);
    }

    //CarModelsByMakeCode
    ComboCarModelsByMakeID(makeID: string = null) {
        this.siteService.get("Site", "ComboCarModelsByMakeID", makeID).subscribe((resData: any) => {
            this.CarModelList = resData;
        }, resError => this.errorMsg = resError);
    }
}