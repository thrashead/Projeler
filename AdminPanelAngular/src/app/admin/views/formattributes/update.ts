import { Component } from "@angular/core";
import { ModelService } from "../../services/model";
import { ActivatedRoute, Params, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators, FormControl } from "@angular/forms";

@Component({
    templateUrl: './update.html'
})

export class AdminFormAttributesUpdateComponent {
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
            this.service.get("FormAttributes", "Update", this.id).subscribe((resData: any) => {
                this.model = resData;
            }, resError => this.errorMsg = resError);
        });

        this.duzenleForm = this.formBuilder.group({
            ID: new FormControl(null, [Validators.required, Validators.min(1)]),
            FormItemID: new FormControl(null, [Validators.required, Validators.min(1)]),
            Name: new FormControl(null, [Validators.required, Validators.minLength(1), Validators.maxLength(50)]),
            Value: new FormControl(null, [Validators.required, Validators.minLength(1), Validators.maxLength(255)]),
        });
    }

    onSubmit() {
        this.data = new Object();
        this.data.ID = this.duzenleForm.get("ID").value;
        this.data.FormItemID = this.duzenleForm.get("FormItemID").value;
        this.data.Name = this.duzenleForm.get("Name").value;
        this.data.Value = this.duzenleForm.get("Value").value;

        this.service.post("FormAttributes", "Update", this.data)
            .subscribe((answer: any) => {
                if (answer.Mesaj == null) {
                    this.router.navigate(['/Admin/FormAttributes']);
                }
                else {
                    $(".alertMessage").text(answer.Mesaj);
                    $(".alert-error").fadeIn("slow");
                }
            },
                resError => this.errorMsg = resError);
    }
}