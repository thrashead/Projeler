import { Component } from "@angular/core";
import { ModelService } from "../../services/model";
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators, FormControl } from "@angular/forms";

@Component({
    templateUrl: './ekle.html'
})

export class AdminKullanicilarEkleComponent {
    errorMsg: string;

    ekleForm: FormGroup;
    data: any;

    model: any;

    constructor(private service: ModelService, private router: Router, private formBuilder: FormBuilder) {
    }

    ngOnInit() {
        this.ekleForm = this.formBuilder.group({
            Username: new FormControl(null, [Validators.required, Validators.minLength(3), Validators.maxLength(25)]),
            Password: new FormControl(null, [Validators.required, Validators.minLength(3), Validators.maxLength(50)]),
            Active: new FormControl(null),
        });
    }

    onSubmit() {
        this.data = new Object();
        this.data.Username = this.ekleForm.get("Username").value;
        this.data.Password = this.ekleForm.get("Password").value;
        this.data.Active = this.ekleForm.get("Active").value;

        this.service.post("Kullanicilar", "Ekle", this.data)
            .subscribe((answer: any) => {
                if (answer.Mesaj == null) {
                    this.router.navigate(['/Admin/Kullanicilar']);
                }
                else {
                    $(".alertMessage").text(answer.Mesaj);
                    $(".alert-error").fadeIn("slow");
                }
            },
                resError => this.errorMsg = resError);
    }
}