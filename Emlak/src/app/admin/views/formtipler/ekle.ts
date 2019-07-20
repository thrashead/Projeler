import { Component } from "@angular/core";
import { FormTiplerService } from '../../services/formtipler';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators, FormControl } from "@angular/forms";

@Component({
    templateUrl: './ekle.html'
})

export class AdminFormTiplerEkleComponent {
    errorMsg: string;

    ekleForm: FormGroup;
    data: any;

    model: any;

    constructor(private service: FormTiplerService, private router: Router, private formBuilder: FormBuilder) {
    }

    ngOnInit() {
        this.ekleForm = this.formBuilder.group({
            Name: new FormControl(null, [Validators.required, Validators.minLength(3), Validators.maxLength(50)]),
            Type: new FormControl(null, [Validators.required, Validators.minLength(3), Validators.maxLength(50)]),
            ShortName: new FormControl(null, [Validators.required, Validators.minLength(3), Validators.maxLength(25)]),
            HasValue: new FormControl(null),
        });
    }

    onSubmit() {
        this.data = new Object();
        this.data.Name = this.ekleForm.get("Name").value;
        this.data.Type = this.ekleForm.get("Type").value;
        this.data.ShortName = this.ekleForm.get("ShortName").value;
        this.data.HasValue = this.ekleForm.get("HasValue").value;

        this.service.postEkle(this.data)
            .subscribe((answer) => {
                if (answer.Mesaj == null) {
                    this.router.navigate(['/Admin/FormTipler']);
                }
                else {
                    $(".alertMessage").text(answer.Mesaj);
                    $(".alert-error").fadeIn("slow");
                }
            },
                resError => this.errorMsg = resError);
    }
}