import { Component } from "@angular/core";
import { TiplerService } from "../../services/tipler";
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators, FormControl } from "@angular/forms";

@Component({
    templateUrl: './ekle.html'
})

export class AdminTiplerEkleComponent {
    errorMsg: string;

    ekleForm: FormGroup;
    data: any;

    model: any;

    constructor(private service: TiplerService, private router: Router, private formBuilder: FormBuilder) {
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

        this.service.postEkle(this.data)
            .subscribe((answer) => {
                if (answer.Mesaj == null) {
                    this.router.navigate(['/Admin/Tipler']);
                }
                else {
                    $(".alertMessage").text(answer.Mesaj);
                    $(".alert-error").fadeIn("slow");
                }
            },
                resError => this.errorMsg = resError);
    }
}