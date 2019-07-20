import { Component } from "@angular/core";
import { KullanicilarService } from "../../services/kullanicilar";
import { ActivatedRoute, Router, Params } from '@angular/router';
import { FormBuilder, FormGroup, Validators, FormControl } from "@angular/forms";

@Component({
    templateUrl: './grupdegistir.html'
})

export class AdminKullanicilarGrupDegistirComponent {
    errorMsg: string;
    id: string;

    grupDegistirForm: FormGroup;
    data: any;

    model: any;

    constructor(private service: KullanicilarService, private route: ActivatedRoute, private router: Router, private formBuilder: FormBuilder) {
    }

    ngOnInit() {
        this.route.params.subscribe((params: Params) => {
            this.id = params['id'];
            this.service.getGrupDegistir(this.id).subscribe((resData) => {
                this.model = resData;
            }, resError => this.errorMsg = resError);
        });

        this.grupDegistirForm = this.formBuilder.group({
            ID: new FormControl(null, [Validators.required, Validators.min(1)]),
            GroupID: new FormControl(null, [Validators.required, Validators.min(1)]),
        });
    }

    onSubmit() {
        this.data = new Object();
        this.data.ID = this.grupDegistirForm.get("ID").value;
        this.data.GroupID = this.grupDegistirForm.get("GroupID").value;

        this.service.postGrupDegistir(this.data)
            .subscribe((answer) => {
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