import { Component } from "@angular/core";
import { ModelService } from "../../../services/model";
import { ActivatedRoute, Params, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators, FormControl } from "@angular/forms";

@Component({
    templateUrl: './update.html'
})

export class AdminTypesUpdateComponent {
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
            this.service.get("Types", "Update", this.id).subscribe((resData: any) => {
                this.model = resData;
            }, resError => this.errorMsg = resError);
        });

        this.duzenleForm = this.formBuilder.group({
            ID: new FormControl(null, [Validators.required, Validators.min(1)]),
            TypeName: new FormControl(null, [Validators.required, Validators.minLength(1), Validators.maxLength(50)]),
            Url: new FormControl(null, [Validators.required, Validators.minLength(1), Validators.maxLength(100)]),
            TableName: new FormControl(null, [Validators.required, Validators.minLength(1), Validators.maxLength(50)]),
            Linkable: new FormControl(null),
            Show: new FormControl(null),
        });
    }

    onSubmit() {
        this.data = new Object();
        this.data.ID = this.duzenleForm.get("ID").value;
        this.data.TypeName = this.duzenleForm.get("TypeName").value;
        this.data.Url = this.duzenleForm.get("Url").value;
        this.data.TableName = this.duzenleForm.get("TableName").value;
        this.data.Linkable = this.duzenleForm.get("Linkable").value;
        this.data.Show = this.duzenleForm.get("Show").value;

        this.service.post("Types", "Update", this.data)
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