import { Component } from "@angular/core";
import { ModelService } from "../../services/model";
import { ActivatedRoute, Params, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators, FormControl } from "@angular/forms";

@Component({
    templateUrl: './ekle.html'
})

export class AdminKullaniciGrupHakEkleComponent {
    errorMsg: string;
    linkID: string;

    ekleForm: FormGroup;
    data: any;

    model: any;

    constructor(private service: ModelService, private route: ActivatedRoute, private router: Router, private formBuilder: FormBuilder) {
    }

    ngOnInit() {
        this.route.params.subscribe((params: Params) => {
            this.linkID = params['linkID'];
            this.service.get("KullaniciGrupHak", "Ekle", this.linkID).subscribe((resData: any) => {
                this.model = resData;
            }, resError => this.errorMsg = resError);
        });

        this.ekleForm = this.formBuilder.group({
            UserGroupTableID: new FormControl(null, [Validators.required, Validators.min(1)]),
            UserGroupProcessID: new FormControl(null, [Validators.required, Validators.min(1)]),
            Allow: new FormControl(null),
        });
    }

    onSubmit() {
        this.data = new Object();
        this.data.UserGroupTableID = this.ekleForm.get("UserGroupTableID").value;
        this.data.UserGroupProcessID = this.ekleForm.get("UserGroupProcessID").value;
        this.data.Allow = this.ekleForm.get("Allow").value;

        this.service.post("KullaniciGrupHak", "Ekle", this.data)
            .subscribe((answer: any) => {
                if (answer.Mesaj == null) {
                    this.router.navigate(['/Admin/KullaniciGrupHak']);
                }
                else {
                    $(".alertMessage").text(answer.Mesaj);
                    $(".alert-error").fadeIn("slow");
                }
            },
                resError => this.errorMsg = resError);
    }
}