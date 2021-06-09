import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { SiteService } from '../../../../services/site';

@Component({
    selector: 'hr-popupsignup',
    templateUrl: './signup.html'
})

export class PopupSignupComponent {
    errorMsg: string;
    alert: string;

    signupForm: FormGroup;

    data: any;

    constructor(private service: SiteService, private formBuilder: FormBuilder, private router: Router) {
    }

    ngOnInit() {
        this.signupForm = this.formBuilder.group({
            Username: new FormControl(null, [Validators.required, Validators.minLength(3), Validators.maxLength(25)]),
            Password: new FormControl(null, [Validators.required, Validators.minLength(3), Validators.maxLength(25)]),
            Email: new FormControl(null, Validators.compose([Validators.required, Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')])),
            Phone: new FormControl(null, [Validators.required, Validators.minLength(10), Validators.maxLength(15)]),
        });
    }

    onClick() {
        if (!$(".select-user span").hasClass("active")) {
            $("#modalAlert").addClass("show");
            this.alert = "Lütfen bir giriş türü seçiniz.";
            return;
        }

        this.data = new Object();

        this.data.Username = this.signupForm.get("Username").value;
        this.data.Password = this.signupForm.get("Password").value;
        this.data.Email = this.signupForm.get("Email").value;
        this.data.Phone = this.signupForm.get("Phone").value;

        let controller: string = $(".select-user span").eq(0).hasClass("active") ? "Candidate" : "Employer";

        this.service.post(controller, "Signup", this.data).subscribe((answer: boolean) => {
            if (answer == true) {
                this.router.navigate(['/' + controller + '/Login']);
            }
            else {
                $("#modalAlert").addClass("show");
                this.alert = "Kayıt yapılamadı.";
            }
        }, resError => this.errorMsg = resError);
    }
}
