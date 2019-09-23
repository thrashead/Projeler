import { Component } from "@angular/core";
import { Subscription } from "rxjs";
import { ModelService } from "../../../services/model";
import { Router } from "@angular/router";
import { FormBuilder, FormGroup, Validators, FormControl } from "@angular/forms";

@Component({
	templateUrl: './insert.html'
})

export class AdminCarDetailsBasicInsertComponent {
	errorMsg: string;

	insertForm: FormGroup;
	data: any;

	model: any;

	private subscription: Subscription = new Subscription();

	constructor(private service: ModelService, private formBuilder: FormBuilder, private router: Router) {
	}

	ngOnInit() {
		this.data = new Object();

		this.subscription = this.service.get("CarDetailsBasic", "Insert").subscribe((answer: any) => {
			this.model = answer;
		}, resError => this.errorMsg = resError, () => { this.subscription.unsubscribe(); });

		this.insertForm = this.formBuilder.group({
			CarID: new FormControl(null, [Validators.required, Validators.min(0)]),
			MakeID: new FormControl(null, [Validators.required, Validators.min(0)]),
			ModelID: new FormControl(null, [Validators.required, Validators.min(0)]),
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

	ngOnDestroy(): void {
		this.subscription.unsubscribe();
	}

	onSubmit() {
		this.data.CarID = this.insertForm.get("CarID").value;
		this.data.MakeID = this.insertForm.get("MakeID").value;
		this.data.ModelID = this.insertForm.get("ModelID").value;
		this.data.Year = this.insertForm.get("Year").value;
		this.data.Price = this.insertForm.get("Price").value;
		this.data.Width = this.insertForm.get("Width").value;
		this.data.Height = this.insertForm.get("Height").value;
		this.data.Length = this.insertForm.get("Length").value;
		this.data.WheelBase = this.insertForm.get("WheelBase").value;
		this.data.CargoCapacity = this.insertForm.get("CargoCapacity").value;
		this.data.Mileage = this.insertForm.get("Mileage").value;

		this.service.post("CarDetailsBasic", "Insert", this.data)
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
}
