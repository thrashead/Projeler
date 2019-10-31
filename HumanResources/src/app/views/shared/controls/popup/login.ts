import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { SiteService } from '../../../../services/site';

@Component({
    selector: 'hr-popuplogin',
    templateUrl: './login.html'
})

export class PopupLoginComponent {
    errorMsg: string;
    alert: string;

    loginForm: FormGroup;

    data: any;

    constructor(private service: SiteService, private formBuilder: FormBuilder, private router: Router) {
    }

    ngOnInit() {
        this.loginForm = this.formBuilder.group({
            Username: new FormControl(null, [Validators.required, Validators.minLength(3), Validators.maxLength(25)]),
            Password: new FormControl(null, [Validators.required, Validators.minLength(3), Validators.maxLength(25)]),
            Remember: new FormControl(null),
        });
    }

    onClick() {
        if (!$(".select-user span").hasClass("active")) {
            $("#modalAlert").addClass("show");
            this.alert = "Lütfen bir giriş türü seçiniz.";
            return;
        }

        this.data = new Object();

        this.data.Username = this.loginForm.get("Username").value;
        this.data.Password = this.loginForm.get("Password").value;
        this.data.Remember = this.loginForm.get("Remember").value;

        let controller: string = $(".select-user span").eq(0).hasClass("active") ? "Candidate" : "Employer";

        this.service.post(controller, "Login", this.data).subscribe((answer: boolean) => {
            if (answer == true) {
                this.router.navigate(['/' + controller + '/Home']);
            }
            else {
                $("#modalAlert").addClass("show");
                this.alert = "Giriş yapılamadı.";
            }
        }, resError => this.errorMsg = resError);
    }
}
