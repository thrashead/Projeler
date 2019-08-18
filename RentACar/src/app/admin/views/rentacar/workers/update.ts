import { Component } from "@angular/core";
import { Subscription } from "rxjs";
import { ModelService } from "../../../services/model";
import { ActivatedRoute, Params, Router } from "@angular/router";
import { FormBuilder, FormGroup, Validators, FormControl } from "@angular/forms";

@Component({
	templateUrl: './update.html'
})

export class AdminWorkersUpdateComponent {
	errorMsg: string;
    newFile: string;
    id: string;

	updateForm: FormGroup;
	data: any;
    uploadData: any;

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
			ID: new FormControl(null, [Validators.required, Validators.min(0)]),
			NameSurname: new FormControl(null, [Validators.required, Validators.minLength(1), Validators.maxLength(255)]),
			Position: new FormControl(null, [Validators.required, Validators.minLength(1), Validators.maxLength(255)]),
			Description: new FormControl(null, [Validators.required, Validators.minLength(1), Validators.maxLength(255)]),
			PictureUrl: new FormControl(null),
		});
	}

	FillData() {
		if (this.callTable == true) {
			this.route.params.subscribe((params: Params) => {
				this.id = params['id'];
				this.subscription = this.service.get("Workers", "Update", this.id).subscribe((answer: any) => {
					this.model = answer;
					this.callTable = false;
				}, resError => this.errorMsg = resError, () => { this.subscription.unsubscribe(); });
			});
		}
    }

    onFileSelect(event) {
        if (event.target.files.length > 0) {
            this.newFile = event.target.files[0];
        }
    }

	ngOnDestroy(): void {
		this.subscription.unsubscribe();
	}

	onSubmit() {
		this.uploadData = new FormData();
        this.uploadData.append("file", this.newFile);

		this.subscription = this.service.post("Workers", "UpdateUpload", this.uploadData).subscribe((answerUpload: any) => {
			if (answerUpload.Mesaj == null)
			{
				this.data.ID = this.updateForm.get("ID").value;
				this.data.NameSurname = this.updateForm.get("NameSurname").value;
				this.data.Position = this.updateForm.get("Position").value;
				this.data.Description = this.updateForm.get("Description").value;
                this.data.OldPictureUrl = this.updateForm.get("PictureUrl").value;
                this.data.HasFile = answerUpload.HasFile;

                if (answerUpload.HasFile) {
                    this.data.PictureUrl = answerUpload.PictureUrl;
				}
				else {
					this.data.PictureUrl = this.updateForm.get("PictureUrl").value;
				}

				this.service.post("Workers", "Update", this.data)
					.subscribe((answer: any) => {
						if (answer.Mesaj == null) {
							this.router.navigate(['/Admin/Workers']);
						}
						else {
							$(".alertMessage").text(answer.Mesaj);
							$(".alert-error").fadeIn("slow");
						}
					},
						resError => this.errorMsg = resError);
			}
			else
			{
				$(".alertMessage").text(answerUpload.Mesaj);
				$(".alert-error").fadeIn("slow");
			}
		}, resError => this.errorMsg = resError, () => { this.subscription.unsubscribe(); });
	}
}
