import { Component } from "@angular/core";
import { ModelService } from "../../../services/model";
import { ActivatedRoute, Router, Params } from '@angular/router';
import { FormBuilder, FormGroup, Validators, FormControl } from "@angular/forms";

@Component({
    templateUrl: './update.html'
})

export class AdminUsersUpdateComponent {
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
            this.service.get("Users", "Update", this.id).subscribe((resData: any) => {
                this.model = resData;
            }, resError => this.errorMsg = resError);
        });

        this.duzenleForm = this.formBuilder.group({
            ID: new FormControl(null, [Validators.required, Validators.min(1)]),
            Username: new FormControl(null, [Validators.required, Validators.minLength(1), Validators.maxLength(25)]),
            Password: new FormControl(null),
            Active: new FormControl(null),
        });
    }

    onSubmit() {
        this.data = new Object();
        this.data.ID = this.duzenleForm.get("ID").value;
        this.data.Username = this.duzenleForm.get("Username").value;
        this.data.Password = this.duzenleForm.get("Password").value;
        this.data.Active = this.duzenleForm.get("Active").value;

        this.service.post("Users", "Update", this.data)
            .subscribe((answer: any) => {
                if (answer.Mesaj == null) {
                    this.router.navigate(['/Admin/Users']);
                }
                else {
                    $(".alertMessage").text(answer.Mesaj);
                    $(".alert-error").fadeIn("slow");
                }
            },
                resError => this.errorMsg = resError);
    }
}