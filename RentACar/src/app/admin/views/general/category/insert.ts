import { Component } from "@angular/core";
import { ModelService } from "../../../services/model";
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators, FormControl } from "@angular/forms";

@Component({
    templateUrl: './insert.html'
})

export class AdminCategoryInsertComponent {
    errorMsg: string;

    ekleForm: FormGroup;
    data: any;

    model: any;

    constructor(private service: ModelService, private route: ActivatedRoute, private router: Router, private formBuilder: FormBuilder) {
    }

    ngOnInit() {
        this.route.params.subscribe(() => {
            this.service.get("Category", "Insert").subscribe((resData: any) => {
                this.model = resData;
            }, resError => this.errorMsg = resError);
        });

        this.ekleForm = this.formBuilder.group({
            ParentID: new FormControl(null, [Validators.required, Validators.min(0)]),
            Title: new FormControl(null, [Validators.required, Validators.minLength(1), Validators.maxLength(255)]),
            Code: new FormControl(null),
            Active: new FormControl(null),
        });
    }

    onSubmit() {
        this.data = new Object();
        this.data.ParentID = this.ekleForm.get("ParentID").value;
        this.data.Title = this.ekleForm.get("Title").value;
        this.data.Code = this.ekleForm.get("Code").value;
        this.data.Active = this.ekleForm.get("Active").value;

        this.service.post("Category", "Insert", this.data)
            .subscribe((answer: any) => {
                if (answer.Mesaj == null) {
                    this.router.navigate(['/Admin/Category']);
                }
                else {
                    $(".alertMessage").text(answer.Mesaj);
                    $(".alert-error").fadeIn("slow");
                }
            },
                resError => this.errorMsg = resError);
    }
}