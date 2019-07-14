import { Component, ViewEncapsulation } from "@angular/core";
import { FormBuilder, FormGroup, Validators, FormControl } from "@angular/forms";
import { SharedService } from '../../services/shared.js';

import '../../../../../Content/admin/js/jquery.min.js';
import { Router } from '@angular/router';

@Component({
    templateUrl: './giris.html',
    providers: [SharedService],
    styleUrls: [
        '../../../../../Content/admin/css/bootstrap.min.css',
        '../../../../../Content/admin/css/bootstrap-responsive.min.css',
        '../../../../../Content/admin/css/matrix-login.css',
        '../../../../../Content/admin/css/font-awesome/css/font-awesome.css'
    ],
    styles: [
        '#imgLoading { float: left; margin: 5px 5px 0px 0px; height: 20px; display: none; }'
    ],
    encapsulation: ViewEncapsulation.None
})

export class AdminGirisComponent {
    errorMsg: string;

    girisForm: FormGroup;
    girisData: any;

    hataMesaj: string;

    constructor(private service: SharedService, private formBuilder: FormBuilder, private router: Router) {
    }

    ngOnInit() {
        this.girisForm = this.formBuilder.group({
            username: new FormControl(null, [Validators.required, Validators.minLength(3), Validators.maxLength(25)]),
            password: new FormControl(null, [Validators.required, Validators.minLength(3), Validators.maxLength(25)])
        });
    }

    onSubmit() {
        $("#imgLoading").fadeIn("slow");

        this.girisData = new Object();
        this.girisData.Username = this.girisForm.get("username").value;
        this.girisData.Password = this.girisForm.get("password").value;

        this.service.postLogin(this.girisData)
            .subscribe((answer) => {
                if (answer == true) {
                    this.router.navigate(['/Admin/AnaSayfa']);
                }
                else {
                    this.hataMesaj = "Lütfen kullanıcı adı ve şifrenizi kontrol ediniz.";

                    $(".alert-error").fadeIn("slow");

                    $("#imgLoading").fadeOut("slow");
                }
            },
                resError => this.errorMsg = resError);
    }

    onKeyPress(event: any) {
        if (event.keyCode == "13") {
            this.onSubmit();
        }
    }
}