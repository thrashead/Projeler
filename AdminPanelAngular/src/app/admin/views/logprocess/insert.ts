import { Component } from "@angular/core";
import { ModelService } from "../../services/model";
import { ActivatedRoute, Params, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators, FormControl } from "@angular/forms";

@Component({
    templateUrl: './insert.html'
})

export class AdminLogProcessInsertComponent {
    errorMsg: string;
    linkID: string;

    ekleForm: FormGroup;
    data: any;

    model: any;

    constructor(private service: ModelService, private route: ActivatedRoute, private router: Router, private formBuilder: FormBuilder) {
    }

    ngOnInit() {
        this.route.params.subscribe((params: Params) => {
            this.linkID = params['linkID'];
            this.service.get("LogProcess", "Insert", this.linkID).subscribe((resData: any) => {
                this.model = resData;
            }, resError => this.errorMsg = resError);
        });

        this.ekleForm = this.formBuilder.group({
            LogTypeID: new FormControl(null, [Validators.required, Validators.min(1)]),
            Name: new FormControl(null, [Validators.required, Validators.minLength(1), Validators.maxLength(50)]),
            ShortName: new FormControl(null, [Validators.required, Validators.minLength(1), Validators.maxLength(5)]),
            Description: new FormControl(null),
        });
    }

    onSubmit() {
        this.data = new Object();
        this.data.LogTypeID = this.ekleForm.get("LogTypeID").value;
        this.data.Name = this.ekleForm.get("Name").value;
        this.data.ShortName = this.ekleForm.get("ShortName").value;
        this.data.Description = this.ekleForm.get("Description").value;

        this.service.post("LogProcess", "Insert", this.data)
            .subscribe((answer: any) => {
                if (answer.Mesaj == null) {
                    this.router.navigate(['/Admin/LogProcess']);
                }
                else {
                    $(".alertMessage").text(answer.Mesaj);
                    $(".alert-error").fadeIn("slow");
                }
            },
                resError => this.errorMsg = resError);
    }
}