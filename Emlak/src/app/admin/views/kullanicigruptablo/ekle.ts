import { Component } from "@angular/core";
import { ModelService } from "../../services/model";
import { ActivatedRoute, Params, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators, FormControl } from "@angular/forms";

@Component({
    templateUrl: './ekle.html'
})

export class AdminKullaniciGrupTabloEkleComponent {
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
            this.service.get("KullaniciGrupTablo", "Ekle", this.linkID).subscribe((resData: any) => {
                this.model = resData;
            }, resError => this.errorMsg = resError);
        });

        this.ekleForm = this.formBuilder.group({
            TypeID: new FormControl(null, [Validators.required, Validators.min(1)]),
            UserGroupID: new FormControl(null, [Validators.required, Validators.min(1)]),
        });
    }

    onSubmit() {
        this.data = new Object();
        this.data.TypeID = this.ekleForm.get("TypeID").value;
        this.data.UserGroupID = this.ekleForm.get("UserGroupID").value;

        this.service.post("KullaniciGrupTablo", "Ekle", this.data)
            .subscribe((answer: any) => {
                if (answer.Mesaj == null) {
                    this.router.navigate(['/Admin/KullaniciGrupTablo']);
                }
                else {
                    $(".alertMessage").text(answer.Mesaj);
                    $(".alert-error").fadeIn("slow");
                }
            },
                resError => this.errorMsg = resError);
    }
}