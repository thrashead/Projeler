import { Component } from "@angular/core";
import { ModelService } from "../../services/model";
import { ActivatedRoute, Params, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators, FormControl } from "@angular/forms";

@Component({
    templateUrl: './update.html'
})

export class AdminFormValuesUpdateComponent {
    errorMsg: string;
    id: string;

    duzenleForm: FormGroup;
    data: any;

    model: any;

    constructor(private service: ModelService, private route: ActivatedRoute, private router: Router, private formBuilder: FormBuilder) {
    }

    ngOnInit() {
        this.route.params.subscribe((params: Params) => {
            this.id = params['id'];
            this.service.get("FormValues", "Update", this.id).subscribe((resData: any) => {
                this.model = resData;
            }, resError => this.errorMsg = resError);
        });


        this.duzenleForm = this.formBuilder.group({
            ID: new FormControl(null, [Validators.required, Validators.min(1)]),
            FormItemID: new FormControl(null, [Validators.required, Validators.min(1)]),
            Text: new FormControl(null),
            Value: new FormControl(null, [Validators.required, Validators.minLength(1), Validators.maxLength(50)]),
            Code: new FormControl(null),
        });
    }

    onSubmit() {
        this.data = new Object();
        this.data.ID = this.duzenleForm.get("ID").value;
        this.data.FormItemID = this.duzenleForm.get("FormItemID").value;
        this.data.Text = this.duzenleForm.get("Text").value;
        this.data.Value = this.duzenleForm.get("Value").value;
        this.data.Code = this.duzenleForm.get("Code").value;

        this.service.post("FormValues", "Update", this.data)
            .subscribe((answer: any) => {
                if (answer.Mesaj == null) {
                    this.router.navigate(['/Admin/FormValues']);
                }
                else {
                    $(".alertMessage").text(answer.Mesaj);
                    $(".alert-error").fadeIn("slow");
                }
            },
                resError => this.errorMsg = resError);
    }
}