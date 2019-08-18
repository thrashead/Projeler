import { Component } from "@angular/core";
import { ModelService } from "../../services/model";
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators, FormControl } from "@angular/forms";

@Component({
    templateUrl: './insert.html'
})

export class AdminFormTypesInsertComponent {
    errorMsg: string;

    ekleForm: FormGroup;
    data: any;

    model: any;

    constructor(private service: ModelService, private router: Router, private formBuilder: FormBuilder) {
    }

    ngOnInit() {
        this.ekleForm = this.formBuilder.group({
            Name: new FormControl(null, [Validators.required, Validators.minLength(1), Validators.maxLength(50)]),
            Type: new FormControl(null, [Validators.required, Validators.minLength(1), Validators.maxLength(50)]),
            ShortName: new FormControl(null, [Validators.required, Validators.minLength(1), Validators.maxLength(25)]),
            HasValue: new FormControl(null),
        });
    }

    onSubmit() {
        this.data = new Object();
        this.data.Name = this.ekleForm.get("Name").value;
        this.data.Type = this.ekleForm.get("Type").value;
        this.data.ShortName = this.ekleForm.get("ShortName").value;
        this.data.HasValue = this.ekleForm.get("HasValue").value;

        this.service.post("FormTypes", "Insert", this.data)
            .subscribe((answer: any) => {
                if (answer.Mesaj == null) {
                    this.router.navigate(['/Admin/FormTypes']);
                }
                else {
                    $(".alertMessage").text(answer.Mesaj);
                    $(".alert-error").fadeIn("slow");
                }
            },
                resError => this.errorMsg = resError);
    }
}