import { Component } from "@angular/core";
import { KullaniciGrupIslemService } from '../../services/kullanicigrupislem';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators, FormControl } from "@angular/forms";

@Component({
    templateUrl: './ekle.html',
    providers: [KullaniciGrupIslemService]
})

export class AdminKullaniciGrupIslemEkleComponent {
    errorMsg: string;

    ekleForm: FormGroup;
    data: any;

    model: {};

    constructor(private service: KullaniciGrupIslemService, private router: Router, private formBuilder: FormBuilder) {
    }

    ngOnInit() {
        this.ekleForm = this.formBuilder.group({
            Name: new FormControl(null, [Validators.required, Validators.minLength(3), Validators.maxLength(25)]),
            ShortName: new FormControl(null, [Validators.required, Validators.minLength(3), Validators.maxLength(5)]),
            Description: new FormControl(null),
        });
    }

    onSubmit() {
        this.data = new Object();
        this.data.Name = this.ekleForm.get("Name").value;
        this.data.ShortName = this.ekleForm.get("ShortName").value;
        this.data.Description = this.ekleForm.get("Description").value;

        this.service.postEkle(this.data)
            .subscribe((answer) => {
                if (answer.Mesaj == null) {
                    this.router.navigate(['/Admin/KullaniciGrupIslem']);
                }
                else {
                    $(".alertMessage").text(answer.Mesaj);
                    $(".alert-error").fadeIn("slow");
                }
            },
                resError => this.errorMsg = resError);
    }
}