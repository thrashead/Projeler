import { Component } from "@angular/core";
import { ModelService } from "../../services/model";
import { ActivatedRoute, Params, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators, FormControl } from "@angular/forms";

@Component({
    templateUrl: './insert.html'
})

export class AdminFormValuesInsertComponent {
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
            this.service.get("FormValues", "Insert", this.linkID).subscribe((resData: any) => {
                this.model = resData;
            }, resError => this.errorMsg = resError);
        });

        this.ekleForm = this.formBuilder.group({
            FormItemID: new FormControl(null, [Validators.required, Validators.min(1)]),
            Text: new FormControl(null),
            Value: new FormControl(null, [Validators.required, Validators.minLength(1), Validators.maxLength(50)]),
            Code: new FormControl(null),
        });
    }

    onSubmit() {
        this.data = new Object();
        this.data.FormItemID = this.ekleForm.get("FormItemID").value;
        this.data.Text = this.ekleForm.get("Text").value;
        this.data.Value = this.ekleForm.get("Value").value;
        this.data.Code = this.ekleForm.get("Code").value;

        this.service.post("FormValues", "Insert", this.data)
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