import { Component } from "@angular/core";
import { ModelService } from "../../services/model";
import { ActivatedRoute, Params, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators, FormControl } from "@angular/forms";

@Component({
    templateUrl: './update.html'
})

export class AdminMetaTUpdateComponent {
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
            this.service.get("MetaT", "Update", this.id).subscribe((resData: any) => {
                this.model = resData;
            }, resError => this.errorMsg = resError);
        });

        this.duzenleForm = this.formBuilder.group({
            ID: new FormControl(null, [Validators.required, Validators.min(1)]),
            MetaID: new FormControl(null, [Validators.required, Validators.min(1)]),
            TransID: new FormControl(null, [Validators.required, Validators.min(1)]),
            Name: new FormControl(null, [Validators.required, Validators.minLength(1), Validators.maxLength(50)]),
            Content: new FormControl(null, [Validators.required, Validators.minLength(1)]),
        });
    }

    onSubmit() {
        this.data = new Object();
        this.data.ID = this.duzenleForm.get("ID").value;
        this.data.MetaID = this.duzenleForm.get("MetaID").value;
        this.data.TransID = this.duzenleForm.get("TransID").value;
        this.data.Name = this.duzenleForm.get("Name").value;
        this.data.Content = this.duzenleForm.get("Content").value;

        this.service.post("MetaT", "Update", this.data)
            .subscribe((answer: any) => {
                if (answer.Mesaj == null) {
                    this.router.navigate(['/Admin/MetaT']);
                }
                else {
                    $(".alertMessage").text(answer.Mesaj);
                    $(".alert-error").fadeIn("slow");
                }
            },
                resError => this.errorMsg = resError);
    }
}