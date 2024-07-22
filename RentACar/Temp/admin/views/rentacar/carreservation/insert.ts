import { Component } from "@angular/core";
import { Subscription } from "rxjs";
import { ModelService } from "../../../services/model";
import { Router } from "@angular/router";
import { FormBuilder, FormGroup, Validators, FormControl } from "@angular/forms";
import { AdminLib } from '../../../lib/methods';

@Component({
	templateUrl: './insert.html'
})

export class AdminCarReservationInsertComponent {
	errorMsg: string;

	insertForm: FormGroup;
	data: any;

	model: any;

	private subscription: Subscription = new Subscription();

	constructor(private service: ModelService, private formBuilder: FormBuilder, private router: Router) {
	}

	ngOnInit() {
		this.data = new Object();

		this.subscription = this.service.get("CarReservation", "Insert").subscribe((answer: any) => {
			this.model = answer;
		}, resError => this.errorMsg = resError, () => { this.subscription.unsubscribe(); });

		this.insertForm = this.formBuilder.group({
			CarID: new FormControl(null, [Validators.required, Validators.min(1)]),
			StartDate: new FormControl(null, [Validators.required, Validators.minLength(1), Validators.maxLength(25)]),
			EndDate: new FormControl(null, [Validators.required, Validators.minLength(1), Validators.maxLength(25)]),
			Name: new FormControl(null, [Validators.required, Validators.minLength(1), Validators.maxLength(50)]),
			IdentityNo: new FormControl(null, [Validators.required, Validators.minLength(1), Validators.maxLength(11)]),
			City: new FormControl(null, [Validators.required, Validators.minLength(1), Validators.maxLength(25)]),
			DistrictPostal: new FormControl(null, [Validators.required, Validators.minLength(1), Validators.maxLength(100)]),
			Phone: new FormControl(null, [Validators.required, Validators.minLength(1), Validators.maxLength(15)]),
			Mail: new FormControl(null, [Validators.required, Validators.minLength(1), Validators.maxLength(50)]),
			Address: new FormControl(null, [Validators.required, Validators.minLength(1), Validators.maxLength(500)]),
			ProcessDate: new FormControl(null, [Validators.maxLength(25)]),
			Price: new FormControl(null, [Validators.maxLength(25)]),
            IPAddress: new FormControl(null, [Validators.maxLength(25)]),
			Accepted: new FormControl(null),
		});
	}

	ngOnDestroy(): void {
		this.subscription.unsubscribe();
	}

    onSubmit() {
        let startDate: string = AdminLib.ParseDateTime(this.insertForm.get("StartDate").value);
        let endDate: string = AdminLib.ParseDateTime(this.insertForm.get("EndDate").value);
        let conDate: boolean = AdminLib.CheckDateTimeInterval(startDate, endDate);

        if (startDate == null || endDate == null) {
            alert("Lütfen rezervasyon tarihlerini geçerli formatta giriniz.");
            return false;
        }

        if (!conDate) {
            alert("Lütfen geçerli bir rezervasyon tarihi aralığı giriniz.\n" +
                "Başlangıç tarihi minimum bir gün sonrası şeklinde olmalıdır.\n" +
                "Rezervasyon tarihleri arası da en az 6 saat olmalıdır.");
            return false;
        }

        this.data.CarID = this.insertForm.get("CarID").value;
        this.data.StartDate = startDate;
        this.data.EndDate = endDate;
		this.data.Name = this.insertForm.get("Name").value;
		this.data.IdentityNo = this.insertForm.get("IdentityNo").value;
		this.data.City = this.insertForm.get("City").value;
		this.data.DistrictPostal = this.insertForm.get("DistrictPostal").value;
		this.data.Phone = this.insertForm.get("Phone").value;
		this.data.Mail = this.insertForm.get("Mail").value;
		this.data.Address = this.insertForm.get("Address").value;
		this.data.ProcessDate = this.insertForm.get("ProcessDate").value;
        this.data.Price = this.insertForm.get("Price").value;
        this.data.IPAddress = this.insertForm.get("IPAddress").value;
        this.data.Accepted = this.insertForm.get("Accepted").value;

		this.service.post("CarReservation", "Insert", this.data)
			.subscribe((answer: any) => {
				if (answer.Mesaj == null) {
					this.router.navigate(['/Admin/CarReservation']);
				}
				else {
					$(".alertMessage").text(answer.Mesaj);
					$(".alert-error").fadeIn("slow");
				}
			},
				resError => this.errorMsg = resError);
	}
}
