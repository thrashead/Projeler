import { Component } from "@angular/core";
import { ModelService } from "../../../services/model";
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators, FormControl } from "@angular/forms";

@Component({
    templateUrl: './insert.html'
})

export class AdminTypesInsertComponent {
    errorMsg: string;

    ekleForm: FormGroup;
    data: any;

    model: any;

    constructor(private service: ModelService, private router: Router, private formBuilder: FormBuilder) {
    }

    ngOnInit() {
        this.ekleForm = this.formBuilder.group({
            TypeName: new FormControl(null, [Validators.required, Validators.minLength(3), Validators.maxLength(50)]),
            Url: new FormControl(null, [Validators.required, Validators.minLength(3), Validators.maxLength(100)]),
            TableName: new FormControl(null, [Validators.required, Validators.minLength(3), Validators.maxLength(50)]),
            Linkable: new FormControl(null),
            Show: new FormControl(null),
        });
    }

    onSubmit() {
        this.data = new Object();
        this.data.TypeName = this.ekleForm.get("TypeName").value;
        this.data.Url = this.ekleForm.get("Url").value;
        this.data.TableName = this.ekleForm.get("TableName").value;
        this.data.Linkable = this.ekleForm.get("Linkable").value;
        this.data.Show = this.ekleForm.get("Show").value;

        this.service.post("Types", "Insert", this.data)
            .subscribe((answer: any) => {
                if (answer.Mesaj == null) {
                    this.router.navigate(['/Admin/Types']);
                }
                else {
                    $(".alertMessage").text(answer.Mesaj);
                    $(".alert-error").fadeIn("slow");
                }
            },
                resError => this.errorMsg = resError);
    }
}