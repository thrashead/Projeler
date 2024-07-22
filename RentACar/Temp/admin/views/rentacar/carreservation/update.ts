import { Component } from "@angular/core";
import { Subscription } from "rxjs";
import { ModelService } from "../../../services/model";
import { ActivatedRoute, Params, Router } from "@angular/router";
import { FormBuilder, FormGroup, Validators, FormControl } from "@angular/forms";
import { AdminLib } from '../../../lib/methods';

@Component({
	templateUrl: './update.html'
})

export class AdminCarReservationUpdateComponent {
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

		this.updateForm = this.formBuilder.group({
			ID: new FormControl(null, [Validators.required, Validators.min(1)]),
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

	FillData() {
		if (this.callTable == true) {
			this.route.params.subscribe((params: Params) => {
				this.id = params['id'];
				this.subscription = this.service.get("CarReservation", "Update", this.id).subscribe((answer: any) => {
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
        let startDate: string = AdminLib.ParseDateTime(this.updateForm.get("StartDate").value);
        let endDate: string = AdminLib.ParseDateTime(this.updateForm.get("EndDate").value);
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

		this.data.ID = this.updateForm.get("ID").value;
        this.data.CarID = this.updateForm.get("CarID").value;
        this.data.StartDate = startDate;
        this.data.EndDate = endDate;
		this.data.Name = this.updateForm.get("Name").value;
		this.data.IdentityNo = this.updateForm.get("IdentityNo").value;
		this.data.City = this.updateForm.get("City").value;
		this.data.DistrictPostal = this.updateForm.get("DistrictPostal").value;
		this.data.Phone = this.updateForm.get("Phone").value;
		this.data.Mail = this.updateForm.get("Mail").value;
		this.data.Address = this.updateForm.get("Address").value;
		this.data.ProcessDate = this.updateForm.get("ProcessDate").value;
        this.data.Price = this.updateForm.get("Price").value;
        this.data.IPAddress = this.updateForm.get("IPAddress").value;
        this.data.Accepted = this.updateForm.get("Accepted").value;

		this.service.post("CarReservation", "Update", this.data)
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
