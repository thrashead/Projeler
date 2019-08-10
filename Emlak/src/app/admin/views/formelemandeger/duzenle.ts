import { Component } from "@angular/core";
import { ModelService } from "../../services/model";
import { ActivatedRoute, Params, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators, FormControl } from "@angular/forms";

@Component({
    templateUrl: './duzenle.html'
})

export class AdminFormElemanDegerDuzenleComponent {
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
            this.service.get("FormElemanDeger", "Duzenle", this.id).subscribe((resData: any) => {
                this.model = resData;
            }, resError => this.errorMsg = resError);
        });


        this.duzenleForm = this.formBuilder.group({
            ID: new FormControl(null, [Validators.required, Validators.min(1)]),
            PropID: new FormControl(null, [Validators.required, Validators.min(1)]),
            Text: new FormControl(null),
            Value: new FormControl(null, [Validators.required, Validators.minLength(3), Validators.maxLength(50)]),
            Code: new FormControl(null),
        });
    }

    onSubmit() {
        this.data = new Object();
        this.data.ID = this.duzenleForm.get("ID").value;
        this.data.PropID = this.duzenleForm.get("PropID").value;
        this.data.Text = this.duzenleForm.get("Text").value;
        this.data.Value = this.duzenleForm.get("Value").value;
        this.data.Code = this.duzenleForm.get("Code").value;

        this.service.post("FormElemanDeger", "Duzenle", this.data)
            .subscribe((answer: any) => {
                if (answer.Mesaj == null) {
                    this.router.navigate(['/Admin/FormElemanDeger']);
                }
                else {
                    $(".alertMessage").text(answer.Mesaj);
                    $(".alert-error").fadeIn("slow");
                }
            },
                resError => this.errorMsg = resError);
    }
}