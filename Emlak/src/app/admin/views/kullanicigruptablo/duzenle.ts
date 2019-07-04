import { Component } from "@angular/core";
import { KullaniciGrupTabloService } from '../../services/kullanicigruptablo';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators, FormControl } from "@angular/forms";

@Component({
    templateUrl: './duzenle.html',
    providers: [KullaniciGrupTabloService]
})

export class AdminKullaniciGrupTabloDuzenleComponent {
    errorMsg: string;
    id: string;

    duzenleForm: FormGroup;
    data: any;

    model: {};

    constructor(private service: KullaniciGrupTabloService, private route: ActivatedRoute, private router: Router, private formBuilder: FormBuilder) {
    }

    ngOnInit() {
        this.route.params.subscribe((params: Params) => {
            this.id = params['id'];
            this.service.getDuzenle(this.id).subscribe((resData) => {
                this.model = resData;
            }, resError => this.errorMsg = resError);
        });

        this.duzenleForm = this.formBuilder.group({
            ID: new FormControl(null, [Validators.required, Validators.min(1)]),
            TypeID: new FormControl(null, [Validators.required, Validators.min(1)]),
            UserGroupID: new FormControl(null, [Validators.required, Validators.min(1)]),
        });
    }

    onSubmit() {
        this.data = new Object();
        this.data.ID = this.duzenleForm.get("ID").value;
        this.data.TypeID = this.duzenleForm.get("TypeID").value;
        this.data.UserGroupID = this.duzenleForm.get("UserGroupID").value;

        this.service.postDuzenle(this.data)
            .subscribe((answer) => {
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