import { Component } from "@angular/core";
import { KullaniciGrupHakService } from '../../services/kullanicigruphak';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators, FormControl } from "@angular/forms";

@Component({
    templateUrl: './duzenle.html',
    providers: [KullaniciGrupHakService]
})

export class AdminKullaniciGrupHakDuzenleComponent {
    errorMsg: string;
    id: string;

    duzenleForm: FormGroup;
    data: any;

    model: any;

    constructor(private service: KullaniciGrupHakService, private route: ActivatedRoute, private router: Router, private formBuilder: FormBuilder) {
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
            UserGroupTableID: new FormControl(null, [Validators.required, Validators.min(1)]),
            UserGroupProcessID: new FormControl(null, [Validators.required, Validators.min(1)]),
            Allow: new FormControl(null),
        });
    }

    onSubmit() {
        this.data = new Object();
        this.data.ID = this.duzenleForm.get("ID").value;
        this.data.UserGroupTableID = this.duzenleForm.get("UserGroupTableID").value;
        this.data.UserGroupProcessID = this.duzenleForm.get("UserGroupProcessID").value;
        this.data.Allow = this.duzenleForm.get("Allow").value;

        this.service.postDuzenle(this.data)
            .subscribe((answer) => {
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