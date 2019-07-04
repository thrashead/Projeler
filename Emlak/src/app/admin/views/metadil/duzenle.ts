import { Component } from "@angular/core";
import { MetaDilService } from "../../services/metadil";
import { ActivatedRoute, Params, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators, FormControl } from "@angular/forms";

@Component({
    templateUrl: './duzenle.html',
    providers: [MetaDilService]
})

export class AdminMetaDilDuzenleComponent {
    errorMsg: string;
    id: string;

    duzenleForm: FormGroup;
    data: any;

    model: {};

    constructor(private service: MetaDilService, private route: ActivatedRoute, private router: Router, private formBuilder: FormBuilder) {
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
            MetaID: new FormControl(null, [Validators.required, Validators.min(1)]),
            TransID: new FormControl(null, [Validators.required, Validators.min(1)]),
            Name: new FormControl(null, [Validators.required, Validators.minLength(3), Validators.maxLength(50)]),
            Content: new FormControl(null, [Validators.required, Validators.minLength(1)]),
        });
    }

    onSubmit() {
        this.data = new Object();
        this.data.ID = this.duzenleForm.get("ID").value;
        this.data.MetaID = this.duzenleForm.get("MetaID").value;
        this.data.TransID = this.duzenleForm.get("TransID").value;
        this.data.Name = this.duzenleForm.get("Name").value;
        this.data.Content = this.duzenleForm.get("Content").value;

        this.service.postDuzenle(this.data)
            .subscribe((answer) => {
                if (answer.Mesaj == null) {
                    this.router.navigate(['/Admin/MetaDil']);
                }
                else {
                    $(".alertMessage").text(answer.Mesaj);
                    $(".alert-error").fadeIn("slow");
                }
            },
                resError => this.errorMsg = resError);
    }
}